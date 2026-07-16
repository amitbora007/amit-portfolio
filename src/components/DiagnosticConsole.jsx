import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, Minimize2, ShieldAlert } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const banner = [
  { text: '----------------------------------------', type: 'sys' },
  { text: '   AMIT BORA [DIAGNOSTIC SHELL v6.0.4]  ', type: 'sys' },
  { text: '         STATUS: OPERATIONAL (OK)       ', type: 'sys' },
  { text: '----------------------------------------', type: 'sys' },
  { text: 'Type "help" to query system directories.', type: 'sys' },
  { text: 'Type "ask <question>" to search portfolio cache.', type: 'sys' },
  { text: '', type: 'output' }
];

const queryKnowledgeBase = (query) => {
  const q = query.toLowerCase();
  
  // 1. Tech Stack / Skills
  if (q.includes('skill') || q.includes('stack') || q.includes('technology') || q.includes('languages') || q.includes('code') || q.includes('framework')) {
    const list = portfolioData.skills.map(s => `  * ${s.category}: ${s.items.join(', ')}`).join('\n');
    return `[KNOWLEDGE_BASE_HIT] Amit's Technical Capabilities:\n${list}`;
  }
  
  // 2. Experience / Work
  if (q.includes('experience') || q.includes('work') || q.includes('job') || q.includes('company') || q.includes('career') || q.includes('employer') || q.includes('history')) {
    const list = portfolioData.experience.map(e => `  * ${e.role} at ${e.company} (${e.period})\n    ${e.description}`).join('\n\n');
    return `[KNOWLEDGE_BASE_HIT] Career Milestones:\n${list}`;
  }

  // 3. Specific Project queries
  if (q.includes('spire') || (q.includes('payment') && !q.includes('azure'))) {
    const p = portfolioData.projects.find(proj => proj.title.toLowerCase().includes('payment') && !proj.title.toLowerCase().includes('azure'));
    return `[KNOWLEDGE_BASE_HIT] Spire Payment Systems:\n  Context: ${p.context}\n  Stack: ${p.stack.join(', ')}\n  Impact: ${p.metrics}\n  Arch Notes: ${p.architectureNotes}`;
  }
  if (q.includes('microservice') || q.includes('azure') || q.includes('bus')) {
    const p = portfolioData.projects.find(proj => proj.title.toLowerCase().includes('microservices'));
    return `[KNOWLEDGE_BASE_HIT] Azure Service Bus Integration:\n  Context: ${p.context}\n  Stack: ${p.stack.join(', ')}\n  Impact: ${p.metrics}\n  Arch Notes: ${p.architectureNotes}`;
  }
  if (q.includes('chat') || q.includes('kagen') || q.includes('rag') || q.includes('langgraph')) {
    const p = portfolioData.projects.find(proj => proj.title.toLowerCase().includes('support'));
    return `[KNOWLEDGE_BASE_HIT] GenAI Support Engine:\n  Context: ${p.context}\n  Stack: ${p.stack.join(', ')}\n  Impact: ${p.metrics}\n  Arch Notes: ${p.architectureNotes}`;
  }
  if (q.includes('inventory') || q.includes('django') || q.includes('rbac')) {
    const p = portfolioData.projects.find(proj => proj.title.toLowerCase().includes('inventory'));
    return `[KNOWLEDGE_BASE_HIT] CCFIS Inventory Management:\n  Context: ${p.context}\n  Stack: ${p.stack.join(', ')}\n  Impact: ${p.metrics}\n  Arch Notes: ${p.architectureNotes}`;
  }
  if (q.includes('moodle') || q.includes('lms') || q.includes('learning')) {
    const p = portfolioData.projects.find(proj => proj.title.toLowerCase().includes('learning'));
    return `[KNOWLEDGE_BASE_HIT] CCFIS Learning Management System:\n  Context: ${p.context}\n  Stack: ${p.stack.join(', ')}\n  Impact: ${p.metrics}\n  Arch Notes: ${p.architectureNotes}`;
  }
  if (q.includes('analytics') || q.includes('pipeline') || q.includes('prediction') || q.includes('predictive') || q.includes('shap')) {
    const p = portfolioData.projects.find(proj => proj.title.toLowerCase().includes('analytics'));
    return `[KNOWLEDGE_BASE_HIT] Predictive Pipeline Failure Predictor:\n  Context: ${p.context}\n  Stack: ${p.stack.join(', ')}\n  Impact: ${p.metrics}\n  Arch Notes: ${p.architectureNotes}`;
  }

  // 4. Projects Overview
  if (q.includes('project') || q.includes('portfolio') || q.includes('build')) {
    const list = portfolioData.projects.map(p => `  * ${p.title} (${p.stack.join(', ')})`).join('\n');
    return `[KNOWLEDGE_BASE_HIT] Case Studies Index:\n${list}\n(Type "ask spire" or "ask RAG chatbot" for engineering details)`;
  }
  
  // 5. Certifications
  if (q.includes('cert') || q.includes('credentials') || q.includes('aws') || q.includes('mongodb') || q.includes('scrum') || q.includes('associate')) {
    const list = portfolioData.credentials.certifications.map(c => `  * ${c.name} (${c.issuer}, ${c.year})`).join('\n');
    return `[KNOWLEDGE_BASE_HIT] Verified Credentials:\n${list}`;
  }

  // 6. Publications / Papers
  if (q.includes('publication') || q.includes('paper') || q.includes('ieee') || q.includes('spoof') || q.includes('summarization') || q.includes('research')) {
    const list = portfolioData.credentials.publications.map(p => `  * "${p.title}" (${p.publisher}, ${p.year})`).join('\n');
    return `[KNOWLEDGE_BASE_HIT] IEEE Academic Papers:\n${list}`;
  }

  // 7. Education
  if (q.includes('education') || q.includes('university') || q.includes('college') || q.includes('degree') || q.includes('study') || q.includes('m.tech') || q.includes('b.tech') || q.includes('school')) {
    const list = portfolioData.education.map(edu => `  * ${edu.degree}\n    ${edu.institution} (${edu.period})`).join('\n\n');
    return `[KNOWLEDGE_BASE_HIT] Academic Record:\n${list}`;
  }

  // 8. Contact Info
  if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('social') || q.includes('linkedin') || q.includes('github') || q.includes('address') || q.includes('phone') || q.includes('hire')) {
    return `[KNOWLEDGE_BASE_HIT] Outreach Channels:\n  Email: amitbora007@gmail.com\n  GitHub: github.com/amitbora007\n  LinkedIn: linkedin.com/in/amitbora007\n(Use the contact form at the bottom of the page to message directly!)`;
  }

  // 9. General narrative / Who are you
  if (q.includes('who are you') || q.includes('about') || q.includes('amit') || q.includes('summary') || q.includes('bio') || q.includes('profile')) {
    return `[KNOWLEDGE_BASE_HIT] About Amit Bora:\n  ${portfolioData.personalInfo.summary}\n\nNarrative Focus:\n  "Complexity is the enemy of reliability. Amit specializes in designing high-isolation backend architectures, secure payment integrations, and AI analytics pipelines."`;
  }

  return null;
};

