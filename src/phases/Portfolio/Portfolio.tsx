import { HeroSection } from './HeroSection'
import { ExperienceSection } from './ExperienceSection'
import { SkillsSection } from './SkillsSection'
import { ContactSection } from './ContactSection'
import { useThemeStore } from '@/store/useThemeStore'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import { useActiveSection } from '@/hooks/useActiveSection'
import { motion } from 'framer-motion'
import { WeatherCanvas } from '@/canvas/WeatherCanvas'
import { EnvironmentScenery } from '@/canvas/EnvironmentScenery'

export function Portfolio() {
  const theme = useThemeStore((s) => s.theme)
  const element = useThemeStore((s) => s.element)
  const setPhase = useThemeStore((s) => s.setPhase)
  const activeSection = useActiveSection(['hero', 'experience', 'skills', 'contact'], 0.5)
  
  useSmoothScroll()

  return (
    <motion.div
      className="portfolio"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{ background: theme?.palette.background }}
    >
      {/* Landscape Ground Elements */}
      <EnvironmentScenery element={element} />

      {/* Particle background */}
      <WeatherCanvas element={element} />

      {/* Dark overlay for readability */}
      <div className="portfolio-overlay" />

      {/* Back to Splash Button */}
      <button 
        className="back-to-splash-btn" 
        onClick={() => setPhase('splash')}
        title="Voltar para seleção de atmosferas"
      >
        <span className="back-icon">←</span> Início
      </button>

      {/* Content */}
      <div className="portfolio-content">
        <HeroSection />
        <ExperienceSection />
        <SkillsSection />
        <ContactSection />
      </div>

      {/* Navigation dots */}
      <nav className="portfolio-nav">
        <a href="#hero" className={`nav-dot ${activeSection === 'hero' ? 'nav-dot--active' : ''}`} title="Início" />
        <a href="#experience" className={`nav-dot ${activeSection === 'experience' ? 'nav-dot--active' : ''}`} title="Experiência" />
        <a href="#skills" className={`nav-dot ${activeSection === 'skills' ? 'nav-dot--active' : ''}`} title="Habilidades" />
        <a href="#contact" className={`nav-dot ${activeSection === 'contact' ? 'nav-dot--active' : ''}`} title="Contato" />
      </nav>
    </motion.div>
  )
}

