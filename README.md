# Amit Bora — Premium Portfolio Website & Mail API

A production-grade personal portfolio website for **Amit Bora (Senior Backend Engineer)** built using a modern, fast tech stack. It features a responsive React client styled with **Tailwind CSS v4** and animated with **Framer Motion**, backed by a secure **Node.js/Express** contact form endpoint.

---

## 🛠️ Tech Stack

### Frontend Client
- **Framework**: [React.js](https://react.dev/) + [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (using the `@tailwindcss/vite` compiler)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Form validation**: [Zod](https://zod.dev/) + [React Hook Form](https://react-hook-form.com/)

### Contact Backend API
- **Framework**: [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
- **Security**: [Helmet](https://helmetjs.github.io/) (security headers) + [CORS](https://github.com/expressjs/cors)
- **Spam Protection**: [Express Rate Limit](https://github.com/express-rate-limit/express-rate-limit)
- **Email Delivery**: [Nodemailer](https://nodemailer.com/) (supporting SMTP with a fallback debug mock mode)
- **Data Validation**: [Zod](https://zod.dev/) (parsing and HTML sanitization)

---

## 📁 Project Structure

```text
amit-portfolio/
├── package.json         # Combined project manifests (Frontend/Backend scripts)
├── vite.config.js       # Vite configuration with Tailwind plugin & API proxy
├── index.html           # Main entry document (SEO meta tags, Google Fonts)
├── .env.example         # Template for required environment variables
├── src/                 # React Application Code
│   ├── main.jsx         # App mounting point
│   ├── index.css        # Tailwind directives, theme variables (@theme), and global scrollbars
│   ├── App.jsx          # Root component rendering all sections
│   ├── data/
│   │   └── portfolioData.js # Source of truth for portfolio contents & metrics
│   ├── components/
│   │   ├── Navigation.jsx   # Sticky header with responsive burger menu & theme toggles
│   │   ├── ThemeToggle.jsx  # Dark/light mode switcher with localStorage persistence
│   │   ├── TrustCard.jsx    # Hero section credential badges
│   │   ├── ProjectCard.jsx  # Interactive case study card with CSS system diagrams & expandable notes
│   │   └── AnimatedGrid.jsx # Technical SVG-based background mesh grid animation
│   └── sections/
│       ├── Hero.jsx         # Large positioning statement and primary CTAs
│       ├── About.jsx        # Professional narrative and "What I Focus On" grid
│       ├── ImpactMetrics.jsx# Tasfetul metrics grid showing optimized outcomes
│       ├── Experience.jsx   # Progression timeline showcasing Successive career growth
│       ├── Projects.jsx     # Lists featured project case studies
│       ├── Skills.jsx       # Grid categorized developer capabilities tag matrix
│       ├── Credentials.jsx  # Two-column grid for AWS/MongoDB certs and IEEE research papers
│       └── Contact.jsx      # Outreach form with Zod schema validation & API integration
└── server/              # Express API Server Code
    ├── index.js         # Core server setups (CORS, Helmet, Rate Limits, Routing)
    ├── routes/
    │   └── contact.js   # POST /api/contact router and SMTP trigger
    ├── middleware/
    │   └── validate.js  # Zod validation schema and HTML input sanitization rules
    └── utils/
        └── mailer.js    # Nodemailer transport configs (supporting SMTP credentials)
```

---

## 🚀 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18.x or higher)
- [npm](https://www.npmjs.com/) (v9.x or higher)

### 2. Installation
Clone the repository and install the dependencies from the root directory:
```bash
npm install
```

### 3. Environment Variables Configuration
Duplicate the `.env.example` file to `.env`:
```bash
cp .env.example .env
```
Open `.env` and fill out your SMTP mail configurations:
```ini
# Application Configurations
PORT=5000
FRONTEND_URL=http://localhost:5173

# SMTP Server Credentials (e.g., Resend, Gmail App Password, Mailgun, SendGrid)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-authorized-smtp-email@gmail.com
SMTP_PASS=your-smtp-api-token-or-app-password

# Contact Form Target Receiver
CONTACT_RECEIVER=amitbora007@gmail.com
```

> [!NOTE]
> **Local Mock Mode**: If `SMTP_HOST`, `SMTP_USER`, or `SMTP_PASS` are left empty, the server will fall back to **Mock Mail Mode**. Submissions will process successfully (HTTP 250) and output the structured message details directly to the server terminal output for easy debugging without SMTP setup.

---

## 🏃 Running the Application

### Development Mode (Concurrent)
To test both the React frontend (with hot-reloading) and the Express backend (with nodemon auto-restart) locally, open two terminals and run:

**Terminal 1 (Backend API):**
```bash
npm run server:dev
```
*Launches API server on `http://localhost:5000`.*

**Terminal 2 (Frontend Client):**
```bash
npm run dev
```
*Launches development client on `http://localhost:5173` (requests to `/api/...` are proxied to the backend).*

---

## 🛡️ API Endpoints

### `POST /api/contact`
Submits a contact form message.

**Rate Limit**: 5 requests per 15 minutes per IP address.

**Request Payload:**
```json
{
  "name": "Jane Doe",
  "email": "jane@company.com",
  "subject": "System Optimization Project",
  "message": "We need help migrating our legacy PHP APIs to serverless Azure Functions..."
}
```

**Zod Validation Constraints:**
- `name`: Must be between 2 and 100 characters.
- `email`: Must be a valid email string.
- `subject`: Must be between 3 and 150 characters.
- `message`: Must be between 10 and 2000 characters.
*(Input fields are automatically sanitized of HTML tags to prevent XSS).*

**Response Payloads:**

- **Success (SMTP Delivered - 200 OK):**
  ```json
  {
    "success": true,
    "message": "Your message has been sent successfully."
  }
  ```

- **Success (Mock Mail Mode - 250 OK):**
  ```json
  {
    "success": true,
    "message": "Message processed locally in debug/mock mode.",
    "warning": "Mail not delivered via SMTP (missing credentials)."
  }
  ```

- **Bad Request / Validation Failure (400):**
  ```json
  {
    "success": false,
    "error": "Validation failed.",
    "details": {
      "email": "Please enter a valid email address."
    }
  }
  ```

- **Rate Limit Triggered (429):**
  ```json
  {
    "success": false,
    "error": "Too many contact requests from this IP. Please try again after 15 minutes."
  }
  ```
