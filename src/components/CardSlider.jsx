import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';

/**
 * CardSlider — A high-performance, accessible, blur-free carousel for rich cards.
 * Automatically activates as a smooth scroll-snap slider when items > 3,
 * and collapses to a centered responsive grid when items <= 3.
 */
export default function CardSlider({
  items = [],
  renderItem,
  density = 'triple', // 'triple' (3 on desktop, 2 on tablet, 1 on mobile) or 'double' (2 on desktop, 1 on mobile)
  deckName = 'PROJECTS',
  keyExtractor = (item, index) => item.id || item.title || index,
  className = '',
}) {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const totalItems = items.length;
  const isSliderActive = totalItems > 3;

  // Slide width class based on density
  const slideWidthClass =
    density === 'double'
      ? 'w-full lg:w-[calc(50%-12px)] shrink-0 snap-start'
      : 'w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-start';

  // Check scroll boundary state
  const updateScrollState = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;

    const { scrollLeft } = el;

    // Compute active index based on first child width
    const firstChild = el.firstElementChild;
    if (firstChild) {
      const slideWidth = firstChild.getBoundingClientRect().width + 24; // 24px is gap-6
      const newIndex = Math.min(
        totalItems - 1,
        Math.max(0, Math.round(scrollLeft / slideWidth))
      );
      setCurrentIndex(newIndex);
    }
  }, [totalItems]);

  // Sync scroll state on resize, item change, and scroll
  useEffect(() => {
    if (!isSliderActive) return;

    const el = sliderRef.current;
    if (!el) return;

    updateScrollState();

    let rafId = null;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        updateScrollState();
      });
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isSliderActive, totalItems, updateScrollState]);

  const [prevItems, setPrevItems] = useState(items);
  if (items !== prevItems) {
    setPrevItems(items);
    setCurrentIndex(0);
  }

  // Reset scroll to first slide when items or filter change
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({ left: 0, behavior: shouldReduceMotion ? 'instant' : 'smooth' });
    }
  }, [items, shouldReduceMotion]);

  const scrollPrev = () => {
    const el = sliderRef.current;
    if (!el) return;
    const firstChild = el.firstElementChild;
    const slideWidth = firstChild ? firstChild.getBoundingClientRect().width + 24 : 360;

    if (el.scrollLeft <= 10) {
      // Loop to end if at beginning
      el.scrollTo({
        left: el.scrollWidth - el.clientWidth,
        behavior: shouldReduceMotion ? 'instant' : 'smooth',
      });
    } else {
      el.scrollBy({
        left: -slideWidth,
        behavior: shouldReduceMotion ? 'instant' : 'smooth',
      });
    }
  };

  const scrollNext = () => {
    const el = sliderRef.current;
    if (!el) return;
    const firstChild = el.firstElementChild;
    const slideWidth = firstChild ? firstChild.getBoundingClientRect().width + 24 : 360;

    if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 10) {
      // Loop to start if at end
      el.scrollTo({
        left: 0,
        behavior: shouldReduceMotion ? 'instant' : 'smooth',
      });
    } else {
      el.scrollBy({
        left: slideWidth,
        behavior: shouldReduceMotion ? 'instant' : 'smooth',
      });
    }
  };

  const scrollToIndex = (index) => {
    const el = sliderRef.current;
    if (!el) return;
    const slides = el.children;
    if (slides && slides[index]) {
      slides[index].scrollIntoView({
        behavior: shouldReduceMotion ? 'instant' : 'smooth',
        block: 'nearest',
        inline: 'start',
      });
    }
  };

  // Card width class for static (<= 3 items) view, perfectly matching slider card dimensions
  const staticCardWidthClass =
    density === 'double'
      ? 'w-full lg:w-[calc(50%-12px)]'
      : 'w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]';

  // If 3 or fewer items: render centered responsive layout with identical card dimensions
  if (!isSliderActive) {
    if (totalItems === 0) {
      return (
        <div className="w-full p-12 text-center text-slate-500 dark:text-slate-400 font-mono text-xs border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl">
          NO_RECORDS_AVAILABLE_FOR_FILTER
        </div>
      );
    }

    return (
      <div
        className={`w-full flex flex-wrap justify-center gap-6 items-stretch ${className}`}
      >
        {items.map((item, idx) => (
          <div
            key={keyExtractor(item, idx)}
            className={`${staticCardWidthClass} flex flex-col`}
          >
            {renderItem(item, idx)}
          </div>
        ))}
      </div>
    );
  }

  // If > 3 items: render full accessible card slider
  return (
    <section
      role="region"
      aria-label={`${deckName} showcase carousel`}
      aria-roledescription="carousel"
      className={`relative w-full ${className}`}
    >
      {/* Slider Telemetry Header & Controls */}
      <div className="flex items-center justify-between gap-4 mb-6 px-1">
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-800 dark:text-teal-300 font-bold">
            <SlidersHorizontal className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>CAROUSEL ACTIVE</span>
          </span>
          <span className="hidden sm:inline-block text-slate-500 dark:text-slate-400 font-semibold">
            [ SLIDE {String(currentIndex + 1).padStart(2, '0')} // {String(totalItems).padStart(2, '0')} ]
          </span>
        </div>

        {/* Arrow Navigation Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={scrollPrev}
            className="w-11 h-11 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-teal-500/60 hover:text-teal-700 dark:hover:text-teal-400 shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            aria-label={`Previous ${deckName} slide`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            className="w-11 h-11 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-teal-500/60 hover:text-teal-700 dark:hover:text-teal-400 shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            aria-label={`Next ${deckName} slide`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Snap Scrollable Slide Track */}
      <div
        ref={sliderRef}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') {
            e.preventDefault();
            scrollPrev();
          } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            scrollNext();
          }
        }}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar pb-6 pt-1 w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-2xl cursor-grab active:cursor-grabbing"
      >
        {items.map((item, idx) => (
          <div
            key={keyExtractor(item, idx)}
            role="group"
            aria-roledescription="slide"
            aria-label={`${idx + 1} of ${totalItems}`}
            className={slideWidthClass}
          >
            {renderItem(item, idx)}
          </div>
        ))}
      </div>

      {/* Pagination Indicators */}
      <div
        className="flex justify-center items-center gap-1.5 mt-2"
        role="tablist"
        aria-label={`${deckName} slide pagination`}
      >
        {items.map((item, idx) => (
          <button
            key={keyExtractor(item, idx)}
            type="button"
            role="tab"
            aria-selected={currentIndex === idx}
            onClick={() => scrollToIndex(idx)}
            className="min-w-[40px] min-h-[40px] p-2 flex items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            aria-label={`Go to slide ${idx + 1}`}
          >
            <span
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx
                  ? 'w-7 bg-teal-600 dark:bg-teal-400'
                  : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600'
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
