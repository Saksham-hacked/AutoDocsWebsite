# Architecture

<!-- AUTODOCS:MODULES_START -->
<!-- Managed by AutoDocs v1 — Changes may be overwritten -->
<!-- Managed by AutoDocs v1 — Changes may be overwritten -->
<!-- Managed by AutoDocs v1 — Changes may be overwritten -->
## .gitignore
The .gitignore file configures Git to exclude specified files and directories from version control. This project's configuration ignores the .env file and the node_modules/ directory.
SOURCE: .gitignore:1-2
CONFIDENCE: High

### Excluded Items
- .env: This file is used to store environment-specific variables, such as API keys or database credentials, which should not be committed to the repository for security reasons.
- node_modules/: This directory contains third-party dependencies installed by Node.js package managers. It is excluded to keep the repository lean, as these dependencies can be regenerated from package.json and package-lock.json.
SOURCE: .gitignore:1-2
CONFIDENCE: High

## index.html
This file defines the front-end structure and styling for the web page titled 'AutoDocs — Autonomous Documentation Agent'.
SOURCE: index.html:1-765
CONFIDENCE: High

### Dependencies
- Google Fonts: Imports 'Syne', 'JetBrains Mono', and 'DM Sans' for typographic design.
SOURCE: index.html:1-765
CONFIDENCE: High

### Components
- Navigation Bar: A fixed navigation bar at the top, including a logo, navigation links, and a call-to-action button.
- Hero Section: Features a radial glow effect and a 'Coming Soon' badge with a pulsing indicator.
- Inline Styles: An extensive <style> block defines CSS variables, global resets, and styling for navigation and hero components.
- Noise Overlay: A subtle noise texture applied to the body using an inline SVG data URI.
SOURCE: index.html:1-765
CONFIDENCE: High

## README.md
AutoDocs is an autonomous documentation agent for GitHub repositories, designed to keep documentation perfectly synchronized with code changes by automatically opening pull requests. Its public API surface involves installing a GitHub App on a repository, which then detects code changes, classifies their impact, generates updated documentation, and presents it as a pull request for review and merge.
SOURCE: README.md:1-39
CONFIDENCE: High

### How it works
1. Install the GitHub App on any repository
2. Push code as normal
3. AutoDocs detects what changed, classifies the impact, and generates updated documentation
4. A pull request appears with the new docs — review and merge
SOURCE: README.md:1-39
CONFIDENCE: High

### Tech Stack
- Layer 1 — Node.js / Express GitHub App (webhook handler, PR creation)
- Layer 2 — Python / FastAPI + LangGraph pipeline (AI analysis, doc generation)
- LLM — Gemini 2.5 Flash
- Embeddings — Gemini Embedding 001 (768-dim)
- Vector Store — Postgres + pgvector (Supabase)
SOURCE: README.md:1-39
CONFIDENCE: High

### Pipeline
git push → webhook → validate → update memory → retrieve context → impact analysis → generate docs → confidence check → PR
SOURCE: README.md:1-39
CONFIDENCE: High

### Docs generated
| Change type | Doc updated |
|---|
| New API route | docs/api.md |
| New env variable | docs/env.md |
| Dependency update | docs/setup.md |
| Schema / module change | docs/architecture.md |
SOURCE: README.md:1-39
CONFIDENCE: High

### Self-hosted
See docs/setup.md for deployment instructions.
SOURCE: README.md:1-39
CONFIDENCE: High

## pricing.html
This HTML file, titled 'Pricing — AutoDocs', serves as a static web page dedicated to presenting pricing information for a service. It includes a sticky navigation bar, a hero section, and an interactive client-side toggle for monthly/annual pricing views. The page displays a grid of three distinct pricing plans, one of which is highlighted as 'featured'.
SOURCE: pricing.html:1-228
CONFIDENCE: High

### Dependencies
- Google Fonts: Imports 'Syne', 'JetBrains Mono', and 'DM Sans' for typographic design.
SOURCE: pricing.html:1-228
CONFIDENCE: High

### Components
- Navigation Bar: A sticky navigation bar with a logo and links.
- Hero Section: Features a main title and subtitle.
- Pricing Toggle: An interactive client-side toggle to switch between monthly and annual pricing views, with a savings indicator.
- Pricing Plans Grid: Displays three distinct pricing plans, each detailing name, description, price, and features. One plan is visually highlighted.
- Inline Styles: An extensive <style> block defines CSS variables, global resets, and styling for navigation, hero, and pricing components.
SOURCE: pricing.html:1-228
CONFIDENCE: High

## models/waitlist.model.js
This file defines the Mongoose schema and model for managing waitlist entries.
SOURCE: models/waitlist.model.js:1-35
CONFIDENCE: High

### waitlistSchema
Defines the structure for a waitlist entry.

- email:
  - Type: String
  - Required: true
  - Unique: true
  - Lowercase: true
  - Trim: true
  - Purpose: Stores the user's email address.
- name:
  - Type: String
  - Trim: true
  - Purpose: Stores the user's name.
- plan:
  - Type: String
  - Enum: ['hobby', 'pro', 'enterprise']
  - Default: 'hobby'
  - Purpose: Indicates the user's desired plan.
- referredBy:
  - Type: String
  - Default: null
  - Purpose: Stores information about who referred the user.
- status:
  - Type: String
  - Enum: ['pending', 'invited', 'active']
  - Default: 'pending'
  - Purpose: Represents the current status of the waitlist entry.
- invitedAt:
  - Type: Date
  - Default: null
  - Purpose: Records the timestamp when the user was invited.

Schema Options:
- timestamps: true (Automatically adds createdAt and updatedAt fields).
SOURCE: models/waitlist.model.js:1-35
CONFIDENCE: High

### Waitlist Model
- Signature: mongoose.model('Waitlist', waitlistSchema)
- Purpose: Provides an interface for interacting with the 'waitlist' collection in the MongoDB database, allowing for operations like creating, reading, updating, and deleting waitlist entries.
SOURCE: models/waitlist.model.js:1-35
CONFIDENCE: High
<!-- AUTODOCS:MODULES_END -->
