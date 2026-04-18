'use client'
import { useEffect, useState } from 'react'
import { Home, GraduationCap, Briefcase, Zap, Mail } from 'lucide-react'

const sections = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'work', label: 'My Work', icon: Briefcase },
  { id: 'skills', label: 'Skills', icon: Zap },
  { id: 'contact', label: 'Contact', icon: Mail },
]

export default function Sidebar() {
  const [active, setActive] = useState('home')
  const [hovered, setHovered] = useState<string | null>(null)

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { threshold: 0.4 }
      )
      observer.observe(el)
      observers.push(observer)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <aside style={{
      position: 'fixed',
      left: 16,
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 50,
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      padding: '10px 8px',
      borderRadius: 20,
      background: 'rgba(6, 9, 18, 0.6)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(56, 189, 248, 0.15)',
      boxShadow: '0 0 0 1px rgba(56,189,248,0.05), 0 8px 32px rgba(0,0,0,0.4), 0 0 80px rgba(56,189,248,0.06)',
    }}>

      {/* Top glow line */}
      <div style={{
        position: 'absolute', top: 0, left: '15%', right: '15%', height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(56,189,248,0.6), transparent)',
        borderRadius: 1,
      }} />

      {sections.map(({ id, label, icon: Icon }) => {
        const isActive = active === id
        const isHovered = hovered === id

        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              position: 'relative',
              width: 44,
              height: 44,
              borderRadius: 12,
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'none',
              transition: 'all 0.2s ease',
              background: isActive
                ? 'rgba(56,189,248,0.18)'
                : isHovered
                ? 'rgba(56,189,248,0.1)'
                : 'transparent',
              color: isActive || isHovered ? '#38bdf8' : '#475569',
              boxShadow: isActive
                ? '0 0 20px rgba(56,189,248,0.35), inset 0 0 20px rgba(56,189,248,0.08), 0 0 0 1px rgba(56,189,248,0.3)'
                : isHovered
                ? '0 0 14px rgba(56,189,248,0.2), inset 0 0 14px rgba(56,189,248,0.05), 0 0 0 1px rgba(56,189,248,0.15)'
                : 'none',
            }}
          >
            {/* Backlit glow behind icon */}
            {(isActive || isHovered) && (
              <div style={{
                position: 'absolute', inset: 0, borderRadius: 12,
                background: 'radial-gradient(circle at center, rgba(56,189,248,0.2) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />
            )}

            {/* Active indicator dot */}
            {isActive && (
              <div style={{
                position: 'absolute', right: -3, top: '50%',
                transform: 'translateY(-50%)',
                width: 4, height: 4, borderRadius: '50%',
                background: '#38bdf8',
                boxShadow: '0 0 8px #38bdf8, 0 0 16px #38bdf8',
              }} />
            )}

            <Icon size={17} />

            {/* Tooltip */}
            <div style={{
              position: 'absolute',
              left: 56,
              top: '50%',
              transform: isHovered ? 'translateY(-50%) translateX(0)' : 'translateY(-50%) translateX(-6px)',
              background: 'rgba(8, 14, 28, 0.95)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(56,189,248,0.25)',
              color: '#e2e8f0',
              fontSize: 12,
              fontWeight: 600,
              padding: '5px 12px',
              borderRadius: 8,
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              opacity: isHovered ? 1 : 0,
              transition: 'all 0.18s ease',
              boxShadow: '0 0 20px rgba(56,189,248,0.1), 0 4px 20px rgba(0,0,0,0.5)',
              letterSpacing: '0.03em',
            }}>
              {label}
              {/* Tooltip arrow */}
              <div style={{
                position: 'absolute', right: '100%', top: '50%',
                transform: 'translateY(-50%)',
                width: 0, height: 0,
                borderTop: '4px solid transparent',
                borderBottom: '4px solid transparent',
                borderRight: '4px solid rgba(56,189,248,0.25)',
              }} />
            </div>
          </button>
        )
      })}

      {/* Bottom glow line */}
      <div style={{
        position: 'absolute', bottom: 0, left: '15%', right: '15%', height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(56,189,248,0.6), transparent)',
        borderRadius: 1,
      }} />

    </aside>
  )
}
