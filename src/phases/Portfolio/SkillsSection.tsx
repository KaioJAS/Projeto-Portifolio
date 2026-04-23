import { motion } from 'framer-motion'
import { GlassShield } from '@/canvas/GlassShield'

const skillCategories = [
  {
    title: 'Frontend & UI',
    icon: 'pi pi-palette',
    skills: [
      { name: 'Vue.js (v2 e v3)', level: 95 },
      { name: 'JavaScript', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'Tailwind CSS / CSS3', level: 88 },
      { name: 'React', level: 70 },
    ],
  },
  {
    title: 'Backend',
    icon: 'pi pi-server',
    skills: [
      { name: 'PHP / Laravel', level: 98 },
      { name: 'Arquitetura MVC / SaaS', level: 90 },
      { name: 'REST APIs', level: 92 },
      { name: 'Jobs, Queues & Events', level: 88 },
      { name: 'Node.js', level: 75 },
    ],
  },
  {
    title: 'Infra & DB',
    icon: 'pi pi-database',
    skills: [
      { name: 'MySQL / Modelagem', level: 92 },
      { name: 'Docker / Compose', level: 85 },
      { name: 'Git / Versionamento', level: 90 },
      { name: 'Linux', level: 80 },
    ],
  },
]

export function SkillsSection() {
  return (
    <section id="skills" className="section skills-section">
      <GlassShield>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <span className="section-tag">Competências</span>
          <h2 className="section-title">Habilidades</h2>
          <p className="section-subtitle">
            As ferramentas que domino para transformar ideias em realidade
          </p>
        </motion.div>

        <div className="skills-grid">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              className="skill-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: catIdx * 0.15 }}
            >
              <div className="skill-card-header">
                <i className={`skill-card-icon ${category.icon}`}></i>
                <h3>{category.title}</h3>
              </div>
              <div className="skill-list">
                {category.skills.map((skill, skillIdx) => (
                  <motion.div
                    key={skill.name}
                    className="skill-item"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: catIdx * 0.1 + skillIdx * 0.08 }}
                  >
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-level">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <motion.div
                        className="skill-bar-fill"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1,
                          delay: catIdx * 0.1 + skillIdx * 0.1,
                          ease: 'easeOut',
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </GlassShield>
    </section>
  )
}
