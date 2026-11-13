import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Layers, CheckCircle2, Cpu, Database, Radio } from 'lucide-react';
import TiltCard from './TiltCard';

const NODE_SPECS = {
  // Spire / Payment Processing
  'spire-api': {
    label: 'CLIENT REST API',
    desc: 'REST endpoints secured via tokenized auth, parsing high-throughput ACH & EFT requests.',
  },
  'spire-redis': {
    label: 'REDIS CACHING & IDEMPOTENCY',
    desc: 'Caches merchant sessions and verifies transactional idempotency keys to eliminate double-charges.',
  },
  'spire-sql': {
    label: 'SQL SERVER ACID LEDGER',
    desc: 'Strictly isolated double-entry ledger database enforcing transactional audit integrity.',
  },

  // Microservices Payment Integration
  'micro-spire': {
    label: 'SPIRE GATEWAY (SOURCE)',
    desc: 'Source transaction platform dispatching asynchronous payment requests.',
  },
  'micro-bus': {
    label: 'AZURE SERVICE BUS & DLQ',
    desc: 'Decoupled message broker absorbing traffic bursts with dead-letter queue recovery.',
  },
  'micro-payliance': {
    label: 'PAYLIANCE (SETTLEMENT TARGET)',
    desc: 'Automated clearing house system executing banking transfers and settlement.',
  },

  // GenAI Customer Support
  'ai-router': {
    label: 'SEMANTIC QUERY ROUTER',
    desc: 'Intercepts incoming customer prompts to return instant matches from the vector cache.',
  },
  'ai-agent': {
    label: 'LANGGRAPH STATEFUL AGENT',
    desc: 'Orchestrates multi-turn customer dialogues via structured routing trees and memory checkpoints.',
  },
  'ai-vector': {
    label: 'MONGODB VECTOR DB (RAG)',
    desc: 'Retrieves contextual grounding embeddings to preserve API tokens and enforce policy accuracy.',
  },
  'ai-parser': {
    label: 'STRUCTURED LLM PARSER',
    desc: 'Validates raw model completions against strict Zod/Pydantic schemas before dispatch.',
  },

  // Inventory Management
  'inv-client': {
    label: 'ADMIN DASHBOARD UI',
    desc: 'Role-based frontend control panel for asset tracking, inventory audits, and procurement flags.',
  },
  'inv-drf': {
    label: 'DRF RBAC MIDDLEWARE',
    desc: 'Django REST Framework custom middleware enforcing role boundaries and row-level query scopes.',
  },
  'inv-mysql': {
    label: 'MYSQL AUDIT DB',
    desc: 'Normalized schema containing asset records, threshold triggers, and immutable audit logs.',
  },

  // Learning Management System
  'lms-client': {
    label: 'LEARNER PORTAL UI',
    desc: 'Enterprise training interface optimized for massive concurrent student session delivery.',
  },
  'lms-sso': {
    label: 'AZURE AD SSO GATEWAY',
    desc: 'Tokenized single sign-on verifying corporate directory credentials on the client edge.',
  },
  'lms-moodle': {
    label: 'MOODLE PHP CORE ENGINE',
    desc: 'Tuned PHP application kernel executing scalable course modules and quiz engines.',
  },
  'lms-db': {
    label: 'MYSQL CLUSTER (200K USERS)',
    desc: 'Clustered database managing session states and course progress under heavy concurrency.',
  },

  // Enterprise AI Analytics
  'ml-config': {
    label: 'OPERATOR CONFIG UI',
    desc: 'Interactive console configuring pipeline parameters, schedules, and diagnostic flags.',
  },
  'ml-xai': {
    label: 'FASTAPI ML & SHAP ENGINE',
    desc: 'Predictive Scikit-learn inference service converting SHAP coefficients into actionable warnings.',
  },
  'ml-db': {
    label: 'POSTGRESQL FEATURE STORE',
    desc: 'Database aggregating historical run metrics, failure signatures, and model baseline telemetry.',
  },

  // Default fallback
  'default-client': {
    label: 'CLIENT APPLICATION',
    desc: 'Frontend web application consuming secure REST and GraphQL service endpoints.',
  },
  'default-db': {
    label: 'RELATIONAL DATA STORE',
    desc: 'ACID-compliant storage engine with optimized indices and automated backup replication.',
  },
};

