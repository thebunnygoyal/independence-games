# BNI Games Tracker - API Documentation

## Base URL

```
Production: https://bni-games-tracker.azurewebsites.net
Development: http://localhost:3000
```

## Authentication

Currently, the API uses basic authentication. In production, implement JWT tokens.

```javascript
Authorization: Bearer <token>
```

## Endpoints

### Health Check

```http
GET /api/health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-06-17T10:00:00Z",
  "environment": "production"
}
```

### Chapters

#### List All Chapters

```http
GET /api/chapters
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "INCREDIBLEZ",
    "captain_name": "John Doe",
    "coach_name": "Jane Smith",
    "member_count": 25,
    "active_member_count": 23,
    "created_at": "2025-01-01T00:00:00Z"
  }
]
```

#### Get Chapter Members

```http
GET /api/chapters/:id/members
```

**Parameters:**
- `id` (number): Chapter ID

**Response:**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "chapter_id": 1,
    "role": "member",
    "status": "active",
    "join_date": "2025-01-01"
  }
]
```

### Scoring

#### Submit Weekly Data

```http
POST /api/scoring/weekly
```

**Request Body:**
```json
{
  "weekNumber": 1,
  "chapterId": 1,
  "submittedBy": "captain@chapter.com",
  "data": [
    {
      "memberId": 1,
      "referrals": 2,
      "visitors": 1,
      "attendance": "present",
      "visitorNames": "Mike Johnson",
      "eoiSubmitted": true
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Weekly data submitted successfully",
  "entriesProcessed": 1
}
```

#### Get Leaderboard

```http
GET /api/scoring/leaderboard
```

**Response:**
```json
{
  "individuals": [
    {
      "id": 1,
      "name": "Jane Smith",
      "chapter_name": "INCREDIBLEZ",
      "referral_coins": 15,
      "visitor_coins": 150,
      "attendance_coins": 0,
      "testimonial_coins": 10,
      "training_coins": 75,
      "total_coins": 250,
      "rank": 1
    }
  ],
  "chapters": [
    {
      "id": 1,
      "name": "INCREDIBLEZ",
      "member_count": 25,
      "active_members": 25,
      "total_referrals": 45,
      "total_visitors": 12,
      "attendance_rate": 0.96,
      "total_coins": 8650,
      "rank": 1
    }
  ],
  "lastUpdated": "2025-06-17T10:00:00Z",
  "weekNumber": 3
}
```

#### Get Individual Score

```http
GET /api/scoring/individual/:memberId
```

**Parameters:**
- `memberId` (number): Member ID

**Response:**
```json
{
  "member": {
    "id": 1,
    "name": "Jane Smith",
    "chapter_name": "INCREDIBLEZ",
    "total_referrals": 15,
    "total_visitors": 3,
    "days_present": 18,
    "days_absent": 0,
    "testimonials": 2,
    "trainings": 3
  },
  "coins": {
    "referrals": 15,
    "visitors": 150,
    "attendance": 0,
    "testimonials": 10,
    "trainings": 75,
    "total": 250
  }
}
```

### Game Metrics

#### Update Game Metrics

```http
POST /api/metrics/game
```

**Request Body:**
```json
{
  "memberId": 1,
  "testimonials": 2,
  "trainings": 3,
  "inductionsGiven": 1
}
```

**Response:**
```json
{
  "success": true,
  "message": "Game metrics updated successfully"
}
```

### Google Sheets Integration

#### Sync with Google Sheets

```http
POST /api/sheets/sync
```

**Response:**
```json
{
  "success": true,
  "rowsProcessed": 150,
  "totalRows": 150
}
```

#### Download Excel Template

```http
GET /api/sheets/template
```

**Response:** Binary file download (Excel template)

### Audit Logs

#### Get Audit Logs

```http
GET /api/audit/logs?page=1&limit=100
```

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Results per page (default: 100)

**Response:**
```json
{
  "logs": [
    {
      "id": 1,
      "table_name": "weekly_metrics",
      "action": "weekly_data_submitted",
      "new_value": {
        "weekNumber": 1,
        "chapterId": 1,
        "entries": 25
      },
      "user_email": "captain@chapter.com",
      "timestamp": "2025-06-17T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 100,
    "total": 1500,
    "pages": 15
  }
}
```

## Error Responses

All errors follow this format:

```json
{
  "error": "Error message",
  "message": "Detailed error description (in development only)"
}
```

### Common Error Codes

- `400`: Bad Request - Invalid input data
- `401`: Unauthorized - Missing or invalid authentication
- `403`: Forbidden - Insufficient permissions
- `404`: Not Found - Resource doesn't exist
- `429`: Too Many Requests - Rate limit exceeded
- `500`: Internal Server Error - Server-side error

## Rate Limiting

- 100 requests per 15 minutes per IP address
- Rate limit headers included in responses:
  - `X-RateLimit-Limit`: 100
  - `X-RateLimit-Remaining`: 95
  - `X-RateLimit-Reset`: 1623936000

## Webhooks (Future)

### Weekly Data Submission

```http
POST https://your-webhook-url.com/bni-games/weekly-update
```

**Payload:**
```json
{
  "event": "weekly_data_submitted",
  "timestamp": "2025-06-17T10:00:00Z",
  "data": {
    "weekNumber": 1,
    "chapterId": 1,
    "submittedBy": "captain@chapter.com",
    "entriesCount": 25
  }
}
```

## Testing

Use these test endpoints in development:

```bash
# Health check
curl http://localhost:3000/api/health

# Get chapters
curl http://localhost:3000/api/chapters

# Submit test data
curl -X POST http://localhost:3000/api/scoring/weekly \
  -H "Content-Type: application/json" \
  -d '{"weekNumber":1,"chapterId":1,"data":[]}'
```