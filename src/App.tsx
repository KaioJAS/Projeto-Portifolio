import { useThemeStore } from '@/store/useThemeStore'
import { SplashScreen } from '@/phases/SplashScreen/SplashScreen'
import { Portfolio } from '@/phases/Portfolio/Portfolio'
import { ThemeProvider } from '@/theme/ThemeProvider'
import { ParticleShieldProvider } from '@/canvas/ParticleShieldContext'
import { AnimatePresence } from 'framer-motion'

export default function App() {
  const phase = useThemeStore((s) => s.phase)
  const theme = useThemeStore((s) => s.theme)

  return (
    <ThemeProvider theme={theme}>
      <ParticleShieldProvider>
        <div className="app">
          <AnimatePresence mode="wait">
            {phase === 'splash' && <SplashScreen key="splash" />}
            {phase === 'portfolio' && <Portfolio key="portfolio" />}
          </AnimatePresence>
        </div>
      </ParticleShieldProvider>
    </ThemeProvider>
  )
}
