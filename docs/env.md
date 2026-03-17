# Environment Variables

<!-- AUTODOCS:ENV_START -->
<!-- Managed by AutoDocs v1 — Changes may be overwritten -->
## Environment Variables

This section details the environment variables used to configure the application.

### General Application Settings

- Name: PORT
- Required: Yes
- Default: 3000
- Purpose: Specifies the port on which the application server will listen.
SOURCE: .env.example:1-17
CONFIDENCE: High

- Name: NODE_ENV
- Required: Yes
- Default: development
- Purpose: Sets the application's operating environment, typically development or production.
SOURCE: .env.example:1-17
CONFIDENCE: High

### Database Configuration

- Name: MONGODB_URI
- Required: Yes
- Default: mongodb://localhost:27017/autodocs-website
- Purpose: Provides the connection string for the MongoDB database.
SOURCE: .env.example:1-17
CONFIDENCE: High

### Waitlist Management

- Name: WAITLIST_LIMIT
- Required: Yes
- Default: 1000
- Purpose: Defines the maximum number of entries allowed in the application's waitlist.
SOURCE: .env.example:1-17
CONFIDENCE: High

- Name: WAITLIST_NOTIFY_EMAIL
- Required: Yes
- Default: hello@autodocs.dev
- Purpose: Specifies the email address to which notifications related to the waitlist should be sent.
SOURCE: .env.example:1-17
CONFIDENCE: High

### Analytics Integration

- Name: POSTHOG_API_KEY
- Required: Yes
- Default: None
- Purpose: The API key required for integrating with the PostHog analytics service.
SOURCE: .env.example:1-17
CONFIDENCE: High

- Name: POSTHOG_HOST
- Required: Yes
- Default: https://app.posthog.com
- Purpose: The base URL for the PostHog analytics instance.
SOURCE: .env.example:1-17
CONFIDENCE: High

### Email Service (Resend)

- Name: RESEND_API_KEY
- Required: Yes
- Default: None
- Purpose: The API key necessary for authenticating with the Resend email sending service.
SOURCE: .env.example:1-17
CONFIDENCE: High

- Name: RESEND_FROM_EMAIL
- Required: Yes
- Default: noreply@autodocs.dev
- Purpose: The default "from" email address to be used when sending emails via Resend.
SOURCE: .env.example:1-17
CONFIDENCE: High
<!-- AUTODOCS:ENV_END -->
