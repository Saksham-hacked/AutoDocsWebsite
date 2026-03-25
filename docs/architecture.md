# Architecture

<!-- AUTODOCS:MODULES_START -->
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

## models/analytics.model.js
This file defines and exports a Mongoose model named `Analytics`. This model is designed to store various user interaction and event data within an application's database.
SOURCE: models/analytics.model.js:1-38
CONFIDENCE: High

### analyticsSchema
Defines the structure for analytics event entries.

- event:
  - Type: String
  - Required: true
  - Enum: ['page_view', 'waitlist_signup', 'pricing_view', 'cta_click', 'plan_selected']
  - Purpose: Represents the type of event.
- page:
  - Type: String
  - Required: true
  - Purpose: Indicates the page where the event occurred.
- userId:
  - Type: String
  - Required: false
  - Default: null
  - Purpose: Stores the ID of the user associated with the event.
- plan:
  - Type: String
  - Required: false
  - Enum: ['hobby', 'pro', 'enterprise', null]
  - Default: null
  - Purpose: Records the user's selected plan.
- sessionId:
  - Type: String
  - Required: false
  - Default: null
  - Purpose: Stores the session ID.
- ipAddress:
  - Type: String
  - Required: false
  - Default: null
  - Purpose: Stores the IP address from which the event originated.
- metadata:
  - Type: mongoose.Schema.Types.Mixed
  - Required: false
  - Default: {}
  - Purpose: Stores additional, unstructured data.

Schema Options:
- timestamps: true (Automatically adds createdAt and updatedAt fields).

Indexes:
- { event: 1, createdAt: -1 }: Optimizes queries by event type and creation time.
- { page: 1, createdAt: -1 }: Optimizes queries by page and creation time.
SOURCE: models/analytics.model.js:1-38
CONFIDENCE: High

### Analytics Model
- Signature: mongoose.model('Analytics', analyticsSchema)
- Purpose: Provides an interface for interacting with the 'analytics' collection in the MongoDB database, allowing for operations like creating, reading, updating, and deleting analytics entries.
SOURCE: models/analytics.model.js:1-38
CONFIDENCE: High

## autodocs-clay/index.html
This file serves as the main entry point for the 'AutoDocs — Your Docs Write Themselves' web application.
SOURCE: autodocs-clay/index.html:1-14
CONFIDENCE: High

### Dependencies
- Google Fonts: Imports 'Nunito' (weights 300, 400, 600, 700, 800, 900, italic 400) and 'Righteous' font families.
SOURCE: autodocs-clay/index.html:1-14
CONFIDENCE: High

### Components
- Root Mount Point: An empty `div` with ID 'root' serves as the mount point for the client-side JavaScript application.
SOURCE: autodocs-clay/index.html:1-14
CONFIDENCE: High

### Main Script
- /src/main.jsx: The core application logic is loaded as a JavaScript module script.
SOURCE: autodocs-clay/index.html:1-14
CONFIDENCE: High

## autodocs-clay/package.json
This file defines the project metadata, scripts, and dependencies for the 'autodocs-clay' project.
SOURCE: autodocs-clay/package.json:1-27
CONFIDENCE: High

### Project Details
- Name: autodocs-clay
- Version: 0.0.0
- Type: module (ES modules)
SOURCE: autodocs-clay/package.json:1-27
CONFIDENCE: High

### Scripts
- dev: Starts a local development server using `vite`.
- build: Compiles the project's source code into production assets using `vite build`.
- preview: Serves and tests the production build locally using `vite preview`.
SOURCE: autodocs-clay/package.json:1-27
CONFIDENCE: High

### Dependencies
- gsap: ^3.12.5 (GreenSock Animation Platform)
- react: ^18.3.1 (Core library for building user interfaces)
- react-dom: ^18.3.1 (DOM-specific methods for React)
SOURCE: autodocs-clay/package.json:1-27
CONFIDENCE: High

### Development Dependencies
- @vitejs/plugin-react: ^4.3.1 (Vite plugin for React support)
- vite: ^5.4.2 (Frontend tooling, build tool, and development server)
SOURCE: autodocs-clay/package.json:1-27
CONFIDENCE: High

## autodocs-clay/package-lock.json
This file describes the exact dependency tree for the 'autodocs-clay' project, ensuring consistent installations.
SOURCE: autodocs-clay/package-lock.json:1-1684
CONFIDENCE: High

### Project Details
- Name: autodocs-clay
- Version: 0.0.0
- Lockfile Version: 3
SOURCE: autodocs-clay/package-lock.json:1-1684
CONFIDENCE: High

### Primary Dependencies
- gsap: ^3.12.5
- react: ^18.3.1
- react-dom: ^18.3.1
SOURCE: autodocs-clay/package-lock.json:1-1684
CONFIDENCE: High

