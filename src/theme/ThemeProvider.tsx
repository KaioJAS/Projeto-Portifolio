import { useEffect } from 'react'
import type { Theme } from './types'

interface Props {
  theme: Theme
  children: React.ReactNode
}

export function ThemeProvider({ theme, children }: Props) {
  useEffect(() => {
    const root = document.documentElement
    Object.entries(theme.cssVars).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })
  }, [theme])

  return <>{children}</>
}
