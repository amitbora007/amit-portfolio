import { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const colorStyles = {
  'Backend Engineering': {
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
  },
  'Frontend & Integrations': {
    cardBorder: 'border-l-[5px] border-l-slate-400 dark:border-l-slate-600',
    headerDot: 'bg-slate-400 dark:bg-slate-600',
  }
};

const skillConnections = {
  // Languages & Frameworks
  'PHP (Laravel, Restler)': ['SQL Server', 'MySQL', 'Redis Caching', 'RESTful APIs', 'System Architecture', 'Microservices', 'Azure Functions', 'Azure Service Bus'],
  'Python (Django, FastAPI, DRF)': ['MySQL', 'MongoDB', 'Redis Caching', 'RESTful APIs', 'System Architecture', 'Microservices', 'Docker', 'OpenAI APIs', 'LangGraph (Multi-Agent)', 'RAG Pipelines', 'Vector Databases'],
  'Node.js (Express)': ['MongoDB', 'RESTful APIs', 'Docker', 'System Architecture'],

  // Cloud
  'Azure Functions': ['PHP (Laravel, Restler)', 'Python (Django, FastAPI, DRF)', 'Azure Service Bus', 'Azure Key Vault', 'Azure Active Directory', 'Microservices'],
  'Azure Service Bus': ['PHP (Laravel, Restler)', 'Python (Django, FastAPI, DRF)', 'Azure Functions', 'Microservices', 'Event-Driven Systems'],
  'Azure Key Vault': ['Azure Functions', 'Azure Service Bus', 'System Architecture'],
  'Azure Active Directory': ['React.js', 'System Architecture', 'RESTful APIs'],
  'AWS (EC2, S3, RDS)': ['SQL Server', 'MySQL', 'MongoDB', 'Docker', 'CI/CD Pipelines'],

  // Databases
  'SQL Server': ['PHP (Laravel, Restler)', 'AWS (EC2, S3, RDS)', 'Query Optimization', 'Data Modeling'],
  'MySQL': ['PHP (Laravel, Restler)', 'Python (Django, FastAPI, DRF)', 'AWS (EC2, S3, RDS)', 'Query Optimization', 'Data Modeling'],
  'MongoDB': ['Python (Django, FastAPI, DRF)', 'Node.js (Express)', 'Vector Databases', 'OpenAI APIs', 'Data Modeling'],
  'Redis Caching': ['PHP (Laravel, Restler)', 'Python (Django, FastAPI, DRF)', 'RESTful APIs', 'System Architecture', 'Microservices'],
  'Vector Databases': ['Python (Django, FastAPI, DRF)', 'MongoDB', 'OpenAI APIs', 'LangGraph (Multi-Agent)', 'RAG Pipelines'],

  // AI
  'OpenAI APIs': ['Python (Django, FastAPI, DRF)', 'LangGraph (Multi-Agent)', 'RAG Pipelines', 'Vector Databases', 'MongoDB'],
  'LangGraph (Multi-Agent)': ['Python (Django, FastAPI, DRF)', 'OpenAI APIs', 'RAG Pipelines', 'Vector Databases'],
  'RAG Pipelines': ['Python (Django, FastAPI, DRF)', 'OpenAI APIs', 'LangGraph (Multi-Agent)', 'Vector Databases', 'MongoDB'],

  // Frontend
  'React.js': ['JavaScript (ES6+)', 'Tailwind CSS', 'Git / GitHub', 'RESTful APIs'],
  'Tailwind CSS': ['React.js', 'JavaScript (ES6+)'],
  'JavaScript (ES6+)': ['React.js', 'Tailwind CSS', 'Node.js (Express)'],

  // General concepts
  'RESTful APIs': ['PHP (Laravel, Restler)', 'Python (Django, FastAPI, DRF)', 'Node.js (Express)', 'React.js', 'System Architecture'],
  'System Architecture': ['PHP (Laravel, Restler)', 'Python (Django, FastAPI, DRF)', 'Microservices', 'Event-Driven Systems', 'Cloud & Infrastructure'],
  'Microservices': ['PHP (Laravel, Restler)', 'Python (Django, FastAPI, DRF)', 'Azure Functions', 'Azure Service Bus', 'System Architecture', 'Docker'],
  'Event-Driven Systems': ['PHP (Laravel, Restler)', 'Python (Django, FastAPI, DRF)', 'Azure Service Bus', 'System Architecture', 'Microservices'],
  'Docker': ['AWS (EC2, S3, RDS)', 'CI/CD Pipelines', 'Python (Django, FastAPI, DRF)', 'Node.js (Express)'],
  'CI/CD Pipelines': ['Docker', 'AWS (EC2, S3, RDS)', 'Git / GitHub'],
  'Git / GitHub': ['CI/CD Pipelines', 'React.js']
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
                      <span
                        key={skill}
                        onMouseEnter={() => setHoveredSkill(skill)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        className={`text-xs font-mono tracking-wide rounded-md px-3 py-1.5 transition-all duration-300 cursor-help select-none border ${tagClass}`}
                      >
                        {skill}
                      </span>
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
