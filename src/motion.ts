import { useReducedMotion } from 'framer-motion'

/** Props that fade a block in once it scrolls into view; empty when the visitor prefers reduced motion. */
export function useReveal() {
  const reducedMotion = useReducedMotion()
  return (delay = 0) => reducedMotion ? {} : {
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.55, delay, ease: 'easeOut' as const },
  }
}
