# BNI Games Tracker - 30-Minute Deployment Guide

## 🚀 Phase 1: Infrastructure Setup (10 minutes)

### Azure Resources Provisioning
```bash
# 1. Create Resource Group
az group create \
  --name rg-bni-games-prod \
  --location eastus

# 2. Create App Service Plan
az appservice plan create \
  --name asp-bni-games \
  --resource-group rg-bni-games-prod \
  --sku B1 \
  --is-linux

# 3. Create Web App
az webapp create \
  --name bni-games-tracker \
  --resource-group rg-bni-games-prod \
  --plan asp-bni-games \
  --runtime "NODE|18-lts"

# 4. Create PostgreSQL Database
az postgres flexible-server create \
  --name psql-bni-games \
  --resource-group rg-bni-games-prod \
  --location eastus \
  --admin-user bniadmin \
  --admin-password "BNI@Games2025!" \
  --sku-name Standard_B1ms \
  --storage-size 32

# 5. Configure Database
az postgres flexible-server db create \
  --server-name psql-bni-games \
  --resource-group rg-bni-games-prod \
  --database-name bnigames

# 6. Set Environment Variables
az webapp config appsettings set \
  --name bni-games-tracker \
  --resource-group rg-bni-games-prod \
  --settings \
    DATABASE_URL="postgresql://bniadmin:BNI@Games2025!@psql-bni-games.postgres.database.azure.com/bnigames" \
    JWT_SECRET="bni-games-secret-2025" \
    GOOGLE_SHEET_ID="[TO_BE_ADDED]" \
    GOOGLE_API_KEY="[TO_BE_ADDED]"
```

### GitHub Repository Setup
```bash
# Create private repository
gh repo create bni-games-tracker --private --description "BNI Independence Games 2.0 Tracking System"

# Clone repository
git clone https://github.com/[YOUR_USERNAME]/bni-games-tracker.git
cd bni-games-tracker

# Initialize with README
echo "# BNI Independence Games 2.0 Tracker" > README.md
git add README.md
git commit -m "Initial commit"
git push origin main
```

### Google Sheets API Setup
```javascript
// 1. Go to Google Cloud Console
// 2. Create new project: "BNI-Games-Tracker"
// 3. Enable Google Sheets API
// 4. Create Service Account credentials
// 5. Download JSON key file

// Environment variables needed:
GOOGLE_SERVICE_ACCOUNT_EMAIL="bni-games@bni-games-tracker.iam.gserviceaccount.com"
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
```

## 📊 Phase 2: Database Schema (5 minutes)

### PostgreSQL Schema
```sql
-- Chapters table
CREATE TABLE chapters (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  captain_name VARCHAR(100),
  coach_name VARCHAR(100),
  member_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Members table
CREATE TABLE members (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE,
  chapter_id INTEGER REFERENCES chapters(id),
  role VARCHAR(20) DEFAULT 'member',
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Weekly metrics table
CREATE TABLE weekly_metrics (
  id SERIAL PRIMARY KEY,
  week_number INTEGER NOT NULL,
  member_id INTEGER REFERENCES members(id),
  referrals INTEGER DEFAULT 0,
  visitors INTEGER DEFAULT 0,
  attendance VARCHAR(20) DEFAULT 'present',
  submitted_by VARCHAR(100),
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(week_number, member_id)
);

-- Game metrics table
CREATE TABLE game_metrics (
  id SERIAL PRIMARY KEY,
  member_id INTEGER REFERENCES members(id) UNIQUE,
  testimonials INTEGER DEFAULT 0,
  trainings INTEGER DEFAULT 0,
  inductions_given INTEGER DEFAULT 0,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Audit log table
CREATE TABLE audit_log (
  id SERIAL PRIMARY KEY,
  table_name VARCHAR(50),
  record_id INTEGER,
  action VARCHAR(20),
  old_value JSONB,
  new_value JSONB,
  user_email VARCHAR(100),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_weekly_metrics_week ON weekly_metrics(week_number);
CREATE INDEX idx_weekly_metrics_member ON weekly_metrics(member_id);
CREATE INDEX idx_audit_log_timestamp ON audit_log(timestamp);

-- Insert initial chapters
INSERT INTO chapters (name, captain_name, coach_name) VALUES
  ('INCREDIBLEZ', 'TBD', 'TBD'),
  ('KNIGHTZ', 'TBD', 'TBD'),
  ('ETERNAL', 'TBD', 'TBD'),
  ('CELEBRATIONS', 'TBD', 'TBD'),
  ('OPULANCE', 'TBD', 'TBD'),
  ('EPIC', 'TBD', 'TBD'),
  ('VICTORY', 'TBD', 'TBD'),
  ('ACHIEVERZ', 'TBD', 'TBD');
```

