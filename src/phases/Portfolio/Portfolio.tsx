import { HeroSection } from './HeroSection'
import { ExperienceSection } from './ExperienceSection'
import { SkillsSection } from './SkillsSection'
import { ContactSection } from './ContactSection'
import { useThemeStore } from '@/store/useThemeStore'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import { motion } from 'framer-motion'
import { WeatherCanvas } from '@/canvas/WeatherCanvas'

export function Portfolio() {
  const theme = useThemeStore((s) => s.theme)
  const element = useThemeStore((s) => s.element)
  useSmoothScroll()

  return (
    <motion.div
      className="portfolio"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{ background: theme?.palette.background }}
    >
      {/* Particle background */}
      <WeatherCanvas element={element} />

      {/* Dark overlay for readability */}
      <div className="portfolio-overlay" />

      {/* Content */}
      <div className="portfolio-content">
        <HeroSection />
        <ExperienceSection />
        <SkillsSection />
        <ContactSection />
      </div>

      {/* Navigation dots */}
      <nav className="portfolio-nav">
        <a href="#hero" className="nav-dot nav-dot--active" title="Início" />
        <a href="#experience" className="nav-dot" title="Experiência" />
        <a href="#skills" className="nav-dot" title="Habilidades" />
        <a href="#contact" className="nav-dot" title="Contato" />
      </nav>
    </motion.div>
  )
}