### Development Dependencies
- @vitejs/plugin-react: ^4.3.1
- vite: ^5.4.2
SOURCE: autodocs-clay/package-lock.json:1-1684
CONFIDENCE: High

### Transitive Dependencies
- Babel-related packages: Handle parsing, transforming, and generating JavaScript code (e.g., `@babel/core`, `@babel/parser`, `@babel/traverse`).
- Esbuild-related packages: Fast bundler and minifier for JavaScript and TypeScript (e.g., `@esbuild/darwin-arm64`, `@esbuild/linux-x64`).
- Rollup-related packages: JavaScript module bundler (e.g., `@rollup/*`).
- Source Map utilities: For generating and managing source maps (e.g., `@jridgewell/gen-mapping`).
- TypeScript type definitions: Provide type information for Babel-related APIs (e.g., `@types/babel__core`).
- Other utilities: `browserslist`, `react-refresh`, `debug`, `semver`, `picocolors`.
SOURCE: autodocs-clay/package-lock.json:1-1684
CONFIDENCE: High

## autodocs-clay/src/App.jsx
This file defines the root functional component of a React application, orchestrating the main layout and content.
SOURCE: autodocs-clay/src/App.jsx:1-50
CONFIDENCE: High

### App Component
- Signature: `function App()`
- Purpose: Serves as the top-level container for the application's UI, rendering a sequential stack of UI sections.
- Dependencies: `useEffect`, `useRef` (React Hooks), `gsap`, `ScrollTrigger` (GSAP plugin).
- Imported Components: `Navbar`, `Hero`, `Marquee`, `HowItWorks`, `Features`, `Pricing`, `CTA`, `Footer`.
- Configuration: Registers `ScrollTrigger` plugin with GSAP.
SOURCE: autodocs-clay/src/App.jsx:1-50
CONFIDENCE: High

## autodocs-clay/src/components/CTA.jsx
This module exports a React functional component for a Call-to-Action section.
SOURCE: autodocs-clay/src/components/CTA.jsx:1-36
CONFIDENCE: High

### CTA Component
- Signature: `function CTA()`
- Purpose: Renders a CTA section encouraging users to install the 'AutoDocs' GitHub App, with a headline, description, and two interactive buttons.
- Dependencies: `react` (`useEffect`, `useRef`), `gsap`, `gsap/ScrollTrigger`.
- Constants: `INSTALL_URL` ('https://github.com/apps/autodoc-test-110/installations/new').
SOURCE: autodocs-clay/src/components/CTA.jsx:1-36
CONFIDENCE: High

## autodocs-clay/src/components/Features.jsx
This module exports a React functional component to display product features.
SOURCE: autodocs-clay/src/components/Features.jsx:1-68
CONFIDENCE: High

### Features Component
- Signature: `function Features()`
- Purpose: Renders a section showcasing product features in a grid layout with scroll-triggered animations.
- Dependencies: `useEffect`, `useRef` (React Hooks), `gsap`, `ScrollTrigger` (GSAP plugin).
SOURCE: autodocs-clay/src/components/Features.jsx:1-68
CONFIDENCE: High

### Features Data Model
Defines the structure for individual product features.

- icon: String (emoji icon)
- title: String (feature name)
- body: String (detailed description)
- color: Hexadecimal color string
- bg: CSS linear-gradient string

Features:
- Semantic Memory: Files embedded in pgvector for finding related files.
- Confidence Scoring: Sections scored High/Medium/Low, with low confidence auto-flagged.
- Smart Routing: Rule-based + LLM classification for routes, environment variables, and schemas.
- Source References: Every paragraph cites file and line numbers.
- Fast Exit Logic: Detection and skipping of minor refactors and comment-only changes.
- Any Stack: Compatibility with various programming languages.
SOURCE: autodocs-clay/src/components/Features.jsx:1-68
CONFIDENCE: High

## autodocs-clay/src/components/Footer.jsx
This file defines and exports a React functional component for the application's footer.
SOURCE: autodocs-clay/src/components/Footer.jsx:1-28
CONFIDENCE: High

### Footer Component
- Signature: `function Footer()`
- Purpose: Renders the footer section, displaying branding, tech stack, navigation links, and copyright details.
- Constants: `INSTALL_URL` ('https://github.com/apps/autodoc-test-110/installations/new').
SOURCE: autodocs-clay/src/components/Footer.jsx:1-28
CONFIDENCE: High

## autodocs-clay/src/components/Hero.jsx
This file exports a React functional component for the main hero section.
SOURCE: autodocs-clay/src/components/Hero.jsx:1-50
CONFIDENCE: High

### Hero Component
- Signature: `function Hero()`
- Purpose: Renders the main hero section with a product badge, title, subtitle, CTA buttons, statistics, and an animated documentation generation card.
- Dependencies: `useEffect`, `useRef` (React Hooks), `gsap`.
- Constants: `INSTALL_URL` ('https://github.com/apps/autodoc-test-110/installations/new').
SOURCE: autodocs-clay/src/components/Hero.jsx:1-50
CONFIDENCE: High

