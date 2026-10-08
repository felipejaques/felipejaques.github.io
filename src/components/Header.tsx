import { useEffect, useRef, useState } from 'react'
import { m, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react'
import { navItems } from '../content'
import { useTheme } from '../theme'

function useActiveSection() {
  const [activeSection, setActiveSection] = useState('sobre')

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const current = entries.find((entry) => entry.isIntersecting)
      if (current) setActiveSection(current.target.id)
    }, { rootMargin: '-35% 0px -55% 0px' })
    navItems.forEach(({ id }) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })
    return () => observer.disconnect()
  }, [])

  return activeSection
}

export function Header() {
  const { theme, toggleTheme } = useTheme()
  const activeSection = useActiveSection()
  const [menuOpen, setMenuOpen] = useState(false)
  const reducedMotion = useReducedMotion()
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const mobileNavRef = useRef<HTMLDivElement>(null)
  const themeLabel = theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'
  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    if (!menuOpen) return
    mobileNavRef.current?.querySelector('a')?.focus()
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setMenuOpen(false)
      menuButtonRef.current?.focus()
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  return <>
    <header className="site-header">
      <a className="wordmark" href="#inicio" aria-label="Felipe Jaques, início">fj<span>.</span></a>
      <nav className="main-nav" aria-label="Navegação principal">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={activeSection === item.id ? 'nav-link is-active' : 'nav-link'}
            aria-current={activeSection === item.id ? 'location' : undefined}
            onClick={closeMenu}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <button className="icon-button" type="button" aria-label={themeLabel} title={themeLabel} onClick={toggleTheme}>
          {theme === 'dark' ? <Sun size={19} aria-hidden="true" /> : <Moon size={19} aria-hidden="true" />}
        </button>
        <button
          ref={menuButtonRef}
          className="icon-button menu-button"
          type="button"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
        </button>
      </div>
    </header>

    {/* Rendered right after the header so keyboard focus reaches the links next. */}
    <div className={`mobile-nav-backdrop${menuOpen ? ' is-visible' : ''}`} aria-hidden="true" onClick={closeMenu} />
    <div className={`mobile-nav-panel${menuOpen ? ' is-open' : ''}`} ref={mobileNavRef} id="mobile-navigation" aria-hidden={!menuOpen}>
      {navItems.map((item, index) => (
        <m.a
          key={item.id}
          href={`#${item.id}`}
          initial={reducedMotion ? false : { opacity: 0, x: 12 }}
          animate={{ opacity: menuOpen ? 1 : 0, x: menuOpen ? 0 : 12 }}
          transition={{ delay: menuOpen ? index * 0.04 : 0 }}
          onClick={closeMenu}
          tabIndex={menuOpen ? 0 : -1}
        >
          {item.label}
          <ArrowUpRight size={17} aria-hidden="true" />
        </m.a>
      ))}
    </div>
  </>
}
