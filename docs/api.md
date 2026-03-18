# API Reference

<!-- AUTODOCS:ROUTES_START -->
<!-- Managed by AutoDocs v1 — Changes may be overwritten -->
## Environment Variables

### ANALYTICS_BATCH_SIZE
- Name: ANALYTICS_BATCH_SIZE
- Required/Optional: Optional
- Default: 100
- Purpose: Sets the number of analytics events to collect before processing or sending them in a batch.
SOURCE: .env.example:19-19
CONFIDENCE: High

## API Endpoints

### GET /api/stats

Retrieves general platform statistics.

- Method: GET
- Path: /api/stats
- Parameters: None
- Response example:
  {
    "success": true,
    "data": {
      "waitlistCount": 123,
      "activeUsers": 50,
      "invitedUsers": 25
    }
  }
- Error codes:
  - 500 Internal Server Error: { "success": false, "error": "Error message" }
SOURCE: api/stats.js:6-12
CONFIDENCE: High

### GET /api/stats/daily

Fetches daily signup counts for the last seven days.

- Method: GET
- Path: /api/stats/daily
- Parameters: None
- Response example:
  {
    "success": true,
    "data": [
      { "date": "YYYY-MM-DD", "signups": 10 },
      { "date": "YYYY-MM-DD", "signups": 15 }
    ]
  }
- Error codes:
  - 500 Internal Server Error: { "success": false, "error": "Error message" }
SOURCE: api/stats.js:15-28
CONFIDENCE: High

### POST /api/stats/event

Tracks a specific analytics event.

- Method: POST
- Path: /api/stats/event
- Parameters:
  - event: string, required. The name of the event. Valid values: page_view, waitlist_signup, pricing_view, cta_click, plan_selected.
  - page: string, required. The page where the event occurred.
  - userId: string, optional. An identifier for the user associated with the event.
  - plan: string, optional. A specific plan related to the event. Valid values: hobby, pro, enterprise.
  - metadata: object, optional. Additional unstructured data related to the event.
- Response example:
  {
    "success": true
  }
- Error codes:
  - 400 Bad Request: { "error": "event and page are required" }
  - 500 Internal Server Error: { "success": false, "error": "Error message" }
SOURCE: api/stats.js:31-37, models/analytics.model.js:4-24
CONFIDENCE: High
<!-- AUTODOCS:ROUTES_END -->
