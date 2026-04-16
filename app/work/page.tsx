
'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const projects = [
  {
    title: "Project One",
    tag: "Web Development",
    summary: "A short one-line description of this project.",
    description: "Write a detailed description of this project here. What did you build, what tech did you use, what problem did it solve? This appears when someone clicks on the card.",
    tech: ["Next.js", "Tailwind", "Supabase"],
    link: "https://github.com/PankhuriAgg",
  },
  {
    title: "Project Two",
    tag: "Machine Learning",
    summary: "A short one-line description of this project.",
    description: "Write a detailed description of project two here. Explain the goal, your approach, and the outcome.",
    tech: ["Python", "TensorFlow", "Pandas"],
    link: "https://github.com/PankhuriAgg",
  },
  {
    title: "Project Three",
    tag: "App Development",
    summary: "A short one-line description of this project.",
    description: "Write a detailed description of project three here.",
    tech: ["React Native", "Firebase"],
    link: "https://github.com/PankhuriAgg",
  },
  {
    title: "Project Four",
    tag: "Open Source",
    summary: "A short one-line description of this project.",
    description: "Write a detailed description of project four here.",
    tech: ["TypeScript", "Node.js"],
    link: "https://github.com/PankhuriAgg",
  },
]

export default function Work() {
  const [selected, setSelected] = useState<typeof projects[0] | null>(null)

  return (
    <div className="min-h-screen px-12 py-16">
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-3xl font-bold text-white mb-10"
      >
        My Work
      </motion.h1>

      <div className="grid grid-cols-2 gap-5">
        {projects.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setSelected(p)}
            className="card work-card p-6 cursor-pointer"
          >
            <span className="text-xs text-[#7dd3fc] font-medium tracking-wide uppercase">{p.tag}</span>
            <h2 className="text-white font-semibold text-lg mt-2">{p.title}</h2>
            <p className="text-[#64748b] text-sm mt-1">{p.summary}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {p.tech.map(t => (
                <span key={t} className="text-xs bg-[#0e1a30] border border-[#1e3a5f] text-[#7dd3fc] px-2 py-0.5 rounded-full">{t}</span>
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
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-[#475569] hover:text-white"
              >
                <X size={18} />
              </button>
              <span className="text-xs text-[#7dd3fc] font-medium tracking-wide uppercase">{selected.tag}</span>
              <h2 className="text-white font-bold text-2xl mt-2 mb-4">{selected.title}</h2>
              <p className="text-[#94a3b8] text-sm leading-relaxed">{selected.description}</p>
              <div className="flex flex-wrap gap-2 mt-5">
                {selected.tech.map(t => (
                  <span key={t} className="text-xs bg-[#0e1a30] border border-[#1e3a5f] text-[#7dd3fc] px-2 py-0.5 rounded-full">{t}</span>
                ))}
              </div>
              <a
                href={selected.link}
                target="_blank"
                rel="noopener noreferrer" 
                className="inline-block mt-6 text-sm text-[#7dd3fc] border border-[#1e3a5f] px-4 py-2 rounded-lg hover:bg-[#0e1a30] transition"
              >
                View on GitHub →
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
