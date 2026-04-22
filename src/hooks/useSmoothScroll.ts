import { useEffect, useRef } from 'react'

export function useSmoothScroll() {
  const lenisRef = useRef<any>(null)

  useEffect(() => {
    let lenis: any
    let rafId: number

    async function init() {
      const { default: Lenis } = await import('lenis')

      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 2,
      })

      lenisRef.current = lenis

      function raf(time: number) {
        lenis.raf(time)
        rafId = requestAnimationFrame(raf)
      }

      rafId = requestAnimationFrame(raf)
    }

    init()

    return () => {
      if (lenis) lenis.destroy()
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return lenisRef
}
