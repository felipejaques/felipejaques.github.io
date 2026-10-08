import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import {
  ArrowDown, ArrowRight, ArrowUpRight, BriefcaseBusiness, Code2,
  GraduationCap, Mail, Menu, Moon, Sun, X,
} from 'lucide-react'
import './App.css'

type Category = 'Web' | 'Aplicativos' | 'APIs'
type Project = { number: string; title: string; description: string; stack: string[]; url: string; category: Category }

const navItems = [
  { id: 'sobre', label: 'Sobre' },
  { id: 'experiencia', label: 'Experiência' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'contato', label: 'Contato' },
]

const projects: Project[] = [
  { number: '01', title: 'Alerta BR', description: 'Plataforma que cruza dados geográficos, demográficos e climáticos para antecipar riscos e apoiar decisões em todo o território nacional.', stack: ['Next.js', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL'], url: 'https://github.com/felipejaques/alertabr', category: 'Web' },
  { number: '02', title: 'Finanças pessoais', description: 'Aplicativo mobile para acompanhar receitas, despesas e a vida financeira no dia a dia.', stack: ['Flutter', 'Java', 'PostgreSQL'], url: 'https://github.com/felipejaques/person-finance-mobile', category: 'Aplicativos' },
  { number: '03', title: 'Dashboard financeiro', description: 'Painel web para visualizar e organizar dados de finanças pessoais em uma experiência simples.', stack: ['Angular', 'TypeScript', 'Java', 'PostgreSQL'], url: 'https://github.com/felipejaques/person-finance-front-end', category: 'Web' },
  { number: '04', title: 'Raspberry Awards', description: 'Consulta de vencedores do Golden Raspberry Awards, com filtros por ano e estatísticas de premiações.', stack: ['Angular', 'Java', 'Spring Boot', 'PostgreSQL'], url: 'https://github.com/felipejaques/raspberry-awards-front-end', category: 'Web' },
  { number: '05', title: 'Recepção de hotel', description: 'API para gestão de reservas, check-in, check-out e cadastro de hóspedes.', stack: ['Java', 'Spring Boot', 'REST', 'PostgreSQL'], url: 'https://github.com/felipejaques/CRUD---hotel-reception', category: 'APIs' },
  { number: '06', title: 'HomeLab', description: 'Servidor doméstico com Linux (Armbian) e CasaOS para orquestrar containers Docker, centralizando mídia, downloads, serviços de rede e hospedagem de projetos pessoais.', stack: ['Linux', 'Armbian', 'CasaOS', 'Docker'], url: 'https://www.linkedin.com/pulse/transformei-uma-tv-box-antigo-em-um-mini-servidor-com-felipe-jaques-whbcf', category: 'Web' },
]

const skillGroups = [
  { title: 'Desenvolvimento', skills: ['Angular', 'React', 'TypeScript', 'Java', 'Spring Boot', 'Flutter'] },
  { title: 'Plataforma & dados', skills: ['Node.js', 'APIs REST', 'PostgreSQL', 'Oracle', 'MySQL', 'Docker'] },
  { title: 'Inteligência Artificial', skills: ['LLMs', 'MCP', 'IA generativa', 'AI-assisted development'] },
]

const education = [
  { period: '2018 — 2021', place: 'Unicesumar', detail: 'Análise e Desenvolvimento de Sistemas' },
  { period: '2016', place: 'SENAI Blumenau', detail: 'Aprendizagem Industrial em Informática' },
  { period: 'Formação complementar', place: 'Cursos e estudos contínuos', detail: 'Spring Boot, JavaScript ES6, UI Design e Flutter' },
]

type Theme = 'light' | 'dark'
const themeStorageKey = 'portfolio-theme'
const darkSchemeQuery = '(prefers-color-scheme: dark)'

function savedTheme(): Theme | null {
  try {
    const saved = window.localStorage.getItem(themeStorageKey)
    return saved === 'light' || saved === 'dark' ? saved : null
  } catch {
    return null
  }
}

function systemTheme(): Theme {
  return window.matchMedia(darkSchemeQuery).matches ? 'dark' : 'light'
}

function initialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  return savedTheme() ?? systemTheme()
}

function App() {
  const [theme, setTheme] = useState<Theme>(initialTheme)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('sobre')
  const [category, setCategory] = useState<'Todos' | Category>('Todos')
  const reducedMotion = useReducedMotion()
  const pointerTiltX = useMotionValue(0)
  const pointerTiltY = useMotionValue(0)
  const springTiltX = useSpring(pointerTiltX, { stiffness: 150, damping: 18 })
  const springTiltY = useSpring(pointerTiltY, { stiffness: 150, damping: 18 })

  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const mobileNavRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  // Follow the OS theme until the visitor picks one explicitly.
  useEffect(() => {
    const media = window.matchMedia(darkSchemeQuery)
    const followSystem = () => { if (!savedTheme()) setTheme(systemTheme()) }
    media.addEventListener('change', followSystem)
    return () => media.removeEventListener('change', followSystem)
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    try { window.localStorage.setItem(themeStorageKey, next) } catch { /* Storage is optional. */ }
  }

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

  const reveal = (delay = 0) => reducedMotion ? {} : {
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.55, delay, ease: 'easeOut' as const },
  }
  const shownProjects = category === 'Todos' ? projects : projects.filter((project) => project.category === category)
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

  return <>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <header className="site-header">
      <a className="wordmark" href="#inicio" aria-label="Felipe Jaques, início">fj<span>.</span></a>
      <nav className="main-nav" aria-label="Navegação principal">
        {navItems.map((item) => <a key={item.id} href={`#${item.id}`} className={activeSection === item.id ? 'nav-link is-active' : 'nav-link'} aria-current={activeSection === item.id ? 'location' : undefined} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
      </nav>
      <div className="header-actions">
        <button className="icon-button" type="button" aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'} title={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'} onClick={toggleTheme}>{theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}</button>
        <button ref={menuButtonRef} className="icon-button menu-button" type="button" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
      </div>
    </header>
    <div className={`mobile-nav-backdrop${menuOpen ? ' is-visible' : ''}`} aria-hidden="true" onClick={() => setMenuOpen(false)} />
    <div className={`mobile-nav-panel${menuOpen ? ' is-open' : ''}`} ref={mobileNavRef} id="mobile-navigation" aria-hidden={!menuOpen}>{navItems.map((item, index) => <motion.a key={item.id} href={`#${item.id}`} initial={reducedMotion ? false : { opacity: 0, x: 12 }} animate={{ opacity: menuOpen ? 1 : 0, x: menuOpen ? 0 : 12 }} transition={{ delay: menuOpen ? index * 0.04 : 0 }} onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1}>{item.label}<ArrowUpRight size={17} aria-hidden="true" /></motion.a>)}</div>

    <main id="conteudo">
      <section className="hero section-shell" id="inicio" aria-labelledby="hero-title">
        <div className="hero-copy">
          <motion.p className="eyebrow hero-eyebrow" initial={reducedMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}><span className="status-dot" /> Desenvolvedor de software · Blumenau, SC</motion.p>
          <motion.h1 id="hero-title" initial={reducedMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08 }}>Felipe <span>Jaques</span></motion.h1>
          <motion.p className="hero-summary" initial={reducedMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.16 }}>Transformo problemas complexos em <strong>software útil, escalável e confiável.</strong></motion.p>
          <motion.div className="hero-actions" initial={reducedMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.24 }}>
            <a className="button button-primary" href="#projetos">Explorar projetos <ArrowDown size={16} aria-hidden="true" /></a>
            <a className="text-link" href="mailto:felipejaques3@gmail.com">Vamos conversar <ArrowUpRight size={16} aria-hidden="true" /></a>
          </motion.div>
          <motion.div className="hero-meta" initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.38 }}><span><strong>10+</strong> anos criando software</span><span className="meta-divider" /><span>Full stack <i>·</i> Mobile <i>·</i> IA</span></motion.div>
        </div>
        <motion.div className="hero-visual" initial={reducedMotion ? false : { opacity: 0, scale: 0.96, y: 14 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.12 }}>
          <motion.div className="portrait-frame" style={{ rotateX: springTiltX, rotateY: springTiltY, transformPerspective: 900 }} onPointerMove={handlePortraitPointerMove} onPointerLeave={resetPortraitTilt}><div className="portrait-topline"><span>FJ / 2026</span><span>DEV, BR</span></div><img src="/felipe-avatar.png" alt="Avatar de Felipe Jaques" width="1254" height="1254" fetchPriority="high" /><span className="portrait-caption">CÓDIGO COM INTENÇÃO.</span></motion.div>
        </motion.div>
        <a className="scroll-cue" href="#sobre"><span>Role para conhecer</span><ArrowDown size={15} /></a>
      </section>

      <section className="intro-section section-shell" id="sobre" aria-labelledby="about-title">
        <motion.div className="section-heading" {...reveal()}><p className="eyebrow"><span>01</span> Sobre mim</p><h2 id="about-title">Tecnologia boa é aquela que <em>faz sentido</em> para quem usa.</h2></motion.div>
        <div className="about-grid">
          <motion.div className="about-copy" {...reveal()}><p>Há mais de 10 anos trabalho na criação de produtos digitais. Minha experiência passa por todo o ciclo: da conversa sobre o problema e decisões de arquitetura ao código, entrega e evolução em produção.</p><p>Atuo como desenvolvedor full stack com Angular, Java e Flutter. Mais recentemente, venho explorando IA aplicada ao desenvolvimento, com LLMs, MCPs e automação de processos.</p><p>Gosto de trabalhar perto de produto, design e engenharia para construir soluções bem pensadas, confiáveis e feitas para durar.</p></motion.div>
          <motion.div className="skills-panel" {...reveal()}><div className="skills-panel-head"><span>01 / TOOLKIT</span><Code2 size={18} aria-hidden="true" /></div>{skillGroups.map((group) => <div className="skill-group" key={group.title}><h3>{group.title}</h3><ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></div>)}</motion.div>
        </div>
      </section>

      <section className="experience-section section-shell" id="experiencia" aria-labelledby="experience-title">
        <motion.div className="section-heading section-heading-row" {...reveal()}><div><p className="eyebrow"><span>02</span> Trajetória</p><h2 id="experience-title">Experiência que <em>entrega.</em></h2></div><p className="section-aside">Uma década de evolução entre produto, engenharia e pessoas.</p></motion.div>
        <div className="timeline">
          <motion.article className="timeline-entry" {...reveal()}><div className="timeline-date">MAI 2018 — ATUAL<br /><span>Blumenau, SC</span></div><div className="timeline-mark" aria-hidden="true" /><div className="timeline-content"><div className="timeline-title-row"><div><h3>Senior Sistemas</h3><p className="role-title">Desenvolvedor de software</p></div><BriefcaseBusiness size={19} aria-hidden="true" /></div><p>Atuação full stack em produtos da plataforma Ronda Senior X, com Angular, Java e Flutter. Participação em soluções como Security Hub, Gestão de Rotinas e Gestão de Ocorrências.</p><p>Antes disso, desenvolvi soluções BPM para FIEP, Porto Seguro e CAIXA, e atuei na sustentação de produtos da Fábrica de Software.</p><ul className="tag-list"><li>Angular</li><li>Java / Spring</li><li>Flutter</li><li>Node.js</li><li>Oracle</li></ul></div></motion.article>
          <motion.article className="timeline-entry" {...reveal()}><div className="timeline-date">FEV 2017 — MAI 2018<br /><span>Blumenau, SC</span></div><div className="timeline-mark" aria-hidden="true" /><div className="timeline-content"><div className="timeline-title-row"><div><h3>SOU.IS Tecnologia e Sistemas</h3><p className="role-title">Suporte técnico</p></div><BriefcaseBusiness size={19} aria-hidden="true" /></div><p>Suporte a sistemas ERP, ajudando clientes a manter seus processos e operações funcionando.</p><ul className="tag-list"><li>Suporte técnico</li><li>ERP</li></ul></div></motion.article>
        </div>
      </section>

      <section className="education-section section-shell" aria-labelledby="education-title">
        <motion.div className="education-heading" {...reveal()}><GraduationCap size={22} aria-hidden="true" /><div><p className="eyebrow"><span>03</span> Aprendizado contínuo</p><h2 id="education-title">Formação</h2></div></motion.div>
        <div className="education-list">{education.map((item, index) => <motion.article className="education-item" key={item.place} {...reveal(index * 0.06)}><span>{item.period}</span><h3>{item.place}</h3><p>{item.detail}</p></motion.article>)}</div>
      </section>

      <section className="projects-section section-shell" id="projetos" aria-labelledby="projects-title">
        <motion.div className="section-heading section-heading-row projects-heading" {...reveal()}><div><p className="eyebrow"><span>04</span> Seleção de trabalhos</p><h2 id="projects-title">Projetos com <em>propósito.</em></h2></div><a className="text-link github-link" href="https://github.com/felipejaques" target="_blank" rel="noopener noreferrer">Mais no GitHub <ArrowUpRight size={16} aria-hidden="true" /></a></motion.div>
        <div className="project-toolbar"><p>{String(shownProjects.length).padStart(2, '0')} {shownProjects.length === 1 ? 'projeto' : 'projetos'}</p><div className="filter-group" role="group" aria-label="Filtrar projetos por categoria">{(['Todos', 'Web', 'Aplicativos', 'APIs'] as const).map((filter) => <button key={filter} className={category === filter ? 'filter-button is-selected' : 'filter-button'} type="button" aria-pressed={category === filter} onClick={() => setCategory(filter)}>{filter}</button>)}</div></div>
        <motion.div className="project-list" layout><AnimatePresence mode="popLayout">{shownProjects.map((project) => <motion.article className="project-row" key={project.title} layout initial={reducedMotion ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0, y: -8 }} transition={{ duration: 0.25 }}><span className="project-number">{project.number}</span><div className="project-main"><div className="project-title-line"><h3>{project.title}</h3><span className="project-category">{project.category}</span></div><p>{project.description}</p><ul className="tag-list">{project.stack.map((tech) => <li key={tech}>{tech}</li>)}</ul></div><a className="project-open" href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Abrir ${project.title} em nova aba`}><ArrowUpRight size={21} aria-hidden="true" /></a></motion.article>)}</AnimatePresence></motion.div>
      </section>

      <section className="contact-section section-shell" id="contato" aria-labelledby="contact-title">
        <motion.div className="contact-copy" {...reveal()}><p className="eyebrow"><span>05</span> Próximo capítulo</p><h2 id="contact-title">Tem um desafio interessante? <em>Vamos conversar.</em></h2><a className="button button-dark" href="mailto:felipejaques3@gmail.com">Escreva para mim <ArrowUpRight size={17} aria-hidden="true" /></a></motion.div>
        <motion.div className="contact-links" {...reveal()}><a href="mailto:felipejaques3@gmail.com"><Mail size={18} aria-hidden="true" /><span>E-mail</span><ArrowUpRight size={16} aria-hidden="true" /></a><a href="https://github.com/felipejaques" target="_blank" rel="noopener noreferrer"><Code2 size={18} aria-hidden="true" /><span>GitHub</span><ArrowUpRight size={16} aria-hidden="true" /></a><a href="https://linkedin.com/in/felipe-jaques" target="_blank" rel="noopener noreferrer"><span className="linkedin-mark" aria-hidden="true">in</span><span>LinkedIn</span><ArrowUpRight size={16} aria-hidden="true" /></a></motion.div>
      </section>
    </main>

    <footer className="site-footer section-shell"><a className="wordmark footer-mark" href="#inicio" aria-label="Voltar ao início">fj<span>.</span></a><p>Feito por Felipe Jaques · {new Date().getFullYear()}</p><a className="back-top" href="#inicio">Voltar ao topo <ArrowRight size={15} /></a></footer>
  </>
}

export default App
