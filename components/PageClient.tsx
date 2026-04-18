
'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GraduationCap, X, GitBranch, Link, Mail } from 'lucide-react'

const iconMap: Record<string, any> = {
  mail: Mail,
  'git-branch': GitBranch,
  link: Link,
}

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
})

export default function PageClient({ education, projects, skills, contacts }: {
  education: any[]
  projects: any[]
  skills: any[]
  contacts: any[]
}) {
  const [selected, setSelected] = useState<any | null>(null)

  return (
    <div className="min-h-screen">

      {/* HOME */}
      <section id="home" className="min-h-screen flex flex-col items-center justify-center px-8 text-center pt-10">
        <motion.div {...fade()} className="flex flex-col items-center gap-8">
          <div className="relative">
            <div className="w-44 h-44 rounded-full border-2 border-[#38bdf8] overflow-hidden bg-[#0c1528] flex items-center justify-center shadow-[0_0_40px_rgba(56,189,248,0.2)]">
              <img
                src="/me.jpg"
                alt="Pankhuri"
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-[#060912] shadow-[0_0_10px_#4ade80]" />
          </div>
          <div>
            <h1 className="text-6xl font-black text-white mb-3 tracking-tight">Hi, I'm Pankhuri</h1>
            <p className="text-[#38bdf8] text-2xl font-semibold">Currently a student at NITJ, CSE</p>
          </div>
          <p className="text-[#4a5a7a] text-lg max-w-md font-medium">
            Welcome to my portfolio. Scroll down or use the sidebar to explore.
          </p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="text-[#1e3a5f] text-2xl mt-4"
          >
            ↓
          </motion.div>
        </motion.div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="min-h-screen flex flex-col justify-center px-16 py-10">
        <motion.h2 {...fade()} className="text-4xl font-black text-white mb-8">Education</motion.h2>
        <div className="flex flex-col gap-5 max-w-2xl">
          {education.map((item, i) => (
            <motion.div key={item.id} {...fade(i * 0.1)} className="card p-6 flex gap-5">
              <div className="mt-1 text-[#38bdf8]"><GraduationCap size={20} /></div>
              <div>
                <h3 className="text-white font-bold text-xl">{item.degree}</h3>
                <p className="text-[#38bdf8] text-base mt-1 font-semibold">{item.institution}</p>
                <p className="text-[#475569] text-sm mt-1">{item.year}</p>
                <p className="text-[#94a3b8] text-base mt-2">{item.details}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="min-h-screen flex flex-col justify-center px-16 py-10">
        <motion.h2 {...fade()} className="text-4xl font-black text-white mb-8">My Work</motion.h2>
        <div className="grid grid-cols-2 gap-5 max-w-2xl">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              {...fade(i * 0.1)}
              onClick={() => setSelected(p)}
              className="card work-card p-6 cursor-pointer"
            >
              <span className="text-xs text-[#38bdf8] font-bold tracking-widest uppercase">{p.tag}</span>
              <h3 className="text-white font-bold text-xl mt-2">{p.title}</h3>
              <p className="text-[#64748b] text-base mt-1">{p.summary}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {(p.tech || []).map((t: string) => (
                  <span key={t} className="text-xs bg-[#0e1a30] border border-[#1e3a5f] text-[#38bdf8] px-2 py-0.5 rounded-full">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-8"
              onClick={() => setSelected(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={e => e.stopPropagation()}
                className="card p-8 max-w-lg w-full relative"
              >
                <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-[#475569] hover:text-white">
                  <X size={18} />
                </button>
                <span className="text-xs text-[#38bdf8] font-bold tracking-widest uppercase">{selected.tag}</span>
                <h3 className="text-white font-black text-2xl mt-2 mb-4">{selected.title}</h3>
                <p className="text-[#94a3b8] text-base leading-relaxed">{selected.description}</p>
                <div className="flex flex-wrap gap-2 mt-5">
                  {(selected.tech || []).map((t: string) => (
                    <span key={t} className="text-xs bg-[#0e1a30] border border-[#1e3a5f] text-[#38bdf8] px-2 py-0.5 rounded-full">{t}</span>
                  ))}
                </div>
                <a href={selected.link} target="_blank" className="inline-block mt-6 text-sm text-[#38bdf8] border border-[#1e3a5f] px-4 py-2 rounded-lg hover:bg-[#0e1a30] transition">
                  View on GitHub →
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SKILLS */}
      <section id="skills" className="min-h-screen flex flex-col justify-center px-16 py-10">
        <motion.h2 {...fade()} className="text-4xl font-black text-white mb-8">Skills</motion.h2>
        <div className="flex flex-col gap-10 max-w-2xl">
          {skills.map((group, i) => (
            <motion.div key={group.id} {...fade(i * 0.1)}>
              <h3 className="text-[#38bdf8] text-sm font-bold tracking-widest uppercase mb-4">{group.category}</h3>
              <div className="flex flex-wrap gap-3">
                {(group.items || []).map((skill: string) => (
                  <span key={skill} className="card px-5 py-2 text-base text-white font-semibold hover:border-[#38bdf8] transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="min-h-screen flex flex-col justify-center px-16 py-10">
        <motion.h2 {...fade()} className="text-4xl font-black text-white mb-8">Contact</motion.h2>
        <div className="flex flex-col gap-4 max-w-md">
          {contacts.map((c, i) => {
            const Icon = iconMap[c.icon_name] || Mail
            return (
              <motion.a
                key={c.id}
                href={c.href}
                target="_blank"
                {...fade(i * 0.1)}
                className="card p-5 flex items-center gap-5 hover:border-[#38bdf8] transition-all group"
              >
                <div className="text-[#38bdf8] group-hover:scale-110 transition-transform">
                  <Icon size={22} />
                </div>
                <div>
                  <p className="text-[#475569] text-xs uppercase tracking-widest font-bold">{c.label}</p>
                  <p className="text-white text-base font-semibold mt-0.5">{c.value}</p>
                </div>
              </motion.a>
            )
          })}
        </div>
      </section>

    </div>
  )
}
