'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, GraduationCap, Briefcase, Zap, Mail } from 'lucide-react'

const links = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/education', label: 'Education', icon: GraduationCap },
  { href: '/work', label: 'My Work', icon: Briefcase },
  { href: '/skills', label: 'Skills', icon: Zap },
  { href: '/contact', label: 'Contact', icon: Mail },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2 bg-[#0a1020] border border-[#1a2744] rounded-2xl p-2 shadow-[0_0_40px_rgba(0,0,0,0.6)]">
      {links.map(({ href, label, icon: Icon }) => {
        const active = pathname === href
        return (
          <Link key={href} href={href} className="nav-item">
            <div className={`nav-icon ${active ? 'active' : ''}`}>
              <Icon size={18} />
            </div>
            <span className="tooltip">{label}</span>
          </Link>
        )
      })}
    </aside>
  )
}
