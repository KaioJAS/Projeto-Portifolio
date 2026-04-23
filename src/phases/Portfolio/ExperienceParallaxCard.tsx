import { useEffect, useState } from 'react'
import type { CSSProperties, PointerEvent as ReactPointerEvent, ReactNode } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'

export type ExperienceScene = 'runyme' | 'certik' | 'h3x'

export interface ExperienceCardData {
  company: string
  role: string
  period: string
  description: string
  tech: string[]
  focus: string
  highlights: string[]
  scene: ExperienceScene
  accent: string
  accentRgb: string
  secondary: string
}

const SHEET_ROWS = Array.from({ length: 4 })
const SHEET_COLUMNS = Array.from({ length: 4 })
const CALCULATOR_KEYS = ['7', '8', '9', '+', '4', '5', '6', '-', '1', '2', '3', '=']
const CODE_LINES = [78, 64, 82, 55, 68]
const DASHBOARD_BARS = [72, 48, 60, 86]

interface ExperienceParallaxCardProps {
  experience: ExperienceCardData
  index: number
}

interface SceneProps {
  pointerX: MotionValue<number>
  pointerY: MotionValue<number>
  reducedMotion: boolean
}

interface ParallaxLayerProps {
  className: string
  pointerX: MotionValue<number>
  pointerY: MotionValue<number>
  reducedMotion: boolean
  depthX: number
  depthY?: number
  rotate?: number
  reverse?: boolean
  style?: CSSProperties
  children?: ReactNode
}

