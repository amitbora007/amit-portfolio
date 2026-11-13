import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { smoothScrollTo } from '../utils/navigation';


const sections = [
  { id: 'hero', label: 'Top / Hero', code: '00' },
  { id: 'about', label: 'About Architect', code: '01' },
  { id: 'metrics', label: 'Measured Impact', code: '02' },
  { id: 'experience', label: 'Career Timeline', code: '03' },
  { id: 'projects', label: 'Case Studies', code: '04' },
  { id: 'skills', label: 'Skill Matrix', code: '05' },
  { id: 'credentials', label: 'Credentials', code: '06' },
  { id: 'achievements', label: 'Honors & Reviews', code: '07' },
  { id: 'contact', label: 'Dispatch Contact', code: '08' },
];

export default function SectionNavRail() {
  const [activeSection, setActiveSection] = useState('hero');
  const [hoveredSection, setHoveredSection] = useState(null);

  useEffect(() => {
    let rafId = null;

    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const scrollPosition = window.scrollY;
        if (scrollPosition < 180) {
          setActiveSection((prev) => (prev !== 'hero' ? 'hero' : prev));
          return;
        }

        for (const s of sections) {
          const el = document.getElementById(s.id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.15) {
              setActiveSection((prev) => (prev !== s.id ? s.id : prev));
              break;
            }
          }
        }

      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollToSection = (e, id) => {
    smoothScrollTo(id, e);
  };


  return (
    <aside
      aria-label="Section Fast-Nav Rail"
      className="fixed right-5 2xl:right-8 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-2.5 p-2 rounded-full border border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-950/60 backdrop-blur-md shadow-lg select-none"
    >
      <div className="w-[1px] h-3 bg-gradient-to-b from-transparent to-brand-500/40" />

      {sections.map((section) => {
        const isActive = activeSection === section.id;
        const isHovered = hoveredSection === section.id;

        return (
          <div key={section.id} className="relative flex items-center">
            {/* Tooltip on Left */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, x: 8, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-full mr-3 px-2.5 py-1 rounded-md bg-slate-950 text-white dark:bg-white dark:text-slate-950 text-xs font-mono whitespace-nowrap shadow-xl pointer-events-none z-50 flex items-center gap-1.5"
                >
                  <span className="text-brand-400 dark:text-brand-600 font-bold">[{section.code}]</span>
                  <span>{section.label}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Nav Node Button */}
            <button
              type="button"
              onClick={(e) => scrollToSection(e, section.id)}
              onMouseEnter={() => setHoveredSection(section.id)}
              onMouseLeave={() => setHoveredSection(null)}
              onFocus={() => setHoveredSection(section.id)}
              onBlur={() => setHoveredSection(null)}
              aria-label={`Jump to ${section.label}`}
              aria-current={isActive ? 'location' : undefined}
              className="w-7 h-7 flex items-center justify-center rounded-full group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              <div className="relative flex items-center justify-center">
                {/* Active Outer Ring */}
                {isActive && (
                  <motion.div
                    layoutId="activeRailRing"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    className="absolute -inset-1.5 rounded-full border border-teal-500 bg-teal-500/10 ring-2 ring-teal-500/20 shadow-sm"
                  />
                )}

                {/* Node Center Dot */}
                <div
                  className={`rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-2.5 h-2.5 bg-teal-500 scale-110 shadow-sm ring-1 ring-teal-400'
                      : 'w-1.5 h-1.5 bg-slate-400/60 dark:bg-slate-600 group-hover:scale-110 group-hover:bg-brand-400'
                  }`}
                />
              </div>
            </button>
          </div>
        );
      })}

      <div className="w-[1px] h-3 bg-gradient-to-t from-transparent to-brand-500/40" />
    </aside>
  );
}
