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
            <span className="hero-name">Kaio Jarbson</span>
          </motion.h1>

          <motion.p
            className="hero-description"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            style={{ fontSize: '1rem', textAlign: 'justify', lineHeight: '1.6' }}
          >
            Desenvolvedor Full Stack Pleno / Sênior com sólida atuação na construção e otimização de plataformas SaaS e sistemas escaláveis. Especialista no ecosistema <strong>PHP / Laravel</strong> e <strong>Vue.js</strong>. Transformo requisitos complexos em arquiteturas performáticas orientadas a negócio e resultados.
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
            <a href="https://wa.me/5544998115241" target="_blank" rel="noopener noreferrer" className="hero-cta hero-cta--secondary">
              <i className="pi pi-whatsapp" style={{ fontSize: '1.2rem' }}></i> Falar Comigo
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
