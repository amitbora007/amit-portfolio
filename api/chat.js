import * as z from 'zod';

const chatSchema = z.object({
  message: z.string().trim().min(1, 'Message is required').max(1000, 'Message too long'),
  history: z.array(z.object({
    role: z.enum(['user', 'assistant', 'system']),
    content: z.string()
  })).optional().default([])
});

const SYSTEM_PROMPT = `You are the AI Systems Assistant embedded in Amit Bora's portfolio website. Your job is to answer questions from recruiters, hiring managers, and engineers about Amit Bora's career, technical skills, projects/case studies, certifications, and availability professionally, accurately, and thoroughly.

ABOUT AMIT BORA:
- Senior Backend Engineer & Systems Architect with 8+ years of experience building secure, high-throughput backend applications, payment gateways, microservices, and AI-driven platforms.
- Core Stack: PHP (Laravel, Restler), Python (Django, FastAPI, DRF), Node.js (Express), RESTful APIs, Microservices, Event-Driven Systems.
- Cloud & Datastores: AWS (EC2, S3, RDS), Azure Functions, Azure Service Bus, Azure Key Vault, Azure Active Directory, Docker, SQL Server, MySQL, PostgreSQL, Redis Caching, MongoDB Vector DB.
- AI Capabilities: OpenAI APIs, LangGraph Multi-Agent RAG Pipelines, Scikit-learn, OpenCV, SHAP Explainability.

DETAILED CASE STUDIES & PROJECTS (ALWAYS PROVIDE DETAILED BREAKDOWNS WHEN ASKED ABOUT PROJECTS OR CASE STUDIES):

1. Enterprise AI Analytics — Operational Intelligence
   - Context: Collaborative machine learning model preventing data pipeline failures before execution.
   - Stack: Python, Scikit-learn, SHAP (Explainable AI), PostgreSQL, FastAPI.
   - What Amit Built: Co-trained a Predictive model on historical execution patterns for the project. Integrated a SHAP explainability layer to output diagnostic logs and risk warnings during pipeline creation.
   - Metrics/Impact: Flags 92% of preventable configuration and scheduling failures before first run.
   - Architecture Notes: Structured FastAPI routes to serve predictions. Built a feature-store pipeline in PostgreSQL to aggregate execution signals. Used SHAP to compile diagnostic logs, converting model coefficients into actionable configuration tips.

2. Spire Payment Processing System
   - Context: Secure EFT and ACH payment platform processing high-volume transactions.
   - Stack: PHP, Laravel, Redis, SQL Server, Azure AD.
   - What Amit Built: Designed secure transactional REST APIs with Redis caching layers and SQL Server backend. Integrated tokenized Azure AD authentication for enterprise clients.
   - Metrics/Impact: Reduced latency by 40% and achieved a processing throughput of 200+ TPS.
   - Architecture Notes: Leveraged Redis for transactional idempotency checks and caching of active merchant sessions, reducing load on SQL Server. Utilized connection pooling and query splitting to maintain ACID compliance under high load.

3. Microservices Based Payment Processing Integration
   - Context: Re-architecturing and implementing microservices connecting main platform and third-party systems.
   - Stack: Azure Functions, Azure Service Bus, Azure Key Vault, Application Insights.
   - What Amit Built: Architected a queue-based asynchronous integration using Azure Functions and Service Bus. Safeguarded credentials with Azure Key Vault and added trace telemetry.
   - Metrics/Impact: Reduced operational overhead by 14 hours/week and improved MTTR by 40%.
   - Architecture Notes: Implemented dead-letter queues on Azure Service Bus to gracefully handle integration failures, trigger alert notifications, and support message replay mechanisms once systems recover.

4. GenAI Based Customer Support System
   - Context: Intelligent support platform automating ticket resolution and workflows.
   - Stack: Python, OpenAI APIs, LangGraph, MongoDB Vector DB.
   - What Amit Built: Developed multi-agent retrieval-augmented generation (RAG) graphs using LangGraph. Built a vector-search database using MongoDB for caching semantic query matches.
   - Metrics/Impact: Automated 70%+ of customer support queries and reduced average response time by 10 minutes.
   - Architecture Notes: Designed agent pathways with state persistence so multi-turn conversations maintain context. Built semantic search checks on input prompts to immediately serve cached historical responses, preserving API tokens.

5. Inventory Management System
   - Context: Role-based control panel and reporting dashboard for hardware audits.
   - Stack: Python, Django, Django REST Framework, MySQL.
   - What Amit Built: Developed a secure role-based dashboard for hardware inventory audits, license tracking, and automated procurement flags.
   - Metrics/Impact: Reduced manual logging effort by 40% and improved inventory reporting accuracy by 80%.
   - Architecture Notes: Constructed custom middleware to intercept queries and enforce field-level data permissions based on active security clearance levels.

6. Learning Management System (Moodle LMS)
   - Context: Enterprise training platform for scaling student education.
   - Stack: Moodle, PHP, Azure AD, MySQL.
   - What Amit Built: Integrated Moodle core system with enterprise Azure AD authentication, optimizing session caching and asset loading for huge scale.
   - Metrics/Impact: Supported 200K concurrent learners, reduced login/access tickets by 50%, and boosted completion rates by 40%.
   - Architecture Notes: Optimized high-traffic login routes by offloading session validation to Azure AD token verification on the client, minimizing backend database reads during concurrent usage spikes.

WORK EXPERIENCE:
- Successive Digital (Jan 2021 - Present): Specialist Engineer (Aug 2023 - Present), Senior Associate Engineer (Jun 2021 - Aug 2023), Associate Engineer (Jan 2021 - Jun 2021).
- Cyborg Cyber Forensics and Information Security / CCFIS (Feb 2019 - Dec 2020): Analyst.
- cppsecrets.com (Dec 2018 - Jan 2019): Python Intern.

CERTIFICATIONS & EDUCATION:
- Google Cloud CTS AI in Action (2026), MongoDB + AWS AI Apps (2025), AWS Certified Associate Developer (2023), MongoDB Certified Associate Dev (2023), Scrum Alliance CAL-E (2023), IBM ML with Python (2023).
- Master of Technology (M.Tech) in CSE, Amity University (2017 - 2019).
- Bachelor of Technology (B.Tech) in CSE, Echelon Institute / MDU (2012 - 2016).
- 3 IEEE Conference publications on image spoof detection (Meta-BRISQUE), saliency detection (EMD), and video summarization.

CONTACT & RECOMMENDATIONS:
- Endorsed by Technology Manager Prawal Sharma, Security Specialist Himanshu Gupta, and Associate Engineer Himanshu Gola.
- Email: amitbora007@gmail.com | LinkedIn: linkedin.com/in/amitbora007 | GitHub: github.com/amitbora007

RESPONSE INSTRUCTIONS:
- Whenever the user asks about "case studies", "projects", or specific architecture questions, provide detailed explanations including what was built, the stack, key metrics/impact, and architecture notes.`;

