import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Copy, Check } from 'lucide-react';

const codeSnippets = {
  payment: {
    title: 'PaymentIdempotency.ts',
    lang: 'typescript',
    code: `// Atomically verify & reserve idempotency token
export async function processEftTransaction(
  req: PaymentRequest,
  redis: RedisClient
): Promise<TransactionResult> {
  const tokenKey = \`idemp:\${req.idempotencyKey}\`;

  // Set lock with 120s TTL to prevent concurrent duplicate debit
  const acquired = await redis.set(tokenKey, 'PROCESSING', 'NX', 'EX', 120);
  if (!acquired) {
    return await pollExistingResult(tokenKey);
  }

  try {
    const clearingRes = await achGateway.transmit({
      routingNumber: req.routingNumber,
      amountCents: req.amountCents,
      merchantId: req.merchantId
    });

    await sqlLedger.commitDoubleEntry(clearingRes);
    await redis.set(tokenKey, JSON.stringify(clearingRes), 'EX', 86400);
    return clearingRes;
  } catch (err) {
    await redis.del(tokenKey); // release on transient abort
    throw err;
  }
}`
  },
  ai: {
    title: 'LangGraphAgent.py',
    lang: 'python',
    code: `from langgraph.graph import StateGraph, END
from langchain_core.messages import SystemMessage, HumanMessage

def build_support_agent():
    workflow = StateGraph(AgentState)

    # Register intelligent deterministic & LLM nodes
    workflow.add_node("intent_router", route_query_semantics)
    workflow.add_node("vector_retriever", fetch_mongodb_context)
    workflow.add_node("agent_synthesizer", call_grounded_gemini)

    # Conditional branching for < 100ms cache fast-path
    workflow.add_conditional_edges(
        "intent_router",
        evaluate_cache_hit,
        {"hit": END, "miss": "vector_retriever"}
    )
    workflow.add_edge("vector_retriever", "agent_synthesizer")
    workflow.add_edge("agent_synthesizer", END)

    return workflow.compile()`
  },
  reactive: {
    title: 'useSystemStream.ts',
    lang: 'typescript',
    code: `// High-frequency telemetry stream with auto-reconnect
export function useSystemStream(endpoint: string) {
  const [metrics, setMetrics] = useState<TelemetryPacket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(endpoint);
    ws.binaryType = 'arraybuffer';

    ws.onmessage = (event) => {
      const packet = decodeProtobuf(new Uint8Array(event.data));
      setMetrics(packet);
    };

    return () => ws.close();
  }, [endpoint]);

  return metrics;
}`
  }
};

