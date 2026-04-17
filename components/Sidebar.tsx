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

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
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
    <aside className="fixed left-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2 bg-[#0a1020] border border-[#1a2744] rounded-2xl p-2 shadow-[0_0_40px_rgba(0,0,0,0.6)]">
      {sections.map(({ id, label, icon: Icon }) => (
        <button key={id} onClick={() => scrollTo(id)} className="nav-item">
          <div className={`nav-icon ${active === id ? 'active' : ''}`}>
            <Icon size={18} />
          </div>
          <span className="tooltip">{label}</span>
        </button>
      ))}
    </aside>
  )
}