// In-memory rate limiter per IP (10 requests per 15 minutes)
const ipHits = new Map();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_HITS = 10;

function isRateLimited(ip) {
  const now = Date.now();
  const entry = ipHits.get(ip);
  if (!entry || now - entry.start > WINDOW_MS) {
    ipHits.set(ip, { count: 1, start: now });
    return false;
  }
  if (entry.count >= MAX_HITS) return true;
  entry.count++;
  return false;
}

export default async function handler(req, res) {
  // 1. CORS Headers
  const allowedOrigins = [
    process.env.FRONTEND_URL,
    'http://localhost:5173',
  ].filter(Boolean);

  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method Not Allowed' });

  // 2. Rate Limiting
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({
      success: false,
      error: 'Rate limit exceeded. Please wait a few minutes before sending more messages.'
    });
  }

  // 3. Validation
  let parsed;
  try {
    parsed = chatSchema.parse(req.body);
  } catch {
    return res.status(400).json({ success: false, error: 'Invalid message request.' });
  }

  const { message, history } = parsed;
  const { GEMINI_API_KEY, OPENAI_API_KEY } = process.env;

  // 4. Try Google Gemini API
  if (GEMINI_API_KEY) {
    try {
      const contents = [];

      if (Array.isArray(history)) {
        history.forEach(h => {
          if (h.role === 'user' || h.role === 'assistant') {
            contents.push({
              role: h.role === 'assistant' ? 'model' : 'user',
              parts: [{ text: h.content }]
            });
          }
        });
      }

      contents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      const geminiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: SYSTEM_PROMPT }]
            },
            contents,
            generationConfig: {
              temperature: 0.4,
              maxOutputTokens: 600
            }
          })
        }
      );

      if (geminiRes.ok) {
        const data = await geminiRes.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (reply) {
          return res.status(200).json({ success: true, reply, provider: 'gemini' });
        }
      }
    } catch (err) {
      console.error('Gemini API Error:', err.message);
    }
  }

  // 5. Try OpenAI API
  if (OPENAI_API_KEY) {
    try {
      const messages = [{ role: 'system', content: SYSTEM_PROMPT }];

      if (Array.isArray(history)) {
        history.forEach(h => {
          if (h.role === 'user' || h.role === 'assistant') {
            messages.push({ role: h.role, content: h.content });
          }
        });
      }

      messages.push({ role: 'user', content: message });

      const openAiRes = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages,
          temperature: 0.4,
          max_tokens: 600
        })
      });

      if (openAiRes.ok) {
        const data = await openAiRes.json();
        const reply = data.choices?.[0]?.message?.content;
        if (reply) {
          return res.status(200).json({ success: true, reply, provider: 'openai' });
        }
      }
    } catch (err) {
      console.error('OpenAI API Error:', err.message);
    }
  }

  // 6. Fallback Rule-Based Response Generator (If no API keys configured)
  const reply = generateFallbackReply(message);
  return res.status(200).json({ success: true, reply, provider: 'local-kb' });
}

