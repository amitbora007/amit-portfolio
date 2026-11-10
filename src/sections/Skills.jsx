import { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const colorStyles = {
  'Frontend Engineering': {
    cardBorder: 'border-l-[5px] border-l-sky-500 dark:border-l-sky-400',
    headerDot: 'bg-sky-500',
  },
  'Backend & APIs': {
    cardBorder: 'border-l-[5px] border-l-brand-600 dark:border-l-brand-500',
    headerDot: 'bg-brand-500',
  },
  'Cloud & Infrastructure': {
    cardBorder: 'border-l-[5px] border-l-amber-500 dark:border-l-amber-500',
    headerDot: 'bg-amber-500',
  },
  'Databases & Caching': {
    cardBorder: 'border-l-[5px] border-l-emerald-500 dark:border-l-emerald-500',
    headerDot: 'bg-emerald-500',
  },
  'AI & Intelligent Systems': {
    cardBorder: 'border-l-[5px] border-l-indigo-500 dark:border-l-indigo-500',
    headerDot: 'bg-indigo-500',
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

  return (
    <section id="skills" className="py-24 px-6 border-t border-slate-100 dark:border-slate-900 bg-transparent">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <div className="text-xs uppercase tracking-widest text-brand-600 dark:text-brand-400 font-bold">
            TECHNICAL MATRIX
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-800 dark:text-slate-100 tracking-tight leading-tight">
            Skills & Connected Stack
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed">
            Hover over any core framework or language to instantly visualize its corresponding database, service queue, and cloud environment dependencies.
          </p>
        </div>

        {/* Skills Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((category, idx) => {
            const styles = colorStyles[category.category] || colorStyles['Frontend & Integrations'];

            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl shadow-sm hover:border-slate-300 dark:hover:border-slate-800 transition-colors ${styles.cardBorder}`}
              >
                {/* Category Title */}
                <h3 className="font-display font-bold text-base text-slate-800 dark:text-slate-100 border-b border-slate-100 dark:border-slate-950 pb-3 mb-4 flex items-center gap-2.5">
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
                      tagClass = 'bg-brand-500 text-white border-brand-500 scale-105 shadow-sm shadow-brand-500/25 dark:shadow-brand-500/10 font-bold';
                    } else if (isRelated) {
                      tagClass = 'bg-brand-50/60 dark:bg-brand-950/45 text-brand-700 dark:text-brand-400 border-brand-500/50 dark:border-brand-500/35 scale-[1.02]';
                    } else if (isAnyHovered) {
                      tagClass = 'opacity-25 scale-95 border-slate-100 dark:border-slate-950 bg-slate-50/10 dark:bg-slate-950/10 text-slate-400 dark:text-slate-600 blur-[0.2px]';
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
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
