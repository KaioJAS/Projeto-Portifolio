import { useEffect, useRef, useCallback } from 'react'
import type { Element } from '@/theme/types'
import type { ShieldRect } from './ParticleShieldContext'
import { useParticleShields } from './ParticleShieldContext'

interface Props {
  element: Element
}

/* ===================================================================
   CANVAS-BASED WEATHER PARTICLE SYSTEM
   Each element has a unique particle type with shield interaction
   =================================================================== */

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  life: number
  maxLife: number
  type: string
  rotation?: number
  rotSpeed?: number
  // Shield interaction state
  stuck: boolean
  stuckX?: number
  stuckY?: number
  stuckLife?: number
  stuckMaxLife?: number
}

/* ---- Shield collision helpers ---- */

function isInsideShield(px: number, py: number, s: ShieldRect, scrollY: number, margin = 0): boolean {
  const sx = s.x - margin
  const sy = s.y - scrollY - margin
  const sw = s.width + margin * 2
  const sh = s.height + margin * 2
  return px >= sx && px <= sx + sw && py >= sy && py <= sy + sh
}

function deflectFromShield(
  p: Particle,
  s: ShieldRect,
  scrollY: number,
): 'none' | 'top' | 'bottom' | 'left' | 'right' {
  const sx = s.x
  const sy = s.y - scrollY
  const sw = s.width
  const sh = s.height
  const margin = 4

  if (p.x >= sx - margin && p.x <= sx + sw + margin && p.y >= sy - margin && p.y <= sy + sh + margin) {
    // Determine which edge is closest
    const distTop = Math.abs(p.y - sy)
    const distBottom = Math.abs(p.y - (sy + sh))
    const distLeft = Math.abs(p.x - sx)
    const distRight = Math.abs(p.x - (sx + sw))
    const min = Math.min(distTop, distBottom, distLeft, distRight)

    if (min === distTop) return 'top'
    if (min === distBottom) return 'bottom'
    if (min === distLeft) return 'left'
    return 'right'
  }
  return 'none'
}

