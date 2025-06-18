-- BNI Independence Games 2.0 Database Schema
-- Version: 1.0.0
-- Created: June 2025

-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS audit_log CASCADE;
DROP TABLE IF EXISTS game_metrics CASCADE;
DROP TABLE IF EXISTS weekly_metrics CASCADE;
DROP TABLE IF EXISTS members CASCADE;
DROP TABLE IF EXISTS chapters CASCADE;

-- Create chapters table
CREATE TABLE chapters (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  captain_name VARCHAR(100),
  coach_name VARCHAR(100),
  member_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create members table
CREATE TABLE members (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE,
  chapter_id INTEGER REFERENCES chapters(id) ON DELETE CASCADE,
  role VARCHAR(20) DEFAULT 'member' CHECK (role IN ('member', 'president', 'vice_president', 'secretary_treasurer')),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'dropped')),
  join_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create weekly metrics table
CREATE TABLE weekly_metrics (
  id SERIAL PRIMARY KEY,
  week_number INTEGER NOT NULL CHECK (week_number BETWEEN 1 AND 6),
  member_id INTEGER REFERENCES members(id) ON DELETE CASCADE,
  referrals INTEGER DEFAULT 0 CHECK (referrals >= 0),
  visitors INTEGER DEFAULT 0 CHECK (visitors >= 0),
  attendance VARCHAR(20) DEFAULT 'present' CHECK (attendance IN ('present', 'absent', 'medical')),
  visitor_names TEXT,
  eoi_submitted BOOLEAN DEFAULT false,
  submitted_by VARCHAR(100),
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(week_number, member_id)
);

-- Create game metrics table
CREATE TABLE game_metrics (
  id SERIAL PRIMARY KEY,
  member_id INTEGER REFERENCES members(id) ON DELETE CASCADE UNIQUE,
  testimonials INTEGER DEFAULT 0 CHECK (testimonials >= 0 AND testimonials <= 2),
  trainings INTEGER DEFAULT 0 CHECK (trainings >= 0 AND trainings <= 3),
  inductions_given INTEGER DEFAULT 0 CHECK (inductions_given >= 0),
  inductions_received INTEGER DEFAULT 0 CHECK (inductions_received >= 0),
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create audit log table
CREATE TABLE audit_log (
  id SERIAL PRIMARY KEY,
  table_name VARCHAR(50) NOT NULL,
  record_id INTEGER,
  action VARCHAR(50) NOT NULL,
  old_value JSONB,
  new_value JSONB,
  user_email VARCHAR(100),
  user_ip VARCHAR(45),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_members_chapter ON members(chapter_id);
CREATE INDEX idx_members_status ON members(status);
CREATE INDEX idx_weekly_metrics_week ON weekly_metrics(week_number);
CREATE INDEX idx_weekly_metrics_member ON weekly_metrics(member_id);
CREATE INDEX idx_weekly_metrics_week_member ON weekly_metrics(week_number, member_id);
CREATE INDEX idx_audit_log_timestamp ON audit_log(timestamp DESC);
CREATE INDEX idx_audit_log_table_record ON audit_log(table_name, record_id);

-- Create update timestamp trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_chapters_updated_at BEFORE UPDATE ON chapters
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_members_updated_at BEFORE UPDATE ON members
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert initial chapters
INSERT INTO chapters (name, captain_name, coach_name, member_count) VALUES
  ('INCREDIBLEZ', 'TBD', 'TBD', 0),
  ('KNIGHTZ', 'TBD', 'TBD', 0),
  ('ETERNAL', 'TBD', 'TBD', 0),
  ('CELEBRATIONS', 'TBD', 'TBD', 0),
  ('OPULANCE', 'TBD', 'TBD', 0),
  ('EPIC', 'TBD', 'TBD', 0),
  ('VICTORY', 'TBD', 'TBD', 0),
  ('ACHIEVERZ', 'TBD', 'TBD', 0)
ON CONFLICT (name) DO NOTHING;

-- Create view for chapter statistics
CREATE OR REPLACE VIEW chapter_statistics AS
SELECT 
  c.id,
  c.name,
  c.member_count,
  COUNT(DISTINCT m.id) FILTER (WHERE m.status = 'active') as active_members,
  COALESCE(SUM(wm.referrals), 0) as total_referrals,
  COALESCE(SUM(wm.visitors), 0) as total_visitors,
  COALESCE(AVG(CASE WHEN wm.attendance = 'present' THEN 100.0 ELSE 0.0 END), 0) as attendance_rate,
  COALESCE(SUM(LEAST(gm.testimonials, 2)), 0) as total_testimonials,
  COALESCE(SUM(LEAST(gm.trainings, 3)), 0) as total_trainings
FROM chapters c
LEFT JOIN members m ON c.id = m.chapter_id
LEFT JOIN weekly_metrics wm ON m.id = wm.member_id
LEFT JOIN game_metrics gm ON m.id = gm.member_id
GROUP BY c.id, c.name, c.member_count;

-- Create view for individual scores
CREATE OR REPLACE VIEW individual_scores AS
SELECT 
  m.id,
  m.name,
  m.email,
  c.name as chapter_name,
  COALESCE(SUM(wm.referrals * 1), 0) as referral_coins,
  COALESCE(SUM(wm.visitors * 50), 0) as visitor_coins,
  COALESCE(SUM(CASE WHEN wm.attendance = 'absent' THEN -10 ELSE 0 END), 0) as attendance_coins,
  COALESCE(LEAST(gm.testimonials, 2) * 5, 0) as testimonial_coins,
  COALESCE(LEAST(gm.trainings, 3) * 25, 0) as training_coins,
  COALESCE(SUM(wm.referrals * 1), 0) + 
  COALESCE(SUM(wm.visitors * 50), 0) +
  COALESCE(SUM(CASE WHEN wm.attendance = 'absent' THEN -10 ELSE 0 END), 0) +
  COALESCE(LEAST(gm.testimonials, 2) * 5, 0) +
  COALESCE(LEAST(gm.trainings, 3) * 25, 0) as total_coins
FROM members m
JOIN chapters c ON m.chapter_id = c.id
LEFT JOIN weekly_metrics wm ON m.id = wm.member_id
LEFT JOIN game_metrics gm ON m.id = gm.member_id
WHERE m.status = 'active'
GROUP BY m.id, m.name, m.email, c.name, gm.testimonials, gm.trainings;

-- Grant permissions (adjust based on your user setup)
-- GRANT SELECT ON ALL TABLES IN SCHEMA public TO bni_readonly;
-- GRANT ALL ON ALL TABLES IN SCHEMA public TO bni_admin;
-- GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO bni_admin;