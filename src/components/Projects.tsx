import { useRef, useState } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Plus } from 'lucide-react'
import { categories, contact, projects, type Category, type Project } from '../content'
import { useReveal } from '../motion'
import { ProjectModal } from './ProjectModal'

const filters = ['Todos', ...categories] as const

export function Projects() {
  const [category, setCategory] = useState<'Todos' | Category>('Todos')
  const [selected, setSelected] = useState<Project | null>(null)
  // The browser only restores focus after a <dialog> closes if focus was still inside it; a backdrop click
  // moves focus to <body> first, so we hand focus back to the button that opened the modal ourselves.
  const trigger = useRef<HTMLButtonElement | null>(null)
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
              <button
                className="project-open"
                type="button"
                aria-haspopup="dialog"
                aria-label={`Ver detalhes de ${project.title}`}
                onClick={(event) => {
                  trigger.current = event.currentTarget
                  setSelected(project)
                }}
              >
                <Plus size={21} aria-hidden="true" />
              </button>
            </m.article>
          ))}
        </AnimatePresence>
      </m.div>

      <ProjectModal
        project={selected}
        onClose={() => {
          setSelected(null)
          trigger.current?.focus({ preventScroll: true })
        }}
      />
    </section>
  )
}
