import { useRef, useState, useCallback } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * TiltCard — A crisp, blur-free card container featuring an interactive
 * cursor-tracking spotlight glow, smooth elevation lift, and luminous border accents,
 * with zero 3D rasterization or subpixel text blurring.
 */
export default function TiltCard({
  children,
  className = '',
  style = {},
  enableSpotlight = true,
  enableLift = true,
  ...props
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current || !enableSpotlight) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${Math.round(x)}px`);
    cardRef.current.style.setProperty('--mouse-y', `${Math.round(y)}px`);
  }, [enableSpotlight]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const liftClass = !shouldReduceMotion && enableLift
    ? 'hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-teal-900/10 dark:hover:shadow-teal-950/50 hover:border-teal-500/60 dark:hover:border-teal-400/50'
    : '';

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-tilt-card="true"
      className={`group/card relative transition-all duration-300 ease-out ${liftClass} ${className}`}
      style={style}
      {...props}
    >
      {/* Dynamic Cursor Spotlight Surface Glow */}
      {enableSpotlight && (
        <div
          className={`pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-300 z-10 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: 'radial-gradient(420px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(20, 184, 166, 0.08), transparent 70%)'
          }}
          aria-hidden="true"
        />
      )}

      {/* Dynamic Spotlight Border Highlight */}
      {enableSpotlight && (
        <div
          className={`pointer-events-none absolute -inset-px rounded-[inherit] border border-teal-500/50 dark:border-teal-400/50 transition-opacity duration-300 z-10 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            maskImage: 'radial-gradient(240px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), black 20%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(240px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), black 20%, transparent 70%)'
          }}
          aria-hidden="true"
        />
      )}

      {/* Luminous Top Accent Sheen */}
      <div
        className={`pointer-events-none absolute top-0 inset-x-6 h-[1.5px] bg-gradient-to-r from-transparent via-teal-500/80 dark:via-teal-400/80 to-transparent transition-opacity duration-300 z-10 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />

      {children}
    </div>
  );
}