### FloatingBlob Component
- Signature: `FloatingBlob({ color, size, top, left, delay })`
- Purpose: Renders a decorative, animated circular background element with a continuous floating motion.
SOURCE: autodocs-clay/src/components/Hero.jsx:1-50
CONFIDENCE: High

### Statistics Data Model
- num: String
- label: String
- color: String
SOURCE: autodocs-clay/src/components/Hero.jsx:1-50
CONFIDENCE: High

### Terminal Output Data Model
- icon: String
- text: String
- color: String
SOURCE: autodocs-clay/src/components/Hero.jsx:1-50
CONFIDENCE: High

## autodocs-clay/src/components/HowItWorks.jsx
This file defines a React functional component explaining the application's operational flow.
SOURCE: autodocs-clay/src/components/HowItWorks.jsx:1-48
CONFIDENCE: High

### HowItWorks Component
- Signature: `function HowItWorks()`
- Purpose: Renders a four-step process detailing how AutoDocs integrates and functions, with scroll-triggered animations.
- Dependencies: `useEffect`, `useRef` (React Hooks), `gsap`, `ScrollTrigger` (GSAP plugin).
SOURCE: autodocs-clay/src/components/HowItWorks.jsx:1-48
CONFIDENCE: High

### Steps Data Model
Defines the structure for each step in the 'How it works' process.

- num: String (two-digit step number)
- icon: String (emoji icon)
- title: String (step title)
- body: String (descriptive paragraph)
- grad: CSS linear-gradient string (background style)
- accent: CSS color string (accent elements)
- shadow: CSS color string (box shadows)

Steps:
- Install the App
- Push your code
- AI analyses it
- PR opened!
SOURCE: autodocs-clay/src/components/HowItWorks.jsx:1-48
CONFIDENCE: High

## autodocs-clay/src/components/Marquee.jsx
This file exports a React functional component for a horizontally scrolling marquee display.
SOURCE: autodocs-clay/src/components/Marquee.jsx:1-24
CONFIDENCE: High

### Marquee Component
- Signature: `function Marquee()`
- Purpose: Renders a continuous, animated sequence of text and emoji items scrolling horizontally.
- Dependencies: Implicitly depends on React.
SOURCE: autodocs-clay/src/components/Marquee.jsx:1-24
CONFIDENCE: High

### Marquee Items Constant
- items: Array of strings and emojis defining the marquee content.
  - Example: `['Git Push', '🚀', 'Webhook', '⚡', 'AI Analysis', '🧠', 'Vector Search', '🔍', 'Doc Generation', '📝', 'PR Opened', '🎉', 'Zero Config', '✨', 'Any Stack', '💫']`
SOURCE: autodocs-clay/src/components/Marquee.jsx:1-24
CONFIDENCE: High

## autodocs-clay/src/components/Navbar.jsx
This file exports a React functional component for the main navigation bar.
SOURCE: autodocs-clay/src/components/Navbar.jsx:1-50
CONFIDENCE: High

### Navbar Component
- Signature: `function Navbar()`
- Purpose: Renders a responsive, sticky navigation bar that dynamically changes style based on scroll position, including a logo, navigation links, and an installation button.
- Dependencies: `useEffect`, `useRef`, `useState` (React Hooks), `gsap`.
- Constants: `INSTALL_URL` ('https://github.com/apps/autodoc-test-110/installations/new').
SOURCE: autodocs-clay/src/components/Navbar.jsx:1-50
CONFIDENCE: High

## autodocs-clay/src/components/Pricing.jsx
This file exports a React functional component for a dynamic pricing section.
SOURCE: autodocs-clay/src/components/Pricing.jsx:1-60
CONFIDENCE: High

### Pricing Component
- Signature: `function Pricing()`
- Purpose: Renders a pricing section with three plans, a monthly/annual billing toggle, and scroll-triggered animations.
- Dependencies: `useEffect`, `useRef`, `useState` (React Hooks), `gsap`, `gsap/ScrollTrigger`.
- Constants: `INSTALL_URL` ('https://github.com/apps/autodoc-test-110/installations/new').
SOURCE: autodocs-clay/src/components/Pricing.jsx:1-60
CONFIDENCE: High

### Pricing Plans Data Model
Defines the structure for each pricing plan.

