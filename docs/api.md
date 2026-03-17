# API Reference

<!-- AUTODOCS:ROUTES_START -->
<!-- Managed by AutoDocs v1 — Changes may be overwritten -->
<!-- Managed by AutoDocs v1 — Changes may be overwritten -->

What changed in this commit:
Summaries: FILE: api/waitlist.js
This file defines an Express router that manages waitlist entries through a RESTful API. It exports a single Express `router` instance.

The public API surface includes the following endpoints:

*   **GET `/waitlist`**
    *   **Purpose:** Retrieves all entries currently in the waitlist.
    *   **HTTP Method:** GET
    *   **Path:** `/waitlist`
    *   **Parameters:** None.
    *   **Return Type:**
        *   On success (HTTP 200 OK): `application/json` object `{ success: true, data: Array<Object> }`. The `data` array contains all waitlist entries, each being an object.
        *   On error (HTTP 500 Internal Server Error): `application/json` object `{ success: false, error: String }`, where `error` is the error message.

*   **POST `/waitlist`**
    *   **Purpose:** Adds a new email address to the waitlist.
    *   **HTTP Method:** POST
    *   **Path:** `/waitlist`
    *   **Parameters:**
        *   **Request Body:** `application/json` object with a required `email` property (String).
    *   **Return Type:**
        *   On success (HTTP 201 Created): `application/json` object `{ success: true, message: 'Added to waitlist' }`.
        *   On client error (HTTP 400 Bad Request): `application/json` object `{ error: 'Email is required' }` if the `email` field is missing from the request body.
        *   On server error (HTTP 500 Internal Server Error): `application/json` object `{ success: false, error: String }`.
    *   **Data Model Implied:** A new entry in the `waitlist` collection will store the provided `email` (String) and a `createdAt` timestamp (Date).

*   **DELETE `/waitlist/:id`**
    *   **Purpose:** Removes a specific entry from the waitlist using its unique identifier.
    *   **HTTP Method:** DELETE
    *   **Path:** `/waitlist/:id`
    *   **Parameters:**
        *   **Path Parameter:** `id` (String) - The unique identifier (`_id`) of the waitlist entry to be deleted.
    *   **Return Type:**
        *   On success (HTTP 200 OK): `application/json` object `{ success: true }`.
        *   On error (HTTP 500 Internal Server Error): `application/json` object `{ success: false, error: String }`.

**Primary Dependencies:**
*   `express`: Used for creating the router and handling HTTP requests and responses.
*   `db`: An implicitly available database connection object (e.g., MongoDB client) is used to interact with a `waitlist` collection for data persistence.

**Environment Variables:**
No environment variables are explicitly used within this file.

**Important Constants, Schemas, or Data Models:**
The file implicitly defines a data model for waitlist entries stored in a `waitlist` database collection. Each entry is expected to have at least an `_id` (for deletion), an `email` (String), and a `createdAt` timestamp (Date) upon insertion.

SOURCE: api/waitlist.js:1-36
CONFIDENCE: High
<!-- AUTODOCS:ROUTES_END -->