export default function DiagnosticConsole() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState(banner);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  // Auto scroll to bottom when history changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isOpen]);

  // Focus input automatically
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Listen for custom 'open-console' event
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-console', handleOpen);
    return () => window.removeEventListener('open-console', handleOpen);
  }, []);

  // Listen for global backtick keypress to toggle console
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isInputActive = ['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName) || document.activeElement?.isContentEditable;
      if ((e.ctrlKey && e.key === '`') || (e.key === '`' && !isInputActive)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCommand = (e) => {
    if (e.key !== 'Enter') return;
    
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const cmdParts = trimmedInput.toLowerCase().split(' ');
    const mainCmd = cmdParts[0];

    const newHistory = [...history, { text: `amit-bora@systems:~$ ${trimmedInput}`, type: 'input' }];

    switch (mainCmd) {
      case 'help':
        newHistory.push(
          { text: 'Available commands:', type: 'sys' },
          { text: '  help     - Display operational utility list', type: 'output' },
          { text: '  ping     - Verify latency response round-trip speed', type: 'output' },
          { text: '  sysinfo  - Print database and server status nodes', type: 'output' },
          { text: '  skills   - Print ASCII tech stack mapping', type: 'output' },
          { text: '  projects - Output payment and AI system summaries', type: 'output' },
          { text: '  pipeline - Simulate XAI machine learning training loop', type: 'output' },
          { text: '  hack     - Execute system decryption diagnostic test', type: 'output' },
          { text: '  ask <q>  - Search portfolio parameters (e.g. "ask stack")', type: 'output' },
          { text: '  clear    - Flush diagnostic console logs', type: 'output' },
          { text: '  exit     - Collapse terminal diagnostic session', type: 'output' }
        );
        break;
      case 'ping':
        newHistory.push(
          { text: 'PING systems.amitbora.io/api/health (56 bytes data)...', type: 'output' },
          { text: '64 bytes from 10.0.8.45: icmp_seq=1 ttl=64 time=14.2ms', type: 'sys' },
          { text: '--- ping statistics ---', type: 'output' },
          { text: '1 packets transmitted, 1 received, 0% packet loss, round-trip min/avg/max = 14.2ms', type: 'sys' }
        );
        break;
      case 'sysinfo':
        newHistory.push(
          { text: 'Retrieving server node telemetry metrics...', type: 'output' },
          { text: '  [LB_GATEWAY]   : NOMINAL - 12.5% load balance', type: 'sys' },
          { text: '  [REDIS_CACHE]  : ACTIVE - 45ms avg read latency', type: 'sys' },
          { text: '  [SQL_PRIMARY]  : STABLE - ACID transaction ledgers OK', type: 'sys' },
          { text: '  [AZURE_BUS]    : STABLE - 0 dead-letter queue retries', type: 'sys' },
          { text: '  [AI_LANGGRAPH] : READY - structured state persistence 100% OK', type: 'sys' }
        );
        break;
      case 'skills':
        newHistory.push(
          { text: '+-- SYSTEMS ENGINEERING', type: 'output' },
          { text: '|   +-- PHP (Laravel, Restler)', type: 'output' },
          { text: '|   +-- Python (Django, FastAPI, DRF)', type: 'output' },
          { text: '|   +-- Node.js (Express)', type: 'output' },
          { text: '|', type: 'output' },
          { text: '+-- DATASTORE & INFRA', type: 'output' },
          { text: '|   +-- SQL Server / MySQL (Optimizations)', type: 'output' },
          { text: '|   +-- MongoDB / Vector Databases', type: 'output' },
          { text: '|   +-- Redis Caching (Idempotency)', type: 'output' },
          { text: '|   +-- Azure Functions / Service Bus', type: 'output' },
          { text: '|   +-- Docker / AWS EC2', type: 'output' },
          { text: '|', type: 'output' },
          { text: '+-- PRACTICAL AI', type: 'output' },
          { text: '    +-- OpenAI / LangGraph state trees', type: 'output' }
        );
        break;
      case 'projects':
        newHistory.push(
          { text: 'Featured case studies:', type: 'sys' },
          { text: '  1. Spire Payments: Secure EFT/ACH gateway using Redis & SQL (40% latency drop)', type: 'output' },
          { text: '  2. Azure Microservices: Async clearing integration utilizing functions & queues', type: 'output' },
          { text: '  3. KagenAI chatbot: Retrieval-augmented state agent saving 70% support load', type: 'output' },
          { text: '  4. CCFIS Inventory: Custom RBAC secure hardware logging dashboard', type: 'output' },
          { text: '  5. CCFIS Moodle LMS: SSO Active Directory scaled to support 200k concurrents', type: 'output' }
        );
        break;
      case 'pipeline':
        newHistory.push(
          { text: 'Initializing Pipeline Risk Training Loop (Scikit-Learn XAI)...', type: 'sys' },
          { text: '  Loading 14,250 historical pipeline runs from Postgres store...', type: 'output' },
          { text: '  Features detected: schedule_window, config_diff, credential_age', type: 'output' },
          { text: '  [EPOCH 1/5]  - Loss: 0.4582 - Val Accuracy: 78.4%', type: 'sys' },
          { text: '  [EPOCH 2/5]  - Loss: 0.3120 - Val Accuracy: 84.9%', type: 'sys' },
          { text: '  [EPOCH 3/5]  - Loss: 0.1894 - Val Accuracy: 91.2%', type: 'sys' },
          { text: '  [EPOCH 4/5]  - Loss: 0.0982 - Val Accuracy: 94.1%', type: 'sys' },
          { text: '  [EPOCH 5/5]  - Loss: 0.0541 - Val Accuracy: 95.8% (OK)', type: 'sys' },
          { text: '  Training Complete. Serialized pipeline: model.pkl (Size: 4.8MB)', type: 'sys' },
          { text: '  SHAP Explainability coefficients parsed successfully.', type: 'output' },
          { text: '  Model accuracy flags 92% of configuration conflicts.', type: 'sys' }
        );
        break;
      case 'hack':
        newHistory.push(
          { text: 'ACCUMULATING MATRIX DIGITAL RAIN SYNC...', type: 'sys' },
          { text: '  [SYSTEM HACK] -> ACCESS GRANTED', type: 'sys' },
          { text: '  01001101 01000001 01010100 01010010 01001001 01011000', type: 'output' },
          { text: '  10110100 11001011 00100110 01101010 11010111 00101101', type: 'output' },
          { text: '  10010110 11100101 00110100 10100110 11001110 01001101', type: 'output' },
          { text: '  00100110 01101010 11010111 01001101 01000001 01010100', type: 'output' },
          { text: '  01011000 10110100 11001011 11100101 00110100 10100110', type: 'output' },
          { text: '  SYSTEM INTEGRITY: COMPROMISED (Easter Egg Verified! 🚀)', type: 'sys' }
        );
        break;
      case 'ask': {
        const question = trimmedInput.substring(4).trim();
        if (!question) {
          newHistory.push({ text: 'Usage: ask <your question about Amit Bora>', type: 'error' });
        } else {
          const kbAnswer = queryKnowledgeBase(question);
          if (kbAnswer) {
            newHistory.push(
              { text: 'Searching portfolio index cache...', type: 'sys' },
              ...kbAnswer.split('\n').map(line => ({
                text: line,
                type: line.startsWith('[KNOWLEDGE_BASE_HIT]') ? 'sys' : 'output'
              }))
            );
          } else {
            newHistory.push({ 
              text: `No exact match found in portfolio index cache. Try querying keywords like "experience", "stack", "projects", "certifications", "education", or "contact".`, 
              type: 'error' 
            });
          }
        }
        break;
      }
      case 'clear':
        setHistory(banner);
        setInput('');
        return;
      case 'exit':
        setIsOpen(false);
        setInput('');
        return;
      default: {
        // Try querying the local knowledge base as a direct question fallback
        const kbAnswer = queryKnowledgeBase(trimmedInput);
        if (kbAnswer) {
          newHistory.push(
            { text: 'Searching portfolio index cache...', type: 'sys' },
            ...kbAnswer.split('\n').map(line => ({
              text: line,
              type: line.startsWith('[KNOWLEDGE_BASE_HIT]') ? 'sys' : 'output'
            }))
          );
        } else {
          newHistory.push({ 
            text: `system: command not recognized. Type "help" to review valid routines, or try asking keywords like "stack", "experience", "projects", "education", or "contact".`, 
            type: 'error' 
          });
        }
      }
    }

    setHistory(newHistory);
    setInput('');
  };

  return (
    <>
      {/* Floating Trigger Bubble */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 rounded-full bg-brand-600 hover:bg-brand-500 text-white flex items-center justify-center shadow-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-500 border border-brand-500/20"
          aria-label="Toggle Systems Console"
          id="sys-console-bubble"
        >
          <Terminal className="h-5 w-5" />
        </motion.button>
      </div>

      {/* Expanded Draggable Console Shell */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            drag
            dragConstraints={{ left: -1000, right: 20, top: -1000, bottom: 20 }}
            dragElastic={0.05}
            dragMomentum={false}
            className="fixed bottom-22 right-6 z-50 w-[350px] sm:w-[420px] h-[340px] bg-slate-950/95 dark:bg-slate-950/98 border border-slate-800 rounded-lg shadow-2xl flex flex-col font-mono text-xs overflow-hidden cursor-move backdrop-blur-md select-none"
          >
            {/* Console Window Header Bar */}
            <div className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between select-none">
              <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] tracking-wide">
                <Terminal className="h-3.5 w-3.5 text-brand-400" />
                <span>DIAGNOSTIC_CONSOLE: system.sh</span>
              </div>
              <div className="flex items-center gap-1.5 cursor-pointer">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-slate-800 rounded text-slate-500 hover:text-slate-300 transition-colors focus:outline-none"
                  aria-label="Minimize Console"
                >
                  <Minimize2 className="h-3 w-3" />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-red-500/10 hover:text-red-400 rounded text-slate-500 transition-colors focus:outline-none"
                  aria-label="Close Console"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* Console Scrollback Buffer */}
            <div 
              ref={scrollRef}
              className="flex-1 p-4 overflow-y-auto space-y-1.5 cursor-text text-left select-text"
              onClick={() => inputRef.current?.focus()}
            >
              {history.map((line, idx) => {
                let colorClass = 'text-slate-300';
                
                if (line.type === 'input') {
                  colorClass = 'text-white font-semibold';
                } else if (line.type === 'sys') {
                  colorClass = 'text-brand-400 font-bold';
                } else if (line.type === 'error') {
                  colorClass = 'text-rose-400 font-medium flex items-center gap-1.5';
                }

                return (
                  <div key={idx} className={colorClass}>
                    {line.type === 'error' && <ShieldAlert className="h-3.5 w-3.5 shrink-0 text-rose-500" />}
                    <span>{line.text}</span>
                  </div>
                );
              })}
            </div>

            {/* Console Prompt Input Box */}
            <div className="p-3 bg-slate-900/40 border-t border-slate-800/80 flex items-center gap-2">
              <span className="text-brand-400 font-bold">amit-bora@systems:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleCommand}
                placeholder="Type 'help'..."
                className="flex-1 bg-transparent border-none text-white focus:outline-none focus:ring-0 font-mono caret-brand-400 select-text"
                autoComplete="off"
                autoCapitalize="off"
                spellCheck="false"
                maxLength={50}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
