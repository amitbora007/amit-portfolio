import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function AnimatedGrid() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Configure spring animations for fluid, lag-free mechanical easing
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Slower offset for background grid to create layered depth
  const bgX = useSpring(mouseX, { stiffness: 35, damping: 25 });
  const bgY = useSpring(mouseY, { stiffness: 35, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize client coordinates around the center of the viewport (-0.5 to 0.5)
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;

      // Map normalized values to pixel translations
      mouseX.set(x * 30);
      mouseY.set(y * 30);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Generate random points for floating system nodes
  const nodes = [
    { cx: '15%', cy: '25%', r: 2.5, delay: 0 },
    { cx: '35%', cy: '65%', r: 2.0, delay: 2 },
    { cx: '55%', cy: '15%', r: 3.0, delay: 1.5 },
    { cx: '75%', cy: '80%', r: 2.0, delay: 3 },
    { cx: '85%', cy: '40%', r: 2.5, delay: 0.5 },
    { cx: '92%', cy: '70%', r: 1.5, delay: 4 },
    { cx: '25%', cy: '85%', r: 2.0, delay: 2.5 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 select-none">
      {/* CSS-based Grid Overlay with subtle parallax */}
      <motion.div 
        style={{ x: bgX, y: bgY }}
        className="absolute inset-0 technical-grid opacity-[0.2] dark:opacity-[0.35]" 
      />

      {/* Radiant Subtle Lighting */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-500/5 dark:bg-brand-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-brand-600/5 dark:bg-brand-600/5 rounded-full blur-[150px] pointer-events-none" />

      {/* SVG System Node Connections with faster parallax */}
      <motion.svg 
        style={{ x: springX, y: springY }}
        className="absolute inset-0 w-full h-full opacity-30 dark:opacity-60" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Connection Lines (systems-inspired) */}
        <motion.line
          x1="15%" y1="25%" x2="55%" y2="15%"
          stroke="currentColor" strokeWidth="0.5"
          className="text-slate-300 dark:text-slate-800"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 3, delay: 1 }}
        />
        <motion.line
          x1="55%" y1="15%" x2="85%" y2="40%"
          stroke="currentColor" strokeWidth="0.5"
          className="text-slate-300 dark:text-slate-800"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 4, delay: 2 }}
        />
        <motion.line
          x1="35%" y1="65%" x2="75%" y2="80%"
          stroke="currentColor" strokeWidth="0.5"
          className="text-slate-300 dark:text-slate-800"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.2 }}
          transition={{ duration: 3.5, delay: 1.5 }}
        />
        <motion.line
          x1="25%" y1="85%" x2="35%" y2="65%"
          stroke="currentColor" strokeWidth="0.5"
          className="text-slate-300 dark:text-slate-800"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.4 }}
          transition={{ duration: 2.5, delay: 0.5 }}
        />

        {/* Animated System Nodes */}
        {nodes.map((node, index) => (
          <motion.circle
            key={index}
            cx={node.cx}
            cy={node.cy}
            r={node.r}
            className="fill-brand-400 dark:fill-brand-500"
            initial={{ opacity: 0.2, scale: 0.8 }}
            animate={{
              opacity: [0.2, 0.7, 0.2],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 5 + index,
              repeat: Infinity,
              delay: node.delay,
              ease: 'easeInOut'
            }}
          />
        ))}
      </motion.svg>
    </div>
  );
}
