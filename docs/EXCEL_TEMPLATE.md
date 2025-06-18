# BNI Independence Games 2.0 - Excel Template Structure

## 📊 Sheet 1: Chapter Setup
| Chapter Name | Captain | Coach | Total Members | Active Members |
|--------------|---------|--------|---------------|----------------|
| INCREDIBLEZ  | [Name]  | [Name] | 25           | 25              |

**Instructions**: Fill in your chapter details. This sheet is used for initial setup only.

---

## 📨 Sheet 2: Member Roster
| Member ID | Member Name | Email | Role | Status | Join Date |
|-----------|-------------|--------|------|---------|------------|
| 001 | John Doe | john@example.com | Member | Active | 2025-01-01 |
| 002 | Jane Smith | jane@example.com | President | Active | 2024-06-15 |

**Instructions**: List all chapter members. Member ID must be unique. Status can be Active/Inactive.

---

## 📝 Sheet 3: Weekly Data Entry
| Week | Member Name | Referrals | Visitors | Attendance | Visitor Names | EOI Submitted |
|------|-------------|-----------|----------|------------|---------------|--------------|
| 1 | John Doe | 2 | 1 | Present | Mike Johnson | Yes |
| 1 | Jane Smith | 1 | 0 | Present | - | - |
| 1 | Bob Wilson | 0 | 2 | Medical | Sarah Lee, Tom Brown | Yes |

**Validation Rules**:
- Week: 1-6 only
- Referrals: ≥ 0
- Visitors: ≥ 0
- Attendance: Present/Absent/Medical
- EOI Submitted: Yes/No/NA

---

## 🏆 Sheet 4: Game Metrics
| Member Name | Testimonials | Training Sessions | Inductions Given | Notes |
|-------------|--------------|-------------------|------------------|---------|
| John Doe | 1 | 2 | 0 | MSP completed |
| Jane Smith | 2 | 1 | 1 | Gave induction to EPIC chapter |

**Caps**: 
- Max 2 testimonials per member
- Max 3 trainings per member

---

## 🔒 Sheet 5: Calculations (PROTECTED)
### Individual Coins Formula
```
=SUMPRODUCT(
  (WeeklyData!B:B=A2)*WeeklyData!C:C*1,     // Referrals
  (WeeklyData!B:B=A2)*WeeklyData!D:D*50,    // Visitors
  (WeeklyData!B:B=A2)*(WeeklyData!E:E="Absent")*-10,  // Attendance
  MIN(VLOOKUP(A2,GameMetrics!A:B,2,0),2)*5,  // Testimonials
  MIN(VLOOKUP(A2,GameMetrics!A:C,3,0),3)*25  // Trainings
)
```

### Chapter Coins Formula
```
=(SUM(WeeklyData!C:C)/ChapterSetup!D2)*500 +      // Referrals
 (SUM(WeeklyData!D:D)/ChapterSetup!D2)*10000 +    // Visitors
 IF(COUNTIF(WeeklyData!E:E,"Present")/COUNT(WeeklyData!E:E)<0.95,-1000,0) + // Attendance
 (SUMPRODUCT(MIN(GameMetrics!B:B,2))/ChapterSetup!D2)*1000 +  // Testimonials
 (SUMPRODUCT(MIN(GameMetrics!C:C,3))/ChapterSetup!D2)*5000    // Trainings
```

---

## 📊 Sheet 6: Dashboard (AUTO-GENERATED)
| Metric | Week 1 | Week 2 | Week 3 | Week 4 | Week 5 | Week 6 | Total |
|--------|--------|--------|--------|--------|--------|--------|--------|
| Chapter Referrals | 15 | 18 | 22 | - | - | - | 55 |
| Chapter Visitors | 8 | 10 | 12 | - | - | - | 30 |
| Attendance Rate | 96% | 94% | 98% | - | - | - | 96% |
| Chapter Coins | 2850 | 2600 | 3200 | - | - | - | 8650 |

---

## 🎯 Sheet 7: Leaderboard (AUTO-GENERATED)
### Individual Rankings
| Rank | Member Name | Total Coins | Referrals | Visitors | Attendance | Testimonials | Trainings |
|------|-------------|-------------|-----------|----------|------------|--------------|------------|
| 1 | Jane Smith | 285 | 5 | 3 | 100% | 2 | 3 |
| 2 | John Doe | 245 | 4 | 2 | 100% | 1 | 2 |

### Chapter Rankings
| Rank | Chapter | Total Coins | Members | Avg per Member |
|------|---------|-------------|---------|----------------|
| 1 | INCREDIBLEZ | 8650 | 25 | 346 |
| 2 | KNIGHTZ | 8200 | 28 | 293 |

---

## 📋 Sheet 8: Audit Trail (PROTECTED)
| Timestamp | User | Action | Old Value | New Value | Week |
|-----------|------|--------|-----------|-----------|------|
| 2025-06-17 09:15:00 | captain@chapter.com | Update Referrals | 2 | 3 | 1 |
| 2025-06-17 10:30:00 | system | Calculate Coins | - | 285 | 1 |

---

## 🛡️ Protection Rules

### Protected Ranges:
1. **Calculations Sheet**: Entire sheet (formulas only)
2. **Dashboard Sheet**: All cells (auto-generated)
3. **Leaderboard Sheet**: All cells (auto-generated)
4. **Audit Trail Sheet**: All cells (system only)
5. **Column F in Weekly Data**: Points calculation

### Data Validation:
```excel
// Attendance validation
=OR(E2="Present", E2="Absent", E2="Medical")

// Week validation
=AND(A2>=1, A2<=6, MOD(A2,1)=0)

// Visitor validation
=AND(D2>=0, MOD(D2,1)=0)
```

---

## 🚀 Usage Instructions

### For Captains:
1. Download this template
2. Fill in Chapter Setup (Sheet 1)
3. Add all members to Roster (Sheet 2)
4. Enter weekly data every Tuesday by 9 AM
5. Review auto-calculated scores

### For Coordinators:
1. Import all chapter files weekly
2. Run validation checks
3. Generate consolidated reports
4. Resolve any disputes using audit trail

### Important Notes:
- 🔴 DO NOT modify protected cells/sheets
- 🟡 Save file as: `ChapterName_IGames_Week#.xlsx`
- 🟢 Submit via Google Drive link provided
- ⚪ Keep backup of all weekly submissions

---

## 🎮 Wild Card Tracking
| Wild Card | Status | Points Earned | Notes |
|-----------|--------|---------------|---------|
| Team Meeting (100% attendance) | ✅ | 1000 | Photo submitted |
| 15 Hot Categories | ✅ | 250 | Email sent 06/15 |

---

**Template Version**: 2.0
**Last Updated**: June 2025
**Support Email**: benchmarkgames.bnikol@gmail.com