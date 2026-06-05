import { motion } from 'framer-motion';
import { Award, BookOpen, GraduationCap, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Credentials() {
  const { credentials, education } = portfolioData;

  // Custom inline SVG badge renders for major certifications
  const renderCertBadge = (name) => {
    if (name.includes('AWS Certified')) {
      return (
        <svg className="w-8 h-8 shrink-0 fill-none stroke-amber-500 stroke-[1.5]" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          {/* Hexagon outline */}
          <polygon points="50,5 90,28 90,72 50,95 10,72 10,28" stroke="currentColor" fill="rgba(245, 158, 11, 0.05)" />
          {/* AWS Cloud & arrow */}
          <path d="M35 60 C30 60 25 55 25 50 C25 43 32 38 38 40 C42 32 58 32 62 40 C68 38 75 43 75 50 C75 55 70 60 65 60 Z" />
          <path d="M30 68 Q50 78 70 68" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M66 65 L70 68 L66 71" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    } else if (name.includes('MongoDB Certified') || name.includes('MongoDB Associate')) {
      return (
        <svg className="w-8 h-8 shrink-0 fill-none stroke-emerald-500 stroke-[1.5]" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          {/* Shield outline */}
          <path d="M15 15 C30 15 50 5 50 5 C50 5 70 15 85 15 C85 45 75 75 50 95 C25 75 15 45 15 15 Z" fill="rgba(16, 185, 129, 0.05)" />
          {/* MongoDB leaf */}
          <path d="M50 20 C62 38 65 55 50 78 C35 55 38 38 50 20 Z" className="text-emerald-500/20 fill-current" />
          <path d="M50 15 L50 82" />
        </svg>
      );
    } else if (name.includes('Agile')) {
      return (
        <svg className="w-8 h-8 shrink-0 fill-none stroke-rose-500 stroke-[1.5]" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          {/* Circle outline */}
          <circle cx="50" cy="50" r="42" fill="rgba(244, 63, 94, 0.05)" />
          {/* Agile arrows wheel */}
          <circle cx="50" cy="50" r="28" strokeDasharray="12 6" />
          <path d="M42 22 L50 22 L46 26" strokeWidth="2" />
          <path d="M58 78 L50 78 L54 74" strokeWidth="2" />
          {/* Core star */}
          <polygon points="50,38 53,45 61,45 55,50 57,58 50,53 43,58 45,50 39,45 47,45" className="text-rose-500/20 fill-current" />
        </svg>
      );
    } else if (name.includes('MongoDB on AWS')) {
      return (
        <svg className="w-8 h-8 shrink-0 fill-none stroke-cyan-500 stroke-[1.5]" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          {/* Combo Hex/Leaf */}
          <polygon points="50,5 90,28 90,72 50,95 10,72 10,28" stroke="currentColor" fill="rgba(6, 182, 212, 0.05)" />
          {/* Cloud border on left, leaf curve on right */}
          <path d="M30 55 C25 50 35 38 48 40 M52 40 C62 42 68 55 52 70" />
          <path d="M50 20 L50 80" />
          <circle cx="50" cy="50" r="6" className="fill-cyan-500 text-cyan-500" />
        </svg>
      );
    } else {
      return <Award className="w-8 h-8 text-slate-400 shrink-0" />;
    }
  };

  return (
    <section id="credentials" className="py-24 px-6 border-t border-slate-100 dark:border-slate-900 bg-transparent">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <div className="text-xs uppercase tracking-widest text-brand-600 dark:text-brand-400 font-bold">
            CREDIBILITY
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-800 dark:text-slate-100 tracking-tight leading-tight">
            Credentials & Research
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed">
            Academic background, professional industry certifications, and peer-reviewed conference publications.
          </p>
        </div>

        {/* Editorial Layout: Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Left Column: Certifications & Education */}
          <div className="lg:col-span-6 space-y-10">

            {/* Certifications Block */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-900 pb-3 w-full">
                <div className="flex items-center gap-2.5">
                  <Award className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                  <h3 className="font-display font-extrabold text-xl text-slate-800 dark:text-slate-100 tracking-tight">
                    Industry Certifications
                  </h3>
                </div>
                {credentials.credlyUrl && (
                  <a
                    href={credentials.credlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono font-bold text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 transition-colors"
                  >
                    Verify on Credly ↗
                  </a>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {credentials.certifications.map((cert) => (
                  <div
                    key={cert.name}
                    className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 rounded-lg flex items-center gap-3.5 hover:border-brand-500/30 dark:hover:border-brand-500/30 hover:bg-slate-100/50 dark:hover:bg-slate-800/40 hover:-translate-y-1 hover:shadow-md hover:shadow-brand-500/5 transition-all duration-300 h-full relative group overflow-hidden"
                  >
                    {/* Left Accent Slide-down Emitter */}
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-brand-500 dark:bg-brand-400 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />

                    {/* SVG Vector Badge */}
                    <div className="group-hover:scale-110 transition-transform duration-300 shrink-0">
                      {renderCertBadge(cert.name)}
                    </div>

                    {/* Cert Content Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between h-full min-h-[76px] z-10">
                      <div>
                        <span className="text-[9px] font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest font-mono block mb-1">
                          {cert.issuer}
                        </span>
                        <h4 className="font-sans font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100 leading-snug truncate group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors duration-300" title={cert.name}>
                          {cert.name}
                        </h4>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-3 pt-2 border-t border-slate-200 dark:border-slate-950">
                        <span>Issued: {cert.year}</span>
                        {cert.credentialId && (
                          <span className="text-[9px] truncate max-w-[80px]" title={cert.credentialId}>ID: {cert.credentialId}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Block */}
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 border-b border-slate-100 dark:border-slate-900 pb-3">
                <GraduationCap className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                <h3 className="font-display font-extrabold text-xl text-slate-800 dark:text-slate-100 tracking-tight">
                  Academic Background
                </h3>
              </div>

              <div className="space-y-4">
                {education.map((edu) => (
                  <div
                    key={edu.degree}
                    className="p-5 bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 hover:border-brand-500/30 dark:hover:border-brand-500/30 hover:bg-slate-100/50 dark:hover:bg-slate-800/40 hover:-translate-y-1 hover:shadow-md hover:shadow-brand-500/5 transition-all duration-300 rounded-lg flex flex-col gap-2 relative group overflow-hidden"
                  >
                    {/* Left Accent Slide-down Emitter */}
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-brand-500 dark:bg-brand-400 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 z-10">
                      <h4 className="font-sans font-bold text-sm text-slate-800 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors duration-300">
                        {edu.degree}
                      </h4>
                      <span className="text-xs font-mono text-brand-700 dark:text-brand-400 whitespace-nowrap bg-brand-500/5 group-hover:bg-brand-500/10 px-2.5 py-1 rounded transition-colors duration-300">
                        {edu.period}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium z-10">
                      {edu.institution}
                    </span>
                    {edu.notes && (
                      <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed border-t border-slate-200 dark:border-slate-950 pt-2 mt-1 z-10 group-hover:text-slate-500 dark:group-hover:text-slate-400 transition-colors duration-300">
                        {edu.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Publications */}
          <div className="lg:col-span-6 space-y-6">

            <div className="flex items-center gap-2.5 border-b border-slate-100 dark:border-slate-900 pb-3">
              <BookOpen className="h-5 w-5 text-brand-600 dark:text-brand-400" />
              <h3 className="font-display font-extrabold text-xl text-slate-800 dark:text-slate-100 tracking-tight">
                IEEE Research Publications
              </h3>
            </div>

            <div className="space-y-4">
              {credentials.publications.map((pub, idx) => (
                <motion.div
                  key={pub.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="p-5 bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 rounded-lg flex flex-col justify-between hover:border-brand-500/30 dark:hover:border-brand-500/30 hover:bg-slate-100/50 dark:hover:bg-slate-800/40 hover:-translate-y-1 hover:shadow-md hover:shadow-brand-500/5 transition-all duration-300 relative group overflow-hidden"
                >
                  {/* Left Accent Slide-down Emitter */}
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-brand-500 dark:bg-brand-400 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />

                  <div className="z-10">
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest font-mono">
                        {pub.publisher} • {pub.year}
                      </span>
                      {pub.url && (
                        <a
                          href={pub.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-brand-650 dark:hover:text-brand-400 transition-colors z-20"
                          aria-label={`Read publication: ${pub.title}`}
                        >
                          <ArrowUpRight className="h-4.5 w-4.5" />
                        </a>
                      )}
                    </div>
                    <h4 className="font-sans font-bold text-sm text-slate-800 dark:text-slate-200 leading-snug mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors duration-300">
                      {pub.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300">
                      {pub.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
