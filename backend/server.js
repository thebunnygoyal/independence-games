require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const { google } = require('googleapis');
const winston = require('winston');

// Initialize Express app
const app = express();

// Logger setup
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({ format: winston.format.simple() })
  ]
});

// Database connection
const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    logger.error('Database connection error:', err);
  } else {
    logger.info('Database connected successfully');
  }
});

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Audit logging middleware
async function logAudit(req, action, data) {
  try {
    await pool.query(
      'INSERT INTO audit_log (table_name, action, new_value, user_email, timestamp) VALUES ($1, $2, $3, $4, $5)',
      ['api_request', action, JSON.stringify(data), req.user?.email || 'anonymous', new Date()]
    );
  } catch (error) {
    logger.error('Audit log error:', error);
  }
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Get all chapters
app.get('/api/chapters', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT c.*, 
        COUNT(DISTINCT m.id) as active_member_count
      FROM chapters c
      LEFT JOIN members m ON c.id = m.chapter_id AND m.status = 'active'
      GROUP BY c.id
      ORDER BY c.name
    `);
    res.json(result.rows);
  } catch (error) {
    logger.error('Error fetching chapters:', error);
    res.status(500).json({ error: 'Failed to fetch chapters' });
  }
});

// Get chapter members
app.get('/api/chapters/:id/members', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM members WHERE chapter_id = $1 AND status = $2 ORDER BY name',
      [req.params.id, 'active']
    );
    res.json(result.rows);
  } catch (error) {
    logger.error('Error fetching members:', error);
    res.status(500).json({ error: 'Failed to fetch members' });
  }
});

// Submit weekly data with validation
app.post('/api/scoring/weekly', async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    const { weekNumber, chapterId, data, submittedBy } = req.body;
    
    // Validate week number
    if (!weekNumber || weekNumber < 1 || weekNumber > 6) {
      throw new Error('Invalid week number. Must be between 1 and 6.');
    }
    
    // Validate data array
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('No data provided');
    }
    
    // Insert/update weekly metrics for each member
    for (const entry of data) {
      // Validate individual entry
      if (!entry.memberId || entry.referrals < 0 || entry.visitors < 0) {
        throw new Error('Invalid data entry');
      }
      
      await client.query(`
        INSERT INTO weekly_metrics 
          (week_number, member_id, referrals, visitors, attendance, submitted_by)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (week_number, member_id) 
        DO UPDATE SET 
          referrals = EXCLUDED.referrals, 
          visitors = EXCLUDED.visitors, 
          attendance = EXCLUDED.attendance,
          submitted_by = EXCLUDED.submitted_by,
          submitted_at = CURRENT_TIMESTAMP
      `, [
        weekNumber, 
        entry.memberId, 
        entry.referrals || 0, 
        entry.visitors || 0, 
        entry.attendance || 'present', 
        submittedBy
      ]);
    }
    
    await client.query('COMMIT');
    await logAudit(req, 'weekly_data_submitted', { weekNumber, chapterId, entries: data.length });
    
    res.json({ 
      success: true, 
      message: 'Weekly data submitted successfully',
      entriesProcessed: data.length
    });
  } catch (error) {
    await client.query('ROLLBACK');
    logger.error('Error submitting weekly data:', error);
    res.status(400).json({ error: error.message });
  } finally {
    client.release();
  }
});

// Calculate and get leaderboard with caching
app.get('/api/scoring/leaderboard', async (req, res) => {
  try {
    // Individual leaderboard
    const individuals = await pool.query(`
      WITH individual_scores AS (
        SELECT 
          m.id,
          m.name,
          m.chapter_id,
          c.name as chapter_name,
          COALESCE(SUM(wm.referrals * 1), 0) + 
          COALESCE(SUM(wm.visitors * 50), 0) +
          COALESCE(SUM(CASE WHEN wm.attendance = 'absent' THEN -10 ELSE 0 END), 0) as weekly_coins,
          COALESCE(LEAST(gm.testimonials, 2) * 5, 0) as testimonial_coins,
          COALESCE(LEAST(gm.trainings, 3) * 25, 0) as training_coins
        FROM members m
        JOIN chapters c ON m.chapter_id = c.id
        LEFT JOIN weekly_metrics wm ON m.id = wm.member_id
        LEFT JOIN game_metrics gm ON m.id = gm.member_id
        WHERE m.status = 'active'
        GROUP BY m.id, m.name, m.chapter_id, c.name, gm.testimonials, gm.trainings
      )
      SELECT 
        *,
        weekly_coins + testimonial_coins + training_coins as total_coins,
        RANK() OVER (ORDER BY weekly_coins + testimonial_coins + training_coins DESC) as rank
      FROM individual_scores
      ORDER BY total_coins DESC
      LIMIT 20
    `);
    
    // Chapter leaderboard with all calculations
    const chapters = await pool.query(`
      WITH chapter_stats AS (
        SELECT 
          c.id,
          c.name,
          c.member_count,
          COUNT(DISTINCT m.id) as active_members,
          COALESCE(SUM(wm.referrals), 0) as total_referrals,
          COALESCE(SUM(wm.visitors), 0) as total_visitors,
          COUNT(DISTINCT CASE WHEN wm.attendance = 'present' THEN wm.member_id END)::float / 
            NULLIF(COUNT(DISTINCT wm.member_id), 0) as attendance_rate,
          COALESCE(SUM(LEAST(gm.testimonials, 2)), 0) as capped_testimonials,
          COALESCE(SUM(LEAST(gm.trainings, 3)), 0) as capped_trainings
        FROM chapters c
        LEFT JOIN members m ON c.id = m.chapter_id AND m.status = 'active'
        LEFT JOIN weekly_metrics wm ON m.id = wm.member_id
        LEFT JOIN game_metrics gm ON m.id = gm.member_id
        GROUP BY c.id, c.name, c.member_count
      )
      SELECT 
        *,
        (total_referrals::float / NULLIF(member_count, 0)) * 500 +
        (total_visitors::float / NULLIF(member_count, 0)) * 10000 +
        CASE WHEN attendance_rate < 0.95 THEN -1000 ELSE 0 END +
        (capped_testimonials::float / NULLIF(member_count, 0)) * 1000 +
        (capped_trainings::float / NULLIF(member_count, 0)) * 5000 as total_coins,
        RANK() OVER (ORDER BY 
          (total_referrals::float / NULLIF(member_count, 0)) * 500 +
          (total_visitors::float / NULLIF(member_count, 0)) * 10000 +
          CASE WHEN attendance_rate < 0.95 THEN -1000 ELSE 0 END +
          (capped_testimonials::float / NULLIF(member_count, 0)) * 1000 +
          (capped_trainings::float / NULLIF(member_count, 0)) * 5000 DESC
        ) as rank
      FROM chapter_stats
      ORDER BY total_coins DESC
    `);
    
    res.json({
      individuals: individuals.rows,
      chapters: chapters.rows,
      lastUpdated: new Date(),
      weekNumber: await getCurrentWeek()
    });
  } catch (error) {
    logger.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// Get individual member details
app.get('/api/scoring/individual/:memberId', async (req, res) => {
  try {
    const memberData = await pool.query(`
      SELECT 
        m.*,
        c.name as chapter_name,
        COALESCE(SUM(wm.referrals), 0) as total_referrals,
        COALESCE(SUM(wm.visitors), 0) as total_visitors,
        COUNT(CASE WHEN wm.attendance = 'present' THEN 1 END) as days_present,
        COUNT(CASE WHEN wm.attendance = 'absent' THEN 1 END) as days_absent,
        COALESCE(gm.testimonials, 0) as testimonials,
        COALESCE(gm.trainings, 0) as trainings,
        COALESCE(gm.inductions_given, 0) as inductions_given
      FROM members m
      JOIN chapters c ON m.chapter_id = c.id
      LEFT JOIN weekly_metrics wm ON m.id = wm.member_id
      LEFT JOIN game_metrics gm ON m.id = gm.member_id
      WHERE m.id = $1
      GROUP BY m.id, c.name, gm.testimonials, gm.trainings, gm.inductions_given
    `, [req.params.memberId]);
    
    if (memberData.rows.length === 0) {
      return res.status(404).json({ error: 'Member not found' });
    }
    
    // Calculate coins
    const member = memberData.rows[0];
    const coins = {
      referrals: member.total_referrals * 1,
      visitors: member.total_visitors * 50,
      attendance: member.days_absent * -10,
      testimonials: Math.min(member.testimonials, 2) * 5,
      trainings: Math.min(member.trainings, 3) * 25,
      total: 0
    };
    coins.total = Object.values(coins).reduce((a, b) => a + b, 0);
    
    res.json({
      member: member,
      coins: coins
    });
  } catch (error) {
    logger.error('Error fetching member details:', error);
    res.status(500).json({ error: 'Failed to fetch member details' });
  }
});

// Google Sheets sync endpoint
app.post('/api/sheets/sync', async (req, res) => {
  try {
    const auth = new google.auth.JWT(
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      null,
      process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      ['https://www.googleapis.com/auth/spreadsheets']
    );
    
    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    
    // Pull data from sheets
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: 'WeeklyData!A2:F1000',
    });
    
    const rows = response.data.values || [];
    let processedCount = 0;
    
    // Update database with sheet data
    for (const row of rows) {
      if (row[0] && row[1]) { // If week and member exist
        try {
          // Find member by name
          const memberResult = await pool.query(
            'SELECT id FROM members WHERE name = $1',
            [row[1]]
          );
          
          if (memberResult.rows.length > 0) {
            const memberId = memberResult.rows[0].id;
            
            await pool.query(`
              INSERT INTO weekly_metrics 
                (week_number, member_id, referrals, visitors, attendance)
              VALUES ($1, $2, $3, $4, $5)
              ON CONFLICT (week_number, member_id) 
              DO UPDATE SET 
                referrals = EXCLUDED.referrals,
                visitors = EXCLUDED.visitors,
                attendance = EXCLUDED.attendance,
                submitted_at = CURRENT_TIMESTAMP
            `, [
              parseInt(row[0]),
              memberId,
              parseInt(row[2]) || 0,
              parseInt(row[3]) || 0,
              row[4] || 'present'
            ]);
            
            processedCount++;
          }
        } catch (error) {
          logger.error('Error processing row:', error);
        }
      }
    }
    
    // Push updated calculations back to sheets
    const calculationData = await pool.query(`
      SELECT 
        wm.week_number,
        m.name,
        wm.referrals,
        wm.visitors,
        wm.attendance,
        (wm.referrals * 1 + wm.visitors * 50 + 
         CASE WHEN wm.attendance = 'absent' THEN -10 ELSE 0 END) as points
      FROM weekly_metrics wm
      JOIN members m ON wm.member_id = m.id
      ORDER BY wm.week_number, m.name
    `);
    
    if (calculationData.rows.length > 0) {
      const values = calculationData.rows.map(row => [
        row.week_number,
        row.name,
        row.referrals,
        row.visitors,
        row.attendance,
        row.points
      ]);
      
      await sheets.spreadsheets.values.update({
        spreadsheetId: spreadsheetId,
        range: 'WeeklyData!A2:F',
        valueInputOption: 'RAW',
        resource: { values }
      });
    }
    
    await logAudit(req, 'sheets_sync', { rowsProcessed: processedCount });
    
    res.json({ 
      success: true, 
      rowsProcessed: processedCount,
      totalRows: rows.length
    });
  } catch (error) {
    logger.error('Error syncing with Google Sheets:', error);
    res.status(500).json({ error: 'Failed to sync with Google Sheets' });
  }
});

// Update game metrics (testimonials, trainings)
app.post('/api/metrics/game', async (req, res) => {
  try {
    const { memberId, testimonials, trainings, inductionsGiven } = req.body;
    
    // Validate inputs
    if (testimonials > 2 || trainings > 3) {
      return res.status(400).json({ 
        error: 'Exceeded maximum allowed values (testimonials: 2, trainings: 3)' 
      });
    }
    
    await pool.query(`
      INSERT INTO game_metrics 
        (member_id, testimonials, trainings, inductions_given)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (member_id) 
      DO UPDATE SET 
        testimonials = EXCLUDED.testimonials,
        trainings = EXCLUDED.trainings,
        inductions_given = EXCLUDED.inductions_given,
        last_updated = CURRENT_TIMESTAMP
    `, [memberId, testimonials || 0, trainings || 0, inductionsGiven || 0]);
    
    await logAudit(req, 'game_metrics_updated', { memberId, testimonials, trainings });
    
    res.json({ success: true, message: 'Game metrics updated successfully' });
  } catch (error) {
    logger.error('Error updating game metrics:', error);
    res.status(500).json({ error: 'Failed to update game metrics' });
  }
});

// Get audit logs with pagination
app.get('/api/audit/logs', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    const offset = (page - 1) * limit;
    
    const result = await pool.query(
      'SELECT * FROM audit_log ORDER BY timestamp DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    );
    
    const countResult = await pool.query('SELECT COUNT(*) FROM audit_log');
    const totalCount = parseInt(countResult.rows[0].count);
    
    res.json({
      logs: result.rows,
      pagination: {
        page,
        limit,
        total: totalCount,
        pages: Math.ceil(totalCount / limit)
      }
    });
  } catch (error) {
    logger.error('Error fetching audit logs:', error);
    res.status(500).json({ error: 'Failed to fetch audit logs' });
  }
});

// Helper function to get current week number
async function getCurrentWeek() {
  const startDate = new Date('2025-06-17');
  const currentDate = new Date();
  const diffTime = Math.abs(currentDate - startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const weekNumber = Math.ceil(diffDays / 7);
  return Math.min(weekNumber, 6); // Cap at 6 weeks
}

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`BNI Games Backend running on port ${PORT}`);
  logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
});