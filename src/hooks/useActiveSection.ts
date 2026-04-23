import { useState, useEffect } from 'react'

export function useActiveSection(sectionIds: string[], threshold: number = 0.5) {
  const [activeId, setActiveId] = useState<string>(sectionIds[0])

  useEffect(() => {
    const observers = new Map<string, IntersectionObserver>()

    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (!element) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(id)
            }
          })
        },
        { threshold }
      )

      observer.observe(element)
      observers.set(id, observer)
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [sectionIds, threshold])

  return activeId
}
