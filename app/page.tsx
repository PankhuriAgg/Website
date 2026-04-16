'use client'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex flex-col items-center gap-8 text-center"
      >
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
          <h1 className="text-6xl font-black text-white mb-3 tracking-tight">
            Hi, I'm Pankhuri
          </h1>
          <p className="text-[#38bdf8] text-2xl font-semibold">
            Code.Build.Scale.
          </p>
        </div>

           </motion.div>
    </div>
  )
}