// Element-specific particle factories
const PARTICLE_CONFIGS: Record<Element, {
  count: number
  create: (w: number, h: number) => Particle
  update: (p: Particle, w: number, h: number, shields: ShieldRect[], scrollY: number) => void
  draw: (ctx: CanvasRenderingContext2D, p: Particle) => void
}> = {
  // MATA — Folhas caindo com rotação
  mata: {
    count: 45,
    create(w, h) {
      return {
        x: Math.random() * w,
        y: -20 - Math.random() * 200,
        vx: (Math.random() - 0.5) * 0.8,
        vy: 0.8 + Math.random() * 1.5,
        size: 4 + Math.random() * 6,
        opacity: 0.35 + Math.random() * 0.35,
        life: 0,
        maxLife: 600 + Math.random() * 400,
        type: 'leaf',
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.04,
        stuck: false,
      }
    },
    update(p, w, h, shields, scrollY) {
      if (p.stuck) {
        p.stuckLife = (p.stuckLife || 0) + 1
        p.opacity *= 0.998
        if ((p.stuckLife || 0) > (p.stuckMaxLife || 300) || p.opacity < 0.02) {
          p.stuck = false
          p.x = Math.random() * w
          p.y = -20
          p.life = 0
          p.opacity = 0.35 + Math.random() * 0.35
          p.vy = 0.8 + Math.random() * 1.5
        }
        return
      }

      p.x += p.vx + Math.sin(p.life * 0.015) * 0.6
      p.y += p.vy
      p.life++
      if (p.rotation !== undefined) p.rotation += p.rotSpeed || 0

      // Shield collision — accumulate on top
      for (const s of shields) {
        const edge = deflectFromShield(p, s, scrollY)
        if (edge === 'top') {
          p.stuck = true
          p.stuckX = p.x
          p.stuckY = s.y - scrollY - p.size
          p.stuckLife = 0
          p.stuckMaxLife = 200 + Math.random() * 300
          p.vy = 0
          p.vx = 0
          return
        }
        if (edge !== 'none') {
          // Slide around sides
          p.vx += edge === 'left' ? -0.5 : edge === 'right' ? 0.5 : 0
        }
      }

      if (p.y > h + 30 || p.life > p.maxLife) {
        p.x = Math.random() * w
        p.y = -20 - Math.random() * 100
        p.life = 0
        p.opacity = 0.35 + Math.random() * 0.35
      }
    },
    draw(ctx, p) {
      const drawX = p.stuck ? (p.stuckX || p.x) : p.x
      const drawY = p.stuck ? (p.stuckY || p.y) : p.y

      ctx.save()
      ctx.translate(drawX, drawY)
      ctx.rotate(p.rotation || 0)

      // Leaf body
      ctx.fillStyle = `rgba(60, 130, 40, ${p.opacity})`
      ctx.beginPath()
      ctx.ellipse(0, 0, p.size, p.size * 0.4, 0, 0, Math.PI * 2)
      ctx.fill()

      // Leaf tip
      ctx.fillStyle = `rgba(80, 160, 50, ${p.opacity * 0.7})`
      ctx.beginPath()
      ctx.ellipse(p.size * 0.5, 0, p.size * 0.3, p.size * 0.2, 0.3, 0, Math.PI * 2)
      ctx.fill()

      // Leaf vein
      ctx.strokeStyle = `rgba(40, 100, 25, ${p.opacity * 0.5})`
      ctx.lineWidth = 0.5
      ctx.beginPath()
      ctx.moveTo(-p.size, 0)
      ctx.lineTo(p.size, 0)
      ctx.stroke()

      ctx.restore()
    },
  },

  // AGUA — Bolhas subindo
  agua: {
    count: 50,
    create(w, h) {
      return {
        x: Math.random() * w,
        y: h + 20 + Math.random() * 200,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -0.8 - Math.random() * 1.5,
        size: 2 + Math.random() * 6,
        opacity: 0.15 + Math.random() * 0.3,
        life: 0,
        maxLife: 500 + Math.random() * 400,
        type: 'bubble',
        stuck: false,
      }
    },
    update(p, w, h, shields, scrollY) {
      if (p.stuck) {
        p.stuckLife = (p.stuckLife || 0) + 1
        // Bubbles pop after a while
        if ((p.stuckLife || 0) > (p.stuckMaxLife || 80)) {
          p.stuck = false
          p.x = Math.random() * w
          p.y = h + 20
          p.life = 0
          p.opacity = 0.15 + Math.random() * 0.3
          p.vy = -0.8 - Math.random() * 1.5
          p.size = 2 + Math.random() * 6
        }
        // Bubble wobble while stuck
        p.opacity = 0.15 + Math.sin((p.stuckLife || 0) * 0.1) * 0.1
        return
      }

      p.x += p.vx + Math.sin(p.life * 0.02) * 0.4
      p.y += p.vy
      p.life++

      // Shield collision — accumulate on bottom
      for (const s of shields) {
        const edge = deflectFromShield(p, s, scrollY)
        if (edge === 'bottom') {
          p.stuck = true
          p.stuckX = p.x
          p.stuckY = s.y - scrollY + s.height + p.size
          p.stuckLife = 0
          p.stuckMaxLife = 60 + Math.random() * 80
          p.vy = 0
          p.vx = 0
          return
        }
        if (edge !== 'none') {
          p.vx += edge === 'left' ? -0.3 : edge === 'right' ? 0.3 : 0
        }
      }

      if (p.y < -30 || p.life > p.maxLife) {
        p.x = Math.random() * w
        p.y = h + 20 + Math.random() * 100
        p.life = 0
        p.opacity = 0.15 + Math.random() * 0.3
        p.size = 2 + Math.random() * 6
      }
    },
    draw(ctx, p) {
      const drawX = p.stuck ? (p.stuckX || p.x) : p.x
      const drawY = p.stuck ? (p.stuckY || p.y) : p.y

      // Bubble body
      ctx.beginPath()
      ctx.arc(drawX, drawY, p.size, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(120, 190, 255, ${p.opacity})`
      ctx.lineWidth = 0.8
      ctx.stroke()

      // Bubble highlight
      ctx.fillStyle = `rgba(180, 220, 255, ${p.opacity * 0.4})`
      ctx.beginPath()
      ctx.arc(drawX - p.size * 0.3, drawY - p.size * 0.3, p.size * 0.25, 0, Math.PI * 2)
      ctx.fill()

      // Inner glow
      ctx.fillStyle = `rgba(100, 160, 230, ${p.opacity * 0.1})`
      ctx.beginPath()
      ctx.arc(drawX, drawY, p.size * 0.8, 0, Math.PI * 2)
      ctx.fill()
    },
  },

  // FOGO — Cinzas em brasa caindo
  fogo: {
    count: 80,
    create(w, h) {
      return {
        x: Math.random() * w,
        y: -20 - Math.random() * 200,
        vx: (Math.random() - 0.5) * 1.0,
        vy: 0.5 + Math.random() * 2.0,
        size: 1.5 + Math.random() * 3.5,
        opacity: 0.5 + Math.random() * 0.5,
        life: 0,
        maxLife: 300 + Math.random() * 300,
        type: 'ash',
        stuck: false,
      }
    },
    update(p, w, h, shields, scrollY) {
      if (p.stuck) {
        p.stuckLife = (p.stuckLife || 0) + 1
        p.opacity *= 0.993
        if ((p.stuckLife || 0) > (p.stuckMaxLife || 200) || p.opacity < 0.02) {
          p.stuck = false
          p.x = Math.random() * w
          p.y = -20
          p.life = 0
          p.opacity = 0.5 + Math.random() * 0.5
          p.vy = 0.5 + Math.random() * 2.0
          p.size = 1.5 + Math.random() * 3.5
        }
        return
      }

      p.x += p.vx + Math.sin(p.life * 0.03) * 0.4
      p.y += p.vy
      p.life++
      const t = p.life / p.maxLife
      p.opacity = (1 - t * 0.5) * (0.4 + Math.sin(p.life * 0.2) * 0.15)
      p.size *= 0.9995

      // Shield collision — accumulate on top
      for (const s of shields) {
        const edge = deflectFromShield(p, s, scrollY)
        if (edge === 'top') {
          p.stuck = true
          p.stuckX = p.x
          p.stuckY = s.y - scrollY - 1
          p.stuckLife = 0
          p.stuckMaxLife = 150 + Math.random() * 200
          p.vy = 0
          p.vx = 0
          return
        }
        if (edge !== 'none') {
          p.vx += edge === 'left' ? -0.4 : edge === 'right' ? 0.4 : 0
        }
      }

      if (p.y > h + 30 || p.life > p.maxLife) {
        p.x = Math.random() * w
        p.y = -20 - Math.random() * 100
        p.life = 0
        p.opacity = 0.5 + Math.random() * 0.5
        p.size = 1.5 + Math.random() * 3.5
        p.vy = 0.5 + Math.random() * 2.0
      }
    },
    draw(ctx, p) {
      const drawX = p.stuck ? (p.stuckX || p.x) : p.x
      const drawY = p.stuck ? (p.stuckY || p.y) : p.y

      // Ember glow
      const grd = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, p.size * 1.5)
      grd.addColorStop(0, `rgba(255, 200, 50, ${p.opacity})`)
      grd.addColorStop(0.4, `rgba(255, 100, 20, ${p.opacity * 0.6})`)
      grd.addColorStop(0.7, `rgba(200, 30, 0, ${p.opacity * 0.3})`)
      grd.addColorStop(1, 'rgba(100, 15, 0, 0)')
      ctx.beginPath()
      ctx.arc(drawX, drawY, p.size * 1.5, 0, Math.PI * 2)
      ctx.fillStyle = grd
      ctx.fill()

      // Ash core
      ctx.fillStyle = `rgba(80, 40, 20, ${p.opacity * 0.6})`
      ctx.beginPath()
      ctx.arc(drawX, drawY, p.size * 0.4, 0, Math.PI * 2)
      ctx.fill()
    },
  },

  // TERRA — Poeira passando horizontalmente
  terra: {
    count: 70,
    create(w, h) {
      const fromLeft = Math.random() > 0.5
      return {
        x: fromLeft ? -20 - Math.random() * 100 : w + 20 + Math.random() * 100,
        y: Math.random() * h,
        vx: fromLeft ? 0.5 + Math.random() * 1.5 : -(0.5 + Math.random() * 1.5),
        vy: (Math.random() - 0.5) * 0.3,
        size: 1 + Math.random() * 3,
        opacity: 0.1 + Math.random() * 0.25,
        life: 0,
        maxLife: 400 + Math.random() * 400,
        type: 'dust',
        stuck: false,
      }
    },
    update(p, w, h, shields, scrollY) {
      if (p.stuck) {
        p.stuckLife = (p.stuckLife || 0) + 1
        p.opacity *= 0.995
        if ((p.stuckLife || 0) > (p.stuckMaxLife || 250) || p.opacity < 0.02) {
          p.stuck = false
          const fromLeft = Math.random() > 0.5
          p.x = fromLeft ? -20 : w + 20
          p.y = Math.random() * h
          p.vx = fromLeft ? 0.5 + Math.random() * 1.5 : -(0.5 + Math.random() * 1.5)
          p.life = 0
          p.opacity = 0.1 + Math.random() * 0.25
        }
        return
      }

      p.x += p.vx
      p.y += p.vy + Math.sin(p.life * 0.01) * 0.15
      p.life++

      const t = p.life / p.maxLife
      p.opacity = t < 0.1 ? t * 10 * 0.25 : t > 0.8 ? (1 - t) * 5 * 0.25 : 0.25

      // Shield collision — accumulate on sides
      for (const s of shields) {
        const edge = deflectFromShield(p, s, scrollY)
        if (edge === 'left' || edge === 'right') {
          p.stuck = true
          p.stuckX = edge === 'left' ? s.x - p.size : s.x + s.width + p.size
          p.stuckY = p.y
          p.stuckLife = 0
          p.stuckMaxLife = 200 + Math.random() * 300
          p.vy = 0
          p.vx = 0
          return
        }
        if (edge === 'top' || edge === 'bottom') {
          p.vy *= -0.3
          p.y += edge === 'top' ? -3 : 3
        }
      }

      if (p.life > p.maxLife || p.x < -50 || p.x > w + 50) {
        const fromLeft = Math.random() > 0.5
        p.x = fromLeft ? -20 : w + 20
        p.y = Math.random() * h
        p.vx = fromLeft ? 0.5 + Math.random() * 1.5 : -(0.5 + Math.random() * 1.5)
        p.life = 0
        p.opacity = 0.1 + Math.random() * 0.25
      }
    },
    draw(ctx, p) {
      const drawX = p.stuck ? (p.stuckX || p.x) : p.x
      const drawY = p.stuck ? (p.stuckY || p.y) : p.y

      ctx.beginPath()
      ctx.arc(drawX, drawY, p.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(196, 160, 100, ${p.opacity})`
      ctx.fill()

      // Dust trail
      if (!p.stuck && Math.abs(p.vx) > 0.3) {
        ctx.fillStyle = `rgba(196, 160, 100, ${p.opacity * 0.3})`
        ctx.beginPath()
        ctx.arc(drawX - p.vx * 2, drawY, p.size * 0.6, 0, Math.PI * 2)
        ctx.fill()
      }
    },
  },

  // LUZ — Estrelas cadentes
  luz: {
    count: 60,
    create(w, h) {
      const isShooting = Math.random() > 0.85
      return {
        x: isShooting ? Math.random() * w * 0.6 : Math.random() * w,
        y: isShooting ? Math.random() * h * 0.3 : Math.random() * h,
        vx: isShooting ? 4 + Math.random() * 6 : 0,
        vy: isShooting ? 3 + Math.random() * 4 : 0,
        size: isShooting ? 2 : 0.5 + Math.random() * 2,
        opacity: 0.2 + Math.random() * 0.6,
        life: Math.random() * 200,
        maxLife: isShooting ? 50 + Math.random() * 30 : 300 + Math.random() * 300,
        type: isShooting ? 'shooting' : 'star',
        stuck: false,
      }
    },
    update(p, w, h, shields, scrollY) {
      p.life++

      if (p.type === 'star') {
        p.opacity = 0.15 + Math.sin(p.life * 0.025) * 0.35
        if (p.life > p.maxLife) {
          p.x = Math.random() * w
          p.y = Math.random() * h
          p.life = 0
        }
        return
      }

      // Shooting star
      p.x += p.vx
      p.y += p.vy
      p.opacity = (1 - p.life / p.maxLife) * 0.85

      // Shield interaction — shooting stars bounce off!
      for (const s of shields) {
        if (isInsideShield(p.x, p.y, s, scrollY, 2)) {
          p.vy *= -0.5
          p.vx *= 0.8
          p.y -= 5
          break
        }
      }

      if (p.life > p.maxLife || p.x > w + 50 || p.y > h + 50) {
        p.x = Math.random() * w * 0.5
        p.y = Math.random() * h * 0.2
        p.life = 0
        p.vx = 4 + Math.random() * 6
        p.vy = 3 + Math.random() * 4
        p.opacity = 0.8
      }
    },
    draw(ctx, p) {
      if (p.type === 'shooting') {
        const len = 30
        const angle = Math.atan2(p.vy, p.vx)
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(angle)

        // Trail gradient
        const grad = ctx.createLinearGradient(-len, 0, 0, 0)
        grad.addColorStop(0, 'transparent')
        grad.addColorStop(0.6, `rgba(255, 230, 150, ${p.opacity * 0.4})`)
        grad.addColorStop(1, `rgba(255, 255, 255, ${p.opacity})`)
        ctx.strokeStyle = grad
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(-len, 0)
        ctx.lineTo(0, 0)
        ctx.stroke()

        // Head glow
        const headGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, 4)
        headGlow.addColorStop(0, `rgba(255, 255, 255, ${p.opacity})`)
        headGlow.addColorStop(0.5, `rgba(255, 215, 0, ${p.opacity * 0.5})`)
        headGlow.addColorStop(1, 'transparent')
        ctx.fillStyle = headGlow
        ctx.beginPath()
        ctx.arc(0, 0, 4, 0, Math.PI * 2)
        ctx.fill()

        ctx.restore()
      } else {
        // Twinkling star
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2)
        ctx.fill()

        // Cross glow
        if (p.size > 1.2 && p.opacity > 0.3) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${p.opacity * 0.25})`
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(p.x - p.size, p.y)
          ctx.lineTo(p.x + p.size, p.y)
          ctx.moveTo(p.x, p.y - p.size)
          ctx.lineTo(p.x, p.y + p.size)
          ctx.stroke()
        }
      }
    },
  },

  // VENTO — Sopro com streaks e névoa
  vento: {
    count: 70,
    create(w, h) {
      const isStreak = Math.random() > 0.4
      return {
        x: -20 - Math.random() * 200,
        y: Math.random() * h,
        vx: 2 + Math.random() * 5,
        vy: (Math.random() - 0.3) * 0.5,
        size: isStreak ? 1 : 2 + Math.random() * 3,
        opacity: isStreak ? 0.06 + Math.random() * 0.1 : 0.12 + Math.random() * 0.2,
        life: 0,
        maxLife: isStreak ? 80 : 500,
        type: isStreak ? 'streak' : 'mist',
        rotation: 0,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        stuck: false,
      }
    },
    update(p, w, h, shields, scrollY) {
      p.x += p.vx
      p.y += p.vy + Math.sin(p.life * 0.015) * 0.3
      p.life++
      if (p.rotation !== undefined) p.rotation += p.rotSpeed || 0

      // Shields deflect wind around them
      for (const s of shields) {
        const edge = deflectFromShield(p, s, scrollY)
        if (edge === 'left') {
          p.vy += p.y < (s.y - scrollY + s.height / 2) ? -0.5 : 0.5
          p.vx *= 1.05
        } else if (edge === 'right') {
          // Already passing, keep going
        } else if (edge === 'top' || edge === 'bottom') {
          p.vy *= -0.3
          p.y += edge === 'top' ? -3 : 3
        }
      }

      if (p.x > w + 50 || p.life > p.maxLife) {
        p.x = -20 - Math.random() * 100
        p.y = Math.random() * h
        p.life = 0
      }
    },
    draw(ctx, p) {
      if (p.type === 'streak') {
        const len = 30 + Math.random() * 40
        ctx.strokeStyle = `rgba(200, 210, 230, ${p.opacity})`
        ctx.lineWidth = 0.5
        ctx.beginPath()
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(p.x + len, p.y + (Math.random() - 0.5) * 2)
        ctx.stroke()
      } else {
        // Mist blob
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200, 210, 230, ${p.opacity * 0.3})`
        ctx.fill()
      }
    },
  },
}

export function WeatherCanvas({ element }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animRef = useRef<number>(0)
  const { shields } = useParticleShields()
  const shieldsRef = useRef<ShieldRect[]>([])

  // Keep shields ref up to date without re-initializing particles
  useEffect(() => {
    shieldsRef.current = shields
  }, [shields])

  const initParticles = useCallback((w: number, h: number) => {
    const config = PARTICLE_CONFIGS[element]
    const particles: Particle[] = []
    for (let i = 0; i < config.count; i++) {
      particles.push(config.create(w, h))
    }
    particlesRef.current = particles
  }, [element])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { willReadFrequently: false })
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles(canvas.width, canvas.height)
    }

    resize()
    window.addEventListener('resize', resize)

    function animate() {
      if (!canvas || !ctx) return
      const w = canvas.width
      const h = canvas.height
      const scrollY = window.scrollY

      ctx.clearRect(0, 0, w, h)

      const config = PARTICLE_CONFIGS[element]
      const currentShields = shieldsRef.current

      particlesRef.current.forEach((p) => {
        config.update(p, w, h, currentShields, scrollY)
        config.draw(ctx, p)
      })

      animRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [element, initParticles])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  )
}
