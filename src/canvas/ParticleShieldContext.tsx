import { createContext, useContext, useCallback, useRef, useState } from 'react'

export interface ShieldRect {
  id: string
  x: number
  y: number
  width: number
  height: number
  radius: number
}

interface ParticleShieldContextType {
  shields: ShieldRect[]
  registerShield: (rect: ShieldRect) => void
  unregisterShield: (id: string) => void
  updateShield: (id: string, rect: Partial<ShieldRect>) => void
}

const ParticleShieldContext = createContext<ParticleShieldContextType>({
  shields: [],
  registerShield: () => {},
  unregisterShield: () => {},
  updateShield: () => {},
})

export function useParticleShields() {
  return useContext(ParticleShieldContext)
}

export function ParticleShieldProvider({ children }: { children: React.ReactNode }) {
  const [shields, setShields] = useState<ShieldRect[]>([])
  const shieldsRef = useRef<ShieldRect[]>([])

  const registerShield = useCallback((rect: ShieldRect) => {
    shieldsRef.current = [...shieldsRef.current.filter((s) => s.id !== rect.id), rect]
    setShields([...shieldsRef.current])
  }, [])

  const unregisterShield = useCallback((id: string) => {
    shieldsRef.current = shieldsRef.current.filter((s) => s.id !== id)
    setShields([...shieldsRef.current])
  }, [])

  const updateShield = useCallback((id: string, partial: Partial<ShieldRect>) => {
    shieldsRef.current = shieldsRef.current.map((s) =>
      s.id === id ? { ...s, ...partial } : s,
    )
    setShields([...shieldsRef.current])
  }, [])

  return (
    <ParticleShieldContext.Provider value={{ shields, registerShield, unregisterShield, updateShield }}>
      {children}
    </ParticleShieldContext.Provider>
  )
}
