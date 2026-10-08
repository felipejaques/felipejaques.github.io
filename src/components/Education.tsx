import { m } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import { education } from '../content'
import { useReveal } from '../motion'

export function Education() {
  const reveal = useReveal()

  return (
    <section className="education-section section-shell" aria-labelledby="education-title">
      <m.div className="education-heading" {...reveal()}>
        <GraduationCap size={22} aria-hidden="true" />
        <div>
          <p className="eyebrow"><span>03</span> Aprendizado contínuo</p>
          <h2 id="education-title">Formação</h2>
        </div>
      </m.div>
      <div className="education-list">
        {education.map((item, index) => (
          <m.article className="education-item" key={item.place} {...reveal(index * 0.06)}>
            <span>{item.period}</span>
            <h3>{item.place}</h3>
            <p>{item.detail}</p>
          </m.article>
        ))}
      </div>
    </section>
  )
}
