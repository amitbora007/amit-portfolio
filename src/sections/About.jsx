import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { Activity, Link, Layers, Database, Sparkles } from 'lucide-react';
import TiltCard from '../components/TiltCard';

const engineeringGuarantees = [
  {
    code: '[01] FAILURE ISOLATION',
    title: 'Bulkheads & Queue Decoupling',
    icon: Layers,
    color: 'emerald',
    desc: 'Systems fail. I build with bulkhead patterns, circuit breakers, and asynchronous message pipes so outages in secondary integrations (like third-party bank APIs) do not halt core transaction clearing.'
  },
  {
    code: '[02] EXPLICIT CONTRACTS',
    title: 'Schema-First Enforcements',
    icon: Link,
    color: 'teal',
    desc: 'Loose boundaries lead to silent schema drifts. I validate transactional payloads using Zod (React/Node) and Django/FastAPI schemas, rejecting runtime deviations immediately at the API gate.'
  },
  {
    code: '[03] TRACE TELEMETRY',
    title: 'Distributed Log Correlation',
    icon: Activity,
    color: 'cyan',
    desc: 'Debugging distributed servers blindly is costly. I implement correlation Trace IDs across serverless routes and service queues, tracking user journeys to shrink Mean Time to Resolution (MTTR).'
  },
  {
    code: '[04] TRANSACTION INTEGRITY',
    title: 'Idempotency & ACID Ledgers',
    icon: Database,
    color: 'indigo',
    desc: 'Financial and inventory records require zero tolerance for duplicates. I deploy distributed Redis locks, optimistic locking in SQL Server/Postgres, and double-entry audit ledgers.'
  }
];

