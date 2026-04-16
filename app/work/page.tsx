
'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const projects = [
  {
    title: "Project One",
    tag: "Website Development",
    summary: "A collection of modern web applications and software solutions built with a focus on performance, scalability, and clean code.",
    description: "This portfolio showcases my work as a software developer, highlighting a range of full-stack projects built with modern frameworks like Next.js, Vercel, and Supabase. My approach centers on writing maintainable, efficient code and building intuitive user interfaces that solve real-world problems. From front-end aesthetics to robust back-end logic, each project represents a step forward in my journey to create impactful digital experiences.",
    tech: ["Next.js", "Vercel", "Supabase"],
    link: "https://github.com/PankhuriAgg/Website",
  },
  {
    title: "Project Two",
    tag: "Sudoku Verifier",
    summary:" A high-performance C program designed to validate 9x9 Sudoku grids by ensuring every row, column, and 3x3 subgrid adheres to standard puzzle rules.",
    description: "This project implements a robust Sudoku validation engine using the C programming language. The program processes a 9×9 matrix to verify the three core constraints of the game: that each number from 1 to 9 appears exactly once in every row, every column, and each of the nine independent 3x3 subgrids. By utilizing nested loops and frequency arrays (bitmasks), the verifier efficiently identifies rule violations, demonstrating a deep understanding of array manipulation and algorithmic logic in a low-level memory environment.",
    tech: ["c", "Arrays", "Subgroup Mapping"],
    link: "https://github.com/PankhuriAgg/Sudoku-Verifier",
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
