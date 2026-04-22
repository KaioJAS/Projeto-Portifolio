import { useEffect, useRef, useCallback, useId } from 'react'
import { useParticleShields } from './ParticleShieldContext'

interface Props {
  children: React.ReactNode
  className?: string
}

export function GlassShield({ children, className = '' }: Props) {
  const id = useId()
  const ref = useRef<HTMLDivElement>(null)
  const { registerShield, unregisterShield } = useParticleShields()

  const updateRect = useCallback(() => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    registerShield({
      id,
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY,
      width: rect.width,
      height: rect.height,
      radius: 24,
    })
  }, [id, registerShield])

  useEffect(() => {
    updateRect()

    const observer = new ResizeObserver(updateRect)
    if (ref.current) observer.observe(ref.current)

    window.addEventListener('scroll', updateRect, { passive: true })
    window.addEventListener('resize', updateRect, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', updateRect)
      window.removeEventListener('resize', updateRect)
      unregisterShield(id)
    }
  }, [id, updateRect, unregisterShield])

  return (
    <div ref={ref} className={`glass-shield ${className}`}>
      {children}
    </div>
  )
}
