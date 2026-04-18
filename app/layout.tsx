import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Cursor from "@/components/Cursor";

export const metadata: Metadata = {
  title: "Pankhuri — Portfolio",
  description: "Personal portfolio of Pankhuri",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#060912]">
        <Cursor />
        <Sidebar />

        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>

          {/* Grid */}
          <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.08 }}>
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#38bdf8" strokeWidth="0.5"/>
              </pattern>
              <pattern id="grid-large" width="240" height="240" patternUnits="userSpaceOnUse">
                <path d="M 240 0 L 0 0 0 240" fill="none" stroke="#38bdf8" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <rect width="100%" height="100%" fill="url(#grid-large)" />
          </svg>

          {/* Dots at intersections */}
          <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.15 }}>
            <defs>
              <pattern id="dots" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="0" cy="0" r="1.2" fill="#38bdf8"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>

          {/* Orbs */}
          <div style={{
            position: 'absolute', width: 700, height: 700, borderRadius: '50%',
            top: '-20%', left: '5%',
            background: 'radial-gradient(circle, rgba(56,189,248,0.1) 0%, transparent 65%)',
            animation: 'pulse1 8s ease-in-out infinite',
          }} />
          <div style={{
            position: 'absolute', width: 600, height: 600, borderRadius: '50%',
            bottom: '5%', right: '0%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 65%)',
            animation: 'pulse2 10s ease-in-out infinite',
          }} />
          <div style={{
            position: 'absolute', width: 400, height: 400, borderRadius: '50%',
            top: '35%', right: '15%',
            background: 'radial-gradient(circle, rgba(56,189,248,0.07) 0%, transparent 65%)',
            animation: 'pulse1 13s ease-in-out infinite reverse',
          }} />
          <div style={{
            position: 'absolute', width: 300, height: 300, borderRadius: '50%',
            top: '60%', left: '25%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 65%)',
            animation: 'pulse2 9s ease-in-out infinite 2s',
          }} />

          {/* Floating particles */}
          {[
            { left: '10%', top: '20%', size: 2, dur: '6s', delay: '0s' },
            { left: '25%', top: '60%', size: 1.5, dur: '8s', delay: '1s' },
            { left: '50%', top: '15%', size: 2.5, dur: '7s', delay: '2s' },
            { left: '70%', top: '45%', size: 1.5, dur: '9s', delay: '0.5s' },
            { left: '85%', top: '25%', size: 2, dur: '6s', delay: '3s' },
            { left: '40%', top: '75%', size: 1, dur: '10s', delay: '1.5s' },
            { left: '60%', top: '80%', size: 2, dur: '7s', delay: '4s' },
            { left: '15%', top: '85%', size: 1.5, dur: '8s', delay: '2.5s' },
          ].map((p, i) => (
            <div key={i} style={{
              position: 'absolute', left: p.left, top: p.top,
              width: p.size, height: p.size, borderRadius: '50%',
              background: '#38bdf8',
              boxShadow: `0 0 ${p.size * 4}px #38bdf8`,
              animation: `float ${p.dur} ease-in-out infinite ${p.delay}`,
              opacity: 0.6,
            }} />
          ))}

          {/* Corner decorations */}
          <svg width="200" height="200" style={{ position: 'absolute', top: 0, left: 60, opacity: 0.08 }}>
            <path d="M 0 80 L 0 0 L 80 0" fill="none" stroke="#38bdf8" strokeWidth="1"/>
            <path d="M 0 40 L 0 0 L 40 0" fill="none" stroke="#38bdf8" strokeWidth="0.5"/>
          </svg>
          <svg width="200" height="200" style={{ position: 'absolute', bottom: 0, right: 0, opacity: 0.08 }}>
            <path d="M 200 120 L 200 200 L 120 200" fill="none" stroke="#38bdf8" strokeWidth="1"/>
            <path d="M 200 160 L 200 200 L 160 200" fill="none" stroke="#38bdf8" strokeWidth="0.5"/>
          </svg>

        </div>

        <style>{`
          @keyframes pulse1 {
            0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.7; }
            50% { transform: scale(1.12) translate(20px, -20px); opacity: 1; }
          }
          @keyframes pulse2 {
            0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.6; }
            50% { transform: scale(1.15) translate(-20px, 15px); opacity: 1; }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); opacity: 0.6; }
            50% { transform: translateY(-20px); opacity: 1; }
          }
        `}</style>

        <main className="pl-24" style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </main>
      </body>
    </html>
  )
}