- name: String (plan name)
- emoji: String (emoji representing the plan)
- price: Object (contains `m` for monthly, `a` for annual prices as strings)
- period: String (billing period description)
- badge: String, optional (promotional badge)
- bg: String (CSS linear-gradient for card background)
- accent: String (hex color code for accent elements)
- shadow: String (CSS rgba value for card shadow)
- features: Array of strings (list of included features)
- missing: Array of strings (list of features not included)
- cta: String (call-to-action text)
- ctaBg: String (CSS linear-gradient or color for CTA button background)
- dark: Boolean, optional (indicates dark text theme)
SOURCE: autodocs-clay/src/components/Pricing.jsx:1-60
CONFIDENCE: High

## autodocs-clay/src/index.css
This file establishes global styles, custom properties, and utility classes for a 'clay' design aesthetic.
SOURCE: autodocs-clay/src/index.css:1-70
CONFIDENCE: High

### Global Styles and Resets
- Universal Reset: `box-sizing: border-box`, `margin: 0`, `padding: 0`.
- HTML: `scroll-behavior: smooth`.
- Body: Default background, text color, font family, fixed background image, `overflow-x: hidden`.
- Scrollbar: Custom styling for Webkit scrollbars.
SOURCE: autodocs-clay/src/index.css:1-70
CONFIDENCE: High

### Custom Properties (CSS Variables)
- Color Palette: `--bg`, `--bg2`, `--coral`, `--peach`, `--mint`, `--lavender`, `--sky`, `--lime`, `--text`, `--text-soft`, `--text-muted`, `--white`.
- Clay Shadow System: `--clay-sm`, `--clay-md`, `--clay-lg`, `--clay-xl`.
- Typography: `--font-display` ('Righteous'), `--font-body` ('Nunito').
SOURCE: autodocs-clay/src/index.css:1-70
CONFIDENCE: High

### Utility Classes
- .clay-card: Base styling for a card with `border-radius`, `box-shadow`, and hover effects.
- .clay-btn: Styles a button with `border-radius`, `box-shadow`, and interactive `transform` effects.
- .hide-mobile: Hides elements on screens up to 768px wide.
SOURCE: autodocs-clay/src/index.css:1-70
CONFIDENCE: High

### Keyframe Animations
- @keyframes float: Subtle floating motion.
- @keyframes floatAlt: Alternative floating animation.
- @keyframes pulse-glow: Pulsing glow effect.
- @keyframes spin-slow: Continuous 360-degree rotation.
- @keyframes marquee: Horizontal translation for scrolling elements.
SOURCE: autodocs-clay/src/index.css:1-70
CONFIDENCE: High

## autodocs-clay/src/main.jsx
This file serves as the entry point for a client-side React application.
SOURCE: autodocs-clay/src/main.jsx:1-15
CONFIDENCE: High

### Main Functionality
- Purpose: Initializes and renders the React application into the DOM.
- Dependencies: `React`, `ReactDOM`, `App` (from './App.jsx'), './index.css'.
- Process: Creates a React root on `div#root` and renders the `App` component within `React.StrictMode`.
SOURCE: autodocs-clay/src/main.jsx:1-15
CONFIDENCE: High

## autodocs-clay/vite.config.js
This file exports a default Vite configuration object for building and serving the project.
SOURCE: autodocs-clay/vite.config.js:1-17
CONFIDENCE: High

### Configuration Details
- Plugins: `react()` (from `@vitejs/plugin-react`) for React support.
- Server: `allowedHosts: 'all'` (permits access from any host).
SOURCE: autodocs-clay/vite.config.js:1-17
CONFIDENCE: High

## autodocs-react/index.html
This file serves as the main entry point for the 'AutoDocs — Autonomous Documentation Agent' web application.
SOURCE: autodocs-react/index.html:1-22
CONFIDENCE: High

### Dependencies
- Google Fonts: Imports 'Space Mono', 'Bebas Neue', and 'DM Sans' font families.
SOURCE: autodocs-react/index.html:1-22
CONFIDENCE: High

### Components
- Root Mount Point: A `div` with ID 'root' serves as the primary mount point for the client-side application.
SOURCE: autodocs-react/index.html:1-22
CONFIDENCE: High

### Main Script
- /src/main.jsx: The entry point for the application's client-side logic.
SOURCE: autodocs-react/index.html:1-22
CONFIDENCE: High

## autodocs-react/package.json
This file defines the project metadata, scripts, and dependencies for the 'autodocs-react' project.
SOURCE: autodocs-react/package.json:1-34
CONFIDENCE: High

### Project Details
- Name: autodocs-react
- Version: 0.0.0
- Type: module (ES modules)
SOURCE: autodocs-react/package.json:1-34
CONFIDENCE: High

### Scripts
- dev: Starts a local development server using `vite`.
- build: Compiles the project's source code into production assets using `vite build`.
- preview: Previews the production build locally using `vite preview`.
SOURCE: autodocs-react/package.json:1-34
CONFIDENCE: High

### Dependencies
- gsap: ^3.12.5 (GreenSock Animation Platform)
- react: ^18.3.1 (Core library for building user interfaces)
- react-dom: ^18.3.1 (DOM-specific methods for React)
SOURCE: autodocs-react/package.json:1-34
CONFIDENCE: High

