
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
    <aside className="fixed left-0 top-0 h-full w-56 bg-[#080d1a] border-r border-[#1e2d4a] flex flex-col py-10 px-4 z-50">
      <p className="text-[#7dd3fc] text-xs font-semibold tracking-widest uppercase mb-10 px-3">
        Portfolio
      </p>
      <nav className="flex flex-col gap-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${active ? 'tab-active' : 'tab-inactive'}`}
            >
              <Icon size={16} />
              {label}
            </Link>
          )
        })}
      </nav>
      <div className="mt-auto px-3">
        <p className="text-[#1e3a5f] text-xs">Pankhuri © 2025</p>
      </div>
    </aside>
  )
}
