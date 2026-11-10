import { portfolioData } from '../data/portfolioData';
import ProjectCard from '../components/ProjectCard';

export default function Projects() {
  const { projects } = portfolioData;

  return (
    <section id="projects" className="py-24 px-6 border-t border-slate-100 dark:border-slate-900 bg-transparent">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <div className="text-xs uppercase tracking-widest text-brand-600 dark:text-brand-400 font-bold">
            CASE STUDIES
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-800 dark:text-slate-100 tracking-tight leading-tight">
            Featured Projects
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed">
            Detailed architectures representing real-world solutions designed for high performance, transactional safety, and automation.
          </p>
        </div>

        {/* Projects Stack */}
        <div className="flex flex-col gap-10">
          {projects && projects.length > 0 ? (
            projects.map((project, idx) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={idx}
              />
            ))
          ) : (
            <div className="p-8 text-center text-slate-500 font-mono text-xs border border-dashed border-slate-300 dark:border-slate-800 rounded-xl">
              NO_CASE_STUDIES_AVAILABLE
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
