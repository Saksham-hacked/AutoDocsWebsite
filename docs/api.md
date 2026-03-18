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

### ANALYTICS_MAX_EVENTS_PER_IP
- Name: ANALYTICS_MAX_EVENTS_PER_IP
- Required/Optional: Optional
- Default: 1000
- Purpose: Sets an upper limit on the total number of analytics events that can be recorded from a single IP address.
SOURCE: .env.example:23-23
CONFIDENCE: High

### ANALYTICS_DEBUG_MODE
- Name: ANALYTICS_DEBUG_MODE
- Required/Optional: Optional
- Default: false
- Purpose: A boolean flag to enable or disable debug mode for analytics.
SOURCE: .env.example:27-27
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

### GET /api/stats/ip-events

Aggregates analytics events to count occurrences per IP address. It returns a list of IP addresses that have generated events exceeding the ANALYTICS_MAX_EVENTS_PER_IP threshold, sorted by event count in descending order.

- Method: GET
- Path: /api/stats/ip-events
- Parameters: None
- Response example:
  {
    "success": true,
    "data": [
      { "_id": "192.168.1.1", "count": 1200 },
      { "_id": "10.0.0.5", "count": 1100 }
    ]
  }
- Error codes:
  - 500 Internal Server Error: { "success": false, "error": "Error message" }
SOURCE: api/stats.js:32-43
CONFIDENCE: High

### POST /api/stats/event

Tracks a specific analytics event.

- Method: POST
- Path: /api/stats/event
- Parameters:
  - event: string, required. The name of the event. Valid values: page_view, waitlist_signup, pricing_view, cta_click, plan_selected.
  - page: string, required. The page where the event occurred.
  - userId: string, optional. An identifier for the user associated with the event.
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

### GET /api/stats/health

Provides a health check for the analytics service, including a database ping and the status of ANALYTICS_DEBUG_MODE.

- Method: GET
- Path: /api/stats/health
- Parameters: None
- Response example:
  {
    "success": true,
    "data": {
      "db": true,
      "debug": false
    }
  }
- Error codes:
  - 500 Internal Server Error: { "success": false, "error": "Error message" }
SOURCE: api/stats.js:74-81
CONFIDENCE: High
<!-- AUTODOCS:ROUTES_END -->
