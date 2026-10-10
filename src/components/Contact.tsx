import { m } from 'framer-motion'
import { ArrowUpRight, Code2, Download, Mail } from 'lucide-react'
import { contact } from '../content'
import { useReveal } from '../motion'

export function Contact() {
  const reveal = useReveal()

  return (
    <section className="contact-section section-shell" id="contato" aria-labelledby="contact-title">
      <m.div className="contact-copy" {...reveal()}>
        <p className="eyebrow"><span>05</span> Próximo capítulo</p>
        <h2 id="contact-title">Tem um desafio interessante? <em>Vamos conversar.</em></h2>
        <div className="contact-actions">
          <a className="button button-dark" href={`mailto:${contact.email}`}>Escreva para mim <ArrowUpRight size={17} aria-hidden="true" /></a>
          <a className="button button-outline" href={`${import.meta.env.BASE_URL}${contact.resume}`} download>
            Baixar currículo (PDF) <Download size={17} aria-hidden="true" />
          </a>
        </div>
      </m.div>
      <m.div className="contact-links" {...reveal()}>
        <a href={`mailto:${contact.email}`}>
          <Mail size={18} aria-hidden="true" /><span>E-mail</span><ArrowUpRight size={16} aria-hidden="true" />
        </a>
        <a href={contact.github} target="_blank" rel="noopener noreferrer">
          <Code2 size={18} aria-hidden="true" /><span>GitHub</span><ArrowUpRight size={16} aria-hidden="true" />
        </a>
        <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
          <span className="linkedin-mark" aria-hidden="true">in</span><span>LinkedIn</span><ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </m.div>
    </section>
  )
}
