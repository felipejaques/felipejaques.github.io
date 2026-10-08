import { ArrowRight } from 'lucide-react'
import { currentYear } from '../content'

export function Footer() {
  return (
    <footer className="site-footer section-shell">
      <a className="wordmark footer-mark" href="#inicio" aria-label="Voltar ao início">fj<span>.</span></a>
      <p>Feito por Felipe Jaques · {currentYear}</p>
      <a className="back-top" href="#inicio">Voltar ao topo <ArrowRight size={15} aria-hidden="true" /></a>
    </footer>
  )
}
