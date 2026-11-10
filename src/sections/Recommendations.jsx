import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { MessageSquare, Quote, ShieldCheck, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Recommendations() {
  const { recommendations } = portfolioData;
  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isHovered, setIsHovered] = useState(false);
  const autoslideTimer = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Autoslide effect
  useEffect(() => {
    if (isHovered) {
      if (autoslideTimer.current) clearInterval(autoslideTimer.current);
    } else {
      autoslideTimer.current = setInterval(() => {
        setDirection(1);
        setActiveSlide((prev) => (prev + 1) % recommendations.length);
      }, 6500); // Recommendation takes slightly longer to read
    }

    return () => {
      if (autoslideTimer.current) clearInterval(autoslideTimer.current);
    };
  }, [isHovered, recommendations.length]);

  const handleNext = () => {
    setDirection(1);
    setActiveSlide((prev) => (prev + 1) % recommendations.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveSlide((prev) => (prev - 1 + recommendations.length) % recommendations.length);
  };

  // Framer Motion variant for 3D cinematic slide animations
  const slideVariants = {
    enter: (dir) =>
      shouldReduceMotion
        ? { opacity: 0 }
        : {
            x: dir > 0 ? '50%' : '-50%',
            rotateY: dir > 0 ? 15 : -15,
            z: -40,
            opacity: 0,
          },
    center: {
      x: 0,
      rotateY: 0,
      z: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 260, damping: 28 },
        rotateY: { type: 'spring', stiffness: 260, damping: 28 },
        opacity: { duration: 0.35, ease: 'easeOut' },
      },
    },
    exit: (dir) =>
      shouldReduceMotion
        ? { opacity: 0 }
        : {
            x: dir > 0 ? '-50%' : '50%',
            rotateY: dir > 0 ? -15 : 15,
            z: -40,
            opacity: 0,
            transition: {
              x: { duration: 0.3, ease: 'easeIn' },
              rotateY: { duration: 0.3, ease: 'easeIn' },
              opacity: { duration: 0.25 },
            },
          },
  };

  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="w-full space-y-8">
        <div className="flex flex-col gap-2">
          <div className="text-[10px] uppercase tracking-widest text-brand-600 dark:text-brand-400 font-extrabold flex items-center gap-1">
            <MessageSquare className="h-3 w-3" />
            ENDORSEMENTS
          </div>
          <h3 className="font-display font-extrabold text-2xl text-slate-800 dark:text-slate-100 tracking-tight">
            Professional Recommendations
          </h3>
        </div>
        <div className="p-8 text-center text-slate-500 font-mono text-xs border border-dashed border-slate-300 dark:border-slate-800 rounded-xl">
          NO_RECOMMENDATION_RECORDS_AVAILABLE
        </div>
      </div>
    );
  }

  const currentItem = recommendations[activeSlide] || recommendations[0];

  return (
    <div className="w-full space-y-8">
      {/* Section Column Header */}
      <div className="flex flex-col gap-2">
        <div className="text-[10px] uppercase tracking-widest text-brand-600 dark:text-brand-400 font-extrabold flex items-center gap-1">
          <MessageSquare className="h-3 w-3" />
          ENDORSEMENTS
        </div>
        <h3 className="font-display font-extrabold text-2xl text-slate-800 dark:text-slate-100 tracking-tight">
          Professional Recommendations
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal max-w-md">
          Endorsements from engineering managers and tech leads validating my systems engineering execution and leadership.
        </p>
      </div>

      {/* Carousel Slider Container */}
      <div
        className="relative w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Main Slider Panel */}
        <div
          className="bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 rounded-2xl overflow-hidden relative shadow-sm min-h-[440px] sm:min-h-[380px] md:min-h-[340px] lg:min-h-[330px]"
          style={{ perspective: 1200 }}
        >
          {/* Left Side Accent Line */}
          <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-brand-500 dark:bg-brand-400 z-20" />

          {/* Floating Quote Icon */}
          <Quote className="absolute right-6 top-6 h-10 w-10 text-slate-200 dark:text-slate-800/20 pointer-events-none z-0" />

          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              style={{ transformStyle: 'preserve-3d' }}
              className="w-full h-full p-6 sm:p-7 flex flex-col justify-between absolute inset-0 z-10"
            >
              {/* Card Content details */}
              <div className="space-y-4 flex-1 overflow-auto pr-2 custom-scrollbar" style={{ transform: 'translateZ(14px)' }}>
                {/* Meta details */}
                <div className="flex items-center gap-3">
                  {currentItem.image ? (
                    <img
                      src={currentItem.image}
                      alt={currentItem.name}
                      className="w-10 h-10 rounded-full object-cover border border-brand-500/20 dark:border-brand-400/20 shrink-0 shadow-sm"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-brand-500/10 dark:bg-brand-400/10 border border-brand-500/20 dark:border-brand-400/20 flex items-center justify-center text-brand-600 dark:text-brand-400 shrink-0">
                      <User className="h-4.5 w-4.5" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <h4 className="font-display font-extrabold text-sm text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-1 truncate">
                      {currentItem.name}
                      <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" title="Verified Colleague" />
                    </h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium truncate">
                      {currentItem.title} at <span className="font-bold text-brand-600 dark:text-brand-400">{currentItem.company}</span>
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="text-[9px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono font-bold">
                    {currentItem.relationship}
                  </div>
                  <p className="text-xs text-slate-650 dark:text-slate-300 leading-relaxed italic whitespace-pre-line">
                    "{currentItem.description}"
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        {recommendations.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-[-15px] sm:left-[-18px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-brand-500 hover:text-white dark:hover:bg-brand-500 dark:hover:text-slate-950 flex items-center justify-center text-slate-500 dark:text-slate-400 shadow-md transition-all duration-300 z-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-[-15px] sm:right-[-18px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-brand-500 hover:text-white dark:hover:bg-brand-500 dark:hover:text-slate-950 flex items-center justify-center text-slate-500 dark:text-slate-400 shadow-md transition-all duration-300 z-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Progress Indicators (Dots) */}
        {recommendations.length > 1 && (
          <div className="flex justify-center items-center gap-1 mt-4" role="tablist" aria-label="Recommendation slides">
            {recommendations.map((_, idx) => (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={activeSlide === idx}
                onClick={() => {
                  setDirection(idx > activeSlide ? 1 : -1);
                  setActiveSlide(idx);
                }}
                className="min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px] p-2 flex items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                aria-label={`Go to slide ${idx + 1}`}
              >
                <span
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeSlide === idx
                      ? 'w-5 bg-brand-500 dark:bg-brand-400'
                      : 'w-1.5 bg-slate-300 dark:bg-slate-800 hover:bg-slate-400 dark:hover:bg-slate-700'
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
