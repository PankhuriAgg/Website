import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Cursor from "@/components/Cursor";
import InteractiveBg from "@/components/InteractiveBg";

export const metadata: Metadata = {
  title: "Pankhuri — Portfolio",
  description: "Personal portfolio of Pankhuri",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#060912]">
        <Cursor />
        <InteractiveBg />
        <Sidebar />

        {/* Ambient orbs on top of canvas */}
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', width: 700, height: 700, borderRadius: '50%',
            top: '-20%', left: '5%',
            background: 'radial-gradient(circle, rgba(56,189,248,0.07) 0%, transparent 65%)',
            animation: 'pulse1 8s ease-in-out infinite',
          }} />
          <div style={{
            position: 'absolute', width: 600, height: 600, borderRadius: '50%',
            bottom: '5%', right: '0%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 65%)',
            animation: 'pulse2 10s ease-in-out infinite',
          }} />
          <div style={{
            position: 'absolute', width: 300, height: 300, borderRadius: '50%',
            top: '60%', left: '25%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 65%)',
            animation: 'pulse2 9s ease-in-out infinite 2s',
          }} />

          {/* Corner decorations */}
          <svg width="200" height="200" style={{ position: 'absolute', top: 0, left: 60, opacity: 0.07 }}>
            <path d="M 0 80 L 0 0 L 80 0" fill="none" stroke="#38bdf8" strokeWidth="1"/>
            <path d="M 0 40 L 0 0 L 40 0" fill="none" stroke="#38bdf8" strokeWidth="0.5"/>
          </svg>
          <svg width="200" height="200" style={{ position: 'absolute', bottom: 0, right: 0, opacity: 0.07 }}>
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
        `}</style>

        <main className="pl-24" style={{ position: 'relative', zIndex: 2 }}>
          {children}
        </main>
      </body>
    </html>
  )
}
