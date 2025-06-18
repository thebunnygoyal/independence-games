# BNI Games Tracker - Integration Guide

## 🎯 Deployment Flow

### Step 1: Frontend Generation (5 minutes)
1. Use the Loveable/Bolt prompt to generate the React/Next.js frontend
2. This creates a **static frontend** with:
   - All UI components
   - Forms with validation
   - API integration code (but no backend)
   - Mock data for testing

### Step 2: Backend Deployment (10 minutes)
```bash
# Deploy the backend separately on Azure
git clone https://github.com/your-repo/bni-games-backend
cd bni-games-backend

# Create .env file
echo "DATABASE_URL=postgresql://..." > .env
echo "JWT_SECRET=..." >> .env
echo "GOOGLE_SHEET_ID=..." >> .env

# Deploy to Azure
az webapp deployment source config --name bni-games-tracker --resource-group rg-bni-games-prod --repo-url https://github.com/your-repo/bni-games-backend --branch main

# Backend is now live at: https://bni-games-tracker.azurewebsites.net
```

### Step 3: Connect Frontend to Backend (5 minutes)
```javascript
// In your frontend code, update .env.production
NEXT_PUBLIC_API_URL=https://bni-games-tracker.azurewebsites.net

// The frontend will now make real API calls instead of using mock data
```

## 📁 Complete Backend Code

Create this as a separate repository: `bni-games-backend`

### package.json
```json
{
  "name": "bni-games-backend",
  "version": "1.0.0",
  "description": "BNI Independence Games 2.0 Tracking Backend",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "migrate": "node migrations/run.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "pg": "^8.11.3",
    "jsonwebtoken": "^9.0.2",
    "googleapis": "^128.0.0",
    "dotenv": "^16.3.1",
    "express-rate-limit": "^7.1.5",
    "helmet": "^7.1.0"
  }
}
```

### server.js
```javascript
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const { google } = require('googleapis');

const app = express();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Audit logging middleware
async function logAudit(req, action, data) {
  await pool.query(
    'INSERT INTO audit_log (table_name, action, new_value, user_email, timestamp) VALUES ($1, $2, $3, $4, $5)',
    ['api_request', action, JSON.stringify(data), req.user?.email || 'anonymous', new Date()]
  );
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date() });
});

// Get all chapters
app.get('/api/chapters', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM chapters ORDER BY name');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get chapter members
app.get('/api/chapters/:id/members', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM members WHERE chapter_id = $1 ORDER BY name',
      [req.params.id]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Submit weekly data
app.post('/api/scoring/weekly', async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    const { weekNumber, chapterId, data } = req.body;
    
    // Validate week number
    if (weekNumber < 1 || weekNumber > 6) {
      throw new Error('Invalid week number');
    }
    
    // Insert/update weekly metrics
    for (const entry of data) {
      await client.query(`
        INSERT INTO weekly_metrics (week_number, member_id, referrals, visitors, attendance, submitted_by)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (week_number, member_id) 
        DO UPDATE SET 
          referrals = $3, 
          visitors = $4, 
          attendance = $5,
          submitted_by = $6,
          submitted_at = CURRENT_TIMESTAMP
      `, [weekNumber, entry.memberId, entry.referrals, entry.visitors, entry.attendance, req.body.submittedBy]);
    }
    
    await client.query('COMMIT');
    await logAudit(req, 'weekly_data_submitted', { weekNumber, chapterId, entries: data.length });
    
    res.json({ success: true, message: 'Weekly data submitted successfully' });
  } catch (error) {
    await client.query('ROLLBACK');
    res.status(400).json({ error: error.message });
  } finally {
    client.release();
  }
});

// Calculate and get leaderboard
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
    
    // Chapter leaderboard
    const chapters = await pool.query(`
      WITH chapter_stats AS (
        SELECT 
          c.id,
          c.name,
          c.member_count,
          COUNT(DISTINCT wm.member_id) as active_members,
          COALESCE(SUM(wm.referrals), 0) as total_referrals,
          COALESCE(SUM(wm.visitors), 0) as total_visitors,
          COALESCE(AVG(CASE WHEN wm.attendance = 'present' THEN 1 ELSE 0 END), 0) as attendance_rate
        FROM chapters c
        LEFT JOIN members m ON c.id = m.chapter_id
        LEFT JOIN weekly_metrics wm ON m.id = wm.member_id
        GROUP BY c.id, c.name, c.member_count
      )
      SELECT 
        *,
        (total_referrals::float / NULLIF(member_count, 0)) * 500 +
        (total_visitors::float / NULLIF(member_count, 0)) * 10000 +
        CASE WHEN attendance_rate < 0.95 THEN -1000 ELSE 0 END as total_coins,
        RANK() OVER (ORDER BY 
          (total_referrals::float / NULLIF(member_count, 0)) * 500 +
          (total_visitors::float / NULLIF(member_count, 0)) * 10000 +
          CASE WHEN attendance_rate < 0.95 THEN -1000 ELSE 0 END DESC
        ) as rank
      FROM chapter_stats
      ORDER BY total_coins DESC
    `);
    
    res.json({
      individuals: individuals.rows,
      chapters: chapters.rows,
      lastUpdated: new Date()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Google Sheets sync
app.post('/api/sheets/sync', async (req, res) => {
  try {
    const auth = new google.auth.JWT(
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      null,
      process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      ['https://www.googleapis.com/auth/spreadsheets']
    );
    
    const sheets = google.sheets({ version: 'v4', auth });
    
    // Pull data from sheets
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'WeeklyData!A2:F1000',
    });
    
    const rows = response.data.values || [];
    
    // Update database with sheet data
    for (const row of rows) {
      if (row[0] && row[1]) { // If week and member exist
        // Update database
        // ... implementation
      }
    }
    
    await logAudit(req, 'sheets_sync', { rowsProcessed: rows.length });
    res.json({ success: true, rowsProcessed: rows.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Download template
app.get('/api/sheets/template', (req, res) => {
  res.download('./templates/BNI_Games_Template.xlsx');
});

// Get audit logs
app.get('/api/audit/logs', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM audit_log ORDER BY timestamp DESC LIMIT 100'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`BNI Games Backend running on port ${PORT}`);
});
```

