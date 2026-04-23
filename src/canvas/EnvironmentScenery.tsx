import { motion, AnimatePresence } from 'framer-motion'
import type { Element } from '@/theme/types'

interface Props {
  element: Element
}

const TerraScenery = () => (
  <svg viewBox="0 0 1000 300" preserveAspectRatio="xMidYMax slice" className="w-full h-full">
    <path d="M -500 300 L -500 220 L -200 220 Q 300 150 800 250 T 1500 240 L 1500 300 Z" fill="var(--color-surface)" opacity="0.4" />
    <path d="M -500 300 L -500 280 L -200 280 Q 500 220 900 270 T 1500 260 L 1500 300 Z" fill="var(--color-surface)" opacity="0.7" />
    <path d="M -500 300 L -500 290 L -200 290 Q 500 260 1000 290 T 1500 280 L 1500 300 Z" fill="var(--color-surface)" />

    <g stroke="var(--color-primary)" fill="none" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" opacity="0.6">
      <path d="M 150 280 L 150 200 M 150 240 L 110 240 L 110 200 M 150 250 L 190 250 L 190 220" />
      <path d="M 850 280 L 850 210 M 850 250 L 810 250 L 810 220 M 850 260 L 880 260 L 880 230" strokeWidth="10" />
      <path d="M 450 280 L 450 240 M 450 260 L 420 260 L 420 240" strokeWidth="7" opacity="0.5" />
    </g>

    <motion.g
      initial={{ x: 1200, y: 270, rotate: 0 }}
      animate={{
        x: -200,
        y: [270, 260, 270, 265, 270, 255, 270, 260, 270],
        rotate: -1500
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <circle cx="0" cy="0" r="14" fill="var(--color-primary)" opacity="0.2" />
      <circle cx="0" cy="0" r="8" fill="var(--color-accent)" opacity="0.4" />
      <circle cx="0" cy="0" r="15" stroke="var(--color-primary)" fill="none" strokeWidth="2" opacity="0.8" />
      <path d="M -8 -8 Q 0 -15 8 -8 T 8 8 T -8 -8 Z" stroke="var(--color-accent)" fill="none" strokeWidth="3" opacity="0.8" />
      <path d="M 0 -14 Q 14 0 0 14 Q -14 0 0 -14" stroke="var(--color-primary)" fill="none" strokeWidth="2" opacity="0.6" />
      <path d="M -14 0 Q 0 -14 14 0 Q 0 14 -14 0" stroke="var(--color-accent)" fill="none" strokeWidth="2" opacity="0.9" />
    </motion.g>
  </svg>
)

const AguaScenery = () => (
  <svg viewBox="0 0 1000 300" preserveAspectRatio="xMidYMax slice" className="w-full h-full">
    <path d="M -500 300 L -500 220 L -200 220 Q 200 260 400 180 T 900 240 T 1500 200 L 1500 300 Z" fill="var(--color-surface)" opacity="0.4" />
    <path d="M -500 300 L -500 250 L -200 250 Q 300 210 600 270 T 1500 240 L 1500 300 Z" fill="var(--color-surface)" opacity="0.8" />

    <g stroke="#ff5252" fill="none" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" opacity="0.8">
      <path d="M 120 285 Q 110 220 130 160" />
      <path d="M 125 240 Q 150 210 160 180" />
      <path d="M 118 200 Q 90 180 85 150" />
    </g>

    <g stroke="#ff7675" fill="none" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" opacity="0.9">
      <path d="M 850 280 Q 860 220 840 150" />
      <path d="M 848 230 Q 820 200 810 170" strokeWidth="10" />
      <path d="M 848 195 Q 865 195 880 155" strokeWidth="8" />
    </g>

    <g stroke="#e17055" fill="none" strokeWidth="8" strokeLinecap="round" opacity="0.7">
      <path d="M 400 270 Q 390 230 410 200" />
      <path d="M 400 230 Q 420 220 430 200" strokeWidth="6" />
      <path d="M 395 240 Q 370 220 380 190" strokeWidth="5" />
    </g>

    <g transform="translate(250, 260)">
      <path d="M -15 0 C -15 -10, 15 -10, 20 0 Z" fill="#d63031" />
      <circle cx="0" cy="-8" r="10" fill="#ff7675" />
      <path d="M 5 -8 Q 0 2 -5 -4 T 0 -12" fill="none" stroke="#ffeaa7" strokeWidth="1.5" />
      <path d="M 15 -5 L 18 -12 M 18 -3 L 23 -8" stroke="#d63031" strokeWidth="1.5" strokeLinecap="round" />
    </g>

    <g transform="translate(680, 255) scale(-0.8, 0.8)">
      <path d="M -15 0 C -15 -10, 15 -10, 20 0 Z" fill="#fab1a0" />
      <circle cx="0" cy="-8" r="10" fill="#e17055" />
      <path d="M 5 -8 Q 0 2 -5 -4 T 0 -12" fill="none" stroke="#ffeaa7" strokeWidth="1.5" />
      <path d="M 15 -5 L 18 -12 M 18 -3 L 23 -8" stroke="#fab1a0" strokeWidth="1.5" strokeLinecap="round" />
    </g>

    <g fill="#fdcb6e" opacity="0.8">
      <path transform="translate(500, 280) scale(0.6) rotate(15)" d="M 0 -20 Q 5 -5 20 -5 Q 10 5 15 20 Q 0 10 -15 20 Q -10 5 -20 -5 Q -5 -5 0 -20 Z" />
      <path transform="translate(750, 275) scale(0.4) rotate(-25)" d="M 0 -20 Q 5 -5 20 -5 Q 10 5 15 20 Q 0 10 -15 20 Q -10 5 -20 -5 Q -5 -5 0 -20 Z" />
    </g>
  </svg>
)

const FogoScenery = () => (
  <svg viewBox="0 0 1000 300" preserveAspectRatio="xMidYMax slice" className="w-full h-full">
    <defs>
      {/* Gradiente para o corpo do vulcão */}
      <linearGradient id="vulcaoGrad" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="var(--color-surface)" stopOpacity="1" />
        <stop offset="100%" stopColor="var(--color-surface)" stopOpacity="0.85" />
      </linearGradient>

      {/* Gradiente para a lava */}
      <linearGradient id="lavaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="1" />
        <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.9" />
      </linearGradient>

      {/* Filtro de brilho para a lava */}
      <filter id="lavaGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <style>
        {`
        @keyframes lavaFlow {
          0%, 100% { filter: drop-shadow(0 0 8px var(--color-accent)); }
          50% { filter: drop-shadow(0 0 12px var(--color-accent)); }
        }
        .lava-main {
          animation: lavaFlow 4s ease-in-out infinite;
        }
      `}
      </style>
    </defs>

    {/* Montanhas de fundo para profundidade */}
    <path d="M -500 300 L -500 220 L 0 120 L 100 190 L 200 150 L 300 220 L 400 90 L 500 200 L 600 140 L 750 250 L 900 160 L 1200 200 L 1500 200 L 1500 300 Z" fill="var(--color-surface)" opacity="0.2" />

    {/* Corpo do Vulcão - Sólido e Cônico */}
    <path d="M 100 300 L 440 130 L 560 130 L 900 300 Z" fill="url(#vulcaoGrad)" />

    {/* Cratera */}
    <path d="M 440 130 Q 500 145 560 130 L 545 135 Q 500 150 455 135 Z" fill="var(--color-accent)" filter="url(#lavaGlow)" />

    {/* Rio de Lava Fluido */}
    <path
      className="lava-main"
      d="M 465 138 
       C 485 170, 435 210, 465 245 
       S 520 275, 495 300 
       L 550 300 
       C 570 270, 525 235, 545 200 
       S 570 165, 535 138 
       Q 500 150, 465 138 
       Z"
      fill="url(#lavaGrad)"
      filter="url(#lavaGlow)"
    />

    {/* Detalhes de brilho interno na lava */}
    <path d="M 490 160 Q 505 195 480 235" stroke="var(--color-accent)" strokeWidth="3" fill="none" opacity="0.4" strokeLinecap="round" />
    <path d="M 525 240 Q 540 270 515 295" stroke="var(--color-accent)" strokeWidth="2" fill="none" opacity="0.3" strokeLinecap="round" />

    {/* Base de fechamento */}
    <rect x="-500" y="298" width="2000" height="5" fill="var(--color-background)" />
  </svg>


)

const VentoScenery = () => {
  const Turbine = ({ x, y, scale = 1, speed = 4 }: { x: number, y: number, scale?: number, speed?: number }) => (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <line x1="0" y1="0" x2="0" y2="150" stroke="var(--color-primary)" strokeWidth="5" strokeLinecap="round" opacity="0.6" />
      {/* 
        Holy Grail fix de origem:
        O círculo invisível cria um bounding box cujas coordenadas locais são estritamente 0,0, 
        induzindo o motor de cálculo do framer-motion a girar SEMPRE com exatidão máxima.
      */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
      >
        <circle cx="0" cy="0" r="50" fill="transparent" />
        <circle cx="0" cy="0" r="5" fill="var(--color-primary)" opacity="0.9" />
        <line x1="0" y1="0" x2="0" y2="-45" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
        <line x1="0" y1="0" x2="39" y2="22" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
        <line x1="0" y1="0" x2="-39" y2="22" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
      </motion.g>
    </g>
  )

  return (
    <svg viewBox="0 0 1000 300" preserveAspectRatio="xMidYMax slice" className="w-full h-full">
      {/* Última terra esmaecida pontualmente via opacidade (translucidez clareadora) */}
      <path d="M -500 300 L -500 200 Q 250 100 500 220 T 1500 150 L 1500 300 Z" fill="var(--color-surface)" opacity="0.25" />
      <path d="M -500 300 L -500 260 Q 300 290 600 230 T 1500 250 L 1500 300 Z" fill="var(--color-surface)" opacity="0.9" />

      <Turbine x={200} y={150} scale={1} speed={6} />
      <Turbine x={500} y={130} scale={0.7} speed={4} />
      <Turbine x={850} y={180} scale={1.2} speed={7} />
    </svg>
  )
}

const MataScenery = () => (
  <svg viewBox="0 0 1000 300" preserveAspectRatio="xMidYMax slice" className="w-full h-full">
    {/* Camadas de Fundo (Colinas Distantes) */}
    <path d="M -500 300 L -500 200 L -200 200 Q 50 180 100 200 T 200 170 T 300 210 T 400 160 T 500 210 T 600 170 T 700 220 T 800 180 T 900 230 T 1500 180 L 1500 300 Z" fill="var(--color-surface)" opacity="0.2" />
    <path d="M -500 300 L -500 240 L -200 240 Q 150 220 300 260 T 700 230 T 1500 250 L 1500 300 Z" fill="var(--color-surface)" opacity="0.5" />

    {/* Árvore 1 (Esquerda) */}
    <g transform="translate(160, 100)">
      <path d="M 30 180 Q 35 120 40 50 L 55 50 Q 60 120 65 180 Z" fill="var(--color-surface)" opacity="0.9" />
      <g opacity="0.8">
        <circle cx="20" cy="50" r="45" fill="var(--color-primary)" />
        <circle cx="75" cy="45" r="50" fill="var(--color-primary)" />
        <circle cx="48" cy="15" r="55" fill="var(--color-primary)" />
        <circle cx="48" cy="45" r="40" fill="var(--color-accent)" opacity="0.4" />
      </g>
    </g>

    {/* Árvore 2 (Centro) */}
    <g transform="translate(480, 80)">
      <path d="M 60 200 L 70 50 L 90 50 L 100 200 Z" fill="var(--color-surface)" />
      <g>
        <ellipse cx="40" cy="60" rx="60" ry="50" fill="var(--color-primary)" opacity="0.7" />
        <ellipse cx="120" cy="55" rx="65" ry="55" fill="var(--color-primary)" opacity="0.8" />
        <ellipse cx="80" cy="20" rx="75" ry="60" fill="var(--color-primary)" />
        <circle cx="80" cy="50" r="45" fill="var(--color-accent)" opacity="0.3" />
      </g>
    </g>

    {/* Árvore 3 (Direita) */}
    <g transform="translate(800, 140)">
      <path d="M 45 140 Q 50 100 50 30 L 65 30 Q 65 100 70 140 Z" fill="var(--color-surface)" opacity="0.9" />
      <g>
        <circle cx="25" cy="40" r="40" fill="var(--color-primary)" opacity="0.6" />
        <circle cx="90" cy="35" r="45" fill="var(--color-primary)" opacity="0.7" />
        <circle cx="58" cy="10" r="50" fill="var(--color-primary)" />
        <circle cx="58" cy="40" r="30" fill="var(--color-accent)" opacity="0.4" />
      </g>
    </g>

    {/* Chão de Primeiro Plano */}
    <path d="M 0 300 Q 500 270 1000 300 L 1000 300 L 0 300 Z" fill="var(--color-background)" opacity="0.9" />
  </svg>

)

const LuzScenery = () => (
  <svg viewBox="0 0 1000 300" preserveAspectRatio="xMidYMax slice" className="w-full h-full">
    <style>
      {`
      @keyframes softFlicker {
        0%, 100% { opacity: 0.9; transform: scaleY(1); }
        50% { opacity: 1; transform: scaleY(1.01); }
      }
      .flame-soft {
        animation: softFlicker 1.9s ease-in-out infinite;
        transform-origin: center bottom;
      }
    `}
    </style>

    {/* Fundo do Céu Noturno */}
    <rect width="1000" height="300" fill="#050510" />

    {/* Estrelas */}
    <g fill="#ffffff" opacity="0.4">
      <circle cx="100" cy="40" r="1" /><circle cx="300" cy="70" r="0.8" />
      <circle cx="500" cy="30" r="1.2" /><circle cx="700" cy="90" r="1" />
      <circle cx="900" cy="50" r="0.8" />
    </g>

    {/* Planícies de Fundo */}
    <path d="M 0 300 Q 250 180 500 240 T 1000 200 L 1000 300 L 0 300 Z" fill="#0a0a25" opacity="0.6" />

    {/* Observatório - Telescópio Projetado */}
    <g transform="translate(700, 165)">
      <rect x="0" y="40" width="110" height="75" rx="2" fill="#2a2a4a" />
      <path d="M 0 40 A 55 55 0 0 1 110 40 Z" fill="#3a3a6a" />

      {/* Telescópio saindo do limite da cúpula */}
      <rect x="45" y="-5" width="20" height="50" fill="#2a2a4a" opacity="0.8" transform="rotate(-1, 5, 2)" />

      <g transform="rotate(-35, 55, 25)">
        <rect x="48" y="-30" width="14" height="60" rx="6" fill="#4a4a8a" />
        <rect x="50" y="-35" width="10" height="6" rx="0.5" fill="#1a1a3a" />
      </g>

      <rect x="25" y="70" width="15" height="20" rx="1" fill="#1a1a3a" />
      <rect x="70" y="70" width="15" height="20" rx="1" fill="#1a1a3a" />
    </g>

    {/* Chão do Acampamento */}
    <path d="M 0 300 Q 500 220 1000 300 L 1000 300 L 0 300 Z" fill="#0f0f2a" />

    {/* Acampamento */}
    <g transform="translate(180, 210)">
      <g transform="translate(110, 0) scale(0.9)">
        <path d="M 0 70 L 45 0 L 90 70 Z" fill="#2E7D32" />
        <path d="M 38 70 L 45 30 L 52 70" fill="#1B5E20" />
      </g>
      <g transform="translate(0, 15)">
        <path d="M 0 70 L 50 0 L 100 70 Z" fill="#EF6C00" />
        <path d="M 42 70 L 50 30 L 58 70" fill="#E65100" />
      </g>

      {/* Fogueira Refinada - Fogo Baixo */}
      <g transform="translate(180, 78)">
        <g stroke="#3E2723" strokeWidth="4" strokeLinecap="round">
          <line x1="-10" y1="0" x2="10" y2="-2" />
          <line x1="-6" y1="-3" x2="6" y2="1" />
        </g>
        <g className="flame-soft">
          <path d="M 0 -18 C 7 -10, 7 -4, 0 0 C -7 -4, -7 -10, 0 -18 Z" fill="#D32F2F" />
          <path d="M 0 -12 C 4 -8, 4 -3, 0 0 C -4 -3, -4 -8, 0 -12 Z" fill="#F57C00" />
          <path d="M 0 -6 C 2 -4, 2 -2, 0 0 C -2 -4, -2 -4, 0 -6 Z" fill="#FFEB3B" />
        </g>
        <circle cx="0" cy="2" r="25" fill="#FF9800" opacity="0.08" />
      </g>
    </g>
  </svg>

)

const SCENERY_MAP: Record<Element, React.FC> = {
  terra: TerraScenery,
  agua: AguaScenery,
  fogo: FogoScenery,
  vento: VentoScenery,
  mata: MataScenery,
  luz: LuzScenery,
}

export function EnvironmentScenery({ element }: Props) {
  const Component = SCENERY_MAP[element]

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '35vh',
      zIndex: 0,
      opacity: 0.65,
      pointerEvents: 'none'
    }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={element}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          style={{ width: '100%', height: '100%' }}
        >
          <Component />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
