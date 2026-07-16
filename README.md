# Amit Bora — Systems Engineering Portfolio & Contact API

A high-fidelity, production-grade personal portfolio website showcasing **Amit Bora (Senior Backend/Systems Engineer)**. The project features a responsive React SPA styled with **Tailwind CSS v4** and animated with **Framer Motion**, backed by a secure **Vercel Serverless / Express** mail delivery API.

---

## 🛠️ Tech Stack & Architecture

### Frontend Client
* **Framework**: [React.js](https://react.dev/) (v19.x) + [Vite](https://vite.dev/) (v8.x)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (using the `@tailwindcss/vite` compiler)
* **Animations**: [Framer Motion](https://www.framer.com/motion/) (optimized via code-splitting)
* **Icons**: [Lucide React](https://lucide.dev/) (tree-shaken)
* **Form Logic**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)

### Contact Backend API (Serverless & Express)
* **Serverless Runtime**: [Vercel Serverless Functions](https://vercel.com/docs/functions/serverless-functions) (Node.js runtime)
* **Standalone Server**: [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/) (backup/fallback deployment)
* **Email Template Engine**: [React Email](https://react.email/) (compiles JSX to email layouts)
* **Email Delivery**: [Nodemailer](https://nodemailer.com/) (SMTP with mock testing fallback)
* **Input Sanitization**: HTML tag escape sanitizer

---

## 💎 Premium Features

* **Interactive Project Diagrams**: Each case study contains dynamic SVG system architecture layouts with keyboard-focusable nodes (`tabIndex={0}`) and hover/focus descriptive tooltips.
* **Performance Benchmarks**: Embedded vector charts showing transactional latency improvements, vector cache efficiency, and serverless execution speeds.
* **Diagnostic Console Sandbox**: A retro, draggable, and interactive command console supporting operations like `help`, `ping`, `sysinfo`, `skills`, `projects`, and `pipeline` (simulating machine learning SHAP output). 
  * *Global Shortcut*: Toggle the shell instantly using the backtick (`` ` ``) key or `Ctrl + \`` (disabled inside text input boxes).
  * *Q&A Search Engine*: Features an `ask <q>` query utility that lets users directly query questions about Amit's stack, experience, projects, credentials, education, or contact details, matching them instantly in real-time.
* **Accolades & Endorsements Carousel**: A responsive, 2-column sliding grid containing Amit's star performer accolades and verified manager recommendations (equipped with autosliding and click-to-zoom modal viewers).
* **Compiler Validation Outlets**: The contact form features a live validator that renders input constraints and sanitization results in real-time as mock compiler terminal logs.
* **Ambient Mesh & Telemetry**: Dynamic background mesh grid animations, counts-up on scroll, and telemetry status cards (`● NOMINAL`) with hidden system attributes that reveal on hover.

---

## 📁 Project Structure

```text
amit-portfolio/
├── package.json           # Combined project dependencies & run scripts
├── vite.config.js         # Vite configuration with Tailwind integration & core code-splitting
├── index.html             # HTML entry document (asynchronous Google Fonts preloading)
├── vercel.json            # Vercel deployment, clean URL rewrites, and headers routing
├── api/
│   └── contact.js         # Production Serverless API handler (POST /api/contact)
├── src/                   # React Application Source
│   ├── main.jsx           # App mounting point
│   ├── index.css          # Tailwind imports, custom animations, and theme variables
│   ├── App.jsx            # Core page layout lazy-loading sections below the fold
│   ├── data/
│   │   └── portfolioData.js # Source of truth for career descriptions & certification IDs
│   ├── components/
│   │   ├── Navigation.jsx   # Sticky header with spring scroll progress bar
│   │   ├── ThemeToggle.jsx  # Dark/light selector using View Transitions clip-path sweep
│   │   ├── DiagnosticConsole.jsx # Draggable shell console and keyboard event handlers
│   │   ├── ProjectCard.jsx  # Interactive case study card with a11y focus outline support
│   │   ├── TrustCard.jsx    # Telemetry credentials cards
│   │   └── AnimatedGrid.jsx # Background animated coordinate node grid
│   └── sections/
│       ├── Hero.jsx         # Positioning statements and primary call-to-actions
│       ├── About.jsx        # Narrative profile and operator online indicators
│       ├── ImpactMetrics.jsx# Incrementing production metric counters & sparklines
│       ├── Experience.jsx   # Vertical timeline tracked by scrolling progress indicators
│       ├── Achievements.jsx # Q3 Star Performer sliding award certificate carousel
│       ├── Recommendations.jsx # Side-by-side sliding manager recommendations
│       ├── Skills.jsx       # Category-grouped tags with highlight dependency mappings
│       ├── Credentials.jsx  # Credentials and academic publications links
│       └── Contact.jsx      # Live-validating outreach terminal form
└── server/                # Backup Standalone Express Backend
    ├── index.js           # Core server entry (CORS, Helmet, Rate Limiter)
    ├── routes/
    │   └── contact.js     # Mail dispatch route
    ├── emails/
    │   └── ContactEmail.js # React Email compiled email layout
    └── utils/
        └── mailer.js      # Transporter transport creation helper
```

---

## 🚀 Local Installation & Setup

### 1. Installation
Install core dependencies from the root directory:
```bash
npm install
```

### 2. Configure Environment Variables
Duplicate the `.env.example` file to `.env`:
```bash
cp .env.example .env
```
Fill out your SMTP configuration parameters:
```ini
PORT=5000
FRONTEND_URL=http://localhost:5173

# SMTP Server Configurations
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=authorized-sender@gmail.com
SMTP_PASS=smtp-app-password

# Target Destination
CONTACT_RECEIVER=recipient@company.com
```
*Note: If SMTP credentials are left blank, the API falls back to **Mock Mail Mode**, outputting emails directly to the local dev terminal.*

### 3. Run Development Server
To launch both the Vite client server and the backup Express backend simultaneously, run:

```bash
# Terminal 1: Standalone API Server
npm run server:dev

# Terminal 2: Client Dev Server
npm run dev
```

---

## 🛡️ API Specification

### `POST /api/contact`
Receives and processes contact form submissions.

* **Rate Limit**: 5 requests per 15 minutes per IP.
* **Validation Schema (Zod)**:
  * `name`: 2–100 chars (automatically escapes HTML characters to protect against XSS).
  * `email`: Valid email syntax.
  * `subject`: 3–150 chars.
  * `message`: 10–2000 chars.

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Your message has been sent successfully."
}
```
