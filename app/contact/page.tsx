'use client'
import { motion } from 'framer-motion'
import { Mail, GitBranch, Link} from 'lucide-react'

const contacts = [
  {
    label: "Email",
    value: "pankhuriaggarwal467@gmail.com",
    href: "mailto:pankhuriaggarwal467@gmail.com",
    icon: Mail,
  },
  {
    label: "GitHub",
    value: "github.com/PankhuriAgg",
    href: "https://github.com/PankhuriAgg",
    icon: GitBranch,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/pankhuri-aggarwal",
    href: "https://www.linkedin.com/in/pankhuri-aggarwal-8a1538383?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    icon: Link,
  },
]

export default function Contact() {
  return (
    <div className="min-h-screen px-12 py-16">
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-3xl font-bold text-white mb-10"
      >
        Contact
      </motion.h1>
      <div className="flex flex-col gap-4 max-w-md">
        {contacts.map((c, i) => (
          <motion.a
            key={i}
            href={c.href}
            // Added rel for security when using target="_blank"
            target="_blank"
            rel="noopener noreferrer" 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            // Replaced 'card' with explicit Tailwind classes for reliability
            className="bg-[#0e1a30] border border-[#1e3a5f] p-5 flex items-center gap-5 hover:border-[#7dd3fc] transition-all group rounded-xl"
          >
            <div className="text-[#7dd3fc] group-hover:scale-110 transition-transform">
              <c.icon size={22} />
            </div>
            <div>
              <p className="text-[#475569] text-xs uppercase tracking-wide">{c.label}</p>
              <p className="text-white text-sm mt-0.5">{c.value}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  )
}