### Development Dependencies
- @types/react: ^18.3.1 (TypeScript type definitions for React)
- @types/react-dom: ^18.3.1 (TypeScript type definitions for React DOM)
- @vitejs/plugin-react: ^4.3.1 (Vite plugin for React support)
- vite: ^5.4.2 (Frontend tooling, build tool, and development server)
SOURCE: autodocs-react/package.json:1-34
CONFIDENCE: High

## autodocs-react/package-lock.json
This file describes the exact dependency tree for the 'autodocs-react' project, ensuring consistent installations.
SOURCE: autodocs-react/package-lock.json:1-1684
CONFIDENCE: High

### Project Details
- Name: autodocs-react
- Version: 0.0.0
- Lockfile Version: 3
SOURCE: autodocs-react/package-lock.json:1-1684
CONFIDENCE: High

### Primary Dependencies
- gsap: ^3.12.5
- react: ^18.3.1
- react-dom: ^18.3.1
SOURCE: autodocs-react/package-lock.json:1-1684
CONFIDENCE: High

### Development Dependencies
- @types/react: ^18.3.1
- @types/react-dom: ^18.3.1
- @vitejs/plugin-react: ^4.3.1
- vite: ^5.4.2
SOURCE: autodocs-react/package-lock.json:1-1684
CONFIDENCE: High

### Transitive Dependencies
- Babel-related packages: For JavaScript compilation and transformation (e.g., `@babel/core`, `@babel/parser`).
- Esbuild-related packages: Native binaries for fast bundling and minification (e.g., `@esbuild/darwin-x64`).
- Rollup-related packages: JavaScript module bundler (e.g., `@rollup/*`).
- Source Map utilities: For generating and managing source maps.
SOURCE: autodocs-react/package-lock.json:1-1684
CONFIDENCE: High

## autodocs-react/src/App.jsx
This file defines the main `App` functional React component, which serves as the root of the application's user interface.
SOURCE: autodocs-react/src/App.jsx:1-49
CONFIDENCE: High

### App Component
- Signature: `function App()`
- Purpose: Assembles the application's page structure by rendering a sequence of UI sections and implements a custom interactive cursor effect.
- Dependencies: `useEffect`, `useRef` (React Hooks), `gsap`, `gsap/ScrollTrigger`.
- Imported Components: `Navbar`, `Hero`, `Marquee`, `HowItWorks`, `Features`, `CodeBlock`, `Pricing`, `CTA`, `Footer`.
- Functionality: Initializes and manages two custom cursor elements, attaching `mousemove` and hover event listeners.
- Configuration: Registers `ScrollTrigger` plugin globally with GSAP.
- Rendered Structure: Renders custom cursor elements and a sequential display of `Navbar`, `Hero`, `Marquee`, `HowItWorks`, `Features`, `CodeBlock`, `Pricing`, `CTA`, and `Footer`. The `BetaProgram` component is imported but commented out in the JSX rendering.
SOURCE: autodocs-react/src/App.jsx:1-49
CONFIDENCE: High

## autodocs-react/src/components/CTA.jsx
This file exports a React functional component for a Call-to-Action section.
SOURCE: autodocs-react/src/components/CTA.jsx:1-34
CONFIDENCE: High

### CTA Component
- Signature: `function CTA()`
- Purpose: Renders a CTA section encouraging users to install the Autodocs GitHub App, with scroll-triggered animations.
- Dependencies: `react` (`useEffect`, `useRef`), `gsap`, `gsap/ScrollTrigger`.
- Constants: `INSTALL_URL` ('https://github.com/apps/autodoc-test-110/installations/new').
SOURCE: autodocs-react/src/components/CTA.jsx:1-34
CONFIDENCE: High

## autodocs-react/src/components/CodeBlock.jsx
This file exports a React functional component to visually demonstrate AutoDocs features with a simulated code block.
SOURCE: autodocs-react/src/components/CodeBlock.jsx:1-50
CONFIDENCE: High

### CodeBlock Component
- Signature: `function CodeBlock()`
- Purpose: Renders a section combining marketing text with a simulated code block, illustrating documentation generation within markdown files.
- Dependencies: `react` (`useEffect`, `useRef`), `gsap`, `gsap/ScrollTrigger`.
SOURCE: autodocs-react/src/components/CodeBlock.jsx:1-50
CONFIDENCE: High

### Code Block Lines Data Model
Defines the content for the simulated markdown file.

- t: String (type, e.g., 'comment', 'tag', 'heading', 'text', 'label', 'item', 'source', 'blank')
- text: String (line content)

