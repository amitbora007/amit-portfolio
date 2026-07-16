import { motion } from 'framer-motion';
import { Calendar, CreditCard, Cloud, Cpu } from 'lucide-react';

const iconMap = {
  'Experience': Calendar,
  'Focus': CreditCard,
  'Cloud': Cloud,
  'AI Integration': Cpu
};

const telemetryMap = {
  'Experience': 'RUN_TIME: 52,560H',
  'Focus': 'PROTOCOL: EFT/ACH',
  'Cloud': 'SLAS: 99.95%_UP',
  'AI Integration': 'MODEL: LLM_RAG_VEC'
};

export default function TrustCard({ label, value, index }) {
  const Icon = iconMap[label] || Calendar;
  const telemetry = telemetryMap[label] || 'SYS_STATUS: OK';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
      className="glass-card hover:border-brand-500/40 dark:hover:border-brand-400/30 hover:bg-slate-50/40 dark:hover:bg-slate-900/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-brand-500/5 rounded-lg p-5 flex flex-col gap-3 group relative overflow-hidden font-mono border border-slate-200 dark:border-slate-800"
    >
      {/* Background blueprint microdot effect on hover */}
      <div className="absolute inset-0 blueprint-grid opacity-0 group-hover:opacity-[0.12] transition-opacity duration-300 pointer-events-none" />

      {/* Top Accent Glowing Line Emitter */}
      <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-brand-500 dark:bg-brand-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

      {/* Header Bar */}
      <div className="flex items-center justify-between z-10">
        <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block group-hover:scale-110 group-hover:bg-emerald-400 transition-all duration-300" />
          {label}
        </span>
        <Icon className="h-4 w-4 text-slate-400 dark:text-slate-600 group-hover:text-brand-500 dark:group-hover:text-brand-400 transition-colors duration-300" />
      </div>

      {/* Value */}
      <div className="font-display font-black text-lg text-slate-800 dark:text-slate-100 group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors duration-300 z-10 leading-snug">
        {value}
      </div>

      {/* Diagnostic telemetry subtext */}
      <div className="text-[9px] text-slate-400 dark:text-slate-500 border-t border-dashed border-slate-200 dark:border-slate-800/80 pt-2 flex items-center justify-between font-mono z-10">
        <span className="text-slate-400/80 dark:text-slate-600">SYS_STATUS</span>
        <span className="text-emerald-500 dark:text-emerald-400 font-semibold group-hover:hidden transition-all duration-200">
          NOMINAL
        </span>
        <span className="hidden group-hover:inline text-brand-600 dark:text-brand-400 font-bold transition-all duration-200 animate-pulse">
          [{telemetry}]
        </span>
      </div>

      {/* Hardware styling accents */}
      <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-brand-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-brand-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}
