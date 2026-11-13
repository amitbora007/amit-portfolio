# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary**: Technical recruiters, engineering hiring managers, Staff/Principal Engineers, and VP/CTOs at high-growth tech companies and enterprise engineering orgs.
- **Situation**: Evaluating candidates for Fullstack Engineer, Tech Lead, Distributed Systems, and Systems Architect roles under time constraints (typically a 30-to-90 second initial scan, followed by a deeper 5-to-10 minute architectural inspection).
- **Job to be Done**: Verify that Amit Bora has true engineering depth—resilient transactional architectures, cloud microservices, database tuning, practical AI systems, and technical leadership—and establish rapid, low-friction contact.

## Product Purpose

- Showcase 8+ years of production engineering accomplishments through credible, inspectable proof points rather than generic marketing claims.
- Serve as an active demonstration of high-craft frontend and systems integration (responsive layout, dark/light theme wipes, interactive SVG architecture diagrams with keyboard a11y, live telemetry metrics, and an integrated retro command terminal with an AI assistant).
- Convert qualified visitor interest into direct outreach via verified channels (direct mail API, LinkedIn, GitHub).

## Positioning

**Systems proof-over-promises:** While standard developer portfolios are static resumes or generic component libraries, this portfolio operates as a living system dashboard:
- Interactive system diagrams with node inspectability exposing real transactional failure modes, dead-letter queues, and caching decisions.
- Live telemetry metrics grounded in verified outcomes (200+ TPS throughput, 40% latency reduction, 14 hrs/week automation savings).
- An embedded AI systems terminal console capable of answering technical architecture questions both via live LLM inference and offline local knowledge-base lookups.
- Verified manager endorsements with photographic social proof from engineering leadership.

## Operating Context

- **Evaluation Workflows**: Fast recruiter scanning across mobile or desktop; in-depth hiring manager technical review on 1440p+ monitors during interview loops.
- **Technical Standards**: Production-grade React 19 SPA running on Vite with Tailwind CSS v4, non-blocking font preloads, zero linter warnings, zero cumulative layout shift (CLS), and keyboard accessibility compliance.
- **Environments**: Hosted on Vercel with serverless Node.js backend endpoints for email dispatch (`/api/contact`) and AI chat inference (`/api/chat`).

## Capabilities and Constraints

- **Client Runtime**: React 19, Vite 8, Tailwind CSS v4 (`@tailwindcss/vite`), Framer Motion, Lucide React, React Hook Form, Zod.
- **Backend / API**: Vercel Serverless Functions + Express fallback (`api/contact.js`, `api/chat.js`), Nodemailer for SMTP delivery with mock fallback, Gemini/OpenAI API integrations.
- **Constraints**:
  - Zero external bloat: Keep vendor chunks partitioned via manual code-splitting (`react-core`, `form-validation`).
  - Zero layout shift: Defer off-screen sections using progressive Suspense fallbacks.
  - Authentic data integrity: Do not invent metrics, past roles, or fabricated client projects.

## Brand Commitments

- **Tone & Identity**: Pragmatic, calm, technically authoritative, and meticulously crafted. "Complexity is the enemy of reliability."
- **Visual Aesthetic**: Technical engineering dashboard aesthetic—warm parchment (`#ede8df`) in light mode for editorial clarity, deep obsidian slate (`#040a15` / `#020617`) in dark mode with teal/amber telemetry accents, technical grid lines, and crisp monospace details.
- **Typography**: Inter (body / telemetry readouts), Outfit (display headings), and monospace for systems data and terminal logs.

## Evidence on Hand

- **Case Studies**: 6 fully documented production systems in `src/data/portfolioData.js` (Spire Payments, Azure Microservices, GenAI Customer Support, CCFIS Inventory RBAC, Moodle LMS Scaling, and Enterprise Predictive AI Analytics).
- **Accolades & Endorsements**:
  - Successive Digital Quarterly Star Performer (Q3 2024), Outstanding Performance (Q2 2024), Special Recognition (Q4 2023) certificates located in `public/achievements/`.
  - 3 verified recommendations with photos: Prawal Sharma (Technology Manager), Himanshu Gupta (Security & Compliance Specialist), and Himanshu Gola (Associate Engineer) located in `public/recommendation/`.
- **Certifications & Papers**: Credly-verified credentials (Google Cloud CTS AI, MongoDB + AWS AI Apps, AWS Certified Dev, MongoDB Dev, Scrum CAL-E) and 3 published IEEE conference papers.

## Product Principles

1. **Proof Over Claims**: Every metric, architectural diagram, and case study must reflect verifiable engineering outcomes.
2. **Respect the Reader's Time**: Information must be scan-first for recruiters, yet deep and inspectable for principal architects.
3. **The Medium is the Message**: The site itself must uphold high systems standards—flawless performance, responsive fluidity, dark/light coherence, and zero unhandled errors.
4. **Resilience & Graceful Degradation**: Interactive components (terminal, contact form, AI bot) must degrade gracefully offline or when third-party APIs lack credentials.

## Accessibility & Inclusion

- Keyboard navigability across all interactive system diagram nodes (`tabIndex={0}`, focus rings, ARIA tooltips).
- Full contrast compliance across both light parchment and dark obsidian themes.
- Support for `prefers-reduced-motion` across CSS transitions and Framer Motion spring physics.
- Responsive design functioning seamlessly across mobile smartphones (360px+), tablets, and widescreen desktop displays.
