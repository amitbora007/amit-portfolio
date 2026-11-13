import { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { smoothScrollTo } from '../utils/navigation';


const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Impact', href: '#metrics' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Credentials', href: '#credentials' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Smooth scroll tracking using Framer Motion spring physics (GPU-accelerated, prevents re-renders)
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    let rafId = null;

    const sectionIds = navLinks.map((link) => link.href.slice(1));

    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const isPastThreshold = window.scrollY > 20;
        setScrolled((prev) => (prev !== isPastThreshold ? isPastThreshold : prev));

        let currentSection = 'hero';
        const scrollPosition = window.scrollY;

        if (scrollPosition >= 120) {
          for (const id of sectionIds) {
            const section = document.getElementById(id);
            if (section) {
              const rect = section.getBoundingClientRect();
              if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= 120) {
                currentSection = id;
                break;
              }
            }
          }
        }
        setActiveSection((prev) => (prev !== currentSection ? currentSection : prev));
      });
    };


    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const handleNavClick = (e, href) => {
    setMobileMenuOpen(false);
    smoothScrollTo(href, e);
  };


  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
      scrolled
        ? 'glass-nav py-3 shadow-md border-slate-200/40 dark:border-slate-800/40'
        : 'bg-transparent py-5 border-transparent'
    }`}>
      {/* Page Scroll Progress Indicator (GPU accelerated spring animation) */}
      <motion.div
        style={{ scaleX, transformOrigin: 'left' }}
        className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400 dark:from-brand-500 dark:via-brand-400 dark:to-brand-300"
      />
      <div className="fluid-canvas w-full flex items-center justify-between">

        {/* Custom Monogram AB & Status Tag */}
        <div className="flex items-center gap-4">
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-lg p-1 -m-1"
            aria-label="Amit Bora Portfolio Home"
          >
            <div className="w-10 h-10 rounded-lg border border-brand-500/40 dark:border-brand-500/50 flex items-center justify-center font-display font-extrabold text-lg text-brand-600 dark:text-brand-400 bg-brand-500/10 dark:bg-brand-500/10 group-hover:bg-brand-500 group-hover:text-white dark:group-hover:bg-brand-500 dark:group-hover:text-slate-950 transition-all duration-300 shadow-sm">
              <svg viewBox="0 0 100 100" className="w-6 h-6 stroke-current fill-none stroke-[9] group-hover:scale-105 transition-transform duration-300" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 75 L30 25 L44 75 M23 58 L37 58" />
                <path d="M58 25 L58 75 M58 25 C74 25 74 48 58 48 M58 48 C76 48 76 75 58 75" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-base tracking-wider text-slate-800 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                AMIT BORA
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400">
                Fullstack Engineer
              </span>
            </div>
          </a>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6 2xl:gap-8">
          <ul className="flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <li key={link.name} className="relative">
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative z-10 text-xs lg:text-sm font-medium tracking-wide transition-colors py-1.5 px-3 rounded-lg block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                      isActive
                        ? 'text-brand-600 dark:text-brand-400 font-bold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/60 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    {link.name}
                  </a>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute inset-0 bg-brand-500/15 dark:bg-brand-400/15 border border-brand-500/30 dark:border-brand-400/30 rounded-lg -z-0 shadow-sm"
                    >
                      <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-brand-500 dark:bg-brand-400 rounded-full" />
                    </motion.div>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="h-5 w-px bg-slate-200 dark:bg-slate-800" />

          <div className="flex items-center gap-3">
            <ThemeToggle />

            <a
              href="/resume.pdf"
              download="Amit_Bora_Resume.pdf"
              className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 hover:border-brand-500/60 dark:hover:border-brand-400/60 rounded-lg px-3.5 py-2 hover:bg-brand-500/10 dark:hover:bg-brand-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 transition-all shadow-sm"
            >
              <Download className="h-3.5 w-3.5 text-brand-600 dark:text-brand-400" />
              <span>Resume</span>
            </a>
          </div>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="min-w-[44px] min-h-[44px] p-2 flex items-center justify-center rounded-lg text-slate-700 dark:text-slate-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            aria-label="Toggle Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-nav absolute top-full left-0 w-full py-4 px-6 shadow-xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-5 duration-200 border-b border-slate-200/40 dark:border-slate-800/40">
          <ul className="flex flex-col gap-3">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`block py-2 text-base font-medium transition-colors ${
                      isActive
                        ? 'text-brand-600 dark:text-brand-400 font-semibold'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="h-px bg-slate-200 dark:bg-slate-800" />
          <a
            href="/resume.pdf"
            download="Amit_Bora_Resume.pdf"
            className="flex items-center justify-center gap-2 w-full text-sm font-semibold uppercase tracking-wider text-white bg-brand-700 dark:bg-brand-600 rounded py-2.5 hover:bg-brand-800 dark:hover:bg-brand-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 transition-all"
          >
            <Download className="h-4 w-4" />
            Download Resume
          </a>
        </div>
      )}
    </nav>
  );
}
