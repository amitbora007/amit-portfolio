import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SECTION_METADATA } from '../utils/navigation';

export default function SectionTransitionHUD() {
  const [transitionInfo, setTransitionInfo] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef(null);
  const lastSectionRef = useRef('hero');

  useEffect(() => {
    // 1. Listen for explicit programmatic transitions (CTA button, nav clicks, rail clicks)
    const handleExplicitTransition = (event) => {
      const { targetId, code, title } = event.detail;
      lastSectionRef.current = targetId;

      setTransitionInfo({
        id: targetId,
        code: code || '00',
        title: title || targetId.toUpperCase(),
        trigger: 'DIRECT_DISPATCH',
      });
      setIsVisible(true);

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 2200);
    };

    const sectionIds = Object.keys(SECTION_METADATA).filter((id) => id !== 'hero');

    // 2. Listen for scroll-driven section crossings
    let rafId = null;
    const handleScrollTransitions = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;

        const scrollY = window.scrollY;
        if (scrollY < 180) {
          if (lastSectionRef.current !== 'hero') {
            lastSectionRef.current = 'hero';
          }
          setIsVisible(false);
          return;
        }

        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= 120) {
              if (lastSectionRef.current !== id) {
                lastSectionRef.current = id;
                const meta = SECTION_METADATA[id];
                setTransitionInfo({
                  id,
                  code: meta.code,
                  title: meta.title,
                  trigger: 'VIEWPORT_ENTRY',
                });
                setIsVisible(true);

                if (timerRef.current) clearTimeout(timerRef.current);
                timerRef.current = setTimeout(() => {
                  setIsVisible(false);
                }, 1800);
              }
              break;
            }
          }
        }
      });
    };

    window.addEventListener('section-transition', handleExplicitTransition);
    window.addEventListener('scroll', handleScrollTransitions, { passive: true });

    return () => {
      window.removeEventListener('section-transition', handleExplicitTransition);
      window.removeEventListener('scroll', handleScrollTransitions);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <aside aria-label="Section Transition HUD" className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none select-none">
      <AnimatePresence>
        {isVisible && transitionInfo && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-slate-700/60 dark:border-slate-800 bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-md shadow-lg text-slate-200 text-xs font-mono"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
            <span className="text-teal-400/90 font-medium">[{transitionInfo.code}]</span>
            <span className="text-slate-500">/</span>
            <span className="text-slate-300 font-medium tracking-wide">
              {transitionInfo.title}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}
