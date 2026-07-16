import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Briefcase, MapPin, Calendar } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Experience() {
  const { experience } = portfolioData;
  const containerRef = useRef(null);

  // Hook scroll progress relative to target section element
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  });

  // Smooth out coordinate tracking with spring damping
  const scaleY = useSpring(scrollYProgress, { stiffness: 45, damping: 15 });

  return (
    <section id="experience" className="py-24 px-6 border-t border-slate-100 dark:border-slate-900 bg-transparent">
      <div className="max-w-5xl mx-auto">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <div className="text-xs uppercase tracking-widest text-brand-600 dark:text-brand-400 font-bold">
            CAREER TIMELINE
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-800 dark:text-slate-100 tracking-tight leading-tight">
            Professional Experience
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed">
            A progression of building, securing, and scaling distributed backend architectures for enterprise operations.
          </p>
        </div>

        {/* Timeline container */}
        <div ref={containerRef} className="relative ml-4 sm:ml-6 space-y-12">
          {/* Static gray timeline track */}
          <div className="absolute left-0 top-3 bottom-3 w-[1px] bg-slate-200 dark:bg-slate-800" />

          {/* Glowing laser progress track */}
          <motion.div
            style={{ scaleY }}
            className="absolute left-0 top-3 bottom-3 w-[1.5px] bg-gradient-to-b from-brand-600 to-teal-400 dark:from-brand-500 dark:to-teal-350 origin-top shadow-[0_0_8px_rgba(20,184,166,0.6)]"
          />

          {experience.map((company) => (
            <div key={company.company} className="relative pl-8 sm:pl-10">

              {/* Timeline dot / briefcase icon */}
              <div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center justify-center text-brand-600 dark:text-brand-500 shadow-sm">
                <Briefcase className="h-3.5 w-3.5" />
              </div>

              {/* Company Header */}
              <div className="mb-6">
                <h3 className="font-display font-extrabold text-2xl text-slate-800 dark:text-slate-100 tracking-tight">
                  {company.company}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 mt-1">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{company.location}</span>
                </div>
              </div>

              {/* Roles under this company */}
              <div className="space-y-8">
                {company.roles.map((role, roleIdx) => (
                  <motion.div
                    key={role.title}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: roleIdx * 0.1 }}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-lg shadow-sm hover:border-brand-500/30 dark:hover:border-brand-500/30 hover:bg-slate-50/50 dark:hover:bg-slate-800/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-brand-500/5 relative group overflow-hidden"
                  >
                    {/* Left Accent Slide-down Emitter */}
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-brand-500 dark:bg-brand-400 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />

                    {/* Role title and dates */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 border-b border-slate-100 dark:border-slate-950 pb-3">
                      <h4 className="font-display font-bold text-lg text-slate-800 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors duration-300">
                        {role.title}
                      </h4>
                      <div className="flex items-center gap-1 text-xs font-mono text-brand-700 dark:text-brand-400 bg-brand-500/5 group-hover:bg-brand-500/10 px-2.5 py-1 rounded transition-colors duration-300">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{role.period}</span>
                      </div>
                    </div>

                    {/* Bullet Highlights */}
                    <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 list-disc list-inside marker:text-brand-500">
                      {role.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="leading-relaxed pl-1 indent-[-16px] ml-4 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300">
                          <span className="pl-1">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
