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
  const driftSlow = useTransform(scrollYProgress, [0, 1], [0, -120 * motionScale])
  const driftMedium = useTransform(scrollYProgress, [0, 1], [0, -180 * motionScale])
  const driftFast = useTransform(scrollYProgress, [0, 1], [0, -240 * motionScale])
  const driftReverse = useTransform(scrollYProgress, [0, 1], [0, 160 * motionScale])

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
        >
          <span className="parallax-showcase-panel__eyebrow">Fluid Field</span>
          <strong className="parallax-showcase-panel__title">Interactive light reacting in real time</strong>
          <div className="parallax-showcase-panel__lines">
            <span style={{ width: '82%' }} />
            <span style={{ width: '58%' }} />
            <span style={{ width: '72%' }} />
          </div>
          <div className="parallax-showcase-panel__pills">
            <span>Mouse</span>
            <span>Glow</span>
            <span>Liquid</span>
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
        >
          <span className="parallax-showcase-panel__eyebrow">Reactive Depth</span>
          <strong className="parallax-showcase-panel__title">Glass layers, orbiting nodes and cinematic depth</strong>
          <div className="parallax-showcase-panel__orbit">
            <span className="parallax-showcase-panel__orbit-ring" />
            <span className="parallax-showcase-panel__orbit-ring parallax-showcase-panel__orbit-ring--inner" />
            <span className="parallax-showcase-panel__orbit-node parallax-showcase-panel__orbit-node--one" />
            <span className="parallax-showcase-panel__orbit-node parallax-showcase-panel__orbit-node--two" />
            <span className="parallax-showcase-panel__orbit-node parallax-showcase-panel__orbit-node--three" />
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
        >
          <span className="parallax-showcase-panel__eyebrow">Motion System</span>
          <strong className="parallax-showcase-panel__title">Parallax stacks with premium motion rig</strong>
          <div className="parallax-showcase-panel__bars">
            <span style={{ height: '72%' }} />
            <span style={{ height: '46%' }} />
            <span style={{ height: '88%' }} />
            <span style={{ height: '58%' }} />
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
        >
          <span className="parallax-showcase-panel__eyebrow">Showcase</span>
          <strong className="parallax-showcase-panel__title">High-end background for premium portfolio moments</strong>
        </PointerLayer>
      </motion.div>
    </div>
  )
}
