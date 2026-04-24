import { useEffect, useId, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'

interface PointerLayerProps {
  className: string
  pointerX: MotionValue<number>
  pointerY: MotionValue<number>
  depthX: number
  depthY?: number
  rotate?: number
  reducedMotion: boolean
  style?: CSSProperties
  children?: ReactNode
}

const PARALLAX_CALC_KEYS = ['7', '8', '9', '%', '4', '5', '6', 'x', '1', '2', '3', '-', '0', '.', '=', '+']
const PARALLAX_CHART_BARS = [44, 72, 58, 84, 67]

function PointerLayer({
  className,
  pointerX,
  pointerY,
  depthX,
  depthY,
  rotate = 0,
  reducedMotion,
  style,
  children,
}: PointerLayerProps) {
  const nextDepthX = reducedMotion ? 0 : depthX
  const nextDepthY = reducedMotion ? 0 : depthY ?? depthX
  const nextRotate = reducedMotion ? 0 : rotate
  const x = useTransform(pointerX, [0, 1], [-nextDepthX, nextDepthX])
  const y = useTransform(pointerY, [0, 1], [-nextDepthY, nextDepthY])
  const layerRotate = useTransform(pointerX, [0, 1], [-nextRotate, nextRotate])

  return (
    <motion.div className={className} style={{ x, y, rotate: layerRotate, ...style }}>
      {children}
    </motion.div>
  )
}

export function ParallaxShowcaseBackground() {
  const prefersReducedMotion = useReducedMotion()
  const reducedMotion = Boolean(prefersReducedMotion)
  const [viewport, setViewport] = useState(() => ({
    width: typeof window === 'undefined' ? 1440 : window.innerWidth,
    hasFinePointer:
      typeof window === 'undefined'
        ? true
        : window.matchMedia('(hover: hover) and (pointer: fine)').matches,
  }))
  const rawPointerX = useMotionValue(0.5)
  const rawPointerY = useMotionValue(0.5)
  const pointerX = useSpring(rawPointerX, { stiffness: 120, damping: 24, mass: 0.6 })
  const pointerY = useSpring(rawPointerY, { stiffness: 120, damping: 24, mass: 0.6 })
  const { scrollYProgress } = useScroll()
  const filterSeed = useId().replace(/:/g, '')
  const gooFilterId = `parallax-goo-${filterSeed}`
  const isCompact = viewport.width < 700
  const isTablet = viewport.width < 1100
  const canTrackPointer = !reducedMotion && viewport.hasFinePointer
  const motionScale = isCompact ? 0.34 : isTablet ? 0.62 : 1
  const fluidTravelX = 520 * motionScale
  const fluidTravelY = 340 * motionScale
  const ringTravelX = 440 * motionScale
  const ringTravelY = 260 * motionScale
  const gridTravelX = 44 * motionScale
  const gridTravelY = 30 * motionScale

  const primaryGlowX = useTransform(pointerX, [0, 1], [16, 84])
  const primaryGlowY = useTransform(pointerY, [0, 1], [12, 88])
  const secondaryGlowX = useTransform(pointerX, [0, 1], [82, 18])
  const secondaryGlowY = useTransform(pointerY, [0, 1], [18, 80])
  const ambientBackground = useMotionTemplate`
    radial-gradient(circle at ${primaryGlowX}% ${primaryGlowY}%, rgba(125, 249, 255, 0.22), transparent 24%),
    radial-gradient(circle at ${secondaryGlowX}% ${secondaryGlowY}%, rgba(255, 122, 217, 0.22), transparent 28%),
    linear-gradient(180deg, rgba(2, 8, 20, 0.98) 0%, rgba(4, 12, 25, 0.94) 48%, rgba(2, 6, 16, 0.99) 100%)
  `

  const fluidShiftX = useTransform(pointerX, [0, 1], [-fluidTravelX, fluidTravelX])
  const fluidShiftY = useTransform(pointerY, [0, 1], [-fluidTravelY, fluidTravelY])
  const ringShiftX = useTransform(pointerX, [0, 1], [-ringTravelX, ringTravelX])
  const ringShiftY = useTransform(pointerY, [0, 1], [-ringTravelY, ringTravelY])
  const gridShiftX = useTransform(pointerX, [0, 1], [-gridTravelX, gridTravelX])
  const gridShiftY = useTransform(pointerY, [0, 1], [-gridTravelY, gridTravelY])
  const driftSlow = useTransform(scrollYProgress, [0, 1], [150 * motionScale, -450 * motionScale])
  const driftMedium = useTransform(scrollYProgress, [0, 1], [250 * motionScale, -750 * motionScale])
  const driftFast = useTransform(scrollYProgress, [0, 1], [350 * motionScale, -1000 * motionScale])
  const driftReverse = useTransform(scrollYProgress, [0, 1], [-200 * motionScale, 600 * motionScale])

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

  useEffect(() => {
    if (!canTrackPointer) return

    const updatePointer = (event: PointerEvent) => {
      rawPointerX.set(event.clientX / window.innerWidth)
      rawPointerY.set(event.clientY / window.innerHeight)
    }

    const resetPointer = () => {
      rawPointerX.set(0.5)
      rawPointerY.set(0.5)
    }

    window.addEventListener('pointermove', updatePointer, { passive: true })
    window.addEventListener('pointerleave', resetPointer)
    window.addEventListener('blur', resetPointer)

    return () => {
      window.removeEventListener('pointermove', updatePointer)
      window.removeEventListener('pointerleave', resetPointer)
      window.removeEventListener('blur', resetPointer)
    }
  }, [canTrackPointer, rawPointerX, rawPointerY])

  const rootClassName = [
    'parallax-showcase-bg',
    isTablet ? 'parallax-showcase-bg--tablet' : '',
    isCompact ? 'parallax-showcase-bg--compact' : '',
    !viewport.hasFinePointer ? 'parallax-showcase-bg--touch' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={rootClassName} aria-hidden="true">
      <svg className="parallax-showcase-bg__filters" width="0" height="0" focusable="false">
        <defs>
          <filter id={gooFilterId}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="22" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 24 -10
              "
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <motion.div className="parallax-showcase-bg__base" style={{ background: ambientBackground }} />

      <motion.div
        className="parallax-showcase-bg__grid"
        style={{ x: gridShiftX, y: gridShiftY }}
      />

      <motion.div
        className="parallax-showcase-bg__beam parallax-showcase-bg__beam--one"
        style={{ y: driftSlow }}
        animate={reducedMotion ? undefined : { x: [0, 36, -24, 0], opacity: [0.25, 0.42, 0.3, 0.25] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="parallax-showcase-bg__beam parallax-showcase-bg__beam--two"
        style={{ y: driftMedium }}
        animate={reducedMotion ? undefined : { x: [0, -42, 28, 0], opacity: [0.2, 0.36, 0.24, 0.2] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="parallax-showcase-bg__goo"
        style={{ filter: `url(#${gooFilterId})` }}
      >
        <motion.div
          className="parallax-showcase-bg__blob parallax-showcase-bg__blob--one"
          animate={reducedMotion ? undefined : { x: [0, 42, -28, 0], y: [0, -34, 18, 0], scale: [1, 1.08, 0.96, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="parallax-showcase-bg__blob parallax-showcase-bg__blob--two"
          animate={reducedMotion ? undefined : { x: [0, -36, 30, 0], y: [0, 26, -20, 0], scale: [1, 0.94, 1.06, 1] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="parallax-showcase-bg__blob parallax-showcase-bg__blob--three"
          animate={reducedMotion ? undefined : { x: [0, 28, -40, 0], y: [0, 18, -28, 0], scale: [1, 1.05, 0.92, 1] }}
          transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="parallax-showcase-bg__blob parallax-showcase-bg__blob--four"
          animate={reducedMotion ? undefined : { x: [0, -24, 36, 0], y: [0, -18, 24, 0], scale: [1, 0.96, 1.04, 1] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="parallax-showcase-bg__blob parallax-showcase-bg__blob--pointer"
          style={canTrackPointer ? { x: fluidShiftX, y: fluidShiftY } : undefined}
          animate={
            canTrackPointer || reducedMotion
              ? undefined
              : { x: [0, 28, -24, 0], y: [0, -18, 22, 0], scale: [1, 1.06, 0.95, 1] }
          }
          transition={
            canTrackPointer || reducedMotion
              ? undefined
              : { duration: 18, repeat: Infinity, ease: 'easeInOut' }
          }
        />
      </motion.div>

      <motion.div className="parallax-showcase-bg__noise" style={{ y: driftReverse }} />

      <motion.div className="parallax-showcase-bg__panels" style={{ x: ringShiftX, y: ringShiftY }}>
        <PointerLayer
          className="parallax-showcase-bg__ring parallax-showcase-bg__ring--outer"
          pointerX={pointerX}
          pointerY={pointerY}
          depthX={18}
          depthY={16}
          rotate={4}
          reducedMotion={reducedMotion}
        />
      </motion.div>
      <motion.div className="parallax-showcase-bg__panels" style={{ x: ringShiftX, y: ringShiftY }}>
        <PointerLayer
          className="parallax-showcase-bg__ring parallax-showcase-bg__ring--inner"
          pointerX={pointerX}
          pointerY={pointerY}
          depthX={28}
          depthY={24}
          rotate={8}
          reducedMotion={reducedMotion}
        />
      </motion.div>

      <motion.div className="parallax-showcase-bg__panels" style={{ y: driftSlow }}>
        <PointerLayer
          className="parallax-showcase-panel parallax-showcase-panel--alpha"
          pointerX={pointerX}
          pointerY={pointerY}
          depthX={18}
          depthY={14}
          rotate={5}
          reducedMotion={reducedMotion}
          style={{ opacity: 0.9, filter: 'blur(3px)' }}
        >
          <div className="parallax-showcase-panel__lines">
            <span style={{ width: '80%' }} />
            <span style={{ width: '60%' }} />
            <span style={{ width: '90%' }} />
            <span style={{ width: '40%' }} />
          </div>

          {/* Gráfico Adicionado Mais Abaixo no Card Alpha */}
          <div className="parallax-showcase-panel__chart-shell" style={{ marginTop: '16px', transform: 'scale(0.99)', transformOrigin: 'left center' }}>
            <div className="parallax-showcase-panel__chart-bars">
              {PARALLAX_CHART_BARS.map((height, index) => (
                <motion.span
                  key={`alpha-bar-${height}-${index}`}
                  animate={
                    reducedMotion
                      ? { height: `${height}%` }
                      : { height: [`${Math.max(24, height - 14)}%`, `${height}%`, `${Math.max(18, height - 8)}%`] }
                  }
                  transition={{ duration: 3.4, delay: index * 0.14, repeat: Infinity, ease: 'easeInOut' }}
                />
              ))}
            </div>
            <svg className="parallax-showcase-panel__chart-line" viewBox="0 0 240 120" preserveAspectRatio="none" style={{ marginTop: '-40px' }}>
              <motion.path
                d="M 18 86 C 52 74, 76 58, 106 64 S 160 30, 222 18"
                fill="none" stroke="rgba(244, 251, 255, 0.92)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0.45 }} animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.6, ease: 'easeOut', delay: 0.2 }}
              />
            </svg>
          </div>
        </PointerLayer>
      </motion.div>

      <motion.div className="parallax-showcase-bg__panels" style={{ y: driftFast }}>
        <PointerLayer
          className="parallax-showcase-panel parallax-showcase-panel--beta"
          pointerX={pointerX}
          pointerY={pointerY}
          depthX={26}
          depthY={20}
          rotate={8}
          reducedMotion={reducedMotion}
          style={{ opacity: 0.85, filter: 'blur(2px)' }}
        >
          <div className="parallax-showcase-panel__calc-display" style={{ marginBottom: "12px", border: "none", background: "transparent", padding: 0 }}>
            <strong style={{ fontSize: "1.2rem", color: "rgba(125, 249, 255, 0.8)", margin: "0 auto" }}>R$ 184.320</strong>
          </div>
          <div className="parallax-showcase-panel__calc-grid">
            {PARALLAX_CALC_KEYS.map((key, index) => (
              <motion.span
                key={key}
                className={`parallax-showcase-panel__calc-key ${key === '=' ? 'parallax-showcase-panel__calc-key--accent' : ''}`}
                animate={
                  reducedMotion
                    ? undefined
                    : {
                      y: key === '=' ? [0, -2, 0] : [0, -1, 0],
                      opacity: [0.72, 1, 0.72],
                    }
                }
                transition={{
                  duration: key === '=' ? 1.8 : 2.6,
                  delay: index * 0.05,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {key}
              </motion.span>
            ))}
          </div>
        </PointerLayer>
      </motion.div>

      <motion.div className="parallax-showcase-bg__panels" style={{ y: driftMedium }}>
        <PointerLayer
          className="parallax-showcase-panel parallax-showcase-panel--gamma"
          pointerX={pointerX}
          pointerY={pointerY}
          depthX={22}
          depthY={18}
          rotate={-6}
          reducedMotion={reducedMotion}
          style={{ opacity: 0.8, filter: 'blur(3px)' }}
        >
          <div className="parallax-showcase-panel__chart-shell">
            <div className="parallax-showcase-panel__chart-bars">
              {PARALLAX_CHART_BARS.map((height, index) => (
                <motion.span
                  key={`${height}-${index}`}
                  animate={
                    reducedMotion
                      ? { height: `${height}%` }
                      : {
                        height: [`${Math.max(24, height - 14)}%`, `${height}%`, `${Math.max(18, height - 8)}%`],
                      }
                  }
                  transition={{
                    duration: 3.4,
                    delay: index * 0.14,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>

            <svg className="parallax-showcase-panel__chart-line" viewBox="0 0 240 120" preserveAspectRatio="none">
              <path d="M 12 96 L 228 96" className="parallax-showcase-panel__chart-axis" />
              <motion.path
                d="M 18 86 C 52 74, 76 58, 106 64 S 160 30, 222 18"
                fill="none"
                stroke="rgba(244, 251, 255, 0.92)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={reducedMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0.45 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.6, ease: 'easeOut', delay: 0.2 }}
              />
              {[['18', '86'], ['106', '64'], ['222', '18']].map(([cx, cy]) => (
                <circle
                  key={`${cx}-${cy}`}
                  cx={cx}
                  cy={cy}
                  r="4.5"
                  fill="rgba(125, 249, 255, 0.95)"
                />
              ))}
            </svg>
          </div>
          <div className="parallax-showcase-panel__pills">
            <span>Receita</span>
            <span>Escala</span>
            <span>Conversao</span>
          </div>
        </PointerLayer>
      </motion.div>

      <motion.div className="parallax-showcase-bg__panels" style={{ y: driftReverse }}>
        <PointerLayer
          className="parallax-showcase-panel parallax-showcase-panel--delta"
          pointerX={pointerX}
          pointerY={pointerY}
          depthX={16}
          depthY={12}
          rotate={4}
          reducedMotion={reducedMotion}
          style={{ opacity: 0.85, filter: 'blur(4px)' }}
        >
          <div className="parallax-showcase-panel__metrics">
            <motion.span
              animate={reducedMotion ? undefined : { opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              +24%
            </motion.span>
            <motion.span
              animate={reducedMotion ? undefined : { opacity: [1, 0.55, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            >
              3,1x
            </motion.span>
            <motion.span
              animate={reducedMotion ? undefined : { opacity: [0.65, 1, 0.65] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
            >
              12ms
            </motion.span>
          </div>
        </PointerLayer>
      </motion.div>
    </div>
  )
}
