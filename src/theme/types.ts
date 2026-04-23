export type Element = 'parallax' | 'terra' | 'agua' | 'fogo' | 'vento' | 'mata' | 'luz'

export type AppPhase = 'splash' | 'portfolio'

export interface ThemePalette {
  primary: string
  secondary: string
  accent: string
  background: string
  surface: string
  text: string
  textMuted: string
}

export interface Theme {
  id: string
  name: string
  palette: ThemePalette
  atmosphere: string
  cssVars: Record<string, string>
}

export const ELEMENTS: Element[] = ['parallax', 'terra', 'agua', 'fogo', 'vento', 'mata', 'luz']

export const ELEMENT_INFO: Record<Element, { emoji: string; label: string; color: string; glow: string; description: string }> = {
  parallax: { emoji: '🫧', label: 'Paralax', color: '#7df9ff', glow: '#ff7ad9', description: 'Fluidos reativos, vidro e profundidade cinematográfica' },
  terra: { emoji: '🌍', label: 'Terra', color: '#c4783e', glow: '#d4944a', description: 'Poeira do cerrado' },
  agua: { emoji: '💧', label: 'Água', color: '#2980b9', glow: '#3498db', description: 'Bolhas do oceano' },
  fogo: { emoji: '🔥', label: 'Fogo', color: '#e74c3c', glow: '#ff6b4a', description: 'Cinzas em brasa' },
  vento: { emoji: '💨', label: 'Vento', color: '#95a5a6', glow: '#bdc3c7', description: 'Brisa suave' },
  mata: { emoji: '🌿', label: 'Mata', color: '#27ae60', glow: '#2ecc71', description: 'Folhas caindo' },
  luz: { emoji: '✨', label: 'Luz', color: '#f1c40f', glow: '#ffd700', description: 'Estrelas cadentes' },
}