function generateFallbackReply(msg) {
  const m = msg.toLowerCase();

  // Specific Project Queries
  if (m.includes('spire') || (m.includes('payment') && !m.includes('azure'))) {
    return "📌 Spire Payment Processing System Case Study:\n• Context: High-throughput EFT & ACH payment gateway processing enterprise transactions.\n• Stack: PHP, Laravel, Redis, SQL Server, Azure AD.\n• What Amit Built: REST APIs with Redis session caching and Azure AD token verification.\n• Impact: Reduced transaction latency by 40% with 200+ TPS throughput.\n• Architecture: Redis connection pooling & query splitting for ACID compliance under high concurrency.";
  }

  if (m.includes('azure') || m.includes('microservice') || m.includes('service bus')) {
    return "📌 Azure Microservices Payment Integration Case Study:\n• Context: Async queue-driven integration connecting main platform and banking clearing channels.\n• Stack: Azure Functions, Azure Service Bus, Azure Key Vault, App Insights.\n• What Amit Built: Serverless queue-driven integration with Key Vault secret management.\n• Impact: Reduced operational overhead by 14 hrs/week and MTTR by 40%.\n• Architecture: Dead-letter queue handling for transient failures and automatic replay mechanisms.";
  }

  if (m.includes('genai') || m.includes('chat') || m.includes('support') || m.includes('rag') || m.includes('langgraph')) {
    return "📌 GenAI Customer Support Engine Case Study:\n• Context: Intelligent multi-agent support platform automating ticket resolution.\n• Stack: Python, OpenAI APIs, LangGraph, MongoDB Vector DB.\n• What Amit Built: Multi-agent RAG workflow graphs with MongoDB vector semantic cache.\n• Impact: Automated 70%+ of customer support queries and reduced response time by 10 mins.\n• Architecture: State-persistent graph pathways with semantic prompt caching to save API tokens.";
  }

  if (m.includes('inventory') || m.includes('django') || m.includes('rbac')) {
    return "📌 CCFIS Hardware Inventory Management Case Study:\n• Context: Role-based control panel and reporting dashboard.\n• Stack: Python, Django, DRF, MySQL.\n• What Amit Built: Secure RBAC dashboard for hardware audits, license tracking, and automated procurement flags.\n• Impact: Reduced manual logging by 40% and improved inventory accuracy by 80%.\n• Architecture: Custom query-intercepting middleware enforcing field-level security clearance permissions.";
  }

  if (m.includes('moodle') || m.includes('lms') || m.includes('learning')) {
    return "📌 CCFIS Moodle Learning Management System Case Study:\n• Context: Enterprise training platform scaling student education.\n• Stack: Moodle, PHP, Azure AD, MySQL.\n• What Amit Built: Moodle PHP core integration with Azure AD token SSO.\n• Impact: Supported 200,000 concurrent learners and cut login/access tickets by 50%.\n• Architecture: Offloaded session validation to client Azure AD token verification, drastically cutting database reads.";
  }

  if (m.includes('analytics') || m.includes('pipeline') || m.includes('shap') || m.includes('prediction')) {
    return "📌 Enterprise AI Analytics (Operational Intelligence) Case Study:\n• Context: Machine learning failure predictor for enterprise data pipelines.\n• Stack: Python, Scikit-learn, SHAP, PostgreSQL, FastAPI.\n• What Amit Built: Co-trained ML predictor on historical metadata and built a SHAP explainability layer.\n• Impact: Flags 92% of preventable configuration and scheduling failures before first run.\n• Architecture: FastAPI routes with a PostgreSQL feature store and SHAP diagnostic logs.";
  }

  // General Case Studies & Projects List
  if (m.includes('project') || m.includes('case stud') || m.includes('build') || m.includes('portfolio')) {
    return "🚀 Amit Bora's Featured Engineering Case Studies:\n\n1. Enterprise AI Analytics: Scikit-learn + SHAP model flagging 92% of data pipeline failures.\n2. Spire Payment System: PHP/Laravel + Redis payment gateway (200+ TPS, 40% latency drop).\n3. Azure Microservices Integration: Azure Functions + Service Bus async clearing (saved 14 hrs/week).\n4. GenAI Support Engine: Multi-agent LangGraph RAG system automating 70%+ support queries.\n5. Inventory Management: Django DRF + custom RBAC middleware reducing manual work by 40%.\n6. Moodle LMS: Azure AD SSO integration scaling to 200,000 concurrent learners.\n\n(Ask about any specific project for full architecture details!)";
  }

  if (m.includes('skill') || m.includes('stack') || m.includes('technology') || m.includes('language')) {
    return "Amit's core technical stack includes:\n• Backend: PHP (Laravel, Restler), Python (Django, FastAPI), Node.js (Express)\n• Datastores: SQL Server, MySQL, PostgreSQL, Redis Caching, MongoDB Vector DB\n• Cloud & Infra: AWS (EC2, S3, RDS), Azure Functions, Azure Service Bus, Docker\n• AI: OpenAI APIs, LangGraph multi-agent RAG, Scikit-learn, SHAP";
  }

  if (m.includes('experience') || m.includes('work') || m.includes('company') || m.includes('job') || m.includes('role')) {
    return "Amit has been at Successive Digital since Jan 2021 (currently Specialist Engineer since Aug 2023). Prior to that, he worked at Cyborg Cyber Forensics (CCFIS) from Feb 2019 to Dec 2020 as an Analyst, and at cppsecrets.com in 2018 - 2019.";
  }

  if (m.includes('contact') || m.includes('email') || m.includes('hire') || m.includes('reach') || m.includes('linkedin')) {
    return "You can reach Amit via email at amitbora007@gmail.com or on LinkedIn at linkedin.com/in/amitbora007. You can also use the contact form on this page to send a direct message!";
  }

  if (m.includes('cert') || m.includes('aws') || m.includes('education') || m.includes('degree')) {
    return "Amit holds an M.Tech in CSE from Amity University and a B.Tech in CSE. He is AWS Certified Associate Developer, MongoDB Certified Associate Dev, Google Cloud CTS AI Certified, and Scrum Alliance CAL-E.";
  }

  return "Hello! I am Amit's AI Portfolio Assistant. Ask me about any of Amit's case studies (Spire Payments, Azure Microservices, GenAI RAG Engine, Enterprise AI Analytics, Moodle LMS), tech stack, work experience, or contact channels!";
}
