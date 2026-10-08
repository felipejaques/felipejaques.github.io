import { LazyMotion } from 'framer-motion'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Education } from './components/Education'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import './App.css'

// `m` components + LazyMotion load the animation features in a separate chunk after first paint.
// domMax (not domAnimation) because the project list uses layout animations.
const loadMotionFeatures = () => import('./motion-features').then((mod) => mod.default)

function App() {
  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo">
        <Hero />
        <About />
        <Experience />
        <Education />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </LazyMotion>
  )
}

export default App
