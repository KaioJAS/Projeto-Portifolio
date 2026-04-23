import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ELEMENTS, ELEMENT_INFO } from '@/theme/types'
import { useThemeStore } from '@/store/useThemeStore'
import type { Element } from '@/theme/types'

export function SplashScreen() {
  const [selectedElement, setSelectedElement] = useState<Element>('parallax')
  const enterPortfolio = useThemeStore((s) => s.enterPortfolio)
  const [isExiting, setIsExiting] = useState(false)

  const handleEnter = () => {
    setIsExiting(true)
    setTimeout(() => {
      enterPortfolio(selectedElement)
    }, 600)
  }

  const selectedInfo = ELEMENT_INFO[selectedElement]

  return (
    <motion.div
      className="splash-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: isExiting ? 0.6 : 1 }}
    >
      {/* Subtle animated background */}
      <div className="splash-bg">
        <div className="splash-bg-orb splash-bg-orb--1" />
        <div className="splash-bg-orb splash-bg-orb--2" />
        <div className="splash-bg-orb splash-bg-orb--3" />
      </div>

      <div className="splash-content">
        {/* Greeting */}
        <motion.div
          className="splash-greeting"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <span className="splash-greeting-line">Olá, eu sou</span>
        </motion.div>

        {/* Name */}
        <motion.h1
          className="splash-name"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.0, type: 'spring', damping: 15 }}
        >
          Kaio Jarbson
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="splash-subtitle"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Desenvolvedor Full Stack
        </motion.p>

        {/* Element selector */}
        <motion.div
          className="splash-atmosphere"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          <span className="splash-atmosphere-label">Escolha sua atmosfera</span>
          <div className="splash-element-grid">
            {ELEMENTS.map((el, i) => {
              const info = ELEMENT_INFO[el]
              const isSelected = el === selectedElement

              return (
                <motion.button
                  key={el}
                  className={`splash-element-btn ${isSelected ? 'splash-element-btn--active' : ''}`}
                  style={{
                    '--el-color': info.color,
                    '--el-glow': info.glow,
                  } as React.CSSProperties}
                  onClick={() => setSelectedElement(el)}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: 1.3 + i * 0.08,
                    type: 'spring',
                    stiffness: 250,
                    damping: 18,
                  }}
                  whileHover={{ scale: 1.12, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="splash-element-emoji">{info.emoji}</span>
                  <span className="splash-element-label">{info.label}</span>
                  {isSelected && (
                    <motion.div
                      className="splash-element-ring"
                      layoutId="splash-ring"
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    />
                  )}
                </motion.button>
              )
            })}
          </div>

          {/* Selected element description */}
          <AnimatePresence mode="wait">
            <motion.span
              key={selectedElement}
              className="splash-element-desc"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              style={{ color: selectedInfo.color }}
            >
              {selectedInfo.description}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Enter button */}
        <motion.button
          className="splash-enter-btn"
          onClick={handleEnter}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          whileHover={{ scale: 1.05, boxShadow: `0 0 40px ${selectedInfo.color}40` }}
          whileTap={{ scale: 0.97 }}
          style={{
            background: `linear-gradient(135deg, ${selectedInfo.color}, ${selectedInfo.glow})`,
          }}
        >
          <span>Entrar</span>
          <motion.span
            className="splash-enter-arrow"
            animate={{ x: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            →
          </motion.span>
        </motion.button>
      </div>

      {/* Bottom hint */}
      <motion.div
        className="splash-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <span>Feito com ❤️ e código</span>
      </motion.div>
    </motion.div>
  )
}
