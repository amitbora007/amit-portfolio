import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Calendar, Sparkles, X, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Achievements() {
  const { achievements } = portfolioData;
  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [selectedImg, setSelectedImg] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const autoslideTimer = useRef(null);

  // Autoslide effect
  useEffect(() => {
    if (isHovered || selectedImg) {
      if (autoslideTimer.current) clearInterval(autoslideTimer.current);
    } else {
      autoslideTimer.current = setInterval(() => {
        setDirection(1);
        setActiveSlide((prev) => (prev + 1) % achievements.length);
      }, 5000);
    }

    return () => {
      if (autoslideTimer.current) clearInterval(autoslideTimer.current);
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

  // Framer Motion variant for slide animations
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    },
    exit: (dir) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    }),
  };

  const currentItem = achievements[activeSlide];

  return (
    <div className="w-full space-y-8">
      {/* Section Column Header */}
      <div className="flex flex-col gap-2">
        <div className="text-[10px] uppercase tracking-widest text-brand-600 dark:text-brand-400 font-extrabold flex items-center gap-1">
          <Sparkles className="h-3 w-3 animate-pulse" />
          ACCOLADES
        </div>
        <h3 className="font-display font-extrabold text-2xl text-slate-800 dark:text-slate-100 tracking-tight">
          Recognition & Awards
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal max-w-md">
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
        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 rounded-2xl overflow-hidden relative shadow-sm min-h-[440px] sm:min-h-[380px] md:min-h-[340px] lg:min-h-[330px]">
          {/* Left Side Accent Line */}
          <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-brand-500 dark:bg-brand-400 z-20" />

          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full h-full p-6 sm:p-7 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center absolute inset-0"
            >
              {/* Text Metadata (Columns 1-7) */}
              <div className="sm:col-span-7 space-y-4">
                {/* Meta details */}
                <div className="flex items-center justify-between text-[9px] text-slate-400 dark:text-slate-500 font-mono border-b border-slate-200 dark:border-slate-800/50 pb-2.5">
                  <span className="font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
                    {currentItem.organization}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {currentItem.date}
                  </span>
                </div>

                {/* Trophy Icon */}
                <div className="text-brand-600 dark:text-brand-400 bg-brand-500/5 dark:bg-brand-400/5 w-9 h-9 rounded-lg flex items-center justify-center">
                  <Trophy className="h-4.5 w-4.5" />
                </div>

                {/* Title and Description */}
                <div className="space-y-2">
                  <h4 className="font-sans font-bold text-base text-slate-800 dark:text-slate-100 leading-tight">
                    {currentItem.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {currentItem.description}
                  </p>
                </div>
              </div>

              {/* Certificate Image Frame (Columns 8-12) */}
              <div className="sm:col-span-5 flex justify-center">
                <div 
                  onClick={() => setSelectedImg(currentItem)}
                  className="w-full max-w-[180px] aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 cursor-pointer bg-slate-900 group/thumb relative shadow-sm"
                >
                  <img 
                    src={currentItem.image} 
                    alt={`${currentItem.title} Certificate`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/thumb:scale-105 opacity-85 group-hover/thumb:opacity-100"
                    loading="lazy"
                  />
                  {/* Hover Zoom Overlay */}
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-1 text-white text-[9px] font-mono">
                    <Eye className="h-3.5 w-3.5" />
                    <span>ZOOM_IMAGE</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-[-15px] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-brand-500 hover:text-white dark:hover:bg-brand-500 dark:hover:text-slate-950 flex items-center justify-center text-slate-500 dark:text-slate-400 shadow-md transition-all duration-300 z-30 focus:outline-none focus:ring-1 focus:ring-brand-500"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-4.5 w-4.5" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-[-15px] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-brand-500 hover:text-white dark:hover:bg-brand-500 dark:hover:text-slate-950 flex items-center justify-center text-slate-500 dark:text-slate-400 shadow-md transition-all duration-300 z-30 focus:outline-none focus:ring-1 focus:ring-brand-500"
          aria-label="Next slide"
        >
          <ChevronRight className="h-4.5 w-4.5" />
        </button>

        {/* Progress Indicators (Dots) */}
        <div className="flex justify-center items-center gap-2 mt-4">
          {achievements.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > activeSlide ? 1 : -1);
                setActiveSlide(idx);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none ${
                activeSlide === idx 
                  ? 'w-5 bg-brand-500 dark:bg-brand-400' 
                  : 'w-1.5 bg-slate-300 dark:bg-slate-800 hover:bg-slate-400 dark:hover:bg-slate-700'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
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
                  <span className="text-[10px] font-mono tracking-widest text-brand-400 font-bold uppercase">
                    {selectedImg.organization} • {selectedImg.date}
                  </span>
                  <h3 className="text-sm font-bold truncate pr-6">{selectedImg.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedImg(null)}
                  className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors focus:ring-1 focus:ring-brand-500"
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