Example documented API route:
- HTTP Method & Path: `POST /api/waitlist`
- Purpose: "Adds an email to the waitlist."
- Parameters: `- email: string, required`
- Response: `201 Created` with JSON body `{ success: true, message: "Added" }`
- Source: `api/waitlist.js:18-25`
- Confidence: `High`
SOURCE: autodocs-react/src/components/CodeBlock.jsx:1-50
CONFIDENCE: High

### Code Block Colors Constant
- colors: Object mapping line types (`t`) to hexadecimal color codes for syntax highlighting.
SOURCE: autodocs-react/src/components/CodeBlock.jsx:1-50
CONFIDENCE: High

## autodocs-react/src/components/Features.jsx
This file exports a React functional component to showcase key product features.
SOURCE: autodocs-react/src/components/Features.jsx:1-50
CONFIDENCE: High

### Features Component
- Signature: `function Features()`
- Purpose: Renders a section displaying product capabilities in a visually engaging grid layout with scroll-triggered animations.
- Dependencies: `useEffect`, `useRef` (React Hooks), `gsap`, `gsap/ScrollTrigger`.
SOURCE: autodocs-react/src/components/Features.jsx:1-50
CONFIDENCE: High

### Features Data Model
Defines the data source for feature cards.

- icon: String (character or emoji)
- title: String (feature name)
- body: String (detailed description)
- tag: String (categorical label)

Features:
- SEMANTIC MEMORY
- CONFIDENCE SCORING
- SMART ROUTING
- SOURCE REFS
- FAST EXIT
- ANY STACK
SOURCE: autodocs-react/src/components/Features.jsx:1-50
CONFIDENCE: High

## autodocs-react/src/components/Footer.jsx
This module exports a React functional component for the application's footer section.
SOURCE: autodocs-react/src/components/Footer.jsx:1-28
CONFIDENCE: High

### Footer Component
- Signature: `function Footer()`
- Purpose: Renders a consistent footer section displaying branding, copyright, and navigation links.
- Constants:
  - Branding Text: "AUTODOCS"
  - Copyright Information: "© 2026 AutoDocs — LangGraph + Gemini + pgvector"
  - Navigation Links: `[['GitHub', 'https://github.com/apps/autodoc-test-110'], ['Install', 'https://github.com/apps/autodoc-test-110/installations/new']]`
SOURCE: autodocs-react/src/components/Footer.jsx:1-28
CONFIDENCE: High

## autodocs-react/src/components/Hero.jsx
This file exports a React functional component for the main hero section.
SOURCE: autodocs-react/src/components/Hero.jsx:1-50
CONFIDENCE: High

### Hero Component
- Signature: `function Hero()`
- Purpose: Renders the main hero section, presenting key information about the AutoDocs application with visual elements and animations.
- Dependencies: `useEffect`, `useRef` (React Hooks), `gsap`.
- Constants: `INSTALL_URL` ('https://github.com/apps/autodoc-test-110/installations/new').
SOURCE: autodocs-react/src/components/Hero.jsx:1-50
CONFIDENCE: High

### Statistics Data Model
- num: String
- label: String
SOURCE: autodocs-react/src/components/Hero.jsx:1-50
CONFIDENCE: High

### Terminal Output Data Model
- Array of objects representing terminal output lines.
SOURCE: autodocs-react/src/components/Hero.jsx:1-50
CONFIDENCE: High

## autodocs-react/src/components/HowItWorks.jsx
This module exports a React functional component outlining the AutoDocs application's operational flow.
SOURCE: autodocs-react/src/components/HowItWorks.jsx:1-48
CONFIDENCE: High

### HowItWorks Component
- Signature: `function HowItWorks()`
- Purpose: Renders a four-step process for the AutoDocs application, serving as a visual guide with interactive cards and scroll-triggered animations.
- Dependencies: `useEffect`, `useRef` (React Hooks), `gsap`, `gsap/ScrollTrigger`.
SOURCE: autodocs-react/src/components/HowItWorks.jsx:1-48
CONFIDENCE: High

### Steps Data Model
Defines the structure for each step in the AutoDocs workflow.

- num: String (two-digit sequential number)
- title: String (concise, uppercase title)
- body: String (detailed description)
- color: Hex color code (for visual styling)
- icon: String (emoji character)

Steps:
- Install the App
- Push your code
- AI analyses it
- PR opened!
SOURCE: autodocs-react/src/components/HowItWorks.jsx:1-48
CONFIDENCE: High

## autodocs-react/src/components/Marquee.jsx
This file exports a React functional component for a dynamic, two-strip horizontal marquee animation.
SOURCE: autodocs-react/src/components/Marquee.jsx:1-39
CONFIDENCE: High

### Marquee Component
- Signature: `function Marquee()`
- Purpose: Renders a continuously scrolling display of textual items, showcasing features or process flow.
- Dependencies: `useEffect`, `useRef` (React Hooks), `gsap`.
SOURCE: autodocs-react/src/components/Marquee.jsx:1-39
CONFIDENCE: High

