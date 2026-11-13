import { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const colorStyles = {
  'Frontend Engineering': {
    cardBorder: 'border-slate-200 dark:border-slate-800 hover:border-teal-500/30',
    headerDot: 'bg-teal-500/80',
  },
  'Backend & APIs': {
    cardBorder: 'border-slate-200 dark:border-slate-800 hover:border-teal-500/30',
    headerDot: 'bg-teal-500/80',
  },
  'Cloud & Infrastructure': {
    cardBorder: 'border-slate-200 dark:border-slate-800 hover:border-teal-500/30',
    headerDot: 'bg-teal-500/80',
  },
  'Databases & Caching': {
    cardBorder: 'border-slate-200 dark:border-slate-800 hover:border-teal-500/30',
    headerDot: 'bg-teal-500/80',
  },
  'AI & Intelligent Systems': {
    cardBorder: 'border-slate-200 dark:border-slate-800 hover:border-teal-500/30',
    headerDot: 'bg-teal-500/80',
  }
};

const skillConnections = {
  // Frontend
  'React.js': ['JavaScript (ES6+)', 'TypeScript', 'Tailwind CSS', 'Bootstrap', 'MUI (Material-UI)', 'RESTful API Design', 'GraphQL APIs', 'FastAPI', 'State Management'],
  'TypeScript': ['React.js', 'JavaScript (ES6+)', 'Node.js (Express)', 'RESTful API Design', 'GraphQL APIs'],
  'JavaScript (ES6+)': ['React.js', 'TypeScript', 'Tailwind CSS', 'Node.js (Express)'],
  'Tailwind CSS': ['React.js', 'Responsive UI/UX'],
  'Bootstrap': ['React.js', 'Python (Django, DRF)', 'Responsive UI/UX'],
  'MUI (Material-UI)': ['React.js', 'TypeScript', 'Responsive UI/UX'],
  'State Management': ['React.js', 'TypeScript', 'RESTful API Design'],
  'Responsive UI/UX': ['React.js', 'Tailwind CSS', 'Bootstrap'],
  'REST & GraphQL Integration': ['React.js', 'FastAPI', 'GraphQL APIs', 'RESTful API Design'],

  // Backend & APIs
  'FastAPI': ['Python (Django, DRF)', 'PostgreSQL', 'Docker', 'OpenAI APIs', 'React.js', 'RESTful API Design'],
  'Python (Django, DRF)': ['FastAPI', 'PostgreSQL', 'MySQL', 'MongoDB', 'Docker', 'OpenAI APIs', 'LangGraph (Multi-Agent)', 'RAG Pipelines', 'Vector Databases'],
  'PHP (Laravel, Restler)': ['SQL Server', 'MySQL', 'Redis Caching & Idempotency', 'RESTful API Design', 'Azure Functions', 'Azure Service Bus'],
  'Node.js (Express)': ['MongoDB', 'TypeScript', 'Docker', 'RESTful API Design', 'React.js'],
  'RESTful API Design': ['FastAPI', 'PHP (Laravel, Restler)', 'Python (Django, DRF)', 'React.js', 'Microservices'],
  'GraphQL APIs': ['React.js', 'TypeScript', 'Node.js (Express)', 'FastAPI', 'Microservices'],
  'Microservices': ['Azure Functions', 'Azure Service Bus', 'Docker', 'FastAPI', 'PHP (Laravel, Restler)'],
  'Event-Driven Systems': ['Azure Service Bus', 'Azure Functions', 'Redis Caching & Idempotency', 'Microservices'],

  // Cloud
  'Azure Functions': ['PHP (Laravel, Restler)', 'FastAPI', 'Azure Service Bus', 'Azure Key Vault', 'Azure Active Directory', 'Microservices'],
  'Azure Service Bus': ['Azure Functions', 'Microservices', 'Event-Driven Systems'],
  'Azure Key Vault': ['Azure Functions', 'Azure Service Bus'],
  'Azure Active Directory': ['React.js', 'RESTful API Design'],
  'AWS (EC2, S3, RDS, Lambda)': ['SQL Server', 'MySQL', 'MongoDB', 'Docker', 'CI/CD Pipelines'],
  'Docker': ['AWS (EC2, S3, RDS, Lambda)', 'CI/CD Pipelines', 'FastAPI', 'Node.js (Express)'],
  'CI/CD Pipelines': ['Docker', 'AWS (EC2, S3, RDS, Lambda)', 'Vercel'],
  'GCP': ['Docker', 'CI/CD Pipelines'],
  'Vercel': ['React.js', 'CI/CD Pipelines'],

  // Databases
  'PostgreSQL': ['FastAPI', 'Python (Django, DRF)', 'Data Modeling', 'Query Optimization'],
  'SQL Server': ['PHP (Laravel, Restler)', 'AWS (EC2, S3, RDS, Lambda)', 'Query Optimization', 'Data Modeling'],
  'MySQL': ['PHP (Laravel, Restler)', 'Python (Django, DRF)', 'AWS (EC2, S3, RDS, Lambda)', 'Query Optimization', 'Data Modeling'],
  'MongoDB': ['Python (Django, DRF)', 'Node.js (Express)', 'Vector Databases', 'OpenAI APIs', 'Data Modeling'],
  'Redis Caching & Idempotency': ['PHP (Laravel, Restler)', 'FastAPI', 'RESTful API Design', 'Microservices'],
  'Vector Databases': ['Python (Django, DRF)', 'MongoDB', 'OpenAI APIs', 'LangGraph (Multi-Agent)', 'RAG Pipelines'],

  // AI
  'OpenAI APIs': ['Python (Django, DRF)', 'LangGraph (Multi-Agent)', 'RAG Pipelines', 'Vector Databases', 'MongoDB'],
  'LangGraph (Multi-Agent)': ['Python (Django, DRF)', 'OpenAI APIs', 'RAG Pipelines', 'Vector Databases'],
  'RAG Pipelines': ['Python (Django, DRF)', 'OpenAI APIs', 'LangGraph (Multi-Agent)', 'Vector Databases', 'MongoDB'],
  'Scikit-learn': ['FastAPI', 'Python (Django, DRF)', 'SHAP (Explainable AI)'],
  'SHAP (Explainable AI)': ['Scikit-learn', 'FastAPI', 'Python (Django, DRF)'],
  'OpenCV (Computer Vision)': ['Python (Django, DRF)']
};

export default function Skills() {
  const { skills } = portfolioData;
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const activeConnections = hoveredSkill ? skillConnections[hoveredSkill] || [] : [];

  return (
    <section id="skills" className="py-24 border-t border-slate-200/60 dark:border-slate-800/60 bg-transparent scroll-mt-20">
      <div className="fluid-canvas w-full">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-12">
          <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-slate-100 tracking-tight leading-tight max-w-3xl">
            Fullstack Architecture Dependency Matrix
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
            Hover or tap any framework or language below to illuminate its real-time fullstack dependency pipeline across frontend, backend, databases, and cloud infrastructure.
          </p>
        </div>

        {/* Fullstack Flow Signal Trace HUD */}
        <div className="mb-10 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-3 font-mono text-xs shadow-sm">
          <div className="flex items-center gap-2.5">
            <span className={`w-2.5 h-2.5 rounded-full ${hoveredSkill ? 'bg-teal-500' : 'bg-slate-400'}`} />
            <span className="text-slate-600 dark:text-slate-400 font-bold">SIGNAL TRACE:</span>
            {hoveredSkill ? (
              <span className="font-bold text-teal-700 dark:text-teal-400 text-sm">
                [{hoveredSkill}]
              </span>
            ) : (
              <span className="text-slate-600 dark:text-slate-400 italic">
                Hover or select any node to trace architecture dependencies
              </span>
            )}
          </div>

          {hoveredSkill && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold">
                {activeConnections.length} Connected Nodes:
              </span>
              <div className="flex flex-wrap gap-1">
                {activeConnections.slice(0, 5).map((conn) => (
                  <span key={conn} className="text-xs px-2 py-0.5 rounded bg-brand-500/10 text-teal-800 dark:text-teal-300 border border-brand-500/30 font-bold">
                    {conn}
                  </span>
                ))}
                {activeConnections.length > 5 && (
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">
                    +{activeConnections.length - 5} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Panoramic 5-Column Skills Matrix Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 items-stretch">
          {skills.map((category, idx) => {
            const styles = colorStyles[category.category] || colorStyles['Frontend Engineering'];

            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm hover:border-brand-500/30 transition-all duration-300 flex flex-col justify-between ${styles.cardBorder}`}
              >
                <div>
                  {/* Category Title */}
                  <h3 className="font-display font-bold text-sm text-slate-800 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800/60 pb-3 mb-4 flex items-center gap-2.5">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${styles.headerDot}`} />
                  {category.category}
                </h3>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill) => {
                    const isAnyHovered = hoveredSkill !== null;
                    const isActive = hoveredSkill === skill;
                    const isRelated = hoveredSkill && skillConnections[hoveredSkill]?.includes(skill);

                    // Responsive classes based on active hover chain
                    let tagClass = 'border-slate-200/55 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400';

                    if (isActive) {
                      tagClass = 'bg-teal-800 text-white border-teal-800 dark:bg-teal-950/90 dark:text-teal-300 dark:border-teal-500/60 font-semibold shadow-sm';
                    } else if (isRelated) {
                      tagClass = 'bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 border-teal-500/40 dark:border-teal-500/30 font-medium';
                    } else if (isAnyHovered) {
                      tagClass = 'opacity-35 border-slate-100 dark:border-slate-900 bg-slate-50/10 dark:bg-slate-950/10 text-slate-400 dark:text-slate-500';
                    }

                    return (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => setHoveredSkill(hoveredSkill === skill ? null : skill)}
                        onMouseEnter={() => setHoveredSkill(skill)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        onFocus={() => setHoveredSkill(skill)}
                        onBlur={() => setHoveredSkill(null)}
                        aria-pressed={isActive}
                        className={`text-xs font-mono tracking-wide rounded-md px-3 py-1.5 min-h-[32px] sm:min-h-[28px] inline-flex items-center justify-center transition-all duration-300 select-none border focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${tagClass}`}
                      >
                        {skill}
                      </button>
                    );
                  })}
                </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
