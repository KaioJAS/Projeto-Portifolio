import { GlassShield } from '@/canvas/GlassShield'
import { motion } from 'framer-motion'
import { ExperienceParallaxCard, type ExperienceCardData } from './ExperienceParallaxCard'

const experiences: ExperienceCardData[] = [
  {
    company: 'Runyme',
    role: 'Desenvolvedor Full Stack',
    period: '02/2023 — Presente',
    description:
      'Desenvolvimento e evolução de plataforma SaaS contábil utilizando Laravel e Vue.js. Implementação de simulador de regimes tributários, otimização de performance e colaboração na modelagem de soluções escaláveis e orientadas a negócio.',
    tech: ['Laravel', 'Vue.js', 'PHP', 'JavaScript', 'SaaS'],
    focus: 'Ecossistema contábil',
    highlights: ['Calculadora fiscal', 'Planilhas inteligentes', 'Fluxo SaaS'],
    scene: 'runyme',
    accent: '#d6a35c',
    accentRgb: '214, 163, 92',
    secondary: '#9be3b2',
  },
  {
    company: 'Certik Web',
    role: 'Desenvolvedor Full Stack',
    period: '09/2022 — 05/2023',
    description:
      'Implementação de funcionalidades e melhorias estruturais para sistemas web com Laravel e Vue.js. Refatoração de escopos visando desempenho, e integração entre frontend e backend comunicando via APIs.',
    tech: ['PHP', 'Laravel', 'Vue.js', 'APIs'],
    focus: 'Design + tecnologia',
    highlights: ['Notebook criativo', 'Interface visual', 'Código aplicado'],
    scene: 'certik',
    accent: '#79d2ff',
    accentRgb: '121, 210, 255',
    secondary: '#f77fd0',
  },
  {
    company: 'H3X',
    role: 'Desenvolvedor Web',
    period: '03/2022 — 08/2022',
    description:
      'Desenvolvimento de sites institucionais, e-commerces e sistemas web personalizados. Foco em arquitetura MVC e suporte técnico de projetos existentes.',
    tech: ['PHP', 'CodeIgniter', 'HTML/CSS', 'JavaScript'],
    focus: 'Linha corporativa',
    highlights: ['Sites institucionais', 'Estrutura MVC', 'Entrega corporativa'],
    scene: 'h3x',
    accent: '#a8bed6',
    accentRgb: '168, 190, 214',
    secondary: '#f0c67a',
  },
]

export function ExperienceSection() {
  return (
    <section id="experience" className="section experience-section">
      <GlassShield className="experience-shield">
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

        <div className="experience-showcase">
          {experiences.map((experience, index) => (
            <ExperienceParallaxCard key={experience.company} experience={experience} index={index} />
          ))}
        </div>
      </GlassShield>
    </section>
  )
}
