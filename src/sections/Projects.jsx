import { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import ProjectCard from '../components/ProjectCard';
import CardSlider from '../components/CardSlider';
import { Layers, CreditCard, CloudLightning, BrainCircuit } from 'lucide-react';

const filterCategories = [
  { id: 'all', label: 'All Case Studies', icon: Layers },
  { id: 'payment', label: 'Payment Engines', icon: CreditCard },
  { id: 'cloud', label: 'Cloud Microservices', icon: CloudLightning },
  { id: 'ai', label: 'GenAI & ML Systems', icon: BrainCircuit },
  { id: 'fullstack', label: 'Fullstack & React', icon: Layers }
];

export default function Projects() {
  const { projects } = portfolioData;
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects = (projects || []).filter((project) => {
    if (activeFilter === 'all') return true;
    const title = project.title.toLowerCase();
    const stack = (project.stack || []).map((s) => s.toLowerCase()).join(' ');

    if (activeFilter === 'fullstack') {
      return stack.includes('react') || stack.includes('bootstrap') || title.includes('inventory') || title.includes('learning');
    }
    if (activeFilter === 'payment') {
      return title.includes('payment') || stack.includes('eft') || stack.includes('redis');
    }
    if (activeFilter === 'cloud') {
      return stack.includes('azure') || stack.includes('docker') || title.includes('microservices');
    }
    if (activeFilter === 'ai') {
      return title.includes('ai') || stack.includes('langgraph') || stack.includes('scikit');
    }
    return true;
  });

  return (
    <section id="projects" className="py-24 border-t border-slate-200/60 dark:border-slate-800/60 bg-transparent scroll-mt-20">
      <div className="fluid-canvas w-full">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-12">
          <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-slate-100 tracking-tight leading-tight max-w-3xl text-balance">
            Case Studies
          </h2>
          <p className="text-sm sm:text-base text-slate-650 dark:text-slate-400 max-w-2xl leading-relaxed text-pretty">
            Architectural case studies engineered for transactional safety, ultra-low latency, and intelligent automation. Hover or tap each interactive system diagram to inspect data pipelines.
          </p>
        </div>

        {/* Filter Navigation Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filterCategories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveFilter(cat.id)}
                aria-pressed={isActive}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-200 border min-h-[38px] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                  isActive
                    ? 'bg-teal-800 text-white border-teal-800 dark:bg-teal-950/80 dark:text-teal-300 dark:border-teal-500/50 shadow-sm font-semibold'
                    : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-teal-500/40 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Case Studies Showcase (Slider if > 3 items, Centered Grid if <= 3) */}
        <CardSlider
          items={filteredProjects}
          density="double"
          deckName="CASE STUDIES"
          keyExtractor={(project) => project.title}
          renderItem={(project, idx) => (
            <ProjectCard
              project={project}
              index={idx}
            />
          )}
        />

      </div>
    </section>
  );
}
