import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Mail, Terminal, Layers, CloudLightning, BrainCircuit, CheckCircle2 } from 'lucide-react';
import AnimatedGrid from '../components/AnimatedGrid';
import HeroPlayground from '../components/HeroPlayground';
import { portfolioData } from '../data/portfolioData';
import { smoothScrollTo } from '../utils/navigation';


const roleDecks = [
  {
    id: 'fullstack',
    title: 'Fullstack Systems',
    icon: Layers,
    badge: 'Front-to-Back Architecture',
    highlight: 'React, TypeScript, Tailwind, Zod contracts, and high-frequency UI updates with zero layout shifts.',
    metric: '100% Type-Safe & Accessible'
  },
  {
    id: 'cloud',
    title: 'Cloud & Payment Core',
    icon: CloudLightning,
    badge: 'High-Throughput Engines',
    highlight: '200+ TPS EFT/ACH gateways, Redis idempotency locks, Azure Service Bus asynchronous decoupling.',
    metric: '40% Latency Reduction'
  },
  {
    id: 'ai',
    title: 'Applied GenAI & Agents',
    icon: BrainCircuit,
    badge: 'Intelligent Orchestration',
    highlight: 'Multi-agent LangGraph workflows, MongoDB Vector RAG retrieval, and ML pipeline failure diagnostics.',
    metric: '70%+ Support Queries Automated'
  }
];

const marqueeTech = [
  'ReactJS', 'TypeScript', 'Python', 'FastAPI', 'Django', 'PHP', 'Restler', 'Node.js',
  'Azure Functions', 'Azure Service Bus', 'AWS', 'Docker', 'Redis',
  'PostgreSQL', 'SQL Server', 'MongoDB', 'LangGraph', 'Tailwind CSS', 'MUI'
];

export default function Hero() {
  const { personalInfo } = portfolioData;
  const [activeRole, setActiveRole] = useState(0);

  const scrollToSection = (e, id) => {
    smoothScrollTo(id, e);
  };


  const currentRole = roleDecks[activeRole];

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-between pt-24 sm:pt-28 pb-8 overflow-hidden"
    >
      {/* Background Animated Systems Grid */}
      <AnimatedGrid />

      {/* Main Full-Bleed Fluid Canvas Container */}
      <div className="fluid-canvas w-full flex-1 flex flex-col justify-center my-auto">

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 2xl:gap-14 items-center">

          {/* Left Column (7 cols): Systems Headline, Role Switcher, CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10 space-y-6">

            {/* Display Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] text-slate-900 dark:text-slate-100 tracking-tight leading-[1.12]"
            >
              I architect resilient{' '}
              <span className="text-brand-600 dark:text-brand-400 font-extrabold">
                fullstack applications
              </span>
              , payment gateways & AI engines.
            </motion.h1>

            {/* Interactive Dynamic Role Deck Switcher */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="w-full space-y-3"
            >
              {/* Role Tabs */}
              <div className="flex flex-wrap gap-2" role="tablist" aria-label="Engineering specializations">
                {roleDecks.map((role, idx) => {
                  const Icon = role.icon;
                  const isActive = activeRole === idx;
                  return (
                    <button
                      key={role.id}
                      id={`role-tab-${role.id}`}
                      aria-controls={`role-panel-${role.id}`}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => setActiveRole(idx)}
                      onKeyDown={(e) => {
                        let nextIdx = null;
                        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                          e.preventDefault();
                          nextIdx = (idx + 1) % roleDecks.length;
                        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                          e.preventDefault();
                          nextIdx = (idx - 1 + roleDecks.length) % roleDecks.length;
                        } else if (e.key === 'Home') {
                          e.preventDefault();
                          nextIdx = 0;
                        } else if (e.key === 'End') {
                          e.preventDefault();
                          nextIdx = roleDecks.length - 1;
                        }
                        if (nextIdx !== null) {
                          setActiveRole(nextIdx);
                          document.getElementById(`role-tab-${roleDecks[nextIdx].id}`)?.focus();
                        }
                      }}
                      className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all duration-200 border focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                        isActive
                          ? 'bg-teal-700 text-white border-teal-700 dark:bg-teal-950/80 dark:text-teal-300 dark:border-teal-500/50 shadow-sm font-semibold'
                          : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-teal-500/40 hover:text-slate-950 dark:hover:text-white'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span>{role.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Role Spec Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentRole.id}
                  id={`role-panel-${currentRole.id}`}
                  role="tabpanel"
                  aria-labelledby={`role-tab-${currentRole.id}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-900/60 backdrop-blur-sm text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between font-mono">
                    <span className="text-xs font-bold text-teal-700 dark:text-teal-300 uppercase tracking-wider">
                      {currentRole.badge}
                    </span>
                    <span className="text-xs text-emerald-700 dark:text-emerald-300 font-bold bg-emerald-500/10 dark:bg-emerald-500/20 px-2.5 py-0.5 rounded">
                      {currentRole.metric}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-sans leading-relaxed text-pretty">
                    {currentRole.highlight}
                  </p>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Supporting Summary */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm sm:text-base text-slate-650 dark:text-slate-300 leading-relaxed max-w-2xl"
            >
              {personalInfo.summary}
            </motion.p>

            {/* Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex flex-wrap gap-3.5 pt-2"
            >
              <a
                href="#projects"
                onClick={(e) => scrollToSection(e, '#projects')}
                className="group flex items-center justify-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-teal-700 hover:bg-teal-800 dark:bg-teal-500 dark:text-slate-950 dark:hover:bg-teal-400 rounded-lg px-6 py-3.5 active:scale-[0.99] transition-all duration-200 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
              >
                <span>View System Projects</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </a>

              <a
                href="#experience"
                onClick={(e) => scrollToSection(e, '#experience')}
                className="group flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 rounded-lg px-5 py-3.5 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-[0.98] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                <Terminal className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                <span>Career Timeline</span>
              </a>

              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, '#contact')}
                className="group flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 rounded-lg px-5 py-3.5 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-[0.98] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                <Mail className="h-4 w-4 group-hover:-translate-y-0.5 transition-transform duration-300" />
                <span>Contact</span>
              </a>
            </motion.div>

            {/* Quick Proof Matrix Row */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500 dark:text-slate-400 border-t border-slate-200/60 dark:border-slate-800/60 w-full">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                200+ TPS Transaction Engine
              </span>
              <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-cyan-500" />
                50K+ Concurrent LMS Users
              </span>
              <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-brand-500" />
                3 IEEE Peer-Reviewed Papers
              </span>
            </div>

          </div>

          {/* Right Column (5 cols): Interactive Fullstack Playground 2.0 */}
          <div className="lg:col-span-5 w-full z-10">
            <HeroPlayground />
          </div>

        </div>

      </div>

      {/* Bottom Edge-to-Edge Verified Production Tech Stack Strip */}
      <div className="w-full border-t border-b border-slate-200/60 dark:border-slate-800/60 bg-white/40 dark:bg-slate-950/40 backdrop-blur-md py-3 mt-10 overflow-hidden select-none">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          {marqueeTech.map((tech, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs font-mono font-medium text-slate-500 dark:text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500/70" />
              <span>{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