export default function ProjectCard({ project, index }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredNode, setHoveredNode] = useState(null);

  const activeNodeInfo = hoveredNode ? NODE_SPECS[hoveredNode] : null;

  // Render responsive, full-bleed interactive system architecture diagram
  const renderSystemVisual = (title) => {
    let archTag;
    let diagramContent;


    if (title.includes('Spire — Payment') || title.includes('Payment Processing')) {
      archTag = 'SYS_ARCH: EFT/ACH TRANSACTION GATEWAY';
      diagramContent = (
        <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-5 text-xs font-mono text-slate-300 w-full max-w-lg">
          {/* Client API Node */}
          <div
            className="relative cursor-pointer focus:outline-none group"
            tabIndex={0}
            onMouseEnter={() => setHoveredNode('spire-api')}
            onFocus={() => setHoveredNode('spire-api')}
            onMouseLeave={() => setHoveredNode(null)}
            onBlur={() => setHoveredNode(null)}
            onTouchStart={() => setHoveredNode('spire-api')}
          >
            <div className={`px-2.5 py-2 border bg-slate-900/90 flex flex-col items-center transition-all duration-200 ${
              hoveredNode === 'spire-api' ? 'border-teal-400 ring-2 ring-teal-500/40' : 'border-slate-800 hover:border-teal-500/60'
            }`}>
              <span className="font-semibold text-slate-200 text-xs">Client API</span>
              <span className="text-xs text-teal-400 font-bold">REST / Auth</span>
            </div>
          </div>

          {/* Flow Connector */}
          <div className="h-[2px] w-6 sm:w-10 bg-slate-800 flex items-center justify-center shrink-0">
            <div className="w-1 h-1 rounded-full bg-teal-500/50" />
          </div>

          {/* Redis Cache Node */}
          <div
            className="relative cursor-pointer focus:outline-none group"
            tabIndex={0}
            onMouseEnter={() => setHoveredNode('spire-redis')}
            onFocus={() => setHoveredNode('spire-redis')}
            onMouseLeave={() => setHoveredNode(null)}
            onBlur={() => setHoveredNode(null)}
            onTouchStart={() => setHoveredNode('spire-redis')}
          >
            <div className={`px-3 py-2 border bg-slate-900/90 flex flex-col items-center transition-all duration-200 relative ${
              hoveredNode === 'spire-redis' ? 'border-teal-400 bg-slate-900' : 'border-teal-500/80 hover:border-teal-400'
            }`}>
              <span className="font-bold text-teal-300 text-xs">Redis Cache</span>
              <span className="text-xs text-slate-400">Idempotency Key</span>
            </div>
          </div>

          {/* Flow Connector */}
          <div className="h-[2px] w-6 sm:w-10 bg-slate-800 flex items-center justify-center shrink-0">
            <div className="w-1 h-1 rounded-full bg-teal-500/50" />
          </div>

          {/* SQL Server Node */}
          <div
            className="relative cursor-pointer focus:outline-none group"
            tabIndex={0}
            onMouseEnter={() => setHoveredNode('spire-sql')}
            onFocus={() => setHoveredNode('spire-sql')}
            onMouseLeave={() => setHoveredNode(null)}
            onBlur={() => setHoveredNode(null)}
            onTouchStart={() => setHoveredNode('spire-sql')}
          >
            <div className={`px-2.5 py-2 border bg-slate-900/90 flex flex-col items-center transition-all duration-200 ${
              hoveredNode === 'spire-sql' ? 'border-teal-400 ring-2 ring-teal-500/40' : 'border-slate-800 hover:border-teal-500/60'
            }`}>
              <span className="font-semibold text-slate-200 text-xs">SQL Server</span>
              <span className="text-xs text-slate-400 font-bold">ACID Ledger</span>
            </div>
          </div>
        </div>
      );
    } else if (title.includes('Microservices Payment') || title.includes('Microservices Based')) {
      archTag = 'SYS_ARCH: ASYNC QUEUE & DLQ PIPELINE';
      diagramContent = (
        <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-5 text-xs font-mono text-slate-300 w-full max-w-lg">
          {/* Spire Source Node */}
          <div
            className="relative cursor-pointer focus:outline-none group"
            tabIndex={0}
            onMouseEnter={() => setHoveredNode('micro-spire')}
            onFocus={() => setHoveredNode('micro-spire')}
            onMouseLeave={() => setHoveredNode(null)}
            onBlur={() => setHoveredNode(null)}
            onTouchStart={() => setHoveredNode('micro-spire')}
          >
            <div className={`px-2.5 py-2 border bg-slate-900/90 flex flex-col items-center transition-all duration-200 ${
              hoveredNode === 'micro-spire' ? 'border-teal-400 ring-2 ring-teal-500/40' : 'border-slate-800 hover:border-teal-500/60'
            }`}>
              <span className="font-semibold text-slate-200 text-xs">Spire Core</span>
              <span className="text-xs text-teal-400 font-bold">Source Gateway</span>
            </div>
          </div>

          {/* Flow Connector */}
          <div className="h-[2px] w-6 sm:w-10 bg-slate-800 flex items-center justify-center shrink-0">
            <div className="w-1 h-1 rounded-full bg-teal-500/50" />
          </div>

          {/* Azure Service Bus Queue Node */}
          <div
            className="relative cursor-pointer focus:outline-none group"
            tabIndex={0}
            onMouseEnter={() => setHoveredNode('micro-bus')}
            onFocus={() => setHoveredNode('micro-bus')}
            onMouseLeave={() => setHoveredNode(null)}
            onBlur={() => setHoveredNode(null)}
            onTouchStart={() => setHoveredNode('micro-bus')}
          >
            <div className={`px-3 py-2 border bg-slate-900/90 flex flex-col items-center transition-all duration-200 relative ${
              hoveredNode === 'micro-bus' ? 'border-teal-400 bg-slate-900' : 'border-teal-500/80 hover:border-teal-400'
            }`}>
              <span className="font-bold text-teal-300 text-xs">Service Bus</span>
              <span className="text-xs text-slate-400">Queue + DLQ Buffer</span>
            </div>
          </div>

          {/* Flow Connector */}
          <div className="h-[2px] w-6 sm:w-10 bg-slate-800 flex items-center justify-center shrink-0">
            <div className="w-1 h-1 rounded-full bg-teal-500/50" />
          </div>

          {/* Payliance Settlement Node */}
          <div
            className="relative cursor-pointer focus:outline-none group"
            tabIndex={0}
            onMouseEnter={() => setHoveredNode('micro-payliance')}
            onFocus={() => setHoveredNode('micro-payliance')}
            onMouseLeave={() => setHoveredNode(null)}
            onBlur={() => setHoveredNode(null)}
            onTouchStart={() => setHoveredNode('micro-payliance')}
          >
            <div className={`px-2.5 py-2 border bg-slate-900/90 flex flex-col items-center transition-all duration-200 ${
              hoveredNode === 'micro-payliance' ? 'border-teal-400 ring-2 ring-teal-500/40' : 'border-slate-800 hover:border-teal-500/60'
            }`}>
              <span className="font-semibold text-slate-200 text-xs">Payliance</span>
              <span className="text-xs text-slate-400 font-bold">ACH Clearing</span>
            </div>
          </div>
        </div>
      );
    } else if (title.includes('GenAI Customer') || title.includes('GenAI Based')) {
      archTag = 'SYS_ARCH: MULTI-AGENT STATE GRAPH & RAG';
      diagramContent = (
        <div className="flex items-center justify-center gap-1.5 sm:gap-3 md:gap-4 text-xs font-mono text-slate-300 w-full max-w-xl">
          {/* Query Router */}
          <div
            className="relative cursor-pointer focus:outline-none group shrink-0"
            tabIndex={0}
            onMouseEnter={() => setHoveredNode('ai-router')}
            onFocus={() => setHoveredNode('ai-router')}
            onMouseLeave={() => setHoveredNode(null)}
            onBlur={() => setHoveredNode(null)}
            onTouchStart={() => setHoveredNode('ai-router')}
          >
            <div className={`px-2 py-1.5 border bg-slate-900/90 flex flex-col items-center transition-all duration-200 ${
              hoveredNode === 'ai-router' ? 'border-teal-400 ring-2 ring-teal-500/40' : 'border-slate-800 hover:border-teal-500/60'
            }`}>
              <span className="font-semibold text-slate-200 text-xs">Query Router</span>
              <span className="text-xs text-teal-400 font-bold">Semantic Cache</span>
            </div>
          </div>

          <div className="h-[2px] w-4 sm:w-6 bg-slate-800 flex items-center justify-center shrink-0">
            <div className="w-1 h-1 rounded-full bg-teal-500/50" />
          </div>

          {/* LangGraph Agent & Vector DB Column */}
          <div className="flex flex-col gap-2 items-center shrink-0">
            <div
              className="relative cursor-pointer focus:outline-none group"
              tabIndex={0}
              onMouseEnter={() => setHoveredNode('ai-agent')}
              onFocus={() => setHoveredNode('ai-agent')}
              onMouseLeave={() => setHoveredNode(null)}
              onBlur={() => setHoveredNode(null)}
              onTouchStart={() => setHoveredNode('ai-agent')}
            >
              <div className={`px-2.5 py-1.5 border bg-slate-900/90 flex flex-col items-center transition-all duration-200 ${
                hoveredNode === 'ai-agent' ? 'border-teal-400 bg-slate-900' : 'border-teal-500/80 hover:border-teal-400'
              }`}>
                <span className="font-bold text-teal-300 text-xs">LangGraph Agent</span>
                <span className="text-xs text-slate-400">State Persistence</span>
              </div>
            </div>

            <div className="h-2 w-[2px] bg-slate-800 flex items-center justify-center shrink-0">
              <div className="w-1 h-1 rounded-full bg-teal-500/50" />
            </div>

            <div
              className="relative cursor-pointer focus:outline-none group"
              tabIndex={0}
              onMouseEnter={() => setHoveredNode('ai-vector')}
              onFocus={() => setHoveredNode('ai-vector')}
              onMouseLeave={() => setHoveredNode(null)}
              onBlur={() => setHoveredNode(null)}
              onTouchStart={() => setHoveredNode('ai-vector')}
            >
              <div className={`px-2 py-1 border bg-slate-900/90 flex flex-col items-center transition-all duration-200 ${
                hoveredNode === 'ai-vector' ? 'border-teal-400 ring-2 ring-teal-500/40' : 'border-slate-800 hover:border-teal-500/60'
              }`}>
                <span className="text-xs text-slate-300">Vector DB (RAG)</span>
                <span className="text-xs text-slate-400">MongoDB Embeddings</span>
              </div>
            </div>
          </div>

          <div className="h-[2px] w-4 sm:w-6 bg-slate-800 flex items-center justify-center shrink-0">
            <div className="w-1 h-1 rounded-full bg-teal-500/50" />
          </div>

          {/* LLM Parser Node */}
          <div
            className="relative cursor-pointer focus:outline-none group shrink-0"
            tabIndex={0}
            onMouseEnter={() => setHoveredNode('ai-parser')}
            onFocus={() => setHoveredNode('ai-parser')}
            onMouseLeave={() => setHoveredNode(null)}
            onBlur={() => setHoveredNode(null)}
            onTouchStart={() => setHoveredNode('ai-parser')}
          >
            <div className={`px-2 py-1.5 border bg-slate-900/90 flex flex-col items-center transition-all duration-200 ${
              hoveredNode === 'ai-parser' ? 'border-teal-400 ring-2 ring-teal-500/40' : 'border-slate-800 hover:border-teal-500/60'
            }`}>
              <span className="font-semibold text-slate-200 text-xs">LLM Parser</span>
              <span className="text-xs text-teal-400 font-bold">Schema Validated</span>
            </div>
          </div>
        </div>
      );
    } else if (title.includes('Inventory Management')) {
      archTag = 'SYS_ARCH: SECURE ROLE-BASED INVENTORY API';
      diagramContent = (
        <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-5 text-xs font-mono text-slate-300 w-full max-w-lg">
          {/* Admin UI Node */}
          <div
            className="relative cursor-pointer focus:outline-none group"
            tabIndex={0}
            onMouseEnter={() => setHoveredNode('inv-client')}
            onFocus={() => setHoveredNode('inv-client')}
            onMouseLeave={() => setHoveredNode(null)}
            onBlur={() => setHoveredNode(null)}
            onTouchStart={() => setHoveredNode('inv-client')}
          >
            <div className={`px-2.5 py-2 border bg-slate-900/90 flex flex-col items-center transition-all duration-200 ${
              hoveredNode === 'inv-client' ? 'border-teal-400 ring-2 ring-teal-500/40' : 'border-slate-800 hover:border-teal-500/60'
            }`}>
              <span className="font-semibold text-slate-200 text-xs">Admin UI</span>
              <span className="text-xs text-teal-400 font-bold">Inventory Control</span>
            </div>
          </div>

          {/* Flow Connector */}
          <div className="h-[2px] w-6 sm:w-10 bg-slate-800 flex items-center justify-center shrink-0">
            <div className="w-1 h-1 rounded-full bg-teal-500/50" />
          </div>

          {/* DRF Guard Node */}
          <div
            className="relative cursor-pointer focus:outline-none group"
            tabIndex={0}
            onMouseEnter={() => setHoveredNode('inv-drf')}
            onFocus={() => setHoveredNode('inv-drf')}
            onMouseLeave={() => setHoveredNode(null)}
            onBlur={() => setHoveredNode(null)}
            onTouchStart={() => setHoveredNode('inv-drf')}
          >
            <div className={`px-3 py-2 border bg-slate-900/90 flex flex-col items-center transition-all duration-200 relative ${
              hoveredNode === 'inv-drf' ? 'border-teal-400 bg-slate-900' : 'border-teal-500/80 hover:border-teal-400'
            }`}>
              <span className="font-bold text-teal-300 text-xs">DRF Guard</span>
              <span className="text-xs text-slate-400">Custom RBAC Scope</span>
            </div>
          </div>

          {/* Flow Connector */}
          <div className="h-[2px] w-6 sm:w-10 bg-slate-800 flex items-center justify-center shrink-0">
            <div className="w-1 h-1 rounded-full bg-teal-500/50" />
          </div>

          {/* MySQL DB Node */}
          <div
            className="relative cursor-pointer focus:outline-none group"
            tabIndex={0}
            onMouseEnter={() => setHoveredNode('inv-mysql')}
            onFocus={() => setHoveredNode('inv-mysql')}
            onMouseLeave={() => setHoveredNode(null)}
            onBlur={() => setHoveredNode(null)}
            onTouchStart={() => setHoveredNode('inv-mysql')}
          >
            <div className={`px-2.5 py-2 border bg-slate-900/90 flex flex-col items-center transition-all duration-200 ${
              hoveredNode === 'inv-mysql' ? 'border-teal-400 ring-2 ring-teal-500/40' : 'border-slate-800 hover:border-teal-500/60'
            }`}>
              <span className="font-semibold text-slate-200 text-xs">MySQL DB</span>
              <span className="text-xs text-slate-400 font-bold">Audit Triggers</span>
            </div>
          </div>
        </div>
      );
    } else if (title.includes('Learning Management')) {
      archTag = 'SYS_ARCH: ENTERPRISE SSO LMS PLATFORM';
      diagramContent = (
        <div className="flex items-center justify-center gap-1.5 sm:gap-3 md:gap-4 text-xs font-mono text-slate-300 w-full max-w-xl">
          {/* Learner Portal */}
          <div
            className="relative cursor-pointer focus:outline-none group shrink-0"
            tabIndex={0}
            onMouseEnter={() => setHoveredNode('lms-client')}
            onFocus={() => setHoveredNode('lms-client')}
            onMouseLeave={() => setHoveredNode(null)}
            onBlur={() => setHoveredNode(null)}
            onTouchStart={() => setHoveredNode('lms-client')}
          >
            <div className={`px-2.5 py-2 border bg-slate-900/90 flex flex-col items-center transition-all duration-200 ${
              hoveredNode === 'lms-client' ? 'border-teal-400 ring-2 ring-teal-500/40' : 'border-slate-800 hover:border-teal-500/60'
            }`}>
              <span className="font-semibold text-slate-200 text-xs">Learner Portal</span>
              <span className="text-xs text-teal-400 font-bold">Client Edge</span>
            </div>
          </div>

          <div className="h-[2px] w-4 sm:w-6 bg-slate-800 flex items-center justify-center shrink-0">
            <div className="w-1 h-1 rounded-full bg-teal-500/50" />
          </div>

          {/* Azure AD SSO Node */}
          <div
            className="relative cursor-pointer focus:outline-none group shrink-0"
            tabIndex={0}
            onMouseEnter={() => setHoveredNode('lms-sso')}
            onFocus={() => setHoveredNode('lms-sso')}
            onMouseLeave={() => setHoveredNode(null)}
            onBlur={() => setHoveredNode(null)}
            onTouchStart={() => setHoveredNode('lms-sso')}
          >
            <div className={`px-2.5 py-2 border bg-slate-900/90 flex flex-col items-center transition-all duration-200 ${
              hoveredNode === 'lms-sso' ? 'border-teal-400 bg-slate-900' : 'border-teal-500/80 hover:border-teal-400'
            }`}>
              <span className="font-bold text-teal-300 text-xs">Azure AD SSO</span>
              <span className="text-xs text-slate-400">OAuth / Claims</span>
            </div>
          </div>

          <div className="h-[2px] w-4 sm:w-6 bg-slate-800 flex items-center justify-center shrink-0">
            <div className="w-1 h-1 rounded-full bg-teal-500/50" />
          </div>

          {/* Moodle Core Node */}
          <div
            className="relative cursor-pointer focus:outline-none group shrink-0"
            tabIndex={0}
            onMouseEnter={() => setHoveredNode('lms-moodle')}
            onFocus={() => setHoveredNode('lms-moodle')}
            onMouseLeave={() => setHoveredNode(null)}
            onBlur={() => setHoveredNode(null)}
            onTouchStart={() => setHoveredNode('lms-moodle')}
          >
            <div className={`px-2 py-1.5 border bg-slate-900/90 flex flex-col items-center transition-all duration-200 ${
              hoveredNode === 'lms-moodle' ? 'border-teal-400 ring-2 ring-teal-500/40' : 'border-slate-800 hover:border-teal-500/60'
            }`}>
              <span className="font-semibold text-slate-200 text-xs">Moodle Core</span>
              <span className="text-xs text-slate-400 font-bold">PHP Kernel</span>
            </div>
          </div>

          <div className="h-[2px] w-4 sm:w-6 bg-slate-800 flex items-center justify-center shrink-0">
            <div className="w-1 h-1 rounded-full bg-teal-500/50" />
          </div>

          {/* MySQL Cluster Node */}
          <div
            className="relative cursor-pointer focus:outline-none group shrink-0"
            tabIndex={0}
            onMouseEnter={() => setHoveredNode('lms-db')}
            onFocus={() => setHoveredNode('lms-db')}
            onMouseLeave={() => setHoveredNode(null)}
            onBlur={() => setHoveredNode(null)}
            onTouchStart={() => setHoveredNode('lms-db')}
          >
            <div className={`px-2 py-1.5 border bg-slate-900/90 flex flex-col items-center transition-all duration-200 ${
              hoveredNode === 'lms-db' ? 'border-teal-400 ring-2 ring-teal-500/40' : 'border-slate-800 hover:border-teal-500/60'
            }`}>
              <span className="font-semibold text-slate-200 text-xs">MySQL DB</span>
              <span className="text-xs text-slate-400 font-bold">200K Concurrency</span>
            </div>
          </div>
        </div>
      );
    } else if (title.includes('Enterprise AI Analytics')) {
      archTag = 'SYS_ARCH: PREDICTIVE DIAGNOSTICS & SHAP';
      diagramContent = (
        <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-5 text-xs font-mono text-slate-300 w-full max-w-lg">
          {/* Config UI Node */}
          <div
            className="relative cursor-pointer focus:outline-none group"
            tabIndex={0}
            onMouseEnter={() => setHoveredNode('ml-config')}
            onFocus={() => setHoveredNode('ml-config')}
            onMouseLeave={() => setHoveredNode(null)}
            onBlur={() => setHoveredNode(null)}
            onTouchStart={() => setHoveredNode('ml-config')}
          >
            <div className={`px-2.5 py-2 border bg-slate-900/90 flex flex-col items-center transition-all duration-200 ${
              hoveredNode === 'ml-config' ? 'border-teal-400 ring-2 ring-teal-500/40' : 'border-slate-800 hover:border-teal-500/60'
            }`}>
              <span className="font-semibold text-slate-200 text-xs">Operator UI</span>
              <span className="text-xs text-teal-400 font-bold">Pipeline Config</span>
            </div>
          </div>

          {/* Flow Connector */}
          <div className="h-[2px] w-6 sm:w-10 bg-slate-800 flex items-center justify-center shrink-0">
            <div className="w-1 h-1 rounded-full bg-teal-500/50" />
          </div>

          {/* FastAPI XAI Node */}
          <div
            className="relative cursor-pointer focus:outline-none group"
            tabIndex={0}
            onMouseEnter={() => setHoveredNode('ml-xai')}
            onFocus={() => setHoveredNode('ml-xai')}
            onMouseLeave={() => setHoveredNode(null)}
            onBlur={() => setHoveredNode(null)}
            onTouchStart={() => setHoveredNode('ml-xai')}
          >
            <div className={`px-3 py-2 border bg-slate-900/90 flex flex-col items-center transition-all duration-200 relative ${
              hoveredNode === 'ml-xai' ? 'border-teal-400 bg-slate-900' : 'border-teal-500/80 hover:border-teal-400'
            }`}>
              <span className="font-bold text-teal-300 text-xs">FastAPI XAI</span>
              <span className="text-xs text-slate-400">Model + SHAP</span>
            </div>
          </div>

          {/* Flow Connector */}
          <div className="h-[2px] w-6 sm:w-10 bg-slate-800 flex items-center justify-center shrink-0">
            <div className="w-1 h-1 rounded-full bg-teal-500/50" />
          </div>

          {/* PostgreSQL Store Node */}
          <div
            className="relative cursor-pointer focus:outline-none group"
            tabIndex={0}
            onMouseEnter={() => setHoveredNode('ml-db')}
            onFocus={() => setHoveredNode('ml-db')}
            onMouseLeave={() => setHoveredNode(null)}
            onBlur={() => setHoveredNode(null)}
            onTouchStart={() => setHoveredNode('ml-db')}
          >
            <div className={`px-2.5 py-2 border bg-slate-900/90 flex flex-col items-center transition-all duration-200 ${
              hoveredNode === 'ml-db' ? 'border-teal-400 ring-2 ring-teal-500/40' : 'border-slate-800 hover:border-teal-500/60'
            }`}>
              <span className="font-semibold text-slate-200 text-xs">PostgreSQL</span>
              <span className="text-xs text-slate-400 font-bold">Feature Store</span>
            </div>
          </div>
        </div>
      );
    } else {
      archTag = 'SYS_ARCH: ARCHITECTURE BLOCK DIAGRAM';
      diagramContent = (
        <div className="flex items-center justify-center gap-3 sm:gap-6 text-xs font-mono text-slate-300">
          <div
            className="px-3 py-2 border border-slate-700 bg-slate-900/90 cursor-pointer"
            onMouseEnter={() => setHoveredNode('default-client')}
            onMouseLeave={() => setHoveredNode(null)}
          >
            Client App
          </div>
          <div className="h-[2px] w-8 bg-slate-800 flex items-center justify-center shrink-0">
            <div className="w-1 h-1 rounded-full bg-teal-500/50" />
          </div>
          <div
            className="p-2.5 border border-teal-500 bg-slate-900/90 cursor-pointer hover:border-teal-400"
            onMouseEnter={() => setHoveredNode('default-db')}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <Database className="h-5 w-5 text-teal-400" />
          </div>
          <div className="h-[2px] w-8 bg-slate-800 flex items-center justify-center shrink-0">
            <div className="w-1 h-1 rounded-full bg-teal-500/50" />
          </div>
          <div className="px-3 py-2 border border-slate-700 bg-slate-900/90">
            Database Cluster
          </div>
        </div>
      );
    }

    return (
      <div className="h-full w-full flex flex-col justify-between bg-slate-950 blueprint-grid relative p-3 sm:p-4 select-none overflow-hidden">
        {/* Top Blueprint Coordinates Header */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-500 w-full z-10">
          <div className="flex items-center gap-1.5 font-bold tracking-wider text-teal-400/90">
            <Radio className="h-3 w-3 text-teal-400" />
            <span>{archTag}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-xs uppercase tracking-wider hidden sm:inline">CONTRACT VERIFIED</span>
          </div>
        </div>

        {/* Center Diagram Node Flow */}
        <div className="flex-1 flex items-center justify-center py-2 relative z-10 w-full overflow-x-auto no-scrollbar">
          {diagramContent}
        </div>

        {/* Bottom Real-Time Telemetry Specification Readout */}
        <div className="w-full px-3 py-1.5 bg-slate-900/90 border border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400 z-10 transition-all duration-200">
          <div className="flex items-center gap-2 truncate">
            <span className="text-teal-400 font-bold shrink-0">
              {activeNodeInfo ? `[${activeNodeInfo.label}]` : '[TELEMETRY READY]'}
            </span>
            <span className="text-slate-300 truncate text-xs">
              {activeNodeInfo ? activeNodeInfo.desc : 'Hover or tap any component block to inspect contract specification.'}
            </span>
          </div>
          <span className="hidden sm:inline-flex text-xs text-teal-400/80 font-bold shrink-0 pl-2">
            {activeNodeInfo ? 'TELEMETRY_LINK_ACTIVE' : 'SPECIFICATION VERIFIED'}
          </span>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.05 }}
      className="h-full"
    >
      <TiltCard
        maxTilt={0}
        scale={1}
        perspective={1200}
        glare={false}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:border-brand-500/30 transition-all duration-300 flex flex-col h-full group overflow-hidden"
      >
        {/* Visual System Header Panel (Full-Width, Mission-Control Console) */}
        <div
          className="w-full h-56 sm:h-64 border-b border-slate-200 dark:border-slate-800 relative flex items-center justify-center bg-slate-950 overflow-hidden"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {renderSystemVisual(project.title)}
        </div>

        {/* Case Study Details Panel */}
        <div
          className="w-full p-6 sm:p-7 flex flex-col justify-between flex-1"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div>
            {/* Header */}
            <div className="flex flex-col gap-2 mb-3" style={{ transform: 'translateZ(16px)' }}>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-800 dark:text-slate-100 tracking-tight leading-snug">
                {project.title}
              </h3>
              <p className="text-sm font-medium text-brand-700 dark:text-brand-400 italic">
                Challenge: {project.context}
              </p>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-1.5 mb-4" style={{ transform: 'translateZ(12px)' }}>
              {(project.stack || []).map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono font-medium tracking-wide bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-800/80 rounded px-2.5 py-0.5"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Description */}
            <div className="space-y-2.5 mb-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed" style={{ transform: 'translateZ(14px)' }}>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-brand-600 dark:text-brand-500 mt-0.5 shrink-0" />
                <span>
                  <strong className="text-slate-800 dark:text-slate-200 font-medium">Core Delivery:</strong> {project.whatIBuilt}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Cpu className="h-4 w-4 text-brand-600 dark:text-brand-500 mt-0.5 shrink-0" />
                <span>
                  <strong className="text-slate-800 dark:text-slate-200 font-medium">Outcome Metric:</strong> <span className="text-teal-600 dark:text-teal-400 font-bold">{project.metrics}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Expandable Architecture Notes */}
          <div className="border-t border-slate-100 dark:border-slate-800/60 pt-4 mt-2" style={{ transform: 'translateZ(10px)' }}>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors uppercase tracking-wider focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded min-h-[36px] py-1.5 px-2 -ml-2"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <>
                  <ChevronUp className="h-4 w-4 text-brand-500" />
                  <span>Hide Architecture Benchmarks</span>
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 text-brand-500" />
                  <span>Expand Architecture Benchmarks</span>
                </>
              )}
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 pt-4 border-t border-slate-200/60 dark:border-slate-800/60 text-xs leading-relaxed text-slate-500 dark:text-slate-400 font-mono">
                    <div className="flex gap-2.5 mb-4">
                      <Layers className="h-4 w-4 text-brand-500 mt-0.5 shrink-0" />
                      <div>
                        <span className="text-brand-600 dark:text-brand-400 font-bold block mb-1">SYSTEM ARCHITECTURE SPECIFICATION</span>
                        {project.architectureNotes}
                      </div>
                    </div>

                    {/* Custom Benchmark Charts based on Project Title */}
                    {(project.title.includes('Spire — Payment') || project.title.includes('Payment Processing')) && (
                      <div className="mt-4 pt-4 border-t border-slate-200/40 dark:border-slate-800">
                        <span className="text-slate-800 dark:text-slate-200 font-bold block mb-3 text-xs uppercase tracking-wider">
                          BENCHMARK: READ LATENCY (ms)
                        </span>
                        <div className="w-full pt-1 flex flex-col gap-3 font-sans">
                          <div className="space-y-2.5">
                            <div className="flex items-center text-xs text-slate-400 gap-2">
                              <span className="w-20 text-slate-400 font-mono">Direct SQL:</span>
                              <div className="flex-1 bg-slate-900 rounded-full h-3 overflow-hidden">
                                <div className="bg-slate-700 h-full rounded-full" style={{ width: '80%' }} />
                              </div>
                              <span className="w-12 text-right font-mono">280 ms</span>
                            </div>
                            <div className="flex items-center text-xs text-slate-400 gap-2">
                              <span className="w-20 text-slate-400 font-mono">Redis Cache:</span>
                              <div className="flex-1 bg-slate-900 rounded-full h-3 overflow-hidden">
                                <div className="bg-teal-500 h-full rounded-full transition-all duration-500" style={{ width: '13%' }} />
                              </div>
                              <span className="w-12 text-right font-mono text-teal-400 font-bold">45 ms</span>
                            </div>
                          </div>
                          <div className="text-xs text-slate-400 text-center font-mono border-t border-slate-900 pt-1.5 mt-1">
                            84% latency drop achieved via distributed session caching.
                          </div>
                        </div>
                      </div>
                    )}

                    {(project.title.includes('Microservices Payment') || project.title.includes('Microservices Based')) && (
                      <div className="mt-4 pt-4 border-t border-slate-200/40 dark:border-slate-800">
                        <span className="text-slate-800 dark:text-slate-200 font-bold block mb-3 text-xs uppercase tracking-wider">
                          BENCHMARK: SERVERLESS CALL SPEED (ms)
                        </span>
                        <div className="w-full pt-1 flex flex-col gap-3 font-sans">
                          <div className="space-y-2.5">
                            <div className="flex items-center text-xs text-slate-400 gap-2">
                              <span className="w-20 text-slate-400 font-mono">Cold Start:</span>
                              <div className="flex-1 bg-slate-900 rounded-full h-3 overflow-hidden">
                                <div className="bg-slate-700 h-full rounded-full" style={{ width: '90%' }} />
                              </div>
                              <span className="w-12 text-right font-mono">1,200 ms</span>
                            </div>
                            <div className="flex items-center text-xs text-slate-400 gap-2">
                              <span className="w-20 text-slate-400 font-mono">Warm Exec:</span>
                              <div className="flex-1 bg-slate-900 rounded-full h-3 overflow-hidden">
                                <div className="bg-teal-500 h-full rounded-full transition-all duration-500" style={{ width: '8%' }} />
                              </div>
                              <span className="w-12 text-right font-mono text-teal-400 font-bold">65 ms</span>
                            </div>
                          </div>
                          <div className="text-xs text-slate-400 text-center font-mono border-t border-slate-900 pt-1.5 mt-1">
                            94% reduction in serverless execution latency under active queues.
                          </div>
                        </div>
                      </div>
                    )}

                    {(project.title.includes('GenAI Customer') || project.title.includes('GenAI Based')) && (
                      <div className="mt-4 pt-4 border-t border-slate-200/40 dark:border-slate-800">
                        <span className="text-slate-800 dark:text-slate-200 font-bold block mb-3 text-xs uppercase tracking-wider">
                          BENCHMARK: AVERAGE QUERY TOKEN COST (USD)
                        </span>
                        <div className="w-full pt-1 flex flex-col gap-3 font-sans">
                          <div className="space-y-2.5">
                            <div className="flex items-center text-xs text-slate-400 gap-2">
                              <span className="w-20 text-slate-400 font-mono">LLM Direct:</span>
                              <div className="flex-1 bg-slate-900 rounded-full h-3 overflow-hidden">
                                <div className="bg-slate-700 h-full rounded-full" style={{ width: '85%' }} />
                              </div>
                              <span className="w-12 text-right font-mono">$0.0085</span>
                            </div>
                            <div className="flex items-center text-xs text-slate-400 gap-2">
                              <span className="w-20 text-slate-400 font-mono">Vector Cache:</span>
                              <div className="flex-1 bg-slate-900 rounded-full h-3 overflow-hidden">
                                <div className="bg-teal-500 h-full rounded-full transition-all duration-500" style={{ width: '5%' }} />
                              </div>
                              <span className="w-12 text-right font-mono text-teal-400 font-bold">$0.0002</span>
                            </div>
                          </div>
                          <div className="text-xs text-slate-400 text-center font-mono border-t border-slate-900 pt-1.5 mt-1">
                            97% token cost saved via semantic vector query caching.
                          </div>
                        </div>
                      </div>
                    )}

                    {project.title.includes('Inventory Management') && (
                      <div className="mt-4 pt-4 border-t border-slate-200/40 dark:border-slate-800">
                        <span className="text-slate-800 dark:text-slate-200 font-bold block mb-3 text-xs uppercase tracking-wider">
                          BENCHMARK: FILTER QUERY LATENCY (ms)
                        </span>
                        <div className="w-full pt-1 flex flex-col gap-3 font-sans">
                          <div className="space-y-2.5">
                            <div className="flex items-center text-xs text-slate-400 gap-2">
                              <span className="w-20 text-slate-400 font-mono">Direct Scan:</span>
                              <div className="flex-1 bg-slate-900 rounded-full h-3 overflow-hidden">
                                <div className="bg-slate-700 h-full rounded-full" style={{ width: '75%' }} />
                              </div>
                              <span className="w-12 text-right font-mono">150 ms</span>
                            </div>
                            <div className="flex items-center text-xs text-slate-400 gap-2">
                              <span className="w-20 text-slate-400 font-mono">Index Query:</span>
                              <div className="flex-1 bg-slate-900 rounded-full h-3 overflow-hidden">
                                <div className="bg-teal-500 h-full rounded-full transition-all duration-500" style={{ width: '6%' }} />
                              </div>
                              <span className="w-12 text-right font-mono text-teal-400 font-bold">12 ms</span>
                            </div>
                          </div>
                          <div className="text-xs text-slate-400 text-center font-mono border-t border-slate-900 pt-1.5 mt-1">
                            92% query optimization through indexed search scopes.
                          </div>
                        </div>
                      </div>
                    )}

                    {project.title.includes('Learning Management') && (
                      <div className="mt-4 pt-4 border-t border-slate-200/40 dark:border-slate-800">
                        <span className="text-slate-800 dark:text-slate-200 font-bold block mb-3 text-xs uppercase tracking-wider">
                          BENCHMARK: USER SESSION DECODE LATENCY (ms)
                        </span>
                        <div className="w-full pt-1 flex flex-col gap-3 font-sans">
                          <div className="space-y-2.5">
                            <div className="flex items-center text-xs text-slate-400 gap-2">
                              <span className="w-20 text-slate-400 font-mono">DB Session:</span>
                              <div className="flex-1 bg-slate-900 rounded-full h-3 overflow-hidden">
                                <div className="bg-slate-700 h-full rounded-full" style={{ width: '85%' }} />
                              </div>
                              <span className="w-12 text-right font-mono">320 ms</span>
                            </div>
                            <div className="flex items-center text-xs text-slate-400 gap-2">
                              <span className="w-20 text-slate-400 font-mono">AD OAuth:</span>
                              <div className="flex-1 bg-slate-900 rounded-full h-3 overflow-hidden">
                                <div className="bg-teal-500 h-full rounded-full transition-all duration-500" style={{ width: '7%' }} />
                              </div>
                              <span className="w-12 text-right font-mono text-teal-400 font-bold">18 ms</span>
                            </div>
                          </div>
                          <div className="text-xs text-slate-400 text-center font-mono border-t border-slate-900 pt-1.5 mt-1">
                            94% login speedup by offloading session decoding to clients.
                          </div>
                        </div>
                      </div>
                    )}

                    {project.title.includes('Enterprise AI Analytics') && (
                      <div className="mt-4 pt-4 border-t border-slate-200/40 dark:border-slate-800">
                        <span className="text-slate-800 dark:text-slate-200 font-bold block mb-3 text-xs uppercase tracking-wider">
                          BENCHMARK: FAILURE PREDICTION ACCURACY (%)
                        </span>
                        <div className="w-full pt-1 flex flex-col gap-3 font-sans">
                          <div className="space-y-2.5">
                            <div className="flex items-center text-xs text-slate-400 gap-2">
                              <span className="w-20 text-slate-400 font-mono">Schedule Risk:</span>
                              <div className="flex-1 bg-slate-900 rounded-full h-3 overflow-hidden">
                                <div className="bg-teal-500 h-full rounded-full transition-all duration-500" style={{ width: '94%' }} />
                              </div>
                              <span className="w-12 text-right font-mono text-teal-400 font-bold">94%</span>
                            </div>
                            <div className="flex items-center text-xs text-slate-400 gap-2">
                              <span className="w-20 text-slate-400 font-mono">Config Setup:</span>
                              <div className="flex-1 bg-slate-900 rounded-full h-3 overflow-hidden">
                                <div className="bg-teal-500 h-full rounded-full transition-all duration-500" style={{ width: '88%' }} />
                              </div>
                              <span className="w-12 text-right font-mono text-teal-400 font-bold">88%</span>
                            </div>
                          </div>
                          <div className="text-xs text-slate-400 text-center font-mono border-t border-slate-900 pt-1.5 mt-1">
                            Proactive diagnostics prevent pipeline halts by validating inputs against historical signals.
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}