export default function About() {
  const { about } = portfolioData;

  return (
    <section id="about" className="py-24 border-t border-slate-200/60 dark:border-slate-800/60 bg-transparent scroll-mt-20">
      <div className="fluid-canvas w-full">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-16">
          <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-slate-100 tracking-tight leading-tight max-w-3xl">
            Engineering resilient fullstack applications with an architectural, systems-first approach.
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
            Bridging pixel-perfect frontend engineering, high-throughput cloud microservices, and practical machine learning automation.
          </p>
        </div>

        {/* Multi-Span Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch mb-12">

          {/* Bento Tile 1 (6 cols): Engineering Manifesto & Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-7 rounded-2xl shadow-sm flex flex-col justify-between relative group hover:border-brand-500/40 hover:shadow-md transition-all duration-300"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-brand-600 dark:text-brand-400 font-bold tracking-wider uppercase">
                  Systems Philosophy
                </span>
                <span className="text-slate-500 dark:text-slate-400 font-bold">7+ YRS IN PROD</span>
              </div>

              <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900 dark:text-slate-100 leading-snug">
                Turning complex distributed requirements into intuitive, reliable products.
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {about.narrative}
              </p>

              {/* Systems Quote Block */}
              <div className="p-3.5 rounded-xl border border-brand-500/20 bg-brand-500/5 text-xs font-mono text-slate-700 dark:text-slate-300 relative overflow-hidden">
                <span className="text-brand-600 dark:text-brand-400 font-bold block mb-1">
                  SYSTEMS FOCUS
                </span>
                "Complexity is the enemy of reliability. I design fullstack architectures with clear interface boundaries, type-safe contracts, and end-to-end telemetry to assure rapid failure containment."
              </div>

              {/* Core Architecture Pillars */}
              <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs font-mono pt-1 text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                  <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">High-Throughput APIs</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">Failure Isolation</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />
                  <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">Idempotent Ledgers</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                  <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">Trace Telemetry</span>
                </div>
              </div>
            </div>

            {/* Micro stats inside Tile 1 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-5 mt-5 border-t border-slate-100 dark:border-slate-800 text-center font-mono">
              <div className="p-2 rounded bg-slate-50 dark:bg-slate-950/50">
                <span className="block text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">Exp</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">7+ Years</span>
              </div>
              <div className="p-2 rounded bg-slate-50 dark:bg-slate-950/50">
                <span className="block text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">TPS Peak</span>
                <span className="text-xs font-bold text-teal-700 dark:text-teal-400">200+</span>
              </div>
              <div className="p-2 rounded bg-slate-50 dark:bg-slate-950/50">
                <span className="block text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">Papers</span>
                <span className="text-xs font-bold text-cyan-700 dark:text-cyan-400">3 IEEE</span>
              </div>
              <div className="p-2 rounded bg-slate-50 dark:bg-slate-950/50">
                <span className="block text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">Uptime</span>
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">99.98%</span>
              </div>
            </div>
          </motion.div>

          {/* Bento Tile 2 (3 cols): 3D Headshot & Telemetry */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3 flex flex-col items-center justify-between"
          >
            <TiltCard
              maxTilt={6}
              scale={1.015}
              glare={true}
              glareOpacity={0.08}
              className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 shadow-sm w-full h-full flex flex-col justify-between group hover:border-brand-500/40 hover:shadow-md transition-all duration-300"
            >
              <div className="relative rounded-xl overflow-hidden border border-slate-100 dark:border-slate-950 bg-slate-100 dark:bg-slate-950 aspect-[4/5] max-h-[360px] w-full mx-auto">
                <img
                  src="/Amit.webp"
                  alt="Amit Bora"
                  width={360}
                  height={450}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.opacity = '0';
                  }}
                  className="w-full h-full object-cover filter grayscale contrast-115 brightness-95 opacity-90 dark:opacity-85 group-hover:filter-none group-hover:opacity-100 transition-all duration-500"
                />

                {/* Floating Operator Badge */}
                <div
                  className="absolute bottom-3 right-3 px-2.5 py-1 bg-slate-950/90 border border-slate-800 rounded-md font-mono text-xs text-slate-300 flex items-center gap-1.5 backdrop-blur-sm select-none z-20 shadow-lg pointer-events-none"
                  style={{ transform: 'translateZ(26px)' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>OPERATOR: ACTIVE</span>
                </div>
              </div>

              {/* Card Footer Telemetry */}
              <div className="pt-3 font-mono text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between w-full">
                <span>📍 New Delhi, India</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">AVAILABLE</span>
              </div>
            </TiltCard>
          </motion.div>

          {/* Bento Tile 3 (3 cols): Fullstack Convergence Matrix */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-6 rounded-2xl shadow-sm flex flex-col justify-between hover:border-brand-500/40 hover:shadow-md transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-3">
                <span className="text-brand-600 dark:text-brand-400 font-bold uppercase tracking-wider">
                  Convergence Deck
                </span>
                <Sparkles className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400" />
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-xs">
                {/* Layer 1: Client */}
                <div className="py-2.5 first:pt-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-sky-700 dark:text-sky-300">01. UI & State</span>
                    <span className="text-xs font-mono text-sky-600 dark:text-sky-400 font-semibold">React 19</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                    Accessible design systems & reactive state stores.
                  </p>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1">
                    TypeScript • Tailwind • Zod Contracts
                  </div>
                </div>

                {/* Layer 2: API & Gateway */}
                <div className="py-2.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-teal-700 dark:text-teal-300">02. Services & Bus</span>
                    <span className="text-xs font-mono text-teal-600 dark:text-teal-400 font-semibold">FastAPI</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                    Asynchronous queues, dead-letter routing & REST APIs.
                  </p>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1">
                    Azure Service Bus • Django • Docker
                  </div>
                </div>

                {/* Layer 3: Persistence */}
                <div className="py-2.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-emerald-700 dark:text-emerald-300">03. Storage & Cache</span>
                    <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">Postgres</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                    ACID transactions & sub-millisecond memory caching.
                  </p>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1">
                    PostgreSQL • Redis • SQL Server
                  </div>
                </div>

                {/* Layer 4: AI Core */}
                <div className="py-2.5 last:pb-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-indigo-700 dark:text-indigo-300">04. Intelligence</span>
                    <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-semibold">LangGraph</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                    Vector search caching & predictive ML pipelines.
                  </p>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1">
                    RAG • MongoDB Vector • Python ML
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-mono text-slate-500 dark:text-slate-400 text-center">
              END-TO-END SYSTEM HARMONY
            </div>
          </motion.div>

        </div>

        {/* Bento Tile 4 (Full 12 cols): 4 Core Engineering Guarantees */}
        <div className="mt-8">
          <div className="text-center mb-8">
            <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900 dark:text-slate-100 text-balance">
              Four Core Engineering Guarantees
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {engineeringGuarantees.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.code}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl relative group overflow-hidden transition-all duration-300 hover:border-brand-500/40 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center text-brand-600 dark:text-brand-400 mb-4 transition-colors duration-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="font-mono text-xs text-teal-700 dark:text-teal-400 mb-1.5 font-bold tracking-wider">
                      {item.code}
                    </div>
                    <h4 className="font-display font-bold text-base text-slate-900 dark:text-slate-100 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Accent Hairline Bottom Border */}
                  <div className="absolute inset-x-0 bottom-0 h-[1.5px] bg-teal-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
