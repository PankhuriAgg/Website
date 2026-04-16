
'use client'
import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (dot.current) {
        dot.current.style.left = e.clientX - 6 + 'px'
        dot.current.style.top = e.clientY - 6 + 'px'
      }
      if (ring.current) {
        ring.current.style.left = e.clientX - 18 + 'px'
        ring.current.style.top = e.clientY - 18 + 'px'
      }
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <>
      <div ref={dot} className="custom-cursor" />
      <div ref={ring} className="custom-cursor-ring" />
    </>
  )
}