## 🔧 Phase 3: Backend API Template (5 minutes)

### Express Server Setup
```javascript
// server.js
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const { google } = require('googleapis');

const app = express();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date() });
});

// Scoring engine
app.post('/api/scoring/calculate', async (req, res) => {
  const { memberId, weekNumber } = req.body;
  
  // Tamper-proof calculation on server
  const query = `
    SELECT 
      m.name,
      COALESCE(wm.referrals * 1, 0) as referral_coins,
      COALESCE(wm.visitors * 50, 0) as visitor_coins,
      CASE WHEN wm.attendance = 'absent' THEN -10 ELSE 0 END as attendance_coins,
      LEAST(gm.testimonials, 2) * 5 as testimonial_coins,
      LEAST(gm.trainings, 3) * 25 as training_coins
    FROM members m
    LEFT JOIN weekly_metrics wm ON m.id = wm.member_id AND wm.week_number = $2
    LEFT JOIN game_metrics gm ON m.id = gm.member_id
    WHERE m.id = $1
  `;
  
  const result = await pool.query(query, [memberId, weekNumber]);
  const scores = result.rows[0];
  const total = Object.values(scores).reduce((a, b) => a + (typeof b === 'number' ? b : 0), 0);
  
  res.json({ ...scores, total });
});

// Google Sheets sync
app.post('/api/sheets/sync', async (req, res) => {
  const auth = new google.auth.JWT(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    null,
    process.env.GOOGLE_PRIVATE_KEY,
    ['https://www.googleapis.com/auth/spreadsheets']
  );
  
  const sheets = google.sheets({ version: 'v4', auth });
  
  // Fetch data from database
  const data = await pool.query('SELECT * FROM weekly_metrics ORDER BY week_number, member_id');
  
  // Update Google Sheet
  await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: 'WeeklyData!A2:Z',
    valueInputOption: 'RAW',
    resource: {
      values: data.rows.map(row => [
        row.week_number,
        row.member_id,
        row.referrals,
        row.visitors,
        row.attendance
      ])
    }
  });
  
  res.json({ success: true, rowsUpdated: data.rows.length });
});

app.listen(process.env.PORT || 3000);
```

## 📱 Phase 4: Frontend Deployment (5 minutes)

### GitHub Actions Workflow
```yaml
# .github/workflows/deploy.yml
name: Deploy to Azure

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: |
        npm ci
        npm run build
    
    - name: Deploy to Azure
      uses: azure/webapps-deploy@v2
      with:
        app-name: 'bni-games-tracker'
        publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
        package: .
```

## 🔗 Final Integration (5 minutes)

### Environment Configuration
```bash
# .env.production
DATABASE_URL=postgresql://bniadmin:BNI@Games2025!@psql-bni-games.postgres.database.azure.com/bnigames
JWT_SECRET=bni-games-secret-2025-production
GOOGLE_SHEET_ID=[TEMPLATE_SHEET_ID]
GOOGLE_SERVICE_ACCOUNT_EMAIL=bni-games@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----..."
AZURE_STORAGE_CONNECTION_STRING=[FOR_FILE_UPLOADS]
NODE_ENV=production
```

### Quick Start Commands
```bash
# Local development
npm install
npm run dev

# Deploy to production
git add .
git commit -m "Deploy BNI Games Tracker"
git push origin main

# Database migrations
npm run migrate:up

# Generate demo data
npm run seed:demo
```

## ✅ Launch Checklist

- [ ] Azure resources provisioned
- [ ] Database schema created
- [ ] Google Sheets API configured
- [ ] Backend API deployed
- [ ] Frontend deployed
- [ ] Template sheet created
- [ ] Test data loaded
- [ ] Admin users created
- [ ] SSL certificate active
- [ ] Monitoring enabled

## 📊 Post-Launch Monitoring

```javascript
// Monitor critical metrics
const metrics = {
  apiLatency: '< 200ms',
  syncFrequency: 'Every 5 minutes',
  errorRate: '< 0.1%',
  uptime: '99.9%'
};
```

---
**TOTAL TIME: 30 MINUTES**
**STATUS: READY TO SHIP** 🚀