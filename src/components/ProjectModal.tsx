import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Mail, X } from 'lucide-react'
import { contact, type CaseStudy, type Project, type ProjectImage } from '../content'

type Props = {
  project: Project | null
  onClose: () => void
}

/** Resolves a path under public/ against Vite's base, so images keep working if the site moves to a sub-path. */
const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

/** Native <dialog> gives us focus trapping, Esc to close and focus return to the trigger for free. */
export function ProjectModal({ project, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  // Where the pointer went down: a click only counts as "on the backdrop" if it also started there,
  // otherwise dragging a text selection out of the content would close the modal.
  const pointerDownTarget = useRef<EventTarget | null>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (project && !dialog.open) dialog.showModal()
    else if (!project && dialog.open) dialog.close()
  }, [project])

  const subject = project ? `${project.forSale ? 'Interesse em adquirir' : 'Sobre o projeto'}: ${project.title}` : ''
  const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}`
  const details = project?.details ?? (project ? [project.description] : [])

  return (
    <dialog
      ref={dialogRef}
      className="project-modal"
      aria-labelledby="project-modal-title"
      onClose={onClose}
      onPointerDown={(event) => { pointerDownTarget.current = event.target }}
      onClick={(event) => {
        const dialog = event.currentTarget
        if (event.target !== dialog || pointerDownTarget.current !== dialog) return
        // The dialog box itself has no padding, so a click on the element outside its rect is on the backdrop
        // (this also ignores clicks on the dialog's own scrollbar).
        const rect = dialog.getBoundingClientRect()
        const inside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom
        if (!inside) dialog.close()
      }}
    >
      {project && (
        <div className="project-modal-body">
          <header className="project-modal-header">
            <div>
              <p className="eyebrow"><span>{project.number}</span> {project.category}</p>
              <h2 id="project-modal-title">{project.title}</h2>
              {project.forSale && <span className="project-sale">Disponível para venda</span>}
            </div>
            <button className="icon-button project-modal-close" type="button" aria-label="Fechar detalhes do projeto" onClick={() => dialogRef.current?.close()}>
              <X size={20} aria-hidden="true" />
            </button>
          </header>

          {/* Keyed by project so the selected image resets whenever another project opens. */}
          {project.images?.length ? <ProjectGallery key={project.title} images={project.images} /> : null}

          <div className="project-modal-text">
            {details.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          </div>

          {project.caseStudy && <CaseStudySections caseStudy={project.caseStudy} />}

          <ul className="tag-list">{project.stack.map((tech) => <li key={tech}>{tech}</li>)}</ul>

          <div className="project-modal-actions">
            <a className="button button-primary" href={mailto}>
              {project.forSale ? 'Tenho interesse' : 'Falar sobre este projeto'} <Mail size={17} aria-hidden="true" />
            </a>
            {project.links.map((link) => (
              <a key={link.url} className="text-link" href={link.url} target="_blank" rel="noopener noreferrer">
                {link.label} <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      )}
    </dialog>
  )
}

function CaseStudySections({ caseStudy }: { caseStudy: CaseStudy }) {
  const lists = [
    { title: 'Decisões técnicas', items: caseStudy.decisions },
    { title: 'Dificuldades', items: caseStudy.challenges },
    { title: 'Aprendizados', items: caseStudy.learnings },
  ]

  return (
    <div className="case-study">
      <section>
        <h3>Problema</h3>
        <p>{caseStudy.problem}</p>
      </section>
      {lists.map((list) => (
        <section key={list.title}>
          <h3>{list.title}</h3>
          <ul>{list.items.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
      ))}
    </div>
  )
}

function ProjectGallery({ images }: { images: ProjectImage[] }) {
  const [active, setActive] = useState(0)
  const image = images[active]

  return (
    <div className="project-gallery">
      <img className="project-gallery-main" src={asset(image.src)} alt={image.alt} />
      {images.length > 1 && (
        <ul className="project-gallery-thumbs" aria-label="Imagens do projeto">
          {images.map((item, index) => (
            <li key={item.src}>
              <button
                type="button"
                className={index === active ? 'is-selected' : undefined}
                aria-label={`Ver imagem ${index + 1}: ${item.alt}`}
                aria-pressed={index === active}
                onClick={() => setActive(index)}
              >
                <img src={asset(item.thumb ?? item.src)} alt="" loading="lazy" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
