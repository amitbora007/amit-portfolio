import { Linkedin, Github, Mail } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Footer() {
  const { personalInfo } = portfolioData;
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="py-12 px-6 border-t border-slate-100 dark:border-slate-900 bg-transparent text-slate-500 dark:text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Brand Left */}
        <div className="text-center md:text-left">
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="font-display font-extrabold text-base tracking-wider text-slate-800 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
          >
            AMIT BORA
          </a>
          <span className="block text-xs text-slate-400 dark:text-slate-500 mt-1">
            Senior Backend Engineer • New Delhi, India
          </span>
        </div>

        {/* Copyright Middle */}
        <div className="text-xs text-slate-400 dark:text-slate-500 text-center font-mono">
          © {currentYear} Amit Bora. All rights reserved.
        </div>

        {/* Social Icons Right */}
        <div className="flex items-center gap-4">
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 border border-slate-200 dark:border-slate-800 hover:border-brand-500 dark:hover:border-brand-500 rounded text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-all duration-300"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4.5 w-4.5" />
          </a>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 border border-slate-200 dark:border-slate-800 hover:border-slate-800 dark:hover:border-slate-300 rounded text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-all duration-300"
            aria-label="GitHub"
          >
            <Github className="h-4.5 w-4.5" />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="p-2 border border-slate-200 dark:border-slate-800 hover:border-brand-500 dark:hover:border-brand-500 rounded text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-all duration-300"
            aria-label="Email"
          >
            <Mail className="h-4.5 w-4.5" />
          </a>
        </div>

      </div>
    </footer>
  );
}
