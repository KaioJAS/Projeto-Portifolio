import { motion } from 'framer-motion'
import { GlassShield } from '@/canvas/GlassShield'

export function HeroSection() {
  return (
    <section id="hero" className="section hero-section">
      <GlassShield className="hero-glass">
        <div className="hero-container">
          <motion.h1
            className="hero-title"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <span className="hero-greeting">Olá, eu sou</span>
            <span className="hero-name">Kaio Jaspers</span>
          </motion.h1>

          <motion.p
            className="hero-description"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Desenvolvedor Full Stack apaixonado por criar experiências digitais
            únicas e memoráveis. Transformo ideias complexas em interfaces
            elegantes e performáticas.
          </motion.p>

          <motion.div
            className="hero-cta-group"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <a href="#experience" className="hero-cta hero-cta--primary">
              Ver Projetos
              <span className="cta-arrow">→</span>
            </a>
            <a href="#contact" className="hero-cta hero-cta--secondary">
              Falar Comigo
            </a>
          </motion.div>

          <motion.div
            className="hero-scroll-indicator"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <div className="scroll-mouse">
              <div className="scroll-wheel" />
            </div>
            <span>Scroll</span>
          </motion.div>
        </div>
      </GlassShield>
    </section>
  )
}
