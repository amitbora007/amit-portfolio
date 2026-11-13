import { motion, useReducedMotion } from 'framer-motion';

export default function SectionTransition({
  id,
  children,
  deckNumber,
  deckName,
  className = ""
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      id={id ? `deck-${id}` : undefined}
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05, margin: "-30px" }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={`relative w-full ${className}`}
    >
      {/* Quiet Section Transition Boundary */}
      {deckNumber && (
        <div className="w-full relative overflow-hidden pointer-events-none select-none z-20">
          <div className="fluid-canvas py-1 flex items-center justify-between text-xs font-mono text-slate-400 dark:text-slate-500 border-b border-slate-200/40 dark:border-slate-800/40">
            <div className="flex items-center gap-2">
              <span className="font-medium text-slate-500 dark:text-slate-400 tracking-wider">
                {deckNumber}
              </span>
              {deckName && (
                <>
                  <span className="text-slate-300 dark:text-slate-700">/</span>
                  <span className="uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {deckName}
                  </span>
                </>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600" />
              <span>ACTIVE</span>
            </div>
          </div>
        </div>
      )}

      {children}
    </motion.div>
  );
}
