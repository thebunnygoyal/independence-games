# BNI Independence Games 2.0 - Excel Template

## Template Structure

The Excel template for BNI Independence Games should be created with the following sheets:

### Sheet 1: Chapter Setup
- Chapter Name
- Captain Name
- Coach Name
- Total Members
- Active Members

### Sheet 2: Member Roster
- Member ID (unique)
- Member Name
- Email
- Role (Member/President/VP/Secretary-Treasurer)
- Status (Active/Inactive)
- Join Date

### Sheet 3: Weekly Data Entry
- Week Number (1-6)
- Member Name
- Referrals (≥0)
- Visitors (≥0)
- Attendance (Present/Absent/Medical)
- Visitor Names
- EOI Submitted (Yes/No/NA)

### Sheet 4: Game Metrics
- Member Name
- Testimonials (max 2)
- Training Sessions (max 3)
- Inductions Given
- Notes

### Sheet 5: Calculations (Protected)
- Individual coin calculations
- Chapter coin calculations
- All formulas locked

### Sheet 6: Dashboard (Auto-generated)
- Weekly progress
- Chapter statistics
- Attendance rates
- Total coins

### Sheet 7: Leaderboard (Auto-generated)
- Individual rankings
- Chapter rankings
- Detailed breakdowns

### Sheet 8: Audit Trail (Protected)
- All changes logged
- Timestamps
- User information

## Data Validation Rules

1. Week number: 1-6 only
2. Referrals/Visitors: Non-negative integers
3. Attendance: Dropdown with three options
4. Testimonials: Maximum 2 per member
5. Trainings: Maximum 3 per member

## Protection Settings

- Calculation sheets: Fully protected
- Dashboard/Leaderboard: Read-only
- Data entry sheets: Open for editing
- Audit trail: System-generated only

## File Naming Convention

`ChapterName_IGames_Week#.xlsx`

Example: `INCREDIBLEZ_IGames_Week1.xlsx`