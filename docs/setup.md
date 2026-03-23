# Setup

<!-- AUTODOCS:INSTALL_START -->
<!-- Managed by AutoDocs v1 — Changes may be overwritten -->
## Dependencies

The application relies on the following production dependencies:

- rate-limiter-flexible: Provides robust rate limiting capabilities to prevent abuse or excessive requests.
SOURCE: package.json:14-14
CONFIDENCE: High

- winston: A versatile logging library used for comprehensive application logging, aiding in monitoring and debugging.
SOURCE: package.json:15-15
CONFIDENCE: High

- joi: A schema description language and data validator, employed for validating incoming request data to ensure data integrity and security.
SOURCE: package.json:16-16
CONFIDENCE: High

- gsap: JavaScript animation library (GreenSock Animation Platform).
SOURCE: autodocs-clay/package.json:17-17
CONFIDENCE: High

- react: Core library for building user interfaces.
SOURCE: autodocs-clay/package.json:18-18
CONFIDENCE: High

- react-dom: Provides DOM-specific methods for React.
SOURCE: autodocs-clay/package.json:19-19
CONFIDENCE: High

### Development Dependencies

- @vitejs/plugin-react: Vite plugin for React support, including Fast Refresh.
SOURCE: autodocs-clay/package.json:23-23
CONFIDENCE: High

- vite: Next-generation frontend tooling, serving as a build tool and development server.
SOURCE: autodocs-clay/package.24-24
CONFIDENCE: High

## Configuration

### Build Tooling

- **Vite**: Used as the build tool and development server.
    - The @vitejs/plugin-react is configured to provide React support, including JSX transformation and Fast Refresh.
    - The development server is configured to allow access from all hosts (server.allowedHosts: 'all').
SOURCE: autodocs-clay/vite.config.js:1-13
CONFIDENCE: High

### Frontend Prerequisites

The application requires the following external resources:

- **Google Fonts**:
    - Nunito (weights 300, 400, 600, 700, 800, 900, italic 400)
    - Righteous
    These fonts are imported via a <link> tag in index.html and utilized in index.css for --font-body and --font-display respectively.
SOURCE: autodocs-clay/index.html:7-8, autodocs-clay/src/index.css:1-100
CONFIDENCE: High

### Animation Setup

The GreenSock Animation Platform (GSAP) ScrollTrigger plugin must be registered to enable scroll-driven animations. This is typically done once at the application's entry point or a central component.
SOURCE: autodocs-clay/src/App.jsx:25-25, autodocs-clay/src/components/CTA.jsx:40-40, autodocs-clay/src/components/Features.jsx:49-49, autodocs-clay/src/components/HowItWorks.jsx:45-45, autodocs-clay/src/components/Pricing.jsx:45-45
CONFIDENCE: High
<!-- AUTODOCS:INSTALL_END -->
