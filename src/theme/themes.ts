import type { Theme } from './types'

function createTheme(
  id: string,
  name: string,
  palette: Theme['palette'],
  atmosphere: string,
): Theme {
  return {
    id,
    name,
    palette,
    atmosphere,
    cssVars: {
      '--color-primary': palette.primary,
      '--color-secondary': palette.secondary,
      '--color-accent': palette.accent,
      '--color-background': palette.background,
      '--color-surface': palette.surface,
      '--color-text': palette.text,
      '--color-text-muted': palette.textMuted,
    },
  }
}

export const themes: Record<string, Theme> = {
  terra: createTheme(
    'terra',
    'Cerrado Brasileiro',
    {
      primary: '#c4783e',
      secondary: '#8b4513',
      accent: '#daa520',
      background: '#1a0f08',
      surface: '#2d1b0e',
      text: '#f5e6d3',
      textMuted: '#b8956a',
    },
    'Seco, quente, ancestral',
  ),

  agua: createTheme(
    'agua',
    'Oceano Profundo',
    {
      primary: '#1565c0',
      secondary: '#004d7a',
      accent: '#00e5ff',
      background: '#020c1b',
      surface: '#0a1e3d',
      text: '#cce7ff',
      textMuted: '#5c8ab5',
    },
    'Calmo, misterioso, eterno',
  ),

  fogo: createTheme(
    'fogo',
    'Forja Vulcânica',
    {
      primary: '#e53935',
      secondary: '#ff6d00',
      accent: '#ffd600',
      background: '#0d0000',
      surface: '#2a0a0a',
      text: '#ffe0d0',
      textMuted: '#b56b5d',
    },
    'Intenso, poderoso, caótico',
  ),

  vento: createTheme(
    'vento',
    'Planalto das Nuvens',
    {
      primary: '#90a4ae',
      secondary: '#b0bec5',
      accent: '#ce93d8',
      background: '#0d1117',
      surface: '#1c2331',
      text: '#eceff1',
      textMuted: '#78909c',
    },
    'Etéreo, livre, limpo',
  ),

  mata: createTheme(
    'mata',
    'Mata Atlântica',
    {
      primary: '#2e7d32',
      secondary: '#1b5e20',
      accent: '#76ff03',
      background: '#071208',
      surface: '#0f2a12',
      text: '#e0f2e0',
      textMuted: '#6d9b6e',
    },
    'Orgânico, vivo, crescente',
  ),

  luz: createTheme(
    'luz',
    'Cosmos / Nebulosa',
    {
      primary: '#ffd700',
      secondary: '#3949ab',
      accent: '#ffffff',
      background: '#050510',
      surface: '#0f0f2a',
      text: '#f0e8ff',
      textMuted: '#8b7fc7',
    },
    'Transcendente, épico, silencioso',
  ),

  parallax: createTheme(
    'parallax',
    'Paralax Lab',
    {
      primary: '#7df9ff',
      secondary: '#13203e',
      accent: '#ff7ad9',
      background: '#020814',
      surface: '#111d35',
      text: '#f4fbff',
      textMuted: '#89a7c7',
    },
    'Fluido, profundo, interativo',
  ),
}
