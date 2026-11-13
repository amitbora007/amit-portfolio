import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, CheckCircle2, ChevronRight, Terminal, Building2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Experience() {
  const { experience } = portfolioData;

  // Flatten roles with company info for interactive navigation
  const allRoles = (experience || []).flatMap((comp) =>
    comp.roles.map((role) => ({
      ...role,
      company: comp.company,
      location: comp.location,
    }))
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeRole = allRoles[selectedIndex] || allRoles[0];

  return (
    <section id="experience" className="py-24 border-t border-slate-200/60 dark:border-slate-800/60 bg-transparent scroll-mt-20">
      <div className="fluid-canvas w-full">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-16">
          <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-slate-100 tracking-tight leading-tight max-w-3xl">
            Professional Experience & System Deliveries
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
            7+ years of progressive engineering leadership architecting distributed payment systems, cloud-native services, and enterprise web applications.
          </p>
        </div>

        {/* Widescreen Dual-Pane Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column (5 cols): Interactive Role Switcher Deck */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 px-1 mb-2 flex items-center justify-between">
              <span>{allRoles.length} POSITIONS HELD</span>
            </div>

            <div className="space-y-2.5">
              {allRoles.map((role, idx) => {
                const isActive = selectedIndex === idx;
                return (
                  <button
                    key={`${role.company}-${role.title}`}
                    type="button"
                    onClick={() => setSelectedIndex(idx)}
                    aria-pressed={isActive}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-300 border relative flex items-center justify-between group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                      isActive
                        ? 'bg-white dark:bg-slate-900 border-brand-500 shadow-sm'
                        : 'bg-white/60 dark:bg-slate-900/50 border-slate-200/80 dark:border-slate-800/80 hover:border-brand-500/40 hover:bg-white dark:hover:bg-slate-900'
                    }`}
                  >
                    {/* Active Indicator */}
                    {isActive && (
                      <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-teal-500 rounded-r" />
                    )}

                    <div className="space-y-1 pl-2">
                      <div className="flex items-center gap-2">
                        <Building2 className={`h-3.5 w-3.5 ${isActive ? 'text-teal-600 dark:text-teal-400' : 'text-slate-400'}`} />
                        <span className={`text-xs font-mono font-bold ${isActive ? 'text-teal-700 dark:text-teal-300' : 'text-slate-600 dark:text-slate-400'}`}>
                          {role.company}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100 group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors">
                        {role.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                        <Calendar className="h-3 w-3" />
                        <span>{role.period}</span>
                      </div>
                    </div>

                    <ChevronRight className={`h-4 w-4 transition-transform duration-300 shrink-0 ${
                      isActive ? 'text-teal-600 dark:text-teal-400 translate-x-1' : 'text-slate-300 dark:text-slate-700 group-hover:text-slate-400'
                    }`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column (7 cols): Detailed Architectural Briefing Sheet */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeRole.company}-${activeRole.title}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-7 sm:p-9 shadow-sm relative overflow-hidden"
              >
                {/* Top Accent Hairline */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-teal-500/60" />

                {/* Briefing Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-5 mb-6">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-teal-700 dark:text-teal-300 font-bold block mb-1">
                      {activeRole.company} • BRIEFING SHEET
                    </span>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900 dark:text-slate-100 tracking-tight">
                      {activeRole.title}
                    </h3>
                  </div>

                  <div className="flex flex-col sm:items-end gap-1 font-mono text-xs text-slate-600 dark:text-slate-400">
                    <span className="flex items-center gap-1.5 bg-teal-500/10 text-teal-700 dark:text-teal-300 px-3 py-1 rounded-md font-bold">
                      <Calendar className="h-3.5 w-3.5" />
                      {activeRole.period}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                      <MapPin className="h-3 w-3" />
                      {activeRole.location}
                    </span>
                  </div>
                </div>

                {/* Key Deliveries and System Highlights */}
                <div className="space-y-4 mb-6">
                  <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                    Core Architectural Deliverables
                  </span>
                  <ul className="space-y-3.5">
                    {activeRole.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed group">
                        <CheckCircle2 className="h-4.5 w-4.5 text-brand-500 shrink-0 mt-0.5" />
                        <span className="flex-1">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Telemetry Badge */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="h-3.5 w-3.5 text-brand-500" />
                    TENURE VERIFIED IN PROD
                  </span>
                  <span className="text-emerald-500 font-bold">100% DELIVERY RATE</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
