import { motion, AnimatePresence } from 'framer-motion'
import { useThemeStore } from '@/store/useThemeStore'
import { ELEMENTS, ELEMENT_INFO } from '@/theme/types'
import { GlassShield } from '@/canvas/GlassShield'

const socialLinks = [
  {
    name: 'GitHub',
    icon: 'pi pi-github',
    url: 'https://github.com/KaioJAS',
    description: 'Meus repositórios e contribuições',
  },
  {
    name: 'LinkedIn',
    icon: 'pi pi-linkedin',
    url: 'https://www.linkedin.com/in/kaio-jarbson-araujo-de-souza',
    description: 'Perfil profissional completo',
  },
  {
    name: 'Email',
    icon: 'pi pi-envelope',
    url: '#',
    copyText: 'kaiojas1@gmail.com',
    description: 'kaiojas1@gmail.com (clique p/ copiar)',
  },
  {
    name: 'WhatsApp',
    icon: 'pi pi-whatsapp',
    url: 'https://wa.me/5544998115241',
    description: '(44) 99811-5241',
  },
]

export function ContactSection() {
  const element = useThemeStore((s) => s.element)
  const setElement = useThemeStore((s) => s.setElement)
  const theme = useThemeStore((s) => s.theme)

  return (
    <section id="contact" className="section contact-section">
      <GlassShield>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <span className="section-tag">Conexão</span>
          <h2 className="section-title">Contato</h2>
          <p className="section-subtitle">
            Pronto para criar algo incrível juntos? Vamos conversar!
          </p>
        </motion.div>

        <div className="contact-grid">
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.url}
              target={link.url === '#' ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="contact-card"
              onClick={(e) => {
                if ('copyText' in link) {
                  e.preventDefault()
                  navigator.clipboard.writeText(link.copyText as string)
                  alert('Copiado para a área de transferência: ' + link.copyText)
                }
              }}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.03 }}
            >
              <i className={`contact-icon ${link.icon}`}></i>
              <h3 className="contact-name">{link.name}</h3>
              <p className="contact-desc">{link.description}</p>
            </motion.a>
          ))}
        </div>

        {/* Atmosphere switcher */}
        <motion.div
          className="atmosphere-switcher"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="atmosphere-label">
            Atmosfera: <strong>{theme?.name}</strong>
          </p>
          <div className="atmosphere-grid">
            {ELEMENTS.map((el) => {
              const info = ELEMENT_INFO[el]
              const isActive = el === element
              return (
                <motion.button
                  key={el}
                  className={`atmosphere-btn ${isActive ? 'atmosphere-btn--active' : ''}`}
                  style={{
                    '--el-color': info.color,
                    '--el-glow': info.glow,
                  } as React.CSSProperties}
                  onClick={() => setElement(el)}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  title={info.label}
                >
                  <span>{info.emoji}</span>
                  {isActive && (
                    <motion.div
                      className="atmosphere-indicator"
                      layoutId="atmo-indicator"
                      transition={{ type: 'spring', stiffness: 300 }}
                    />
                  )}
                </motion.button>
              )
            })}
          </div>
          <AnimatePresence mode="wait">
            <motion.span
              key={element}
              className="atmosphere-desc"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ color: ELEMENT_INFO[element].color }}
            >
              {ELEMENT_INFO[element].description}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Footer */}
        <footer className="portfolio-footer">
          <p>
            Feito com ❤️ e código — {new Date().getFullYear()}
          </p>
        </footer>
      </GlassShield>
    </section>
  )
}
