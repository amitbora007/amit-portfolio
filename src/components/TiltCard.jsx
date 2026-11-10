import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';

/**
 * TiltCard — A GPU-accelerated 3D perspective tilt container with spring physics,
 * multi-plane Z-axis support, and dynamic specular glare reflection.
 */
export default function TiltCard({
  children,
  className = '',
  maxTilt = 7,
  perspective = 1000,
  scale = 1.015,
  glare = true,
  glareOpacity = 0.12,
  style = {},
  ...props
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Normalized coordinates (0 to 1), centered at 0.5
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Smooth spring physics for organic deceleration
  const springConfig = { stiffness: 260, damping: 24 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  // Map normalized coordinates to rotation angles (inverting Y for natural tilt)
  const rotateX = useTransform(mouseYSpring, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(mouseXSpring, [0, 1], [-maxTilt, maxTilt]);

  // Specular reflection gradient mapping
  const glareX = useTransform(mouseXSpring, [0, 1], ['10%', '90%']);
  const glareY = useTransform(mouseYSpring, [0, 1], ['10%', '90%']);
  const glareBackground = useTransform(
    [glareX, glareY],
    ([gx, gy]) =>
      `radial-gradient(circle at ${gx} ${gy}, rgba(255, 255, 255, 0.45) 0%, rgba(20, 184, 166, 0.15) 35%, transparent 70%)`
  );

  const handleMouseMove = (e) => {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const clientX = (e.clientX - rect.left) / rect.width;
    const clientY = (e.clientY - rect.top) / rect.height;

    x.set(Math.max(0, Math.min(1, clientX)));
    y.set(Math.max(0, Math.min(1, clientY)));
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Smoothly reset tilt back to zero
    x.set(0.5);
    y.set(0.5);
  };

  if (shouldReduceMotion) {
    return (
      <div ref={cardRef} className={className} style={style} {...props}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        scale: isHovered ? scale : 1,
      }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      style={{
        perspective,
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
        willChange: isHovered ? 'transform' : 'auto',
        ...style,
      }}
      className={`relative ${className}`}
      {...props}
    >
      {/* Specular Glare Reflection Sheen */}
      {glare && isHovered && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-30 transition-opacity duration-300 overflow-hidden"
          style={{
            opacity: isHovered ? glareOpacity : 0,
            background: glareBackground,
          }}
        />
      )}

      {children}
    </motion.div>
  );
}
