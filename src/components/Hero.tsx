import type { PointerEvent } from 'react'
import { m, useMotionValue, useReducedMotion, useSpring, type TargetAndTransition } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { contact, currentYear } from '../content'

export function Hero() {
  const reducedMotion = useReducedMotion()
  const pointerTiltX = useMotionValue(0)
  const pointerTiltY = useMotionValue(0)
  const springTiltX = useSpring(pointerTiltX, { stiffness: 150, damping: 18 })
  const springTiltY = useSpring(pointerTiltY, { stiffness: 150, damping: 18 })
  const enter = (from: TargetAndTransition) => (reducedMotion ? false : from)

  const handlePortraitPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5
    const vertical = (event.clientY - bounds.top) / bounds.height - 0.5
    pointerTiltX.set(vertical * -8)
    pointerTiltY.set(horizontal * 8)
  }
  const resetPortraitTilt = () => {
    pointerTiltX.set(0)
    pointerTiltY.set(0)
  }

  return (
    <section className="hero section-shell" id="inicio" aria-labelledby="hero-title">
      <div className="hero-copy">
        <m.p className="eyebrow hero-eyebrow" initial={enter({ opacity: 0, y: 12 })} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <span className="status-dot" /> Desenvolvedor de software · Blumenau, SC
        </m.p>
        <m.h1 id="hero-title" initial={enter({ opacity: 0, y: 20 })} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08 }}>
          Felipe <span>Jaques</span>
        </m.h1>
        <m.p className="hero-summary" initial={enter({ opacity: 0, y: 20 })} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.16 }}>
          Transformo problemas complexos em <strong>software útil, escalável e confiável.</strong>
        </m.p>
        <m.div className="hero-actions" initial={enter({ opacity: 0, y: 16 })} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.24 }}>
          <a className="button button-primary" href="#projetos">Explorar projetos <ArrowDown size={16} aria-hidden="true" /></a>
          <a className="text-link" href={`mailto:${contact.email}`}>Vamos conversar <ArrowUpRight size={16} aria-hidden="true" /></a>
        </m.div>
        <m.div className="hero-meta" initial={enter({ opacity: 0 })} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.38 }}>
          <span><strong>10+</strong> anos criando software</span>
          <span className="meta-divider" />
          <span>Full stack <i>·</i> Mobile <i>·</i> IA</span>
        </m.div>
      </div>

      <m.div className="hero-visual" initial={enter({ opacity: 0, scale: 0.96, y: 14 })} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.12 }}>
        <m.div
          className="portrait-frame"
          style={{ rotateX: springTiltX, rotateY: springTiltY, transformPerspective: 900 }}
          onPointerMove={handlePortraitPointerMove}
          onPointerLeave={resetPortraitTilt}
        >
          <div className="portrait-topline"><span>FJ / {currentYear}</span><span>DEV, BR</span></div>
          <img
            src="/felipe-avatar-800.webp"
            srcSet="/felipe-avatar-400.webp 400w, /felipe-avatar-800.webp 800w"
            sizes="(max-width: 768px) 330px, 370px"
            alt="Avatar de Felipe Jaques"
            width="800"
            height="800"
            fetchPriority="high"
          />
          <span className="portrait-caption">CÓDIGO COM INTENÇÃO.</span>
        </m.div>
      </m.div>

      <a className="scroll-cue" href="#sobre"><span>Role para conhecer</span><ArrowDown size={15} aria-hidden="true" /></a>
    </section>
  )
}
