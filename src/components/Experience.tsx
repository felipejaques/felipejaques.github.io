import { m } from 'framer-motion'
import { BriefcaseBusiness } from 'lucide-react'
import { experience } from '../content'
import { useReveal } from '../motion'

export function Experience() {
  const reveal = useReveal()

  return (
    <section className="experience-section section-shell" id="experiencia" aria-labelledby="experience-title">
      <m.div className="section-heading section-heading-row" {...reveal()}>
        <div>
          <p className="eyebrow"><span>02</span> Trajetória</p>
          <h2 id="experience-title">Experiência que <em>entrega.</em></h2>
        </div>
        <p className="section-aside">Uma década de evolução entre produto, engenharia e pessoas.</p>
      </m.div>
      <div className="timeline">
        {experience.map((job) => (
          <m.article className="timeline-entry" key={job.company} {...reveal()}>
            <div className="timeline-date">{job.period}<br /><span>{job.location}</span></div>
            <div className="timeline-mark" aria-hidden="true" />
            <div className="timeline-content">
              <div className="timeline-title-row">
                <div>
                  <h3>{job.company}</h3>
                  <p className="role-title">{job.role}</p>
                </div>
                <BriefcaseBusiness size={19} aria-hidden="true" />
              </div>
              {job.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <ul className="tag-list">{job.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
            </div>
          </m.article>
        ))}
      </div>
    </section>
  )
}
