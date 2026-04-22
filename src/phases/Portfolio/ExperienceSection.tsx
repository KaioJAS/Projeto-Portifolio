import { motion } from 'framer-motion'
import { GlassShield } from '@/canvas/GlassShield'

const experiences = [
  {
    company: 'Projeto PontIA',
    role: 'Full Stack Developer',
    period: '2024 — Presente',
    description:
      'Plataforma de atendimento automatizado via WhatsApp com IA generativa. Stack: Laravel 13, Vue 3, Redis, Docker.',
    tech: ['Laravel', 'Vue.js', 'Redis', 'Docker', 'WhatsApp API'],
    emoji: '🤖',
  },
  {
    company: 'Freelancer',
    role: 'Desenvolvedor Web',
    period: '2023 — Presente',
    description:
      'Desenvolvimento de soluções web completas para clientes diversos, desde landing pages até sistemas complexos.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    emoji: '💻',
  },
  {
    company: 'Projetos Pessoais',
    role: 'Creator & Developer',
    period: '2022 — Presente',
    description:
      'Experimentação contínua com novas tecnologias: WebGL, Three.js, integrações de API, automações.',
    tech: ['Three.js', 'TypeScript', 'Python', 'Docker'],
    emoji: '🚀',
  },
]

export function ExperienceSection() {
  return (
    <section id="experience" className="section experience-section">
      <GlassShield>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <span className="section-tag">Trajetória</span>
          <h2 className="section-title">Experiência</h2>
          <p className="section-subtitle">
            Onde construí, quebrei e reconstruí — cada projeto uma evolução
          </p>
        </motion.div>

        <div className="experience-timeline">
          <div className="timeline-line" />
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              className="experience-card"
              initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
            >
              <div className="timeline-dot">
                <span>{exp.emoji}</span>
              </div>
              <div className="card-content">
                <div className="card-header">
                  <span className="card-period">{exp.period}</span>
                  <h3 className="card-company">{exp.company}</h3>
                  <span className="card-role">{exp.role}</span>
                </div>
                <p className="card-description">{exp.description}</p>
                <div className="card-tech">
                  {exp.tech.map((t) => (
                    <span key={t} className="tech-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassShield>
    </section>
  )
}
