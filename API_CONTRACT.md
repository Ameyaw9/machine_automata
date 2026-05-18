# Machine Automata - API Contract

This document defines the API contract between the Next.js frontend and the Python backend.

## Base URL
```
http://localhost:5000  # Development
https://api.yourdomain.com  # Production
```

Set via `NEXT_PUBLIC_API_URL` environment variable.

## Endpoints

### 1. Analyze Task

Analyzes a task description and returns automation suggestions.

**Endpoint**: `POST /api/analyze`

**Request Headers**:
```
Content-Type: application/json
```

**Request Body**:
```json
{
  "task_description": "I need to process customer data from a CSV file and send automated emails"
}
```

**Response (200 OK)**:
```json
{
  "complexity": 65,
  "estimated_time": "4-6 hours",
  "suggestions": [
    {
      "id": 1,
      "title": "CSV Data Processing Pipeline",
      "description": "Automate the CSV file reading and data transformation",
      "category": "Data Processing",
      "confidence": 92
    },
    {
      "id": 2,
      "title": "Email Automation Service",
      "description": "Set up automated email sending with templates",
      "category": "Email Automation",
      "confidence": 88
    },
    {
      "id": 3,
      "title": "Scheduled Task Execution",
      "description": "Run the automation on a daily or weekly schedule",
      "category": "Scheduled Tasks",
      "confidence": 85
    }
  ],
  "approach": "Use a Python script with pandas for data processing and SMTP for email automation",
  "steps": [
    "Set up Python environment with required libraries",
    "Create CSV parsing module",
    "Design email template system",
    "Implement SMTP configuration",
    "Add error handling and logging",
    "Test with sample data",
    "Schedule with cron jobs"
  ]
}
```

**Error Response (400 Bad Request)**:
```json
{
  "error": "Task description is required",
  "code": "INVALID_REQUEST"
}
```

**Error Response (500 Server Error)**:
```json
{
  "error": "Failed to analyze task",
  "code": "ANALYSIS_ERROR",
  "details": "Additional error information"
}
```

**Notes**:
- `complexity` is a number from 0-100
- `confidence` is a percentage from 0-100
- `estimated_time` should be a human-readable string (e.g., "2-3 hours", "1 day")
- Suggestions should be ordered by confidence (highest first)
- Steps should be logically ordered for implementation

---

### 2. Get History

Retrieves the history of past task analyses.

**Endpoint**: `GET /api/history`

**Query Parameters**:
- `limit` (optional): Maximum number of results (default: 50)
- `offset` (optional): Number of results to skip (default: 0)
- `sort` (optional): Sort order - "recent" or "oldest" (default: "recent")

**Response (200 OK)**:
```json
{
  "items": [
    {
      "id": "abc123",
      "task_description": "I need to process customer data from a CSV file",
      "complexity": 65,
      "suggestions_count": 3,
      "created_at": "2024-05-18T10:30:00Z",
      "results": {
        "complexity": 65,
        "estimated_time": "4-6 hours",
        "suggestions": [...]
      }
    },
    {
      "id": "def456",
      "task_description": "Automate daily backup of database",
      "complexity": 35,
      "suggestions_count": 2,
      "created_at": "2024-05-17T14:15:00Z",
      "results": {...}
    }
  ],
  "total": 24,
  "limit": 50,
  "offset": 0
}
```

**Error Response (401 Unauthorized)**:
```json
{
  "error": "Authentication required",
  "code": "AUTH_REQUIRED"
}
```

**Notes**:
- Results should be paginated for performance
- Timestamps should be ISO 8601 format
- Returns empty array if no history exists

---

### 3. Get Statistics

Retrieves aggregate statistics about analyses.

**Endpoint**: `GET /api/stats`

**Response (200 OK)**:
```json
{
  "total_analyses": 245,
  "total_automations": 187,
  "success_rate": 94,
  "avg_complexity": 62,
  "trends": [
    {
      "month": "January",
      "analyses": 24,
      "automations": 18
    },
    {
      "month": "February", 
      "analyses": 32,
      "automations": 25
    }
  ],
  "categories": [
    {
      "name": "Data Processing",
      "count": 45
    },
    {
      "name": "Web Automation",
      "count": 32
    }
  ]
}
```

**Notes**:
- `success_rate` is a percentage (0-100)
- `avg_complexity` is a number (0-100)
- Trends should be last 12 months
- Categories should include all supported automation types

---

### 4. Delete Analysis (Optional)

Deletes a previous analysis from history.

**Endpoint**: `DELETE /api/history/{id}`

**Response (200 OK)**:
```json
{
  "success": true,
  "message": "Analysis deleted successfully"
}
```

**Error Response (404 Not Found)**:
```json
{
  "error": "Analysis not found",
  "code": "NOT_FOUND"
}
```

---

## Error Handling

All errors should follow this format:

```json
{
  "error": "Human-readable error message",
  "code": "ERROR_CODE",
  "details": "Optional additional information",
  "timestamp": "2024-05-18T10:30:00Z"
}
```

### Common HTTP Status Codes
- `200 OK` - Request successful
- `400 Bad Request` - Invalid parameters
- `401 Unauthorized` - Authentication required
- `404 Not Found` - Resource not found
- `500 Server Error` - Internal server error
- `503 Service Unavailable` - Server temporarily unavailable

---

## CORS Configuration

The backend must allow requests from the frontend origin:

```
Access-Control-Allow-Origin: http://localhost:3000 (dev) or https://yourdomain.com (prod)
Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
```

---

## Rate Limiting (Optional)

Recommended rate limiting:
- 100 requests per minute per IP
- 1000 requests per day per user
- Return `429 Too Many Requests` when exceeded

---

## Authentication (Future)

When implementing authentication:
- Send JWT token in `Authorization: Bearer <token>` header
- Return `401 Unauthorized` if token is missing or invalid
- Include refresh token mechanism for long-lived sessions

---

## Example Integration (Python Flask)

```python
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

@app.route('/api/analyze', methods=['POST'])
def analyze_task():
    data = request.get_json()
    task_description = data.get('task_description')
    
    if not task_description:
        return jsonify({
            'error': 'Task description is required',
            'code': 'INVALID_REQUEST'
        }), 400
    
    # Your analysis logic here
    results = {
        'complexity': 65,
        'estimated_time': '4-6 hours',
        'suggestions': [...],
        'approach': '...',
        'steps': [...]
    }
    
    return jsonify(results), 200
```

---

## Testing the API

Use curl to test endpoints:

```bash
# Test analyze endpoint
curl -X POST http://localhost:5000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"task_description": "Process CSV files"}'

# Test history endpoint
curl http://localhost:5000/api/history

# Test stats endpoint
curl http://localhost:5000/api/stats
```

---

## Versioning

If API versioning is needed in the future:
- Use path-based versioning: `/api/v1/analyze`, `/api/v2/analyze`
- Maintain backward compatibility
- Provide migration guide when deprecating versions

---

## Documentation

For the Python backend team:
- See `applications/auto_system.py` for the existing implementation
- Add these endpoints to your Flask/FastAPI application
- Test thoroughly before deploying to production
- Document any additional endpoints or modifications

For the frontend team:
- API calls are made via the Next.js API client in components
- Error handling displays user-friendly messages
- Loading states prevent multiple simultaneous requests
- Response caching can be added using SWR library