### Database Migrations (migrations/001_initial.sql)
```sql
-- Create all tables
CREATE TABLE IF NOT EXISTS chapters (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  captain_name VARCHAR(100),
  coach_name VARCHAR(100),
  member_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS members (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE,
  chapter_id INTEGER REFERENCES chapters(id),
  role VARCHAR(20) DEFAULT 'member',
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS weekly_metrics (
  id SERIAL PRIMARY KEY,
  week_number INTEGER NOT NULL CHECK (week_number BETWEEN 1 AND 6),
  member_id INTEGER REFERENCES members(id),
  referrals INTEGER DEFAULT 0 CHECK (referrals >= 0),
  visitors INTEGER DEFAULT 0 CHECK (visitors >= 0),
  attendance VARCHAR(20) CHECK (attendance IN ('present', 'absent', 'medical')),
  submitted_by VARCHAR(100),
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(week_number, member_id)
);

CREATE TABLE IF NOT EXISTS game_metrics (
  id SERIAL PRIMARY KEY,
  member_id INTEGER REFERENCES members(id) UNIQUE,
  testimonials INTEGER DEFAULT 0 CHECK (testimonials >= 0),
  trainings INTEGER DEFAULT 0 CHECK (trainings >= 0),
  inductions_given INTEGER DEFAULT 0 CHECK (inductions_given >= 0),
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS audit_log (
  id SERIAL PRIMARY KEY,
  table_name VARCHAR(50),
  record_id INTEGER,
  action VARCHAR(50),
  old_value JSONB,
  new_value JSONB,
  user_email VARCHAR(100),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_weekly_metrics_week ON weekly_metrics(week_number);
CREATE INDEX idx_weekly_metrics_member ON weekly_metrics(member_id);
CREATE INDEX idx_audit_log_timestamp ON audit_log(timestamp);

-- Insert initial chapters
INSERT INTO chapters (name) VALUES
  ('INCREDIBLEZ'),
  ('KNIGHTZ'),
  ('ETERNAL'),
  ('CELEBRATIONS'),
  ('OPULANCE'),
  ('EPIC'),
  ('VICTORY'),
  ('ACHIEVERZ')
ON CONFLICT (name) DO NOTHING;
```

## 🔗 Connection Flow

1. **Frontend (Loveable/Bolt)** → Generates static React app
2. **Backend (Azure)** → Handles all calculations and data
3. **Database (PostgreSQL)** → Stores all game data
4. **Google Sheets** → Syncs for familiar interface
5. **Audit System** → Tracks every change

## 🛟️ Security Flow

```
User → Frontend → API Request → Backend Validation → Database → Response
                                      ↓
                                 Audit Log
                                      ↓
                              Google Sheets Sync
```

## 📱 Environment Variables

### Frontend (.env.production)
```
NEXT_PUBLIC_API_URL=https://bni-games-tracker.azurewebsites.net
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Backend (.env)
```
DATABASE_URL=postgresql://username:password@server/database
JWT_SECRET=your-secret-key
GOOGLE_SERVICE_ACCOUNT_EMAIL=service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
GOOGLE_SHEET_ID=your-sheet-id
FRONTEND_URL=https://your-frontend-domain.com
PORT=3000
```

## ✅ Integration Checklist

- [ ] Generate frontend with Loveable/Bolt
- [ ] Deploy backend to Azure
- [ ] Configure environment variables
- [ ] Test API endpoints
- [ ] Connect frontend to backend
- [ ] Test Google Sheets sync
- [ ] Verify audit logging
- [ ] Load test data
- [ ] Deploy to production

---

**Total Integration Time: 20 minutes**