### Marquee Items Constant
- items: Array of strings defining the content for both marquee strips.
  - Example: `['GIT PUSH', 'WEBHOOK', 'LLM ANALYSIS', 'VECTOR SEARCH', 'DOC GENERATION', 'PR OPENED', 'ZERO CONFIG', 'HIGH CONFIDENCE', 'AUTONOMOUS', 'ANY STACK']`
SOURCE: autodocs-react/src/components/Marquee.jsx:1-39
CONFIDENCE: High

## autodocs-react/src/components/Navbar.jsx
This module exports a React functional component for the main navigation bar.
SOURCE: autodocs-react/src/components/Navbar.jsx:1-50
CONFIDENCE: High

### Navbar Component
- Signature: `function Navbar()`
- Purpose: Renders a responsive, sticky navigation bar that dynamically changes style based on scroll position, including a brand logo, navigation links, and an installation CTA button.
- Dependencies: `useEffect`, `useRef`, `useState` (React Hooks), `gsap`.
- Constants: `INSTALL_URL` ('https://github.com/apps/autodoc-test-110/installations/new').
SOURCE: autodocs-react/src/components/Navbar.jsx:1-50
CONFIDENCE: High

## autodocs-react/src/components/Pricing.jsx
This file exports a React functional component for a dynamic pricing section.
SOURCE: autodocs-react/src/components/Pricing.jsx:1-50
CONFIDENCE: High

### Pricing Component
- Signature: `function Pricing()`
- Purpose: Displays a pricing section with three distinct plans, a toggle for monthly/annual billing, and scroll-triggered animations.
- Dependencies: `useEffect`, `useRef`, `useState` (React Hooks), `gsap`, `gsap/ScrollTrigger`.
- Constants: `INSTALL_URL` ('https://github.com/apps/autodoc-test-110/installations/new').
SOURCE: autodocs-react/src/components/Pricing.jsx:1-50
CONFIDENCE: High

### Pricing Plans Data Model
Defines the structure for each pricing plan.

- name: String (plan name)
- price: Object (contains `monthly` and `annual` string values)
- color: String (hex color code)
- dark: Boolean (indicates dark theme)
- primary: Boolean (indicates primary plan)
- badge: String, optional (promotional badge)
- features: Array of strings (included features)
- missing: Array of strings (features not included)
- cta: String (call-to-action text)

Plans:
- FREE:
  - name: 'FREE'
  - price: { monthly: '$0', annual: '$0' }
  - color: '#fff'
  - dark: true
  - primary: false
  - cta: 'Get started free'
- PRO:
  - name: 'PRO'
  - price: { monthly: '$9', annual: '$5' }
  - color: '#f5e642'
  - dark: false
  - primary: true
  - badge: 'MOST POPULAR'
  - features: ['Unlimited repositories', 'Unlimited doc PRs', 'All doc types', 'Custom templates', 'Priority processing', 'Email support']
  - missing: ['SSO / SAML']
  - cta: 'Start your trial'
- ENTERPRISE:
  - name: 'ENTERPRISE'
  - price: { monthly: 'Custom', annual: 'Custom' }
  - color: '#4256f5'
  - dark: true
  - primary: false
  - features: ['All PRO features', 'SSO / SAML', 'Self-hosted deployment', 'Custom LLM integration', 'SLA guarantee', 'Dedicated support', 'Audit logs']
  - cta: 'Contact sales'
SOURCE: autodocs-react/src/components/Pricing.jsx:1-50
CONFIDENCE: High

## autodocs-react/src/index.css
This CSS file establishes global styling, design tokens, and implements a custom cursor with responsive adjustments.
SOURCE: autodocs-react/src/index.css:1-50
CONFIDENCE: High

### Global Styles and Resets
- Universal Reset: `box-sizing: border-box`, `margin: 0`, `padding: 0`.
- HTML: `scroll-behavior: smooth`.
- Body: Default background, text color, font family, `overflow-x: hidden`, `cursor: none`.
- Scrollbar: Custom styling for Webkit scrollbars.
SOURCE: autodocs-react/src/index.css:1-50
CONFIDENCE: High

### Custom Properties (CSS Variables)
- Colors: `--black`, `--white`, `--yellow`, `--red`, `--blue`, `--green`.
- Fonts: `--font-display` ('Bebas Neue'), `--font-mono` ('Space Mono'), `--font-body` ('DM Sans').
SOURCE: autodocs-react/src/index.css:1-50
CONFIDENCE: High

### Custom Cursor
- .cursor: Small yellow circle, primary cursor indicator.
- .cursor-follower: Larger transparent circle, follows primary cursor with transition.
- Interactive Elements: `a` and `button` elements hide default cursor and trigger custom cursor scaling/color changes on hover.
SOURCE: autodocs-react/src/index.css:1-50
CONFIDENCE: High

