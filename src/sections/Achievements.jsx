import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Trophy, Calendar, X, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Achievements() {
  const { achievements } = portfolioData;
  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [selectedImg, setSelectedImg] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const autoslideTimer = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const triggerRef = useRef(null);
  const closeBtnRef = useRef(null);

  // Focus management: focus modal close button on open, restore focus to trigger on close
  useEffect(() => {
    if (selectedImg) {
      requestAnimationFrame(() => {
        closeBtnRef.current?.focus();
      });
    } else if (triggerRef.current) {
      triggerRef.current.focus();
    }
  }, [selectedImg]);

  // Autoslide effect (pauses on hover, modal open, or background tab)
  useEffect(() => {
    const startTimer = () => {
      if (autoslideTimer.current) clearInterval(autoslideTimer.current);
      if (!isHovered && !selectedImg && !document.hidden) {
        autoslideTimer.current = setInterval(() => {
          setDirection(1);
          setActiveSlide((prev) => (prev + 1) % achievements.length);
        }, 5000);
      }
    };

    startTimer();
    const handleVisibility = () => {
      if (document.hidden) {
        if (autoslideTimer.current) clearInterval(autoslideTimer.current);
      } else {
        startTimer();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      if (autoslideTimer.current) clearInterval(autoslideTimer.current);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [isHovered, selectedImg, achievements.length]);


  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedImg(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNext = () => {
    setDirection(1);
    setActiveSlide((prev) => (prev + 1) % achievements.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveSlide((prev) => (prev - 1 + achievements.length) % achievements.length);
  };

  // Framer Motion variant for calm slide transitions
  const slideVariants = {
    enter: (dir) =>
      shouldReduceMotion
        ? { opacity: 0 }
        : {
            x: dir > 0 ? '20%' : '-20%',
            opacity: 0,
          },
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.25, ease: 'easeOut' },
      },
    },
    exit: (dir) =>
      shouldReduceMotion
        ? { opacity: 0 }
        : {
            x: dir > 0 ? '-20%' : '20%',
            opacity: 0,
            transition: {
              x: { duration: 0.2, ease: 'easeIn' },
              opacity: { duration: 0.2 },
            },
          },
  };

  if (!achievements || achievements.length === 0) {
    return (
      <div className="w-full space-y-8">
        <div className="flex flex-col gap-2">
          <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-800 dark:text-slate-100 tracking-tight text-balance">
            Recognition & Awards
          </h3>
        </div>
        <div className="p-8 text-center text-slate-500 font-mono text-xs border border-dashed border-slate-300 dark:border-slate-800 rounded-xl">
          NO_ACHIEVEMENT_RECORDS_AVAILABLE
        </div>
      </div>
    );
  }

  const currentItem = achievements[activeSlide] || achievements[0];

  return (
    <div className="w-full space-y-8">
      {/* Section Column Header */}
      <div className="flex flex-col gap-2">
        <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-800 dark:text-slate-100 tracking-tight text-balance">
          Recognition & Awards
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
          Milestones and awards received for technical leadership, operational impact, and system design quality.
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
          className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden relative shadow-sm min-h-[440px] sm:min-h-[380px] md:min-h-[340px] lg:min-h-[330px]"
          style={{ perspective: 1200 }}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              style={{ transformStyle: 'preserve-3d' }}
              className="w-full h-full p-6 sm:p-7 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center absolute inset-0"
            >
              {/* Text Metadata (Columns 1-7) */}
              <div className="sm:col-span-7 space-y-4" style={{ transform: 'translateZ(14px)' }}>
                {/* Meta details */}
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono border-b border-slate-200 dark:border-slate-800/50 pb-2.5">
                  <span className="font-bold text-teal-700 dark:text-teal-300 uppercase tracking-wider">
                    {currentItem.organization}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {currentItem.date}
                  </span>
                </div>

                {/* Title and Description */}
                <div className="space-y-2.5 pt-1">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-teal-600 dark:text-teal-400 shrink-0" />
                    <h4 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 leading-snug">
                      {currentItem.title}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-650 dark:text-slate-300 leading-relaxed">
                    {currentItem.description}
                  </p>
                </div>
              </div>

              {/* Certificate Image Frame (Columns 8-12) */}
              <div className="sm:col-span-5 flex justify-center" style={{ transform: 'translateZ(20px)' }}>
                <button
                  type="button"
                  ref={triggerRef}
                  onClick={() => setSelectedImg(currentItem)}
                  className="w-full max-w-[220px] aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 cursor-pointer bg-slate-900 group/thumb relative shadow-sm text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                  aria-label={`View full certificate: ${currentItem.title}`}
                >
                  <img
                    src={currentItem.image}
                    alt={`${currentItem.title} Certificate`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/thumb:scale-105 opacity-85 group-hover/thumb:opacity-100"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  {/* Hover Zoom Overlay */}
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-1 text-white text-xs font-mono font-medium">
                    <Eye className="h-3.5 w-3.5" />
                    <span>ZOOM_IMAGE</span>
                  </div>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-[-15px] sm:left-[-18px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-brand-500 hover:text-white dark:hover:bg-brand-500 dark:hover:text-slate-950 flex items-center justify-center text-slate-500 dark:text-slate-400 shadow-md transition-all duration-300 z-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="absolute right-[-15px] sm:right-[-18px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-brand-500 hover:text-white dark:hover:bg-brand-500 dark:hover:text-slate-950 flex items-center justify-center text-slate-500 dark:text-slate-400 shadow-md transition-all duration-300 z-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Progress Indicators (Dots) */}
        <div className="flex justify-center items-center gap-1 mt-4" role="tablist" aria-label="Achievement slides">
          {achievements.map((_, idx) => (
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
      </div>

      {/* Full-screen Certificate Viewer Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 md:backdrop-blur-sm cursor-zoom-out"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="achievement-modal-title"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl p-2 md:p-3 flex flex-col cursor-default"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800 text-slate-300">
                <div className="flex flex-col">
                  <span className="text-xs font-mono tracking-wider text-teal-400 font-bold uppercase">
                    {selectedImg.organization} • {selectedImg.date}
                  </span>
                  <h3 id="achievement-modal-title" className="text-sm font-bold truncate pr-6">{selectedImg.title}</h3>
                </div>
                <button
                  type="button"
                  ref={closeBtnRef}
                  onClick={() => setSelectedImg(null)}
                  className="min-w-[36px] min-h-[36px] rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                  aria-label="Close image viewer"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* Large Image Frame */}
              <div className="relative flex-1 flex items-center justify-center p-1 md:p-2 bg-slate-950 rounded-lg mt-2 overflow-auto max-h-[75vh]">
                <img
                  src={selectedImg.image}
                  alt={`${selectedImg.title} Full Certificate`}
                  className="max-w-full max-h-[70vh] object-contain rounded"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
