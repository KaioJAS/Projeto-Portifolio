import { create } from 'zustand'
import type { Theme, AppPhase, Element } from '@/theme/types'
import { themes } from '@/theme/themes'

interface ThemeState {
  phase: AppPhase
  theme: Theme
  element: Element
  setTheme: (theme: Theme) => void
  setPhase: (phase: AppPhase) => void
  setElement: (element: Element) => void
  enterPortfolio: (element: Element) => void
}

export const useThemeStore = create<ThemeState>()((set) => ({
  phase: 'splash',
  theme: themes['parallax'],
  element: 'parallax',

  setTheme: (theme) => set({ theme }),

  setPhase: (phase) => set({ phase }),

  setElement: (element) => set({ element, theme: themes[element] }),

  enterPortfolio: (element) =>
    set({ phase: 'portfolio', element, theme: themes[element] }),
}))
