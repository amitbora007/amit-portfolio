import { motion } from 'framer-motion';
import { ArrowRight, Mail, Server } from 'lucide-react';
import AnimatedGrid from '../components/AnimatedGrid';
import TrustCard from '../components/TrustCard';
import { portfolioData } from '../data/portfolioData';

export default function Hero() {
  const { personalInfo, trustIndicators } = portfolioData;

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const targetElement = document.querySelector(id);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden px-6"
    >
      {/* Mesh lines and architectural node animation */}
      <AnimatedGrid />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center text-center">

        {/* Tech Icon Indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex items-center gap-2 bg-brand-500/10 dark:bg-brand-500/5 border border-brand-500/20 dark:border-brand-500/10 text-brand-700 dark:text-brand-400 px-4.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase"
        >
          <Server className="h-3.5 w-3.5" />
          Senior Systems Architect
        </motion.div>

        {/* Display Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-slate-800 dark:text-slate-100 tracking-tight leading-[1.08] max-w-4xl mb-6"
        >
          I build secure, scalable{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-700 to-teal-500 dark:from-brand-400 dark:to-teal-300">
            backend systems
          </span>{' '}
          for payments and AI-enabled workflows.
        </motion.h1>

        {/* Supporting Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed mb-10"
        >
          {personalInfo.summary}
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mb-16 justify-center w-full sm:w-auto"
        >
          <a
            href="#projects"
            onClick={(e) => scrollToSection(e, '#projects')}
            className="group flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-wider text-white bg-brand-700 dark:bg-brand-600 border border-brand-700 dark:border-brand-600 rounded px-7 py-3.5 hover:bg-brand-800 dark:hover:bg-brand-500 active:scale-[0.98] transition-all duration-300 shadow-sm focus:ring-2 focus:ring-brand-500"
          >
            View Projects
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            className="group flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-800 rounded px-7 py-3.5 hover:bg-slate-200 dark:hover:bg-slate-900 active:scale-[0.98] transition-all duration-300 focus:ring-2 focus:ring-brand-500"
          >
            <Mail className="h-4 w-4 group-hover:-translate-y-0.5 group-hover:scale-105 transition-transform duration-300" />
            Contact Me
          </a>
        </motion.div>

        {/* Trust Badges Grid */}
        <div className="w-full max-w-5xl">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent mb-8" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 text-left">
            {trustIndicators.map((badge, idx) => (
              <TrustCard
                key={badge.label}
                label={badge.label}
                value={badge.value}
                index={idx}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
