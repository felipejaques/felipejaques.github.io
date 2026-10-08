import { m } from 'framer-motion'
import { Code2 } from 'lucide-react'
import { skillGroups } from '../content'
import { useReveal } from '../motion'

export function About() {
  const reveal = useReveal()

  return (
    <section className="intro-section section-shell" id="sobre" aria-labelledby="about-title">
      <m.div className="section-heading" {...reveal()}>
        <p className="eyebrow"><span>01</span> Sobre mim</p>
        <h2 id="about-title">Tecnologia boa é aquela que <em>faz sentido</em> para quem usa.</h2>
      </m.div>
      <div className="about-grid">
        <m.div className="about-copy" {...reveal()}>
          <p>Há mais de 10 anos trabalho na criação de produtos digitais. Minha experiência passa por todo o ciclo: da conversa sobre o problema e decisões de arquitetura ao código, entrega e evolução em produção.</p>
          <p>Atuo como desenvolvedor full stack com Angular, Java e Flutter. Mais recentemente, venho explorando IA aplicada ao desenvolvimento, com LLMs, MCPs e automação de processos.</p>
          <p>Gosto de trabalhar perto de produto, design e engenharia para construir soluções bem pensadas, confiáveis e feitas para durar.</p>
        </m.div>
        <m.div className="skills-panel" {...reveal()}>
          <div className="skills-panel-head"><span>01 / TOOLKIT</span><Code2 size={18} aria-hidden="true" /></div>
          {skillGroups.map((group) => (
            <div className="skill-group" key={group.title}>
              <h3>{group.title}</h3>
              <ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
            </div>
          ))}
        </m.div>
      </div>
    </section>
  )
}
