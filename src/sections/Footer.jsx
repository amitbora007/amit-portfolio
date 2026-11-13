import { Linkedin, Github, Mail } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { smoothScrollTo } from '../utils/navigation';

export default function Footer() {
  const { personalInfo } = portfolioData;
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e, href) => {
    smoothScrollTo(href, e);
  };


  return (
    <footer className="py-12 border-t border-slate-200/60 dark:border-slate-800/60 bg-transparent text-slate-500 dark:text-slate-400">
      <div className="fluid-canvas w-full flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Brand Left */}
        <div className="text-center md:text-left">
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="font-display font-bold text-base tracking-wider text-slate-800 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
          >
            AMIT BORA
          </a>
          <span className="block text-xs font-mono text-slate-500 dark:text-slate-400 mt-1">
            Fullstack Engineer • Resilient Distributed Systems
          </span>
        </div>

        {/* Copyright Middle & Telemetry */}
        <div className="text-xs text-slate-500 dark:text-slate-400 text-center font-mono flex flex-col items-center gap-1">
          <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-medium animate-pulse">
            © {currentYear} Amit Bora. All rights reserved.
          </span>
        </div>

        {/* Social Icons Right */}
        <div className="flex items-center gap-3">
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center border border-slate-200 dark:border-slate-800 hover:border-brand-500 dark:hover:border-brand-500 rounded text-slate-500 hover:text-teal-700 dark:text-slate-400 dark:hover:text-teal-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 transition-all duration-300"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4.5 w-4.5" />
          </a>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center border border-slate-200 dark:border-slate-800 hover:border-slate-800 dark:hover:border-slate-300 rounded text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 transition-all duration-300"
            aria-label="GitHub"
          >
            <Github className="h-4.5 w-4.5" />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="w-9 h-9 flex items-center justify-center border border-slate-200 dark:border-slate-800 hover:border-brand-500 dark:hover:border-brand-500 rounded text-slate-500 hover:text-teal-700 dark:text-slate-400 dark:hover:text-teal-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 transition-all duration-300"
            aria-label="Email"
          >
            <Mail className="h-4.5 w-4.5" />
          </a>
        </div>

      </div>
    </footer>
  );
}
