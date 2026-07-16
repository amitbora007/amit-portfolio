import { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Impact', href: '#metrics' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Credentials', href: '#credentials' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'Recommendations', href: '#recommendations' },
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

    const handleScroll = () => {
      // rAF throttle — runs at most once per frame, not on every scroll pixel
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        setScrolled(window.scrollY > 20);

        const sections = navLinks.map(link => document.querySelector(link.href));
        let currentSection = 'hero';
        const scrollPosition = window.scrollY;

        if (scrollPosition < 120) {
          currentSection = 'hero';
        } else {
          for (const section of sections) {
            if (section) {
              const rect = section.getBoundingClientRect();
              if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= 120) {
                currentSection = section.id;
                break;
              }
            }
          }
        }
        setActiveSection(currentSection);
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
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Offset for sticky nav
        behavior: 'smooth',
      });
    }
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
        className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400 dark:from-brand-500 dark:via-brand-400 dark:to-brand-300 shadow-[0_0_8px_rgba(20,184,166,0.5)]"
      />
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Custom Monogram AB */}
        <a 
          href="#hero" 
          onClick={(e) => handleNavClick(e, '#hero')}
          className="flex items-center gap-3 group focus:outline-none"
          aria-label="Amit Bora Portfolio Home"
        >
          <div className="w-10 h-10 rounded border-2 border-brand-600 dark:border-brand-500 flex items-center justify-center font-display font-extrabold text-lg text-brand-700 dark:text-brand-400 bg-brand-50/50 dark:bg-slate-900/50 group-hover:bg-brand-600 group-hover:text-white dark:group-hover:bg-brand-500 dark:group-hover:text-slate-950 transition-all duration-300">
            <svg viewBox="0 0 100 100" className="w-6 h-6 stroke-current fill-none stroke-[9] group-hover:scale-105 transition-transform duration-300" strokeLinecap="round" strokeLinejoin="round">
              {/* Clean Side-by-Side Technical Monogram AB */}
              <path d="M16 75 L30 25 L44 75 M23 58 L37 58" /> {/* Minimalist A */}
              <path d="M58 25 L58 75 M58 25 C74 25 74 48 58 48 M58 48 C76 48 76 75 58 75" /> {/* Minimalist B */}
            </svg>
          </div>
          <span className="font-display font-bold text-lg tracking-wider text-slate-800 dark:text-slate-200 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
            AMIT BORA
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-sm font-medium tracking-wide transition-colors py-2 focus:outline-none focus:text-brand-500 ${
                    activeSection === link.href.slice(1)
                      ? 'text-brand-600 dark:text-brand-400 border-b-2 border-brand-600 dark:border-brand-400'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />
          
          <ThemeToggle />

          <a
            href="/resume.pdf"
            download="Amit_Bora_Resume.pdf"
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-800 rounded px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-900 focus:ring-2 focus:ring-brand-500 transition-all"
          >
            <Download className="h-3.5 w-3.5" />
            Resume
          </a>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded text-slate-700 dark:text-slate-300 focus:outline-none hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-nav absolute top-full left-0 w-full py-4 px-6 shadow-xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-5 duration-200 border-b border-slate-200/40 dark:border-slate-800/40">
          <ul className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`block py-2 text-base font-medium transition-colors ${
                    activeSection === link.href.slice(1)
                      ? 'text-brand-600 dark:text-brand-400 font-semibold'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="h-px bg-slate-200 dark:bg-slate-800" />
          <a
            href="/resume.pdf"
            download="Amit_Bora_Resume.pdf"
            className="flex items-center justify-center gap-2 w-full text-sm font-semibold uppercase tracking-wider text-white bg-brand-700 dark:bg-brand-600 rounded py-2.5 hover:bg-brand-800 dark:hover:bg-brand-500 focus:ring-2 focus:ring-brand-500 transition-all"
          >
            <Download className="h-4 w-4" />
            Download Resume
          </a>
        </div>
      )}
    </nav>
  );
}
