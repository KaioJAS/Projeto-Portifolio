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
        rotate: -1080
      }}
      transition={{
        duration: 45,
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
    {/* Montanha clássica preservada integralmente da VERSÃO 1, renivelada 100px para baixo p/ prevenir cortes! */}
    <path d="M -500 300 L -500 220 L 0 120 L 100 190 L 200 150 L 300 220 L 400 90 L 500 200 L 600 140 L 750 250 L 900 160 L 1200 200 L 1500 200 L 1500 300 Z" fill="var(--color-surface)" opacity="0.3" />
    <path d="M 100 300 L 400 160 L 450 150 L 550 150 L 600 160 L 900 300 Z" fill="var(--color-surface)" opacity="0.8" />
    <path d="M -500 300 L -500 250 L 0 250 L 150 240 L 250 280 L 400 260 L 600 290 L 800 250 L 1000 270 L 1500 270 L 1500 300 Z" fill="var(--color-background)" opacity="0.9" />

    {/* EXATAS curvas do rio da primeira versão */}
    <g stroke="var(--color-accent)" fill="none" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" opacity="0.7">
      <path d="M 470 155 Q 490 180 460 230 T 500 270 T 480 300" />
      <path d="M 520 155 Q 510 180 530 210 T 510 250" strokeWidth="5" />
    </g>



    <defs>
      <linearGradient id="lavaGlow" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="1" />
        <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
      </linearGradient>
    </defs>
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
    <path d="M -500 300 L -500 200 L -200 200 Q 50 180 100 200 T 200 170 T 300 210 T 400 160 T 500 210 T 600 170 T 700 220 T 800 180 T 900 230 T 1500 180 L 1500 300 Z" fill="var(--color-surface)" opacity="0.3" />
    <path d="M -500 300 L -500 240 L -200 240 Q 150 220 300 260 T 700 230 T 1500 250 L 1500 300 Z" fill="var(--color-surface)" opacity="0.8" />

    <rect x="190" y="150" width="16" height="150" fill="var(--color-surface)" opacity="0.9" rx="2" />
    <circle cx="200" cy="140" r="70" fill="var(--color-primary)" opacity="0.5" />
    <circle cx="160" cy="160" r="50" fill="var(--color-primary)" opacity="0.6" />
    <circle cx="240" cy="150" r="55" fill="var(--color-accent)" opacity="0.3" />

    <rect x="540" y="130" width="22" height="170" fill="var(--color-surface)" opacity="0.95" rx="3" />
    <ellipse cx="550" cy="120" rx="90" ry="60" fill="var(--color-primary)" opacity="0.4" />
    <circle cx="500" cy="140" r="45" fill="var(--color-primary)" opacity="0.7" />
    <circle cx="600" cy="130" r="50" fill="var(--color-accent)" opacity="0.4" />

    <rect x="850" y="170" width="14" height="130" fill="var(--color-surface)" opacity="0.85" rx="2" />
    <ellipse cx="855" cy="160" rx="60" ry="40" fill="var(--color-primary)" opacity="0.5" />
    <circle cx="820" cy="170" r="35" fill="var(--color-accent)" opacity="0.4" />
    <circle cx="880" cy="165" r="45" fill="var(--color-primary)" opacity="0.7" />
  </svg>
)

const LuzScenery = () => (
  // Exatamente o background geométrico abstrato original com observatório customizado repousando nele
  <svg viewBox="0 0 1000 300" preserveAspectRatio="xMidYMax slice" className="w-full h-full">
    {/* Terreno abstrato primário (Ligeiramente baixado para evitar clipping responsivo) */}
    <path d="M -500 300 L -500 250 L 0 250 L 100 200 L 300 280 L 500 150 L 700 250 L 900 200 L 1000 250 L 1500 250 L 1500 300 Z" fill="var(--color-surface)" opacity="0.4" />
    <path d="M -500 300 L 0 300 L 200 300 L 400 250 L 600 290 L 800 200 L 1000 280 L 1500 280 L 1500 300 Z" fill="var(--color-surface)" opacity="0.7" />

    {/* Pirâmides decorativas do V1 */}
    <polygon points="100,300 200,220 300,300" fill="var(--color-surface)" opacity="0.5" />
    <polygon points="500,300 650,200 800,300" fill="var(--color-surface)" opacity="0.6" />

    {/* Formas espaciais suspensas */}
    <g fill="var(--color-primary)" opacity="0.3">
      <circle cx="150" cy="150" r="10" />
      <circle cx="850" cy="200" r="15" />
      <polygon points="400,100 420,140 380,140" />
      <path d="M 700 100 L 750 150" stroke="var(--color-primary)" strokeWidth="4" />
    </g>

    {/* Observatório com o design caprichado empoleirado EXATAMENTE na ponta da pirâmide (650, 200) */}
    <g transform="translate(650, 200)">
      {/* A base trunca e descansa na vértice */}
      <rect x="-25" y="0" width="50" height="20" fill="var(--color-background)" opacity="0.95" />
      {/* Cúpula  */}
      <path d="M -20 0 A 20 20 0 0 1 20 0 Z" fill="var(--color-surface)" opacity="0.95" />
      <path d="M -20 0 A 20 20 0 0 1 5 -13 L 5 0 Z" fill="var(--color-background)" opacity="0.2" />
      {/* Escotilha de visão */}
      <polygon points="10,0 10,-15 15,0" fill="var(--color-background)" />
      {/* Telescópio apontando estelar */}
      <line x1="15" y1="-5" x2="35" y2="-25" stroke="var(--color-surface)" strokeWidth="6" strokeLinecap="round" />
      {/* Pilares anexando firmemente na rocha */}
      <line x1="-15" y1="0" x2="-25" y2="25" stroke="var(--color-surface)" strokeWidth="4" />
      <line x1="15" y1="0" x2="25" y2="25" stroke="var(--color-surface)" strokeWidth="4" />
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