export default function HeroPlayground() {
  const [activeTab, setActiveTab] = useState('mesh'); // 'mesh' | 'code' | 'telemetry'
  const [activeSnippetKey, setActiveSnippetKey] = useState('payment');
  const [copied, setCopied] = useState(false);
  const [simStep, setSimStep] = useState(0);

  // Simulated live packet pulse cycling through nodes (quiet 4s rhythm)
  useEffect(() => {
    if (activeTab !== 'mesh') return;
    const interval = setInterval(() => {
      setSimStep((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, [activeTab]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeSnippets[activeSnippetKey].code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="w-full glass-panel rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-2xl overflow-hidden backdrop-blur-xl bg-white/60 dark:bg-slate-950/70 transition-all duration-300">

      {/* Top Console Bar */}
      <div className="px-4 py-3 border-b border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between bg-slate-100/50 dark:bg-slate-900/50 text-xs font-mono">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700 inline-block" />
          </div>
          <span className="ml-2 font-medium text-slate-600 dark:text-slate-400 text-xs hidden sm:inline">
            SYSTEM CONSOLE // FULLSTACK ENGINE
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-200/60 dark:bg-slate-800/60 p-1 rounded-lg" role="tablist" aria-label="Engine Console Views">
          {[
            { id: 'mesh', label: 'Architecture' },
            { id: 'code', label: 'Code Sandbox' },
            { id: 'telemetry', label: 'Telemetry' },
          ].map((tab, idx, arr) => {
            const isTabActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`engine-tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={isTabActive}
                tabIndex={isTabActive ? 0 : -1}
                onClick={() => setActiveTab(tab.id)}
                onKeyDown={(e) => {
                  let nextIdx = null;
                  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                    e.preventDefault();
                    nextIdx = (idx + 1) % arr.length;
                  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                    e.preventDefault();
                    nextIdx = (idx - 1 + arr.length) % arr.length;
                  } else if (e.key === 'Home') {
                    e.preventDefault();
                    nextIdx = 0;
                  } else if (e.key === 'End') {
                    e.preventDefault();
                    nextIdx = arr.length - 1;
                  }
                  if (nextIdx !== null) {
                    setActiveTab(arr[nextIdx].id);
                    document.getElementById(`engine-tab-${arr[nextIdx].id}`)?.focus();
                  }
                }}
                className={`px-2.5 py-1 rounded text-xs font-medium tracking-wider uppercase transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                  isTabActive
                    ? 'bg-teal-700 text-white dark:bg-teal-950/90 dark:text-teal-300 border border-teal-700 dark:border-teal-500/50 shadow-sm font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Console Content Body */}
      <div className="p-4 sm:p-5 min-h-[360px] sm:min-h-[400px] flex flex-col justify-between">

        {/* TAB 1: Live Interactive Architecture Mesh */}
        {activeTab === 'mesh' && (
          <div className="space-y-4 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <Activity className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400" />
                Live Request Pipeline Simulation
              </span>
              <span className="text-emerald-700 dark:text-emerald-400 font-bold">[200+ TPS // IDEMPOTENT]</span>
            </div>

            {/* Architecture Node Flow Diagram */}
            <div className="relative py-6 px-3 bg-slate-950/90 border-y border-slate-800/80 blueprint-grid overflow-hidden">
              <div className="absolute top-2 right-3 font-mono text-xs text-slate-400">
                ACTIVE_STEP: {simStep === 0 ? 'CLIENT_INGRESS' : simStep === 1 ? 'API_GATEWAY_AUTH' : simStep === 2 ? 'ASYNC_WORKER_POOL' : 'LEDGER_ACID_COMMIT'}
              </div>

              <div className="flex flex-col gap-4">
                {/* Layer 1: Client to Gateway */}
                <div className="grid grid-cols-2 gap-3">
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setSimStep(0)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSimStep(0); }}
                    className={`p-3 transition-all duration-300 font-mono text-xs border-l-2 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-teal-500 ${
                      simStep === 0
                        ? 'border-l-teal-500 bg-teal-950/20 text-slate-200'
                        : 'border-l-slate-800 bg-slate-900/30 text-slate-400 hover:border-l-teal-500/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-xs text-teal-400">01. React Client UI</span>
                      <span className={`w-1.5 h-1.5 rounded-full ${simStep === 0 ? 'bg-teal-400' : 'bg-slate-700'}`} />
                    </div>
                    <p className="text-xs text-slate-400 font-sans leading-snug">
                      Zod validation, optimistic updates & idempotency UUID v4 generation.
                    </p>
                  </div>

                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setSimStep(1)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSimStep(1); }}
                    className={`p-3 transition-all duration-300 font-mono text-xs border-l-2 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-teal-500 ${
                      simStep === 1
                        ? 'border-l-teal-500 bg-teal-950/20 text-slate-200'
                        : 'border-l-slate-800 bg-slate-900/30 text-slate-400 hover:border-l-teal-500/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-xs text-teal-400">02. API Gateway</span>
                      <span className={`w-1.5 h-1.5 rounded-full ${simStep === 1 ? 'bg-teal-400' : 'bg-slate-700'}`} />
                    </div>
                    <p className="text-xs text-slate-400 font-sans leading-snug">
                      FastAPI / Restler, Azure AD token verification & rate limiter.
                    </p>
                  </div>
                </div>

                {/* Packet Trail Indicator */}
                <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden relative">
                  <motion.div
                    className="h-full w-24 bg-gradient-to-r from-transparent via-teal-500/50 to-transparent"
                    animate={{ x: ['-100%', '500%'] }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                  />
                </div>

                {/* Layer 2: Microservices & Data Layer */}
                <div className="grid grid-cols-2 gap-3">
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setSimStep(2)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSimStep(2); }}
                    className={`p-3 transition-all duration-300 font-mono text-xs border-l-2 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-teal-500 ${
                      simStep === 2
                        ? 'border-l-teal-500 bg-teal-950/20 text-slate-200'
                        : 'border-l-slate-800 bg-slate-900/30 text-slate-400 hover:border-l-teal-500/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-xs text-teal-400">03. Event Bus & Cache</span>
                      <span className={`w-1.5 h-1.5 rounded-full ${simStep === 2 ? 'bg-teal-400' : 'bg-slate-700'}`} />
                    </div>
                    <p className="text-xs text-slate-400 font-sans leading-snug">
                      Azure Service Bus queues, DLQ retries & Redis distributed lock.
                    </p>
                  </div>

                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setSimStep(3)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSimStep(3); }}
                    className={`p-3 transition-all duration-300 font-mono text-xs border-l-2 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-teal-500 ${
                      simStep === 3
                        ? 'border-l-teal-500 bg-teal-950/20 text-slate-200'
                        : 'border-l-slate-800 bg-slate-900/30 text-slate-400 hover:border-l-teal-500/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-xs text-teal-400">04. Ledger & AI Core</span>
                      <span className={`w-1.5 h-1.5 rounded-full ${simStep === 3 ? 'bg-teal-400' : 'bg-slate-700'}`} />
                    </div>
                    <p className="text-xs text-slate-400 font-sans leading-snug">
                      Postgres ACID ledger, LangGraph agents & MongoDB vector embeddings.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Metrics HUD */}
            <div className="grid grid-cols-3 divide-x divide-slate-200/60 dark:divide-slate-800/60 pt-3 border-t border-slate-200/60 dark:border-slate-800/60 font-mono text-center">
              <div className="px-2">
                <span className="block text-xs text-slate-400 uppercase">Throughput</span>
                <span className="text-sm font-bold text-brand-600 dark:text-brand-400">200+ TPS</span>
              </div>
              <div className="px-2">
                <span className="block text-xs text-slate-400 uppercase">Latency Drop</span>
                <span className="text-sm font-bold text-cyan-600 dark:text-cyan-400">33% - 40%</span>
              </div>
              <div className="px-2">
                <span className="block text-xs text-slate-400 uppercase">Automation</span>
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">70%+ Resolved</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Production Code Sandbox */}
        {activeTab === 'code' && (
          <div className="space-y-3 flex flex-col justify-between h-full">
            {/* Snippet Selection Tabs */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
              <div className="flex gap-2" role="tablist" aria-label="Code Snippet Selection">
                {Object.keys(codeSnippets).map((key, idx, arr) => {
                  const isSnippetActive = activeSnippetKey === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      role="tab"
                      id={`snippet-tab-${key}`}
                      aria-controls={`snippet-panel-${key}`}
                      aria-selected={isSnippetActive}
                      tabIndex={isSnippetActive ? 0 : -1}
                      onClick={() => setActiveSnippetKey(key)}
                      onKeyDown={(e) => {
                        let nextIdx = null;
                        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                          e.preventDefault();
                          nextIdx = (idx + 1) % arr.length;
                        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                          e.preventDefault();
                          nextIdx = (idx - 1 + arr.length) % arr.length;
                        } else if (e.key === 'Home') {
                          e.preventDefault();
                          nextIdx = 0;
                        } else if (e.key === 'End') {
                          e.preventDefault();
                          nextIdx = arr.length - 1;
                        }
                        if (nextIdx !== null) {
                          const targetKey = arr[nextIdx];
                          setActiveSnippetKey(targetKey);
                          document.getElementById(`snippet-tab-${targetKey}`)?.focus();
                        }
                      }}
                      className={`text-xs font-mono px-2 py-1 rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                        isSnippetActive
                          ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400 font-bold border border-brand-500/30'
                          : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                      }`}
                    >
                      {codeSnippets[key].title}
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1 text-xs font-mono text-slate-500 hover:text-brand-500 transition-colors p-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                title="Copy snippet"
                aria-label={copied ? 'Code snippet copied' : 'Copy code snippet'}
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Code Body */}
            <div
              id={`snippet-panel-${activeSnippetKey}`}
              role="tabpanel"
              aria-labelledby={`snippet-tab-${activeSnippetKey}`}
              className="bg-slate-950 text-slate-200 rounded-lg p-3 font-mono text-xs leading-relaxed overflow-x-auto max-h-[280px] custom-scrollbar border border-slate-800/80"
            >
              <pre>
                <code>{codeSnippets[activeSnippetKey].code}</code>
              </pre>
            </div>

            <div className="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center justify-between pt-1">
              <span>PROD_VERIFIED: Production deployment pattern</span>
              <span className="text-teal-700 dark:text-teal-400 font-bold">100% Type-Safe</span>
            </div>
          </div>
        )}

        {/* TAB 3: Telemetry Live Gauges */}
        {activeTab === 'telemetry' && (
          <div className="space-y-4 flex flex-col justify-between h-full font-mono">
            <div className="flex items-center justify-between text-xs border-b border-slate-200 dark:border-slate-800 pb-2">
              <span className="text-slate-600 dark:text-slate-400 font-bold">LIVE CLOUD TELEMETRY DECK</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                HEALTH: OPTIMAL
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 py-1">
              {/* Gauge 1 */}
              <div className="space-y-1">
                <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">API Gateway P99</span>
                <div className="text-xl font-bold text-teal-700 dark:text-teal-400">28.4 ms</div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-teal-500 h-full rounded-full w-[24%]" />
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">Target: &lt; 50ms</span>
              </div>

              {/* Gauge 2 */}
              <div className="space-y-1">
                <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">ACID Throughput</span>
                <div className="text-xl font-bold text-cyan-700 dark:text-cyan-400">242 TPS</div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-cyan-500 h-full rounded-full w-[82%]" />
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">Peak: 300 TPS max</span>
              </div>

              {/* Gauge 3 */}
              <div className="space-y-1">
                <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">Dead-Letter Requeue</span>
                <div className="text-xl font-bold text-emerald-700 dark:text-emerald-400">0.002%</div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full w-[2%]" />
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">Zero Unhandled Aborts</span>
              </div>

              {/* Gauge 4 */}
              <div className="space-y-1">
                <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">Vector Cache Hit</span>
                <div className="text-xl font-bold text-indigo-700 dark:text-indigo-400">76.8%</div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full rounded-full w-[76%]" />
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">Saves LLM tokens</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/60 text-slate-500 dark:text-slate-400 text-xs flex items-center justify-between">
              <span>REGIONS: Azure East US • AWS ap-south-1</span>
              <span className="text-teal-600 dark:text-teal-400 font-bold">UPTIME: 99.98%</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
