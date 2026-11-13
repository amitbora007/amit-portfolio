import { lazy, Suspense, useRef, useEffect } from 'react';

import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import Footer from './sections/Footer';
import DiagnosticConsole from './components/DiagnosticConsole';
import ErrorBoundary from './components/ErrorBoundary';
import SectionTransition from './components/SectionTransition';
import SectionTransitionHUD from './components/SectionTransitionHUD';
import SectionNavRail from './components/SectionNavRail';


// Lazy load sections below the fold
const About = lazy(() => import('./sections/About'));
const ImpactMetrics = lazy(() => import('./sections/ImpactMetrics'));
const Experience = lazy(() => import('./sections/Experience'));
const Projects = lazy(() => import('./sections/Projects'));
const Skills = lazy(() => import('./sections/Skills'));
const Credentials = lazy(() => import('./sections/Credentials'));
const Achievements = lazy(() => import('./sections/Achievements'));
const Recommendations = lazy(() => import('./sections/Recommendations'));
const Contact = lazy(() => import('./sections/Contact'));

// Reusable section loader placeholder to stabilize layout and prevent Cumulative Layout Shift (CLS)
const SectionFallback = () => (
  <div className="py-24 flex flex-col items-center justify-center text-xs text-slate-500 dark:text-slate-400 font-mono tracking-widest gap-2 bg-transparent select-none min-h-[380px]">
    <span className="w-4 h-4 rounded-full border-2 border-slate-200 dark:border-slate-800 border-t-brand-500 animate-spin" />
    <span>INITIALIZING_TELEMETRY_PIPELINE...</span>
  </div>
);

// Desktop cursor spotlight using direct DOM ref updates via rAF to avoid root re-renders
function CursorSpotlight() {
  const spotlightRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 1024) return;
    let rafId = null;

    const handleMove = (e) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (spotlightRef.current) {
          spotlightRef.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(20, 184, 166, 0.045), transparent 75%)`;
        }
      });
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={spotlightRef}
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 hidden lg:block"
    />
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 selection:bg-brand-500 selection:text-white relative overflow-x-hidden">
      {/* Calm Ambient Background Glow */}
      <div className="hidden md:block absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40 dark:opacity-30">
        <div className="absolute top-[5%] left-[-5%] w-[45%] h-[25%] bg-teal-500/5 dark:bg-teal-500/6 rounded-full blur-[140px]" />
        <div className="absolute top-[40%] right-[-5%] w-[50%] h-[30%] bg-slate-400/5 dark:bg-teal-900/10 rounded-full blur-[160px]" />
        <div className="absolute top-[75%] left-[-5%] w-[45%] h-[25%] bg-teal-500/4 dark:bg-teal-500/5 rounded-full blur-[150px]" />
      </div>

      {/* Subtle Mouse Spotlight Tracker — Desktop only */}
      <CursorSpotlight />


      <div className="relative z-10 w-full">
        {/* Sticky header navigation */}
        <Navigation />

        {/* Floating Cyber Section Transition Telemetry HUD */}
        <SectionTransitionHUD />

        {/* Core sections with animated transitions & defensive error boundaries */}
        <main className="w-full">
          <Hero />

          <SectionTransition id="about" deckNumber="[DECK 01]" deckName="ABOUT ARCHITECT">
            <ErrorBoundary sectionName="About">
              <Suspense fallback={<SectionFallback />}>
                <About />
              </Suspense>
            </ErrorBoundary>
          </SectionTransition>

          <SectionTransition id="metrics" deckNumber="[DECK 02]" deckName="MEASURED IMPACT">
            <ErrorBoundary sectionName="Impact Metrics">
              <Suspense fallback={<SectionFallback />}>
                <ImpactMetrics />
              </Suspense>
            </ErrorBoundary>
          </SectionTransition>

          <SectionTransition id="experience" deckNumber="[DECK 03]" deckName="CAREER TIMELINE">
            <ErrorBoundary sectionName="Experience">
              <Suspense fallback={<SectionFallback />}>
                <Experience />
              </Suspense>
            </ErrorBoundary>
          </SectionTransition>

          <SectionTransition id="projects" deckNumber="[DECK 04]" deckName="CASE STUDIES">
            <ErrorBoundary sectionName="Projects">
              <Suspense fallback={<SectionFallback />}>
                <Projects />
              </Suspense>
            </ErrorBoundary>
          </SectionTransition>

          <SectionTransition id="skills" deckNumber="[DECK 05]" deckName="SKILL MATRIX">
            <ErrorBoundary sectionName="Skills">
              <Suspense fallback={<SectionFallback />}>
                <Skills />
              </Suspense>
            </ErrorBoundary>
          </SectionTransition>

          <SectionTransition id="credentials" deckNumber="[DECK 06]" deckName="CREDENTIALS & RESEARCH">
            <ErrorBoundary sectionName="Credentials">
              <Suspense fallback={<SectionFallback />}>
                <Credentials />
              </Suspense>
            </ErrorBoundary>
          </SectionTransition>

          <SectionTransition id="achievements" deckNumber="[DECK 07]" deckName="HONORS & RECOMMENDATIONS">
            <section id="achievements" className="py-24 border-t border-slate-200/60 dark:border-slate-800/60 bg-transparent w-full scroll-mt-20">
              <div className="fluid-canvas">
                {/* Section Header */}
                <div className="flex flex-col items-center text-center gap-3 mb-16">
                  <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-slate-100 tracking-tight text-balance">
                    Verified Honors & Recommendations
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
                    Awards received for engineering execution, high-throughput system delivery, and direct testimonials from leadership.
                  </p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12 items-start w-full">
                  <ErrorBoundary sectionName="Achievements">
                    <Suspense fallback={<SectionFallback />}>
                      <Achievements />
                    </Suspense>
                  </ErrorBoundary>

                  <ErrorBoundary sectionName="Recommendations">
                    <Suspense fallback={<SectionFallback />}>
                      <div id="recommendations" className="w-full">
                        <Recommendations />
                      </div>
                    </Suspense>
                  </ErrorBoundary>
                </div>
              </div>
            </section>
          </SectionTransition>

          <SectionTransition id="contact" deckNumber="[DECK 08]" deckName="DISPATCH CONTACT">
            <ErrorBoundary sectionName="Contact">
              <Suspense fallback={<SectionFallback />}>
                <Contact />
              </Suspense>
            </ErrorBoundary>
          </SectionTransition>
        </main>


        {/* Global footer */}
        <Footer />
      </div>

      {/* Interactive Section Fast-Nav Rail (Desktop) */}
      <SectionNavRail />

      {/* Retro Floating Command Line Interface Sandbox */}
      <DiagnosticConsole />
    </div>
  );
}
