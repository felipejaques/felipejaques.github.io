import { useState } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { categories, contact, projects, type Category } from '../content'
import { useReveal } from '../motion'

const filters = ['Todos', ...categories] as const

export function Projects() {
  const [category, setCategory] = useState<'Todos' | Category>('Todos')
  const reducedMotion = useReducedMotion()
  const reveal = useReveal()
  const shownProjects = category === 'Todos' ? projects : projects.filter((project) => project.category === category)

  return (
    <section className="projects-section section-shell" id="projetos" aria-labelledby="projects-title">
      <m.div className="section-heading section-heading-row projects-heading" {...reveal()}>
        <div>
          <p className="eyebrow"><span>04</span> Seleção de trabalhos</p>
          <h2 id="projects-title">Projetos com <em>propósito.</em></h2>
        </div>
        <a className="text-link github-link" href={contact.github} target="_blank" rel="noopener noreferrer">
          Mais no GitHub <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </m.div>

      <div className="project-toolbar">
        <p>{String(shownProjects.length).padStart(2, '0')} {shownProjects.length === 1 ? 'projeto' : 'projetos'}</p>
        <div className="filter-group" role="group" aria-label="Filtrar projetos por categoria">
          {filters.map((filter) => (
            <button
              key={filter}
              className={category === filter ? 'filter-button is-selected' : 'filter-button'}
              type="button"
              aria-pressed={category === filter}
              onClick={() => setCategory(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <m.div className="project-list" layout>
        <AnimatePresence mode="popLayout">
          {shownProjects.map((project) => (
            <m.article
              className="project-row"
              key={project.title}
              layout
              initial={reducedMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <span className="project-number">{project.number}</span>
              <div className="project-main">
                <div className="project-title-line">
                  <h3>{project.title}</h3>
                  <span className="project-category">{project.category}</span>
                </div>
                <p>{project.description}</p>
                <ul className="tag-list">{project.stack.map((tech) => <li key={tech}>{tech}</li>)}</ul>
              </div>
              <a className="project-open" href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Abrir ${project.title} em nova aba`}>
                <ArrowUpRight size={21} aria-hidden="true" />
              </a>
            </m.article>
          ))}
        </AnimatePresence>
      </m.div>
    </section>
  )
}
