
'use client'
import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'

const education = [
  {
    degree: "B.Tech — Computer Science & Engineering",
    institution: "NIT Jalandhar (NITJ)",
    year: "2023 — Present",
    details: "Currently pursuing undergraduate degree in CSE.",
  },
  {
    degree: "Class XII",
    institution: "Your School Name",
    year: "2023",
    details: "Add your percentage / grade here.",
  },
  {
    degree: "Class X",
    institution: "Your School Name",
    year: "2021",
    details: "Add your percentage / grade here.",
  },
]

export default function Education() {
  return (
    <div className="min-h-screen px-12 py-16">
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-3xl font-bold text-white mb-10"
      >
        Education
      </motion.h1>
      <div className="flex flex-col gap-5">
        {education.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card p-6 flex gap-5"
          >
            <div className="mt-1 text-[#7dd3fc]">
              <GraduationCap size={20} />
            </div>
            <div>
              <h2 className="text-white font-semibold text-lg">{item.degree}</h2>
              <p className="text-[#7dd3fc] text-sm mt-0.5">{item.institution}</p>
              <p className="text-[#475569] text-xs mt-1">{item.year}</p>
              <p className="text-[#94a3b8] text-sm mt-2">{item.details}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
