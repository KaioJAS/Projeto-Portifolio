import { HeroSection } from './HeroSection'
import { ExperienceSection } from './ExperienceSection'
import { SkillsSection } from './SkillsSection'
import { ContactSection } from './ContactSection'
import { useThemeStore } from '@/store/useThemeStore'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { WeatherCanvas } from '@/canvas/WeatherCanvas'
import { EnvironmentScenery } from '@/canvas/EnvironmentScenery'
import { ParallaxShowcaseBackground } from '@/canvas/ParallaxShowcaseBackground'

export function Portfolio() {
  const theme = useThemeStore((s) => s.theme)
  const element = useThemeStore((s) => s.element)
  const setPhase = useThemeStore((s) => s.setPhase)
  const activeSection = useActiveSection(['hero', 'experience', 'skills', 'contact'], 0.5)
  const isParallaxMode = element === 'parallax'
  const lenisRef = useSmoothScroll()

  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > window.innerHeight * 0.4)
  })

  const handleScrollClick = () => {
    const target = isScrolled ? 0 : document.body.scrollHeight;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { duration: 3 })
    } else {
      window.scrollTo({ top: target, behavior: 'smooth' })
    }
  }

  return (
    <motion.div
      className={`portfolio ${isParallaxMode ? 'portfolio--parallax' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{ background: theme?.palette.background }}
    >
      {isParallaxMode ? (
        <ParallaxShowcaseBackground />
      ) : (
        <>
          {/* Landscape Ground Elements */}
          <EnvironmentScenery element={element} />

          {/* Particle background */}
          <WeatherCanvas element={element} />
        </>
      )}

      {/* Dark overlay for readability */}
      <div className={`portfolio-overlay ${isParallaxMode ? 'portfolio-overlay--parallax' : ''}`} />

      {/* Scroll Navigation Controls */}
      <div className="scroll-controls-float">
        <motion.button
          className="scroll-float-btn"
          onClick={handleScrollClick}
          title={isScrolled ? "Ir para o topo" : "Ir para o final"}
          whileHover={{ scale: 1.15, y: isScrolled ? -4 : 4 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.span
            className="pi pi-arrow-down"
            animate={{ rotate: isScrolled ? 180 : 0 }}
            transition={{ duration: 0.5, type: 'spring', damping: 15 }}
          />
        </motion.button>
      </div>

      {/* Back to Splash Button */}
      <button
        className="back-to-splash-btn"
        onClick={() => setPhase('splash')}
        title="Voltar para seleção de atmosferas"
      >
        <span className="back-icon">←</span> Menu
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
