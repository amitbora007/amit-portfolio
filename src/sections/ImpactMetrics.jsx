import { useEffect, useState, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import TiltCard from '../components/TiltCard';

// Custom CountUp hook/helper
function CountUp({ value }) {
  const [displayValue, setDisplayValue] = useState(() => {
    if (!value.match(/\d+/)) return value;
    return '0';
  });
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    // Matches numbers in strings (e.g. "40" from "40%", "200" from "200+")
    const numberMatch = value.match(/\d+/);
    if (!numberMatch) return;

    const num = parseInt(numberMatch[0], 10);
    const suffix = value.replace(numberMatch[0], '');

    const controls = animate(0, num, {
      duration: 1.8,
      ease: 'easeOut',
      onUpdate: (latest) => {
        setDisplayValue(Math.floor(latest) + suffix);
      }
    });
    return () => controls.stop();
  }, [value, isInView]);

  return <span ref={ref}>{displayValue}</span>;
}

const sparklinePaths = [
  // Staircase (efficiency steps)
  'M 0 45 L 25 45 L 25 30 L 50 30 L 50 15 L 75 15 L 75 5 L 100 5',
  // Decay (latency drop)
  'M 0 5 C 10 5, 20 35, 50 38 S 80 42, 100 42',
  // Pulsing peaks (TPS volume)
  'M 0 40 L 15 40 L 20 10 L 25 40 L 45 40 L 50 5 L 55 40 L 75 40 L 80 15 L 85 40 L 100 40',
  // Sigmoid (automation saturation)
  'M 0 42 C 30 42, 20 8, 50 8 S 80 8, 100 8',
  // Parabolic (user growth scale)
  'M 0 45 Q 35 45, 65 20 T 100 5'
];

export default function ImpactMetrics() {
  const { metrics } = portfolioData;

  return (
    <section id="metrics" className="py-24 border-t border-slate-200/60 dark:border-slate-800/60 bg-transparent scroll-mt-20">
      <div className="fluid-canvas w-full">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-16">
          <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-slate-100 tracking-tight leading-tight max-w-2xl text-balance">
            Production Performance & Measured Outcomes
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed text-balance">
            Real-world metrics demonstrating latency reduction, transactional capacity, and operational efficiency across distributed production systems.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {metrics.map((metric, idx) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="h-full"
            >
              <TiltCard
                maxTilt={5}
                scale={1.015}
                glare={true}
                glareOpacity={0.08}
                className="p-6 flex flex-col justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500/50 dark:hover:border-teal-400/40 rounded-xl transition-all duration-300 h-full group relative hover:shadow-lg"
              >
                {/* Top Accent Hairline */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-teal-600/70 dark:bg-teal-400/60 rounded-t-xl" />

                <div className="z-10 flex flex-col justify-start h-full">
                  {/* Large Numerical Indicator with CountUp */}
                  <div className="font-display font-bold text-3xl sm:text-4xl text-teal-700 dark:text-teal-400 mb-2 tracking-tight transition-colors duration-300">
                    <span className="inline-block transition-colors duration-300">
                      <CountUp value={metric.value} />
                    </span>
                  </div>
                  <h3 className="font-sans font-bold text-base text-slate-900 dark:text-slate-100 leading-snug mt-2 mb-1.5">
                    {metric.label}
                  </h3>
                  <p
                    className="text-xs sm:text-sm text-slate-650 dark:text-slate-400 leading-relaxed z-10"
                    style={{ transform: 'translateZ(14px)' }}
                  >
                    {metric.desc}
                  </p>
                </div>

                {/* Vector Telemetry Sparkline Background */}
                <div
                  className="absolute bottom-2 right-2 left-2 h-10 overflow-hidden pointer-events-none opacity-20 dark:opacity-30 group-hover:opacity-80 transition-opacity duration-300"
                  style={{ transform: 'translateZ(10px)' }}
                >
                  <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="w-full h-full fill-none">
                    <motion.path
                      d={sparklinePaths[idx % sparklinePaths.length]}
                      className="stroke-brand-500/60 dark:stroke-brand-400/60 group-hover:stroke-brand-500 dark:group-hover:stroke-brand-400 transition-all duration-300"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.8, ease: 'easeOut', delay: idx * 0.08 }}
                    />
                  </svg>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
