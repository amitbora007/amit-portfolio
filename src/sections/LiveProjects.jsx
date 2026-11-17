import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Layers, Bot, Globe, Cpu, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import TiltCard from '../components/TiltCard';

const filterCategories = [
  { id: 'fullstack', label: 'Fullstack', icon: Globe },
  { id: 'ai', label: 'AI & Testing', icon: Bot },
  { id: 'cloud', label: 'Cloud & Systems', icon: Cpu },
  { id: 'all', label: 'All Projects', icon: Layers },
];

export default function LiveProjects() {
  const { liveProjects, personalInfo } = portfolioData;
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects = (liveProjects || []).filter((project) => {
    if (activeFilter === 'all') return true;
    return project.category === activeFilter;
  });

  return (
    <section id="live-projects" className="py-24 border-t border-slate-200/60 dark:border-slate-800/60 bg-transparent scroll-mt-20">
      <div className="fluid-canvas w-full">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-12">
          <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-slate-100 tracking-tight leading-tight max-w-3xl text-balance">
            Live Deployments & Open Source
          </h2>
          <p className="text-sm sm:text-base text-slate-650 dark:text-slate-400 max-w-xl leading-relaxed text-pretty">
            Production applications, intelligent testing suites, and real-time streaming tools running live on cloud infrastructure. Launch the live demo or inspect the source code on GitHub.
          </p>

          <a
            href={personalInfo?.github || 'https://github.com/amitbora007'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-2 px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            aria-label="View Amit Bora on GitHub"
          >
            <Github className="w-3.5 h-3.5 text-slate-900 dark:text-slate-100" />
            <span>github.com/amitbora007</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>

        {/* Filter Navigation Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filterCategories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveFilter(cat.id)}
                aria-pressed={isActive}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-200 border min-h-[38px] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                  isActive
                    ? 'bg-teal-800 text-white border-teal-800 dark:bg-teal-950/80 dark:text-teal-300 dark:border-teal-500/50 shadow-sm font-semibold'
                    : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-teal-500/40 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-teal-200 dark:text-teal-400' : 'text-slate-500 dark:text-slate-400'}`} />
                <span>{cat.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="liveProjectFilterActive"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 border-2 border-teal-600 dark:border-teal-400 rounded-xl pointer-events-none -z-0"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Live Projects Grid */}
        <motion.div
          layout
          className={`w-full ${
            filteredProjects.length === 1
              ? 'max-w-md mx-auto grid grid-cols-1 gap-6'
              : filteredProjects.length === 2
                ? 'max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6'
                : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch'
          }`}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects && filteredProjects.length > 0 ? (
              filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  className="h-full"
                >
                  <TiltCard
                    maxTilt={5}
                    scale={1.015}
                    className="h-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-between hover:border-teal-500/40 hover:shadow-xl transition-all duration-300 group"
                  >
                    <div>
                      {/* Project Image Thumbnail */}
                      {project.image && (
                        <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-slate-100 dark:bg-slate-950">
                          <img
                            src={project.image}
                            alt={`${project.title} live preview`}
                            width={800}
                            height={500}
                            loading="lazy"
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                        </div>
                      )}

                      {/* Card Header Metadata */}
                      <div className="flex items-center justify-between text-xs font-mono mb-3.5 gap-2">
                        <span className="text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider">
                          {project.categoryLabel}
                        </span>
                        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold select-none shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span>{project.badge}</span>
                        </div>
                      </div>

                      {/* Project Title & Tagline */}
                      <h3 className="font-display font-bold text-xl text-slate-900 dark:text-slate-100 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors mb-1.5">
                        {project.title}
                      </h3>
                      <p className="text-xs font-mono text-slate-500 dark:text-slate-400 font-medium mb-3">
                        {project.tagline}
                      </p>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-650 dark:text-slate-300 leading-relaxed mb-4 text-pretty">
                        {project.description}
                      </p>

                      {/* Architecture Highlights */}
                      <div className="space-y-1.5 mb-5 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-mono text-slate-650 dark:text-slate-400">
                        {project.highlights.map((h, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                            <span className="truncate">{h}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800/80 text-xs font-mono text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Dual Action CTAs */}
                    <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 mt-auto">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-teal-700 text-white dark:bg-teal-400 dark:text-slate-950 hover:bg-teal-800 dark:hover:bg-teal-300 font-bold text-xs font-mono transition-all duration-200 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                        aria-label={`Open live application for ${project.title}`}
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-600 text-xs font-mono font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                        aria-label={`View ${project.title} source code on GitHub`}
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Source</span>
                      </a>
                    </div>
                  </TiltCard>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-16 text-center text-slate-500 font-mono text-sm">
                NO_PROJECTS_FOUND_FOR_CATEGORY
              </div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
