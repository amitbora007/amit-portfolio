import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { Shield, CreditCard, CloudLightning, Cpu, Activity, Link, Layers } from 'lucide-react';

const icons = [Shield, CreditCard, CloudLightning, Cpu];

export default function About() {
  const { about } = portfolioData;

  return (
    <section id="about" className="py-24 px-6 border-t border-slate-100 dark:border-slate-900 bg-transparent">
      <div className="max-w-7xl mx-auto">

        {/* Editorial Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">

          {/* Headline and Narrative Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="text-xs uppercase tracking-widest text-brand-600 dark:text-brand-400 font-bold">
              ABOUT AMIT BORA
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-800 dark:text-slate-100 tracking-tight leading-tight">
              Engineering reliable backends with a systems-first mindset.
            </h2>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
              {about.narrative}
            </p>
            <div className="p-4 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 text-xs font-mono text-slate-500 dark:text-slate-400">
              <span className="text-brand-600 dark:text-brand-400 font-bold block mb-1">SYSTEMS FOCUS</span>
              "Complexity is the enemy of reliability. I design systems with high isolation boundaries, explicit interface contracts, and trace diagnostics to assure rapid failure containment."
            </div>
          </div>

          {/* Telemetry Node Headshot Column */}
          <div className="lg:col-span-3 flex flex-col items-center justify-center w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 shadow-sm w-full group overflow-hidden"
            >
              <div className="relative rounded-lg overflow-hidden border border-slate-100 dark:border-slate-950 bg-slate-100 dark:bg-slate-950 aspect-[3/4]">
                <img
                  src="/Amit.webp"
                  alt="Amit Bora"
                  width={300}
                  height={400}
                  loading="lazy"
                  className="w-full h-full object-cover filter grayscale contrast-115 brightness-95 opacity-85 dark:opacity-70 group-hover:filter-none group-hover:opacity-100 transition-all duration-500"
                />
                
                {/* Status Indicator Pill */}
                <div className="absolute bottom-2.5 right-2.5 px-2 py-1 bg-slate-900/90 dark:bg-slate-950/90 border border-slate-800 dark:border-slate-800 rounded font-mono text-[8px] text-slate-300 flex items-center gap-1.5 backdrop-blur-sm select-none z-20">
                  <span>[OPERATOR: ONLINE]</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Focus Points Column */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {about.focusPoints.map((point, index) => {
              const FocusIcon = icons[index % icons.length];
              return (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4.5 rounded-xl hover:border-slate-300 dark:hover:border-slate-800 hover:bg-slate-100/10 dark:hover:bg-slate-800/10 transition-all duration-300 shadow-sm dark:shadow-none flex gap-3.5 items-start"
                >
                  <div className="w-8.5 h-8.5 rounded-lg bg-brand-500/5 dark:bg-brand-500/10 flex items-center justify-center text-brand-700 dark:text-brand-400 shrink-0 mt-0.5">
                    <FocusIcon className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm text-slate-800 dark:text-slate-100 mb-1 leading-snug">
                      {point.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* Engineering Principles Section */}
        <div className="mt-20 pt-16 border-t border-slate-200/60 dark:border-slate-900/60">
          <div className="flex flex-col items-center text-center gap-3 mb-12">
            <div className="text-[10px] tracking-widest font-bold text-brand-650 dark:text-brand-400 uppercase font-mono">
              Core Philosophies
            </div>
            <h3 className="font-display font-extrabold text-xl sm:text-2xl text-slate-800 dark:text-slate-100 tracking-tight">
              Engineering Principles
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-500 max-w-md">
              How I approach architecture, scale, and operational robustness in production environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Principle 1: Failure Isolation */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl relative group overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-emerald-500/5 hover:border-emerald-500/30 dark:hover:border-emerald-500/30"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-500/5 dark:bg-emerald-500/10 group-hover:bg-emerald-500/15 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4 group-hover:scale-110 transition-all duration-300">
                <Layers className="h-5 w-5" />
              </div>
              <div className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 mb-2 font-bold tracking-wider">[01] FAILURE ISOLATION</div>
              <h4 className="font-display font-bold text-base text-slate-800 dark:text-slate-200 mb-2">Bulkheads & Queue Decoupling</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Systems fail. I build with bulkhead patterns, circuit breakers, and asynchronous message pipes so outages in secondary integrations (like third-party bank APIs) do not halt core transaction clearing.
              </p>
              <div className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>

            {/* Principle 2: Explicit Contracts */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl relative group overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-teal-500/5 hover:border-teal-500/30 dark:hover:border-teal-500/30"
            >
              <div className="w-10 h-10 rounded-lg bg-teal-500/5 dark:bg-teal-500/10 group-hover:bg-teal-500/15 flex items-center justify-center text-teal-600 dark:text-teal-400 mb-4 group-hover:scale-110 transition-all duration-300">
                <Link className="h-5 w-5" />
              </div>
              <div className="font-mono text-[10px] text-teal-600 dark:text-teal-400 mb-2 font-bold tracking-wider">[02] EXPLICIT CONTRACTS</div>
              <h4 className="font-display font-bold text-base text-slate-800 dark:text-slate-200 mb-2">Schema-First Enforcements</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Loose boundaries lead to silent schema drifts. I validate transactional payloads using Zod (React/Node) and Django/FastAPI schemas, rejecting runtime deviations immediately at the API gate.
              </p>
              <div className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-transparent via-teal-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>

            {/* Principle 3: Trace Telemetry */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl relative group overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-indigo-500/5 hover:border-indigo-500/30 dark:hover:border-indigo-500/30"
            >
              <div className="w-10 h-10 rounded-lg bg-indigo-500/5 dark:bg-indigo-500/10 group-hover:bg-indigo-500/15 flex items-center justify-center text-indigo-650 dark:text-indigo-400 mb-4 group-hover:scale-110 transition-all duration-300">
                <Activity className="h-5 w-5" />
              </div>
              <div className="font-mono text-[10px] text-indigo-650 dark:text-indigo-400 mb-2 font-bold tracking-wider">[03] TRACE TELEMETRY</div>
              <h4 className="font-display font-bold text-base text-slate-800 dark:text-slate-200 mb-2">Distributed Log Correlation</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Debugging distributed servers blindly is costly. I implement correlation Trace IDs across serverless routes and service queues, tracking user journeys to shrink Mean Time to Resolution (MTTR).
              </p>
              <div className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}