### Responsive Design
- Max-width 768px: Custom cursor disabled, default system cursors restored.
- Max-width 600px: `section` elements receive forced horizontal padding of `1.25rem`.
SOURCE: autodocs-react/src/index.css:1-50
CONFIDENCE: High

## autodocs-react/src/main.jsx
This file serves as the primary entry point for a React application.
SOURCE: autodocs-react/src/main.jsx:1-15
CONFIDENCE: High

### Main Functionality
- Purpose: Initializes and renders the root React component into the DOM.
- Dependencies: `react`, `react-dom/client`, `App` (from './App.jsx'), './index.css'.
- Process: Establishes a React root on `div#root` and renders the `App` component within `React.StrictMode`.
SOURCE: autodocs-react/src/main.jsx:1-15
CONFIDENCE: High

## autodocs-react/vite.config.js
This file defines the Vite configuration for a React project.
SOURCE: autodocs-react/vite.config.js:1-17
CONFIDENCE: High

### Configuration Details
- Plugins: `react()` (from `@vitejs/plugin-react`) for React support.
- Server: `allowedHosts: 'all'` (permits the development server to be accessed from any host).
SOURCE: autodocs-react/vite.config.js:1-17
CONFIDENCE: High

## autodocs-react/.gitignore
This `.gitignore` file defines patterns for files and directories that Git should intentionally untrack and ignore within the repository. Its purpose is to prevent the inclusion of transient, generated, or local-specific files in version control, ensuring a clean and portable repository.
SOURCE: autodocs-react/.gitignore:1-30
CONFIDENCE: High

### Excluded Items
- Dependency Directories: `node_modules/`
- Build Output Directories: `dist/`, `dist-ssr/`
- Local Environment Files: `.env`, `.env.local`, `.env.*.local`
- Log Files: `npm-debug.log*`, `yarn-debug.log*`, `yarn-error.log*`, `pnpm-debug.log*`
- Editor and IDE Configuration: `.vscode/`, `.idea/`, `*.suo`, `*.ntvs*`, `*.njsproj`, `*.sln`, `*.sw?`
- Operating System Specific Files: `.DS_Store`, `Thumbs.db`
SOURCE: autodocs-react/.gitignore:1-30
CONFIDENCE: High

## autodocs-react/src/components/BetaProgram.jsx
The `BetaProgram` component is a React functional component, exported as the default export, responsible for rendering a comprehensive landing page section dedicated to a beta program. It does not accept any props. Its purpose is to inform potential testers about the program's benefits, launch timeline, collaboration opportunities, and provide a sign-up mechanism.
SOURCE: autodocs-react/src/components/BetaProgram.jsx:1-836
CONFIDENCE: High

### BetaProgram Component
- Signature: `function BetaProgram()`
- Purpose: Renders a comprehensive landing page section dedicated to a beta program, informing potential testers about benefits, launch timeline, collaboration opportunities, and providing a sign-up mechanism.
- Dependencies: `useState`, `useRef`, `useEffect` (React Hooks), `gsap`, `gsap/ScrollTrigger`.
- Functionality: Manages form inputs and submission status, orchestrates scroll-triggered animations for various sections (header, perk cards, timeline, collaboration cards, sign-up form, progress bar). Includes a client-side `handleSubmit` for email validation and simulated submission.
SOURCE: autodocs-react/src/components/BetaProgram.jsx:1-836
CONFIDENCE: High

### Constants
- SPOTS_TOTAL: Integer (100). Total available spots in the beta program.
- SPOTS_TAKEN: Integer (67). Number of spots currently filled.
- PERKS: Array of objects. Describes beta program perks.
  - icon: String (emoji)
  - tag: String (e.g., 'EARLY ACCESS')
  - title: String (e.g., 'SHAPE THE PRODUCT')
  - body: String (description)
  - color: Hexadecimal color string
  - dark: Boolean (indicates dark text theme)
- TIMELINE: Array of objects. Details product launch phases.
  - phase: String (e.g., '01')
  - label: String (e.g., 'ALPHA')
  - date: String (e.g., 'NOW — APR 2026')
  - status: String (e.g., 'active', 'upcoming')
  - desc: String (description)
  - tasks: Array of strings (list of tasks for the phase)
- COLLABORATIONS: Array of objects. Outlines ways users can contribute.
  - icon: String (emoji)
  - title: String (e.g., 'BUG HUNTER')
  - desc: String (description)
  - reward: String (points earned)
- FAQS: Array of objects. Contains frequently asked questions and answers.
  - q: String (question)
  - a: String (answer)
SOURCE: autodocs-react/src/components/BetaProgram.jsx:1-836
CONFIDENCE: High
<!-- AUTODOCS:MODULES_END -->
