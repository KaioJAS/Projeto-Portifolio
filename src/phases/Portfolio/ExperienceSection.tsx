import { motion } from 'framer-motion'
import { GlassShield } from '@/canvas/GlassShield'

const experiences = [
  {
    company: 'Runyme',
    role: 'Desenvolvedor Full Stack',
    period: '02/2023 — Presente',
    description:
      'Desenvolvimento e evolução de plataforma SaaS contábil utilizando Laravel e Vue.js. Implementação de simulador de regimes tributários, otimização de performance e colaboração na modelagem de soluções escaláveis e orientadas a negócio.',
    tech: ['Laravel', 'Vue.js', 'PHP', 'JavaScript', 'SaaS'],
    emoji: 'pi pi-building',
  },
  {
    company: 'Certik Web',
    role: 'Desenvolvedor Full Stack',
    period: '09/2022 — 05/2023',
    description:
      'Implementação de funcionalidades e melhorias estruturais para sistemas web com Laravel e Vue.js. Refatoração de escopos visando desempenho, e integração entre frontend e backend comunicando via APIs.',
    tech: ['PHP', 'Laravel', 'Vue.js', 'APIs'],
    emoji: 'pi pi-code',
  },
  {
    company: 'H3X',
    role: 'Desenvolvedor Web',
    period: '03/2022 — 08/2022',
    description:
      'Desenvolvimento de sites institucionais, e-commerces e sistemas web personalizados. Foco em arquitetura MVC e suporte técnico de projetos existentes.',
    tech: ['PHP', 'CodeIgniter', 'HTML/CSS', 'JavaScript'],
    emoji: 'pi pi-desktop',
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
                <i className={exp.emoji}></i>
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