export function ExperienceParallaxCard({ experience, index }: ExperienceParallaxCardProps) {
  const prefersReducedMotion = useReducedMotion()
  const reducedMotion = Boolean(prefersReducedMotion)
  const [viewport, setViewport] = useState(() => ({
    width: typeof window === 'undefined' ? 1440 : window.innerWidth,
    hasFinePointer:
      typeof window === 'undefined'
        ? true
        : window.matchMedia('(hover: hover) and (pointer: fine)').matches,
  }))
  const rawPointerX = useMotionValue(0)
  const rawPointerY = useMotionValue(0)
  const pointerX = useSpring(rawPointerX, { stiffness: 170, damping: 22, mass: 0.45 })
  const pointerY = useSpring(rawPointerY, { stiffness: 170, damping: 22, mass: 0.45 })
  const canInteract = !reducedMotion && viewport.hasFinePointer && viewport.width >= 900
  const isCompact = viewport.width < 700
  const rotateX = useTransform(pointerY, [-0.5, 0.5], canInteract ? [10, -10] : [0, 0])
  const rotateY = useTransform(pointerX, [-0.5, 0.5], canInteract ? [-12, 12] : [0, 0])
  const spotlightX = useTransform(pointerX, [-0.5, 0.5], [18, 82])
  const spotlightY = useTransform(pointerY, [-0.5, 0.5], [18, 82])
  const spotlight = useMotionTemplate`radial-gradient(circle at ${spotlightX}% ${spotlightY}%, rgba(${experience.accentRgb}, 0.38), transparent 56%)`
  const cardStyle = {
    '--experience-accent': experience.accent,
    '--experience-accent-rgb': experience.accentRgb,
    '--experience-secondary': experience.secondary,
  } as CSSProperties

  useEffect(() => {
    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        hasFinePointer: window.matchMedia('(hover: hover) and (pointer: fine)').matches,
      })
    }

    updateViewport()
    window.addEventListener('resize', updateViewport)

    return () => {
      window.removeEventListener('resize', updateViewport)
    }
  }, [])

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!canInteract) return

    const rect = event.currentTarget.getBoundingClientRect()
    const nextX = (event.clientX - rect.left) / rect.width - 0.5
    const nextY = (event.clientY - rect.top) / rect.height - 0.5

    rawPointerX.set(nextX)
    rawPointerY.set(nextY)
  }

  function resetPointer() {
    rawPointerX.set(0)
    rawPointerY.set(0)
  }

  return (
    <motion.article
      className={`experience-parallax-card ${index % 2 === 1 ? 'experience-parallax-card--reverse' : ''} ${isCompact ? 'experience-parallax-card--compact' : ''} ${!canInteract ? 'experience-parallax-card--static' : ''}`}
      style={cardStyle}
      initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 56 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{
        duration: reducedMotion ? 0.01 : 0.8,
        delay: reducedMotion ? 0 : index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className="experience-parallax-card__layout">
        <div className="experience-parallax-card__copy">
          <div className="experience-parallax-card__topline">
            <span className="experience-parallax-card__period">{experience.period}</span>
            <span className="experience-parallax-card__focus">{experience.focus}</span>
          </div>

          <div className="experience-parallax-card__heading">
            <h3 className="experience-parallax-card__company">{experience.company}</h3>
            <p className="experience-parallax-card__role">{experience.role}</p>
          </div>

          <p className="experience-parallax-card__description">{experience.description}</p>

          <div className="experience-parallax-card__highlights">
            {experience.highlights.map((highlight) => (
              <span key={highlight} className="experience-parallax-card__highlight">
                {highlight}
              </span>
            ))}
          </div>

          <div className="experience-parallax-card__tech">
            {experience.tech.map((tech) => (
              <span key={tech} className="experience-parallax-card__tech-tag">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="experience-parallax-card__visual">
          <motion.div
            className={`experience-parallax-stage experience-parallax-stage--${experience.scene}`}
            style={canInteract ? { rotateX, rotateY } : undefined}
            onPointerMove={canInteract ? handlePointerMove : undefined}
            onPointerLeave={canInteract ? resetPointer : undefined}
            onPointerCancel={canInteract ? resetPointer : undefined}
            whileHover={canInteract ? { scale: 1.015 } : undefined}
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            aria-hidden="true"
          >
            <motion.div className="experience-parallax-stage__spotlight" style={{ background: spotlight }} />
            <div className="experience-parallax-stage__grain" />
            <div className="experience-parallax-stage__frame" />

            {experience.scene === 'runyme' && (
              <RunymeScene pointerX={pointerX} pointerY={pointerY} reducedMotion={reducedMotion} />
            )}
            {experience.scene === 'certik' && (
              <CertikScene pointerX={pointerX} pointerY={pointerY} reducedMotion={reducedMotion} />
            )}
            {experience.scene === 'h3x' && (
              <H3XScene pointerX={pointerX} pointerY={pointerY} reducedMotion={reducedMotion} />
            )}
          </motion.div>
        </div>
      </div>
    </motion.article>
  )
}

function ParallaxLayer({
  className,
  pointerX,
  pointerY,
  reducedMotion,
  depthX,
  depthY,
  rotate = 0,
  reverse = false,
  style,
  children,
}: ParallaxLayerProps) {
  const nextDepthX = reducedMotion ? 0 : depthX
  const nextDepthY = reducedMotion ? 0 : depthY ?? depthX
  const nextRotate = reducedMotion ? 0 : rotate
  const x = useTransform(
    pointerX,
    [-0.5, 0.5],
    reverse ? [nextDepthX, -nextDepthX] : [-nextDepthX, nextDepthX],
  )
  const y = useTransform(
    pointerY,
    [-0.5, 0.5],
    reverse ? [nextDepthY, -nextDepthY] : [-nextDepthY, nextDepthY],
  )
  const layerRotate = useTransform(
    pointerX,
    [-0.5, 0.5],
    reverse ? [nextRotate, -nextRotate] : [-nextRotate, nextRotate],
  )

  return (
    <motion.div className={`experience-layer ${className}`} style={{ x, y, rotate: layerRotate, ...style }}>
      {children}
    </motion.div>
  )
}

function RunymeScene({ pointerX, pointerY, reducedMotion }: SceneProps) {
  return (
    <>
      <ParallaxLayer
        className="experience-scene-grid experience-scene-grid--ledger"
        pointerX={pointerX}
        pointerY={pointerY}
        reducedMotion={reducedMotion}
        depthX={10}
        depthY={10}
        style={{ zIndex: 1 }}
      />

      <ParallaxLayer
        className="experience-scene-orb experience-scene-orb--top"
        pointerX={pointerX}
        pointerY={pointerY}
        reducedMotion={reducedMotion}
        depthX={14}
        depthY={12}
        style={{ zIndex: 1 }}
      />

      <ParallaxLayer
        className="experience-scene-orb experience-scene-orb--bottom"
        pointerX={pointerX}
        pointerY={pointerY}
        reducedMotion={reducedMotion}
        depthX={18}
        depthY={14}
        reverse
        style={{ zIndex: 2 }}
      />

      <ParallaxLayer
        className="experience-sheet-card"
        pointerX={pointerX}
        pointerY={pointerY}
        reducedMotion={reducedMotion}
        depthX={18}
        depthY={15}
        rotate={4}
        style={{ zIndex: 4 }}
      >
        <div className="experience-sheet-card__header">
          <span className="experience-scene-pill">Planilha viva</span>
          <span className="experience-scene-pill experience-scene-pill--ghost">SaaS</span>
        </div>

        <div className="experience-sheet-card__table">
          {SHEET_ROWS.map((_, rowIndex) => (
            <div key={rowIndex} className="experience-table-row">
              {SHEET_COLUMNS.map((_, columnIndex) => (
                <span key={`${rowIndex}-${columnIndex}`} className="experience-table-cell" />
              ))}
            </div>
          ))}
        </div>
      </ParallaxLayer>

      <ParallaxLayer
        className="experience-calc-card"
        pointerX={pointerX}
        pointerY={pointerY}
        reducedMotion={reducedMotion}
        depthX={30}
        depthY={24}
        rotate={8}
        style={{ zIndex: 6 }}
      >
        <div className="experience-calc-card__screen">IRPJ</div>
        <div className="experience-calc-card__keys">
          {CALCULATOR_KEYS.map((key) => (
            <span
              key={key}
              className={`experience-calc-card__key ${key === '=' ? 'experience-calc-card__key--accent' : ''}`}
            >
              {key}
            </span>
          ))}
        </div>
      </ParallaxLayer>

      <ParallaxLayer
        className="experience-strip-card experience-strip-card--receipt"
        pointerX={pointerX}
        pointerY={pointerY}
        reducedMotion={reducedMotion}
        depthX={38}
        depthY={28}
        rotate={10}
        reverse
        style={{ zIndex: 7 }}
      >
        <span className="experience-strip-card__label">Simulador</span>
        <span className="experience-strip-card__value">Regimes tributários</span>
      </ParallaxLayer>

      <ParallaxLayer
        className="experience-floating-pills experience-floating-pills--runyme"
        pointerX={pointerX}
        pointerY={pointerY}
        reducedMotion={reducedMotion}
        depthX={22}
        depthY={16}
        style={{ zIndex: 5 }}
      >
        <span>Fiscal</span>
        <span>Planilhas</span>
        <span>Performance</span>
      </ParallaxLayer>
    </>
  )
}

function CertikScene({ pointerX, pointerY, reducedMotion }: SceneProps) {
  return (
    <>
      <ParallaxLayer
        className="experience-scene-grid experience-scene-grid--design"
        pointerX={pointerX}
        pointerY={pointerY}
        reducedMotion={reducedMotion}
        depthX={12}
        depthY={10}
        style={{ zIndex: 1 }}
      />

      <ParallaxLayer
        className="experience-browser-card"
        pointerX={pointerX}
        pointerY={pointerY}
        reducedMotion={reducedMotion}
        depthX={18}
        depthY={14}
        rotate={6}
        reverse
        style={{ zIndex: 4 }}
      >
        <div className="experience-browser-card__bar">
          <span />
          <span />
          <span />
        </div>

        <div className="experience-browser-card__body">
          <div className="experience-browser-card__preview">
            <div className="experience-browser-card__hero" />
            <div className="experience-browser-card__tiles">
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>

          <div className="experience-browser-card__code">
            {CODE_LINES.map((width, index) => (
              <span key={`${width}-${index}`} style={{ width: `${width}%` }} />
            ))}
          </div>
        </div>
      </ParallaxLayer>

      <ParallaxLayer
        className="experience-laptop-card"
        pointerX={pointerX}
        pointerY={pointerY}
        reducedMotion={reducedMotion}
        depthX={30}
        depthY={24}
        rotate={4}
        style={{ zIndex: 6 }}
      >
        <div className="experience-laptop-card__screen">
          <div className="experience-laptop-card__swatches">
            <span />
            <span />
            <span />
          </div>

          <div className="experience-laptop-card__lines">
            {CODE_LINES.map((width, index) => (
              <span key={`${width}-${index}`} style={{ width: `${width}%` }} />
            ))}
          </div>
        </div>

        <div className="experience-laptop-card__base" />
      </ParallaxLayer>

      <ParallaxLayer
        className="experience-swatch-card"
        pointerX={pointerX}
        pointerY={pointerY}
        reducedMotion={reducedMotion}
        depthX={24}
        depthY={18}
        rotate={10}
        style={{ zIndex: 7 }}
      >
        <span />
        <span />
        <span />
      </ParallaxLayer>

      <ParallaxLayer
        className="experience-floating-pills experience-floating-pills--certik"
        pointerX={pointerX}
        pointerY={pointerY}
        reducedMotion={reducedMotion}
        depthX={18}
        depthY={14}
        style={{ zIndex: 5 }}
      >
        <span>Design</span>
        <span>Frontend</span>
        <span>APIs</span>
      </ParallaxLayer>
    </>
  )
}

function H3XScene({ pointerX, pointerY, reducedMotion }: SceneProps) {
  return (
    <>
      <ParallaxLayer
        className="experience-scene-grid experience-scene-grid--corporate"
        pointerX={pointerX}
        pointerY={pointerY}
        reducedMotion={reducedMotion}
        depthX={10}
        depthY={10}
        style={{ zIndex: 1 }}
      />

      <ParallaxLayer
        className="experience-skyline"
        pointerX={pointerX}
        pointerY={pointerY}
        reducedMotion={reducedMotion}
        depthX={14}
        depthY={12}
        style={{ zIndex: 2 }}
      >
        <span className="experience-skyline__building experience-skyline__building--one" />
        <span className="experience-skyline__building experience-skyline__building--two" />
        <span className="experience-skyline__building experience-skyline__building--three" />
        <span className="experience-skyline__building experience-skyline__building--four" />
      </ParallaxLayer>

      <ParallaxLayer
        className="experience-dashboard-card"
        pointerX={pointerX}
        pointerY={pointerY}
        reducedMotion={reducedMotion}
        depthX={24}
        depthY={18}
        rotate={5}
        reverse
        style={{ zIndex: 5 }}
      >
        <div className="experience-dashboard-card__bar">
          <span className="experience-dashboard-card__title">Projetos Web</span>
          <span className="experience-dashboard-card__dot" />
        </div>

        <div className="experience-dashboard-card__stats">
          {DASHBOARD_BARS.map((height, index) => (
            <span key={`${height}-${index}`} style={{ height: `${height}%` }} />
          ))}
        </div>

        <div className="experience-dashboard-card__lines">
          <span />
          <span />
          <span />
        </div>
      </ParallaxLayer>

      <ParallaxLayer
        className="experience-site-stack"
        pointerX={pointerX}
        pointerY={pointerY}
        reducedMotion={reducedMotion}
        depthX={34}
        depthY={26}
        rotate={9}
        style={{ zIndex: 7 }}
      >
        <div className="experience-site-stack__window experience-site-stack__window--back">
          <span />
          <span />
        </div>

        <div className="experience-site-stack__window experience-site-stack__window--front">
          <span />
          <span />
          <span />
        </div>
      </ParallaxLayer>

      <ParallaxLayer
        className="experience-floating-pills experience-floating-pills--h3x"
        pointerX={pointerX}
        pointerY={pointerY}
        reducedMotion={reducedMotion}
        depthX={18}
        depthY={14}
        style={{ zIndex: 6 }}
      >
        <span>Institucional</span>
        <span>E-commerce</span>
        <span>MVC</span>
      </ParallaxLayer>
    </>
  )
}
