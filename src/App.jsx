import { lazy, Suspense } from 'react';
import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import Footer from './sections/Footer';
import DiagnosticConsole from './components/DiagnosticConsole';

// Lazy load sections below the fold
const About = lazy(() => import('./sections/About'));
const ImpactMetrics = lazy(() => import('./sections/ImpactMetrics'));
const Experience = lazy(() => import('./sections/Experience'));
const Projects = lazy(() => import('./sections/Projects'));
const Skills = lazy(() => import('./sections/Skills'));
const Credentials = lazy(() => import('./sections/Credentials'));
const Contact = lazy(() => import('./sections/Contact'));

// Reusable section loader placeholder to stabilize layout and prevent Cumulative Layout Shift (CLS)
const SectionFallback = () => (
  <div className="py-16 flex flex-col items-center justify-center text-[9px] text-slate-400 dark:text-slate-500 font-mono tracking-widest gap-2 bg-transparent select-none min-h-[400px]">
    <span className="w-3.5 h-3.5 rounded-full border border-slate-200 dark:border-slate-800 border-t-brand-500 animate-spin" />
    <span>LOAD_TELEMETRY_NODE...</span>
  </div>
);

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 selection:bg-brand-500 selection:text-white relative overflow-hidden">
      {/* Dynamic Ambient Background Glow Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Light mode: warm amber/orange/rose glows for parchment feel */}
        {/* Dark mode: cool teal/indigo glows */}
        <div className="absolute top-[3%] left-[-15%] w-[60%] h-[30%] bg-amber-400/8 dark:bg-brand-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute top-[25%] right-[-15%] w-[70%] h-[35%] bg-orange-300/8 dark:bg-teal-500/8 rounded-full blur-[140px]" />
        <div className="absolute top-[50%] left-[-20%] w-[60%] h-[30%] bg-amber-300/6 dark:bg-brand-500/6 rounded-full blur-[130px]" />
        <div className="absolute top-[75%] right-[-20%] w-[70%] h-[35%] bg-rose-300/5 dark:bg-indigo-500/8 rounded-full blur-[150px]" />
        <div className="absolute bottom-[5%] left-[-10%] w-[50%] h-[25%] bg-orange-200/6 dark:bg-teal-500/8 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* Sticky header navigation */}
        <Navigation />

        {/* Core sections */}
        <main>
          <Hero />
          
          <Suspense fallback={<SectionFallback />}>
            <About />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <ImpactMetrics />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <Experience />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <Projects />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <Skills />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <Credentials />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <Contact />
          </Suspense>
        </main>

        {/* Global footer */}
        <Footer />
      </div>

      {/* Retro Floating Command Line Interface Sandbox */}
      <DiagnosticConsole />
    </div>
  );
}
