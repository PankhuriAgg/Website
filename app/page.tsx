'use client'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="flex flex-col items-center gap-6 text-center"
      >
        <div className="w-40 h-40 rounded-full border-2 border-[#7dd3fc] overflow-hidden bg-[#0e1a30] flex items-center justify-center">
          {/* Replace /me.jpg with your actual photo placed in the /public folder */}
          <img src="/me.jpg" alt="Pankhuri" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
          <span className="text-4xl absolute">👤</span>
        </div>
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Hi, I'm Pankhuri</h1>
          <p className="text-[#7dd3fc] text-lg">Currently a student at NITJ, CSE</p>
        </div>
        <p className="text-[#64748b] text-sm max-w-sm">
          Welcome to my portfolio. Explore my work, skills and education.
        </p>
      </motion.div>
    </div>
  )
}
