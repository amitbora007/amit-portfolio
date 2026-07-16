import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Layers, CheckCircle2, Cpu, Database } from 'lucide-react';

export default function ProjectCard({ project, index }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredNode, setHoveredNode] = useState(null);

  // Render a mini-system layout with interactive tooltips based on project title
  const renderSystemVisual = (title) => {
    if (title.includes('Spire — Payment') || title.includes('Payment Processing')) {
      return (
        <div className="h-full w-full flex items-center justify-center bg-slate-950 blueprint-grid relative p-4">
          <div className="absolute top-2 left-2 text-[9px] text-slate-500 font-mono">SYS_ARCH: EFT/ACH GATEWAY</div>
          <div className="flex items-center gap-2 sm:gap-4 text-xs font-mono text-slate-300">
            
            {/* Client API Node */}
            <div 
              className="relative cursor-help focus:outline-none group" tabIndex={0}
              onMouseEnter={() => setHoveredNode('spire-api')} onFocus={() => setHoveredNode('spire-api')}
              onMouseLeave={() => setHoveredNode(null)} onBlur={() => setHoveredNode(null)}
              onTouchStart={() => setHoveredNode('spire-api')}
              onTouchEnd={() => setHoveredNode(null)}
            >
              <div className="px-2 py-1.5 border border-slate-700 rounded bg-slate-950 flex flex-col items-center hover:border-brand-500 group-focus:border-brand-500 group-focus:ring-1 group-focus:ring-brand-500/50 transition-colors">
                <span>Client API</span>
                <span className="text-[9px] text-teal-400">REST</span>
              </div>
              <AnimatePresence>
                {hoveredNode === 'spire-api' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 bg-slate-950/95 border border-slate-800 rounded shadow-xl text-[10px] text-slate-300 leading-normal font-sans text-center"
                  >
                    REST endpoints secured via tokenized auth, parsing ACH/EFT requests.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="h-[1px] w-4 sm:w-6 bg-slate-800 relative overflow-hidden">
              <div className="absolute top-0 h-full w-2 bg-gradient-to-r from-transparent via-teal-400 to-transparent animate-flow-right" />
            </div>

            {/* Redis Cache Node */}
            <div 
              className="relative cursor-help focus:outline-none group" tabIndex={0}
              onMouseEnter={() => setHoveredNode('spire-redis')} onFocus={() => setHoveredNode('spire-redis')}
              onMouseLeave={() => setHoveredNode(null)} onBlur={() => setHoveredNode(null)}
              onTouchStart={() => setHoveredNode('spire-redis')}
              onTouchEnd={() => setHoveredNode(null)}
            >
              <div className="px-2.5 py-2 border-2 border-brand-500 rounded bg-slate-950 flex flex-col items-center hover:border-brand-400 group-focus:border-brand-400 group-focus:ring-1 group-focus:ring-brand-400/50 transition-colors relative">
                <span className="font-bold text-teal-400">Redis Cache</span>
                <span className="text-[8px] text-slate-500">Idempotency</span>
              </div>
              <AnimatePresence>
                {hoveredNode === 'spire-redis' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 bg-slate-950/95 border border-slate-800 rounded shadow-xl text-[10px] text-slate-300 leading-normal font-sans text-center"
                  >
                    Caches merchant configurations and verifies transactional idempotency keys to eliminate double-transfers.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="h-[1px] w-4 sm:w-6 bg-slate-800 relative overflow-hidden">
              <div className="absolute top-0 h-full w-2 bg-gradient-to-r from-transparent via-teal-400 to-transparent animate-flow-right" />
            </div>

            {/* SQL Server Node */}
            <div 
              className="relative cursor-help focus:outline-none group" tabIndex={0}
              onMouseEnter={() => setHoveredNode('spire-sql')} onFocus={() => setHoveredNode('spire-sql')}
              onMouseLeave={() => setHoveredNode(null)} onBlur={() => setHoveredNode(null)}
              onTouchStart={() => setHoveredNode('spire-sql')}
              onTouchEnd={() => setHoveredNode(null)}
            >
              <div className="px-2 py-1.5 border border-slate-700 rounded bg-slate-950 flex flex-col items-center hover:border-brand-500 group-focus:border-brand-500 group-focus:ring-1 group-focus:ring-brand-500/50 transition-colors">
                <span>SQL Server</span>
                <span className="text-[9px] text-slate-500">ACID Db</span>
              </div>
              <AnimatePresence>
                {hoveredNode === 'spire-sql' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 bg-slate-950/95 border border-slate-800 rounded shadow-xl text-[10px] text-slate-300 leading-normal font-sans text-center"
                  >
                    Enforces double-entry ledger audit integrity with strictly isolated ACID-compliant transaction records.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      );
    } else if (title.includes('Microservices Payment') || title.includes('Microservices Based')) {
      return (
        <div className="h-full w-full flex items-center justify-center bg-slate-950 blueprint-grid relative p-4">
          <div className="absolute top-2 left-2 text-[9px] text-slate-500 font-mono">SYS_ARCH: ASYNC QUEUE PIPELINE</div>
          <div className="flex flex-col gap-3 items-center text-xs font-mono text-slate-300 w-full px-4 sm:px-8">
            
            <div className="flex justify-between w-full">
              
              {/* Spire Source Node */}
              <div 
                className="relative cursor-help focus:outline-none group" tabIndex={0}
                onMouseEnter={() => setHoveredNode('spire-source')} onFocus={() => setHoveredNode('spire-source')}
                onMouseLeave={() => setHoveredNode(null)} onBlur={() => setHoveredNode(null)}
              >
                <div className="px-2 py-1 border border-slate-700 rounded bg-slate-950 text-[10px] hover:border-brand-500 group-focus:border-brand-500 group-focus:ring-1 group-focus:ring-brand-500/50 transition-colors">Spire</div>
                <AnimatePresence>
                  {hoveredNode === 'spire-source' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-2 w-44 p-2 bg-slate-950/95 border border-slate-800 rounded shadow-xl text-[10px] text-slate-300 leading-normal font-sans text-center"
                    >
                      Source gateway parsing transaction inputs.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Payliance Node */}
              <div 
                className="relative cursor-help focus:outline-none group" tabIndex={0}
                onMouseEnter={() => setHoveredNode('payliance-target')} onFocus={() => setHoveredNode('payliance-target')}
                onMouseLeave={() => setHoveredNode(null)} onBlur={() => setHoveredNode(null)}
              >
                <div className="px-2 py-1 border border-slate-700 rounded bg-slate-950 text-[10px] hover:border-brand-500 group-focus:border-brand-500 group-focus:ring-1 group-focus:ring-brand-500/50 transition-colors">Payliance</div>
                <AnimatePresence>
                  {hoveredNode === 'payliance-target' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-2 w-44 p-2 bg-slate-950/95 border border-slate-800 rounded shadow-xl text-[10px] text-slate-300 leading-normal font-sans text-center"
                    >
                      Clearing system executing ACH transfers.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

            {/* Azure Service Bus Queue Node */}
            <div 
              className="w-full relative cursor-help"
              onMouseEnter={() => setHoveredNode('payliance-queue')} onFocus={() => setHoveredNode('payliance-queue')}
              onMouseLeave={() => setHoveredNode(null)} onBlur={() => setHoveredNode(null)}
            >
              <div className="w-full h-9 border-x border-b border-brand-500/50 rounded-b flex items-center justify-center relative hover:bg-brand-500/5 transition-colors">
                <div className="w-[80%] h-[1px] bg-brand-500/30 relative overflow-hidden">
                  <div className="absolute top-0 h-full w-4 bg-gradient-to-r from-transparent via-brand-400 to-transparent animate-flow-right" />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 py-0.5 bg-slate-950 border border-brand-400 rounded text-[8px] text-brand-400 font-bold whitespace-nowrap">
                  Azure Service Bus Queue
                </div>
                <div className="absolute left-[30%] top-1/3 w-1.5 h-1.5 bg-brand-400 rounded-full animate-bounce" />
              </div>
              <AnimatePresence>
                {hoveredNode === 'payliance-queue' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 p-2.5 bg-slate-950/95 border border-slate-800 rounded shadow-xl text-[10px] text-slate-300 leading-normal font-sans text-center"
                  >
                    Decouples transaction endpoints asynchronously. Automatically retries pipeline failures via Dead-Letter Queues (DLQs).
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      );
    } else if (title.includes('GenAI Customer') || title.includes('GenAI Based')) {
      return (
        <div className="h-full w-full flex items-center justify-center bg-slate-950 blueprint-grid relative p-4">
          <div className="absolute top-2 left-2 text-[9px] text-slate-500 font-mono">SYS_ARCH: MULTI-AGENT STATE GRAPH</div>
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs font-mono text-slate-300">
            
            {/* Query Router Node */}
            <div 
              className="relative cursor-help shrink-0"
              onMouseEnter={() => setHoveredNode('ai-router')} onFocus={() => setHoveredNode('ai-router')}
              onMouseLeave={() => setHoveredNode(null)} onBlur={() => setHoveredNode(null)}
            >
              <div className="px-1.5 py-1 border border-slate-800 rounded bg-slate-950 text-[9px] hover:border-brand-500 group-focus:border-brand-500 group-focus:ring-1 group-focus:ring-brand-500/50 transition-colors">Query Router</div>
              <AnimatePresence>
                {hoveredNode === 'ai-router' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-2 w-40 p-2 bg-slate-950/95 border border-slate-800 rounded shadow-xl text-[10px] text-slate-300 leading-normal font-sans text-center"
                  >
                    Intercepts requests and immediately returns semantic cache matches.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Connector flow line */}
            <div className="h-[1px] w-3 sm:w-4 bg-slate-800 relative overflow-hidden shrink-0">
              <div className="absolute top-0 h-full w-2 bg-gradient-to-r from-transparent via-teal-400 to-transparent animate-flow-right" />
            </div>

            <div className="flex flex-col gap-1.5 items-center shrink-0">
              
              {/* LangGraph Agent Node */}
              <div 
                className="relative cursor-help focus:outline-none group" tabIndex={0}
                onMouseEnter={() => setHoveredNode('ai-agent')} onFocus={() => setHoveredNode('ai-agent')}
                onMouseLeave={() => setHoveredNode(null)} onBlur={() => setHoveredNode(null)}
              >
                <div className="px-2 py-1 border-2 border-brand-500 rounded bg-slate-950 font-bold text-teal-400 text-[9px] sm:text-[10px] hover:border-brand-400 group-focus:border-brand-400 group-focus:ring-1 group-focus:ring-brand-400/50 transition-colors">LangGraph Agent</div>
                <AnimatePresence>
                  {hoveredNode === 'ai-agent' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 bg-slate-950/95 border border-slate-800 rounded shadow-xl text-[10px] text-slate-300 leading-normal font-sans text-center"
                    >
                      Orchestrates stateful multi-turn customer dialogues via structured routing trees.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="h-3 w-[1px] bg-slate-800 relative overflow-hidden">
                <div className="absolute left-0 w-full h-1.5 bg-gradient-to-b from-transparent via-teal-400 to-transparent animate-flow-down" />
              </div>

              {/* Vector DB Node */}
              <div 
                className="relative cursor-help focus:outline-none group" tabIndex={0}
                onMouseEnter={() => setHoveredNode('ai-vector')} onFocus={() => setHoveredNode('ai-vector')}
                onMouseLeave={() => setHoveredNode(null)} onBlur={() => setHoveredNode(null)}
              >
                <div className="px-1.5 py-1 border border-slate-800 rounded bg-slate-950 text-[9px] hover:border-brand-500 group-focus:border-brand-500 group-focus:ring-1 group-focus:ring-brand-500/50 transition-colors">Vector DB (RAG)</div>
                <AnimatePresence>
                  {hoveredNode === 'ai-vector' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 bg-slate-950/95 border border-slate-800 rounded shadow-xl text-[10px] text-slate-300 leading-normal font-sans text-center font-sans"
                    >
                      MongoDB Vector collection retrieving contextual grounding embeddings.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

            {/* Connector flow line */}
            <div className="h-[1px] w-3 sm:w-4 bg-slate-800 relative overflow-hidden shrink-0">
              <div className="absolute top-0 h-full w-2 bg-gradient-to-r from-transparent via-teal-400 to-transparent animate-flow-right" />
            </div>

            {/* LLM Parser Node */}
            <div 
              className="relative cursor-help shrink-0"
              onMouseEnter={() => setHoveredNode('ai-parser')} onFocus={() => setHoveredNode('ai-parser')}
              onMouseLeave={() => setHoveredNode(null)} onBlur={() => setHoveredNode(null)}
            >
              <div className="px-1.5 py-1 border border-slate-800 rounded bg-slate-950 text-[9px] hover:border-brand-500 group-focus:border-brand-500 group-focus:ring-1 group-focus:ring-brand-500/50 transition-colors">LLM Parser</div>
              <AnimatePresence>
                {hoveredNode === 'ai-parser' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-2 w-40 p-2 bg-slate-950/95 border border-slate-800 rounded shadow-xl text-[10px] text-slate-300 leading-normal font-sans text-center"
                  >
                    Formats raw text replies into structured schema-valid outputs.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      );
    } else if (title.includes('Inventory Management')) {
      return (
        <div className="h-full w-full flex items-center justify-center bg-slate-950 blueprint-grid relative p-4">
          <div className="absolute top-2 left-2 text-[9px] text-slate-500 font-mono">SYS_ARCH: SECURE INVENTORY API</div>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs font-mono text-slate-300">
            
            {/* Client View */}
            <div 
              className="relative cursor-help focus:outline-none group" tabIndex={0}
              onMouseEnter={() => setHoveredNode('inv-client')} onFocus={() => setHoveredNode('inv-client')}
              onMouseLeave={() => setHoveredNode(null)} onBlur={() => setHoveredNode(null)}
              onTouchStart={() => setHoveredNode('inv-client')}
              onTouchEnd={() => setHoveredNode(null)}
            >
              <div className="px-2 py-1.5 border border-slate-700 rounded bg-slate-950 flex flex-col items-center hover:border-brand-500 group-focus:border-brand-500 group-focus:ring-1 group-focus:ring-brand-500/50 transition-colors">
                <span>Admin UI</span>
                <span className="text-[8px] text-slate-500">Inventory</span>
              </div>
              <AnimatePresence>
                {hoveredNode === 'inv-client' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-2 w-44 p-2 bg-slate-950/95 border border-slate-800 rounded shadow-xl text-[10px] text-slate-300 leading-normal font-sans text-center"
                  >
                    Interactive dashboard for tracking stocks.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="hidden sm:block h-[1px] w-4 bg-slate-800 relative overflow-hidden">
              <div className="absolute top-0 h-full w-2 bg-gradient-to-r from-transparent via-teal-400 to-transparent animate-flow-right" />
            </div>

            {/* DRF Guard */}
            <div 
              className="relative cursor-help focus:outline-none group" tabIndex={0}
              onMouseEnter={() => setHoveredNode('inv-drf')} onFocus={() => setHoveredNode('inv-drf')}
              onMouseLeave={() => setHoveredNode(null)} onBlur={() => setHoveredNode(null)}
              onTouchStart={() => setHoveredNode('inv-drf')}
              onTouchEnd={() => setHoveredNode(null)}
            >
              <div className="px-2.5 py-2 border-2 border-brand-500 rounded bg-slate-950 flex flex-col items-center hover:border-brand-400 group-focus:border-brand-400 group-focus:ring-1 group-focus:ring-brand-400/50 transition-colors relative">
                <span className="font-bold text-teal-400">DRF Guard</span>
                <span className="text-[8px] text-slate-500">RBAC / Filter</span>
              </div>
              <AnimatePresence>
                {hoveredNode === 'inv-drf' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 bg-slate-950/95 border border-slate-800 rounded shadow-xl text-[10px] text-slate-300 leading-normal font-sans text-center"
                  >
                    Django REST Framework custom middleware enforcing role boundaries and query parameters.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="hidden sm:block h-[1px] w-4 bg-slate-800 relative overflow-hidden">
              <div className="absolute top-0 h-full w-2 bg-gradient-to-r from-transparent via-teal-400 to-transparent animate-flow-right" />
            </div>

            {/* MySQL DB */}
            <div 
              className="relative cursor-help focus:outline-none group" tabIndex={0}
              onMouseEnter={() => setHoveredNode('inv-mysql')} onFocus={() => setHoveredNode('inv-mysql')}
              onMouseLeave={() => setHoveredNode(null)} onBlur={() => setHoveredNode(null)}
              onTouchStart={() => setHoveredNode('inv-mysql')}
              onTouchEnd={() => setHoveredNode(null)}
            >
              <div className="px-2 py-1.5 border border-slate-700 rounded bg-slate-950 flex flex-col items-center hover:border-brand-500 group-focus:border-brand-500 group-focus:ring-1 group-focus:ring-brand-500/50 transition-colors">
                <span>MySQL DB</span>
                <span className="text-[8px] text-slate-500">Audit Logs</span>
              </div>
              <AnimatePresence>
                {hoveredNode === 'inv-mysql' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-2 w-44 p-2 bg-slate-950/95 border border-slate-800 rounded shadow-xl text-[10px] text-slate-300 leading-normal font-sans text-center"
                  >
                    SQL schema containing inventory records and transaction triggers.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      );
    } else if (title.includes('Learning Management')) {
      return (
        <div className="h-full w-full flex items-center justify-center bg-slate-950 blueprint-grid relative p-4">
          <div className="absolute top-2 left-2 text-[9px] text-slate-500 font-mono">SYS_ARCH: SSO LMS PORTAL</div>
          <div className="flex flex-col gap-2 items-center text-[10px] font-mono text-slate-300 w-full px-2 sm:px-6">
            
            <div className="flex justify-between w-full items-center">
              {/* Student Client */}
              <div 
                className="relative cursor-help focus:outline-none group" tabIndex={0}
                onMouseEnter={() => setHoveredNode('lms-client')} onFocus={() => setHoveredNode('lms-client')}
                onMouseLeave={() => setHoveredNode(null)} onBlur={() => setHoveredNode(null)}
                onTouchStart={() => setHoveredNode('lms-client')}
                onTouchEnd={() => setHoveredNode(null)}
              >
                <div className="px-1.5 py-0.5 border border-slate-700 rounded bg-slate-950 hover:border-brand-500 group-focus:border-brand-500 group-focus:ring-1 group-focus:ring-brand-500/50 transition-colors">
                  Student UI
                </div>
                <AnimatePresence>
                  {hoveredNode === 'lms-client' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-2 w-40 p-2 bg-slate-950/95 border border-slate-800 rounded shadow-xl text-[10px] text-slate-300 leading-normal font-sans text-center"
                    >
                      Corporate compliant training portal.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Arrow */}
              <div className="flex-1 h-[1px] bg-slate-800 mx-1.5 relative overflow-hidden">
                <div className="absolute top-0 h-full w-4 bg-gradient-to-r from-transparent via-teal-400 to-transparent animate-flow-right" />
              </div>

              {/* Azure AD SSO */}
              <div 
                className="relative cursor-help focus:outline-none group" tabIndex={0}
                onMouseEnter={() => setHoveredNode('lms-sso')} onFocus={() => setHoveredNode('lms-sso')}
                onMouseLeave={() => setHoveredNode(null)} onBlur={() => setHoveredNode(null)}
                onTouchStart={() => setHoveredNode('lms-sso')}
                onTouchEnd={() => setHoveredNode(null)}
              >
                <div className="px-1.5 py-1 border-2 border-brand-500 rounded bg-slate-950 font-bold text-teal-400 hover:border-brand-400 group-focus:border-brand-400 group-focus:ring-1 group-focus:ring-brand-400/50 transition-colors">
                  Azure AD SSO
                </div>
                <AnimatePresence>
                  {hoveredNode === 'lms-sso' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 bg-slate-950/95 border border-slate-800 rounded shadow-xl text-[10px] text-slate-300 leading-normal font-sans text-center"
                    >
                      Azure Active Directory Single Sign-On validating corporate user sessions.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="h-3 w-[1px] bg-slate-800 relative overflow-hidden">
              <div className="absolute left-0 w-full h-1.5 bg-gradient-to-b from-transparent via-teal-400 to-transparent animate-flow-down" />
            </div>

            <div className="flex justify-between w-full items-center">
              {/* Moodle Core App */}
              <div 
                className="relative cursor-help focus:outline-none group" tabIndex={0}
                onMouseEnter={() => setHoveredNode('lms-moodle')} onFocus={() => setHoveredNode('lms-moodle')}
                onMouseLeave={() => setHoveredNode(null)} onBlur={() => setHoveredNode(null)}
                onTouchStart={() => setHoveredNode('lms-moodle')}
                onTouchEnd={() => setHoveredNode(null)}
              >
                <div className="px-1.5 py-0.5 border border-slate-700 rounded bg-slate-950 hover:border-brand-500 group-focus:border-brand-500 group-focus:ring-1 group-focus:ring-brand-500/50 transition-colors">
                  Moodle App
                </div>
                <AnimatePresence>
                  {hoveredNode === 'lms-moodle' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-2 w-44 p-2 bg-slate-950/95 border border-slate-800 rounded shadow-xl text-[10px] text-slate-300 leading-normal font-sans text-center"
                    >
                      Optimized Moodle PHP kernel managing course tracks.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Arrow */}
              <div className="flex-1 h-[1px] bg-slate-800 mx-1.5 relative overflow-hidden">
                <div className="absolute top-0 h-full w-4 bg-gradient-to-r from-transparent via-teal-400 to-transparent animate-flow-right" />
              </div>

              {/* MySQL Cluster DB */}
              <div 
                className="relative cursor-help focus:outline-none group" tabIndex={0}
                onMouseEnter={() => setHoveredNode('lms-db')} onFocus={() => setHoveredNode('lms-db')}
                onMouseLeave={() => setHoveredNode(null)} onBlur={() => setHoveredNode(null)}
                onTouchStart={() => setHoveredNode('lms-db')}
                onTouchEnd={() => setHoveredNode(null)}
              >
                <div className="px-1.5 py-0.5 border border-slate-700 rounded bg-slate-950 hover:border-brand-500 group-focus:border-brand-500 group-focus:ring-1 group-focus:ring-brand-500/50 transition-colors">
                  MySQL DB
                </div>
                <AnimatePresence>
                  {hoveredNode === 'lms-db' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute z-35 bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 bg-slate-950/95 border border-slate-800 rounded shadow-xl text-[10px] text-slate-300 leading-normal font-sans text-center"
                    >
                      High-throughput database cluster handling user course progress.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      );
    } else if (title.includes('Enterprise AI Analytics')) {
      return (
        <div className="h-full w-full flex items-center justify-center bg-slate-950 blueprint-grid relative p-4">
          <div className="absolute top-2 left-2 text-[9px] text-slate-500 font-mono">SYS_ARCH: OPERATIONAL INTELLIGENCE</div>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs font-mono text-slate-300">
            
            {/* Config UI */}
            <div 
              className="relative cursor-help focus:outline-none group" tabIndex={0}
              onMouseEnter={() => setHoveredNode('ml-config')} onFocus={() => setHoveredNode('ml-config')}
              onMouseLeave={() => setHoveredNode(null)} onBlur={() => setHoveredNode(null)}
              onTouchStart={() => setHoveredNode('ml-config')}
              onTouchEnd={() => setHoveredNode(null)}
            >
              <div className="px-2 py-1.5 border border-slate-700 rounded bg-slate-950 flex flex-col items-center hover:border-brand-500 group-focus:border-brand-500 group-focus:ring-1 group-focus:ring-brand-500/50 transition-colors">
                <span>Config UI</span>
                <span className="text-[8px] text-slate-500">Pipeline</span>
              </div>
              <AnimatePresence>
                {hoveredNode === 'ml-config' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-2 w-44 p-2 bg-slate-950/95 border border-slate-800 rounded shadow-xl text-[10px] text-slate-300 leading-normal font-sans text-center"
                  >
                    User configures execution schedules and metadata parameters.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="hidden sm:block h-[1px] w-4 bg-slate-800 relative overflow-hidden">
              <div className="absolute top-0 h-full w-2 bg-gradient-to-r from-transparent via-teal-400 to-transparent animate-flow-right" />
            </div>

            {/* XAI Engine */}
            <div 
              className="relative cursor-help focus:outline-none group" tabIndex={0}
              onMouseEnter={() => setHoveredNode('ml-xai')} onFocus={() => setHoveredNode('ml-xai')}
              onMouseLeave={() => setHoveredNode(null)} onBlur={() => setHoveredNode(null)}
              onTouchStart={() => setHoveredNode('ml-xai')}
              onTouchEnd={() => setHoveredNode(null)}
            >
              <div className="px-2.5 py-2 border-2 border-brand-500 rounded bg-slate-950 flex flex-col items-center hover:border-brand-400 group-focus:border-brand-400 group-focus:ring-1 group-focus:ring-brand-400/50 transition-colors relative">
                <span className="font-bold text-teal-400">FastAPI XAI</span>
                <span className="text-[8px] text-slate-500">Model + SHAP</span>
              </div>
              <AnimatePresence>
                {hoveredNode === 'ml-xai' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 bg-slate-950/95 border border-slate-800 rounded shadow-xl text-[10px] text-slate-300 leading-normal font-sans text-center"
                  >
                    Scikit-learn classification model predicting failure risk and SHAP explainability parser.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="hidden sm:block h-[1px] w-4 bg-slate-800 relative overflow-hidden">
              <div className="absolute top-0 h-full w-2 bg-gradient-to-r from-transparent via-teal-400 to-transparent animate-flow-right" />
            </div>

            {/* PostgreSQL Store */}
            <div 
              className="relative cursor-help focus:outline-none group" tabIndex={0}
              onMouseEnter={() => setHoveredNode('ml-db')} onFocus={() => setHoveredNode('ml-db')}
              onMouseLeave={() => setHoveredNode(null)} onBlur={() => setHoveredNode(null)}
              onTouchStart={() => setHoveredNode('ml-db')}
              onTouchEnd={() => setHoveredNode(null)}
            >
              <div className="px-2 py-1.5 border border-slate-700 rounded bg-slate-950 flex flex-col items-center hover:border-brand-500 group-focus:border-brand-500 group-focus:ring-1 group-focus:ring-brand-500/50 transition-colors">
                <span>Postgres</span>
                <span className="text-[8px] text-slate-500">Feature Store</span>
              </div>
              <AnimatePresence>
                {hoveredNode === 'ml-db' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-2 w-44 p-2 bg-slate-950/95 border border-slate-800 rounded shadow-xl text-[10px] text-slate-300 leading-normal font-sans text-center"
                  >
                    PostgreSQL database aggregating historical execution signals and credential states.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      );
    } else {
      return (
        <div className="h-full w-full flex items-center justify-center bg-slate-950 blueprint-grid relative">
          <div className="absolute top-2 left-2 text-[9px] text-slate-500 font-mono">SYSTEM BLOCK DIAGRAM</div>
          <div className="flex items-center gap-3 text-xs font-mono text-slate-300">
            <div className="px-2 py-1 border border-slate-700 rounded bg-slate-950">Client View</div>
            <div className="p-1.5 border border-brand-500 rounded-full bg-slate-950">
              <Database className="h-4 w-4 text-brand-400" />
            </div>
            <div className="px-2 py-1 border border-slate-700 rounded bg-slate-950">Relational Database</div>
          </div>
        </div>
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -6, scale: 1.008, rotateX: 0.5, rotateY: -0.5 }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.05 }}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md dark:shadow-none hover:border-slate-300 dark:hover:border-slate-800 transition-all duration-300 flex flex-col md:flex-row h-full"
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
    >
      {/* Visual System Column */}
      <div className="w-full md:w-[35%] h-48 md:h-auto min-h-[160px] border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 overflow-hidden relative">
        {renderSystemVisual(project.title)}
      </div>

      {/* Case Study Details Column */}
      <div className="w-full md:w-[65%] p-6 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex flex-col gap-2 mb-3">
            <h3 className="font-display font-bold text-xl text-slate-800 dark:text-slate-100 tracking-tight">
              {project.title}
            </h3>
            <p className="text-sm font-medium text-brand-700 dark:text-brand-400 italic">
              Challenge: {project.context}
            </p>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-mono font-medium tracking-wide bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-800/80 rounded px-2.5 py-0.5"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Description */}
          <div className="space-y-2 mb-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
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
        <div className="border-t border-slate-100 dark:border-slate-950 pt-4 mt-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors uppercase tracking-wider focus:outline-none"
          >
            {isOpen ? (
              <>
                <ChevronUp className="h-4 w-4 text-brand-500" />
                Hide Architecture Notes
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 text-brand-500" />
                Expand Architecture Notes
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
                <div className="mt-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800 rounded p-4 font-mono">
                  <div className="flex gap-2.5 mb-4">
                    <Layers className="h-4 w-4 text-brand-500 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-brand-600 dark:text-brand-400 font-bold block mb-1">SYSTEM INSIGHTS</span>
                      {project.architectureNotes}
                    </div>
                  </div>

                  {/* Custom Charts based on Project Title */}
                  {(project.title.includes('Spire — Payment') || project.title.includes('Payment Processing')) && (
                    <div className="mt-4 pt-4 border-t border-slate-200/40 dark:border-slate-800">
                      <span className="text-slate-800 dark:text-slate-200 font-bold block mb-3 text-[10px] uppercase tracking-wider">
                        BENCHMARK: READ LATENCY (ms)
                      </span>
                      <div className="h-28 w-full bg-slate-950 border border-slate-800 rounded p-3 flex flex-col justify-between font-sans">
                        <div className="space-y-2.5">
                          {/* Standard Database Read */}
                          <div className="flex items-center text-[10px] text-slate-400 gap-2">
                            <span className="w-20 text-slate-400 font-mono">Direct SQL:</span>
                            <div className="flex-1 bg-slate-900 rounded-full h-3 overflow-hidden">
                              <div className="bg-slate-700 h-full rounded-full" style={{ width: '80%' }} />
                            </div>
                            <span className="w-12 text-right font-mono">280 ms</span>
                          </div>
                          {/* Caching Read */}
                          <div className="flex items-center text-[10px] text-slate-400 gap-2">
                            <span className="w-20 text-slate-400 font-mono">Redis Cache:</span>
                            <div className="flex-1 bg-slate-900 rounded-full h-3 overflow-hidden">
                              <div className="bg-teal-500 h-full rounded-full animate-pulse" style={{ width: '13%' }} />
                            </div>
                            <span className="w-12 text-right font-mono text-teal-400 font-bold">45 ms</span>
                          </div>
                        </div>
                        <div className="text-[9px] text-slate-500 text-center font-mono border-t border-slate-900 pt-1.5 mt-1">
                          84% latency drop achieved via distributed session caching.
                        </div>
                      </div>
                    </div>
                  )}

                  {(project.title.includes('Microservices Payment') || project.title.includes('Microservices Based')) && (
                    <div className="mt-4 pt-4 border-t border-slate-200/40 dark:border-slate-800">
                      <span className="text-slate-800 dark:text-slate-200 font-bold block mb-3 text-[10px] uppercase tracking-wider">
                        BENCHMARK: SERVERLESS CALL SPEED (ms)
                      </span>
                      <div className="h-28 w-full bg-slate-950 border border-slate-800 rounded p-3 flex flex-col justify-between font-sans">
                        <div className="space-y-2.5">
                          <div className="flex items-center text-[10px] text-slate-400 gap-2">
                            <span className="w-20 text-slate-400 font-mono">Cold Start:</span>
                            <div className="flex-1 bg-slate-900 rounded-full h-3 overflow-hidden">
                              <div className="bg-slate-700 h-full rounded-full" style={{ width: '90%' }} />
                            </div>
                            <span className="w-12 text-right font-mono">1,200 ms</span>
                          </div>
                          <div className="flex items-center text-[10px] text-slate-400 gap-2">
                            <span className="w-20 text-slate-400 font-mono">Warm Exec:</span>
                            <div className="flex-1 bg-slate-900 rounded-full h-3 overflow-hidden">
                              <div className="bg-teal-500 h-full rounded-full animate-pulse" style={{ width: '8%' }} />
                            </div>
                            <span className="w-12 text-right font-mono text-teal-400 font-bold">65 ms</span>
                          </div>
                        </div>
                        <div className="text-[9px] text-slate-500 text-center font-mono border-t border-slate-900 pt-1.5 mt-1">
                          94% reduction in serverless execution latency under active queues.
                        </div>
                      </div>
                    </div>
                  )}

                  {(project.title.includes('GenAI Customer') || project.title.includes('GenAI Based')) && (
                    <div className="mt-4 pt-4 border-t border-slate-200/40 dark:border-slate-800">
                      <span className="text-slate-800 dark:text-slate-200 font-bold block mb-3 text-[10px] uppercase tracking-wider">
                        BENCHMARK: AVERAGE QUERY TOKEN COST (USD)
                      </span>
                      <div className="h-28 w-full bg-slate-950 border border-slate-800 rounded p-3 flex flex-col justify-between font-sans">
                        <div className="space-y-2.5">
                          <div className="flex items-center text-[10px] text-slate-400 gap-2">
                            <span className="w-20 text-slate-400 font-mono">LLM Direct:</span>
                            <div className="flex-1 bg-slate-900 rounded-full h-3 overflow-hidden">
                              <div className="bg-slate-700 h-full rounded-full" style={{ width: '85%' }} />
                            </div>
                            <span className="w-12 text-right font-mono">$0.0085</span>
                          </div>
                          <div className="flex items-center text-[10px] text-slate-400 gap-2">
                            <span className="w-20 text-slate-400 font-mono">Vector Cache:</span>
                            <div className="flex-1 bg-slate-900 rounded-full h-3 overflow-hidden">
                              <div className="bg-teal-500 h-full rounded-full animate-pulse" style={{ width: '5%' }} />
                            </div>
                            <span className="w-12 text-right font-mono text-teal-400 font-bold">$0.0002</span>
                          </div>
                        </div>
                        <div className="text-[9px] text-slate-500 text-center font-mono border-t border-slate-900 pt-1.5 mt-1">
                          97% token cost saved via semantic vector query caching.
                        </div>
                      </div>
                    </div>
                  )}

                  {project.title.includes('Inventory Management') && (
                    <div className="mt-4 pt-4 border-t border-slate-200/40 dark:border-slate-800">
                      <span className="text-slate-800 dark:text-slate-200 font-bold block mb-3 text-[10px] uppercase tracking-wider">
                        BENCHMARK: FILTER QUERY LATENCY (ms)
                      </span>
                      <div className="h-28 w-full bg-slate-950 border border-slate-800 rounded p-3 flex flex-col justify-between font-sans">
                        <div className="space-y-2.5">
                          <div className="flex items-center text-[10px] text-slate-400 gap-2">
                            <span className="w-20 text-slate-400 font-mono">Direct Scan:</span>
                            <div className="flex-1 bg-slate-900 rounded-full h-3 overflow-hidden">
                              <div className="bg-slate-700 h-full rounded-full" style={{ width: '75%' }} />
                            </div>
                            <span className="w-12 text-right font-mono">150 ms</span>
                          </div>
                          <div className="flex items-center text-[10px] text-slate-400 gap-2">
                            <span className="w-20 text-slate-400 font-mono">Index Query:</span>
                            <div className="flex-1 bg-slate-900 rounded-full h-3 overflow-hidden">
                              <div className="bg-teal-500 h-full rounded-full animate-pulse" style={{ width: '6%' }} />
                            </div>
                            <span className="w-12 text-right font-mono text-teal-400 font-bold">12 ms</span>
                          </div>
                        </div>
                        <div className="text-[9px] text-slate-500 text-center font-mono border-t border-slate-900 pt-1.5 mt-1">
                          92% query optimization through indexed search scopes.
                        </div>
                      </div>
                    </div>
                  )}

                  {project.title.includes('Learning Management') && (
                    <div className="mt-4 pt-4 border-t border-slate-200/40 dark:border-slate-800">
                      <span className="text-slate-800 dark:text-slate-200 font-bold block mb-3 text-[10px] uppercase tracking-wider">
                        BENCHMARK: USER SESSION DECODE LATENCY (ms)
                      </span>
                      <div className="h-28 w-full bg-slate-950 border border-slate-800 rounded p-3 flex flex-col justify-between font-sans">
                        <div className="space-y-2.5">
                          <div className="flex items-center text-[10px] text-slate-400 gap-2">
                            <span className="w-20 text-slate-400 font-mono">DB Session:</span>
                            <div className="flex-1 bg-slate-900 rounded-full h-3 overflow-hidden">
                              <div className="bg-slate-700 h-full rounded-full" style={{ width: '85%' }} />
                            </div>
                            <span className="w-12 text-right font-mono">320 ms</span>
                          </div>
                          <div className="flex items-center text-[10px] text-slate-400 gap-2">
                            <span className="w-20 text-slate-400 font-mono">AD OAuth:</span>
                            <div className="flex-1 bg-slate-900 rounded-full h-3 overflow-hidden">
                              <div className="bg-teal-500 h-full rounded-full animate-pulse" style={{ width: '7%' }} />
                            </div>
                            <span className="w-12 text-right font-mono text-teal-400 font-bold">18 ms</span>
                          </div>
                        </div>
                        <div className="text-[9px] text-slate-500 text-center font-mono border-t border-slate-900 pt-1.5 mt-1">
                          94% login speedup by offloading session decoding to clients.
                        </div>
                      </div>
                    </div>
                  )}

                  {project.title.includes('Enterprise AI Analytics') && (
                    <div className="mt-4 pt-4 border-t border-slate-200/40 dark:border-slate-800">
                      <span className="text-slate-800 dark:text-slate-200 font-bold block mb-3 text-[10px] uppercase tracking-wider">
                        BENCHMARK: FAILURE PREDICTION ACCURACY (%)
                      </span>
                      <div className="h-28 w-full bg-slate-950 border border-slate-800 rounded p-3 flex flex-col justify-between font-sans">
                        <div className="space-y-2.5">
                          <div className="flex items-center text-[10px] text-slate-400 gap-2">
                            <span className="w-20 text-slate-400 font-mono">Schedule Risk:</span>
                            <div className="flex-1 bg-slate-900 rounded-full h-3 overflow-hidden">
                              <div className="bg-teal-500 h-full rounded-full animate-pulse" style={{ width: '94%' }} />
                            </div>
                            <span className="w-12 text-right font-mono text-teal-400 font-bold">94%</span>
                          </div>
                          <div className="flex items-center text-[10px] text-slate-400 gap-2">
                            <span className="w-20 text-slate-400 font-mono">Config Setup:</span>
                            <div className="flex-1 bg-slate-900 rounded-full h-3 overflow-hidden">
                              <div className="bg-teal-500 h-full rounded-full animate-pulse" style={{ width: '88%' }} />
                            </div>
                            <span className="w-12 text-right font-mono text-teal-400 font-bold">88%</span>
                          </div>
                        </div>
                        <div className="text-[9px] text-slate-500 text-center font-mono border-t border-slate-900 pt-1.5 mt-1">
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
    </motion.div>
  );
}
