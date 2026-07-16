import { useEffect, useState, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

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
    <section id="metrics" className="py-24 px-6 border-t border-slate-100 dark:border-slate-900 bg-transparent">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <div className="text-xs uppercase tracking-widest text-brand-600 dark:text-brand-400 font-bold">
            MEASURED IMPACT
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-800 dark:text-slate-100 tracking-tight max-w-2xl leading-tight">
            Performance metrics from production systems.
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed">
            Quantitative outcomes reflecting optimized API speeds, transaction volume support, and cloud-native architecture implementations.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden divide-y sm:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-800">
          {metrics.map((metric, idx) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-8 flex flex-col justify-between bg-slate-50/30 dark:bg-slate-900/10 hover:bg-slate-100/50 dark:hover:bg-slate-800/40 hover:z-10 hover:shadow-lg hover:shadow-brand-500/5 transition-all duration-300 h-full group relative overflow-hidden"
            >
              {/* Top Accent Glowing Line Emitter */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-brand-500 dark:bg-brand-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

              <div className="z-10">
                {/* Large Numerical Indicator with CountUp */}
                <div className="font-display font-extrabold text-4xl sm:text-5xl text-brand-700 dark:text-brand-400 mb-3 tracking-tight transition-colors duration-300">
                  <span className="inline-block group-hover:scale-105 group-hover:text-brand-650 dark:group-hover:text-brand-300 transition-all duration-300 origin-left">
                    <CountUp value={metric.value} />
                  </span>
                </div>
                <h3 className="font-sans font-bold text-sm text-slate-800 dark:text-slate-200 mb-2 leading-snug">
                  {metric.label}
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-500 leading-normal mt-2 z-10">
                {metric.desc}
              </p>

              {/* Vector Telemetry Sparkline Background */}
              <div className="absolute bottom-0 right-0 left-0 h-12 w-full overflow-hidden pointer-events-none opacity-20 dark:opacity-30 group-hover:opacity-75 transition-opacity duration-300">
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
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
