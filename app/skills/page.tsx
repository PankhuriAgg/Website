
'use client'
import { motion } from 'framer-motion'

const skills = [
  {
    category: "Languages",
    items: ["Python", "C"],
  },
  {
    category: "Web",
    items: ["Next.js", "HTML/CSS"],
  },
  {
    category: "Tools & Platforms",
    items: ["Git", "GitHub", "Vercel", "Supabase", "Linux"],
  },
  {
    category: "Currently Learning",
    items: ["Machine Learning", "Website Building"],
  },
]

export default function Skills() {
  return (
    <div className="min-h-screen px-12 py-16">
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-3xl font-bold text-white mb-10"
      >
        Skills
      </motion.h1>
      <div className="flex flex-col gap-8">
        {skills.map((group, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <h2 className="text-[#7dd3fc] text-sm font-semibold tracking-widest uppercase mb-3">{group.category}</h2>
            <div className="flex flex-wrap gap-3">
              {group.items.map(skill => (
                <span
                  key={skill}
                  className="card px-4 py-2 text-sm text-white hover:border-[#7dd3fc] transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
