'use client'
import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const trail = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let trailX = 0, trailY = 0
    let dotX = 0, dotY = 0

    const move = (e: MouseEvent) => {
      dotX = e.clientX
      dotY = e.clientY
      if (dot.current) {
        dot.current.style.left = e.clientX - 5 + 'px'
        dot.current.style.top = e.clientY - 5 + 'px'
      }
      if (ring.current) {
        ring.current.style.left = e.clientX - 19 + 'px'
        ring.current.style.top = e.clientY - 19 + 'px'
      }
    }

    const animateTrail = () => {
      trailX += (dotX - trailX) * 0.18
      trailY += (dotY - trailY) * 0.18
      if (trail.current) {
        trail.current.style.left = trailX - 2.5 + 'px'
        trail.current.style.top = trailY - 2.5 + 'px'
      }
      requestAnimationFrame(animateTrail)
    }

    const grow = () => {
      if (dot.current) dot.current.style.transform = 'scale(2.5)'
      if (ring.current) ring.current.style.transform = 'scale(1.4)'
    }

    const shrink = () => {
      if (dot.current) dot.current.style.transform = 'scale(1)'
      if (ring.current) ring.current.style.transform = 'scale(1)'
    }

    window.addEventListener('mousemove', move)
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', grow)
      el.addEventListener('mouseleave', shrink)
    })

    animateTrail()

    return () => {
      window.removeEventListener('mousemove', move)
    }
  }, [])

  return (
    <>
      <div ref={dot} className="custom-cursor" />
      <div ref={ring} className="custom-cursor-ring" />
      <div ref={trail} className="custom-cursor-trail" />
    </>
  )
}
