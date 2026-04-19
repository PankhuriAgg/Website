'use client'
import { useEffect, useRef } from 'react'

export default function InteractiveBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -999, y: -999 })
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const SPACING = 60
    const INFLUENCE = 120
    const PULL = 18

    let cols: number, rows: number
    let points: { ox: number; oy: number; x: number; y: number; vx: number; vy: number }[] = []

    // Stars
    let stars: { x: number; y: number; r: number; alpha: number; twinkleSpeed: number; twinkleOffset: number }[] = []

    // Shooting stars
    let shootingStars: { x: number; y: number; vx: number; vy: number; len: number; alpha: number; life: number; maxLife: number }[] = []

    // Floating coffee steam particles
    let steam: { x: number; y: number; vy: number; vx: number; alpha: number; r: number; life: number; maxLife: number }[] = []

    // Nebula clouds (static blobs drawn with canvas)
    let nebulas: { x: number; y: number; rx: number; ry: number; color: string; alpha: number; rot: number; rotSpeed: number }[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      cols = Math.ceil(canvas.width / SPACING) + 2
      rows = Math.ceil(canvas.height / SPACING) + 2
      points = []
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          points.push({ ox: c * SPACING, oy: r * SPACING, x: c * SPACING, y: r * SPACING, vx: 0, vy: 0 })
        }
      }

      // Generate stars
      stars = Array.from({ length: 180 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.3,
        alpha: Math.random() * 0.7 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
      }))

      // Generate nebulas
      nebulas = [
        { x: canvas.width * 0.15, y: canvas.height * 0.25, rx: 220, ry: 140, color: '56,189,248', alpha: 0.025, rot: 0, rotSpeed: 0.0002 },
        { x: canvas.width * 0.8, y: canvas.height * 0.6, rx: 260, ry: 160, color: '139,92,246', alpha: 0.03, rot: 0.5, rotSpeed: 0.00015 },
        { x: canvas.width * 0.5, y: canvas.height * 0.85, rx: 200, ry: 120, color: '99,102,241', alpha: 0.02, rot: 1.2, rotSpeed: 0.0003 },
        { x: canvas.width * 0.7, y: canvas.height * 0.1, rx: 180, ry: 100, color: '56,189,248', alpha: 0.02, rot: 0.3, rotSpeed: 0.00025 },
      ]
    }

    const spawnShootingStar = () => {
      const angle = Math.random() * 0.4 + 0.1
      const speed = Math.random() * 6 + 4
      shootingStars.push({
        x: Math.random() * canvas.width * 0.7,
        y: Math.random() * canvas.height * 0.4,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        len: Math.random() * 80 + 40,
        alpha: 1,
        life: 0,
        maxLife: Math.random() * 40 + 30,
      })
    }

    const spawnSteam = () => {
      steam.push({
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -(Math.random() * 0.6 + 0.3),
        alpha: Math.random() * 0.12 + 0.04,
        r: Math.random() * 40 + 20,
        life: 0,
        maxLife: Math.random() * 200 + 150,
      })
    }

    // Spawn shooting stars periodically
    let shootingStarTimer = 0
    let steamTimer = 0

    const onMouseMove = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY } }
    const onMouseLeave = () => { mouse.current = { x: -999, y: -999 } }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const mx = mouse.current.x
      const my = mouse.current.y
      const time = Date.now() * 0.001

      // --- NEBULAS ---
      for (const n of nebulas) {
        n.rot += n.rotSpeed
        ctx.save()
        ctx.translate(n.x, n.y)
        ctx.rotate(n.rot)
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, n.rx)
        grad.addColorStop(0, `rgba(${n.color},${n.alpha * 2})`)
        grad.addColorStop(0.5, `rgba(${n.color},${n.alpha})`)
        grad.addColorStop(1, `rgba(${n.color},0)`)
        ctx.scale(1, n.ry / n.rx)
        ctx.beginPath()
        ctx.arc(0, 0, n.rx, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
        ctx.restore()
      }

      // --- STARS ---
      for (const s of stars) {
        const twinkle = 0.5 + 0.5 * Math.sin(time * s.twinkleSpeed * 60 + s.twinkleOffset)
        const alpha = s.alpha * (0.4 + 0.6 * twinkle)
        const radius = s.r * (0.8 + 0.2 * twinkle)

        ctx.beginPath()
        ctx.arc(s.x, s.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${alpha})`
        ctx.shadowBlur = twinkle > 0.85 ? 6 : 0
        ctx.shadowColor = '#38bdf8'
        ctx.fill()
        ctx.shadowBlur = 0

        // Draw 4-pointed star shape for bigger stars
        if (s.r > 1.1 && twinkle > 0.7) {
          const spike = s.r * 2.5 * twinkle
          ctx.save()
          ctx.translate(s.x, s.y)
          ctx.strokeStyle = `rgba(180,220,255,${alpha * 0.5})`
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(-spike, 0); ctx.lineTo(spike, 0)
          ctx.moveTo(0, -spike); ctx.lineTo(0, spike)
          ctx.stroke()
          ctx.restore()
        }
      }

      // --- SHOOTING STARS ---
      shootingStarTimer++
      if (shootingStarTimer > 180 + Math.random() * 200) {
        spawnShootingStar()
        shootingStarTimer = 0
      }

      shootingStars = shootingStars.filter(s => s.life < s.maxLife)
      for (const s of shootingStars) {
        s.life++
        s.x += s.vx
        s.y += s.vy
        s.alpha = 1 - s.life / s.maxLife

        const grad = ctx.createLinearGradient(
          s.x - s.vx * (s.len / 6), s.y - s.vy * (s.len / 6),
          s.x, s.y
        )
        grad.addColorStop(0, `rgba(255,255,255,0)`)
        grad.addColorStop(1, `rgba(180,230,255,${s.alpha * 0.9})`)

        ctx.beginPath()
        ctx.moveTo(s.x - s.vx * (s.len / 6), s.y - s.vy * (s.len / 6))
        ctx.lineTo(s.x, s.y)
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.5
        ctx.stroke()

        // Glow dot at head
        ctx.beginPath()
        ctx.arc(s.x, s.y, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${s.alpha})`
        ctx.fill()
      }

      // --- STEAM / COSMIC DUST ---
      steamTimer++
      if (steamTimer > 8) {
        spawnSteam()
        steamTimer = 0
      }

      steam = steam.filter(s => s.life < s.maxLife)
      for (const s of steam) {
        s.life++
        s.x += s.vx
        s.y += s.vy
        s.vx += (Math.random() - 0.5) * 0.05
        const lifeRatio = s.life / s.maxLife
        const alpha = s.alpha * Math.sin(lifeRatio * Math.PI)

        const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r)
        grad.addColorStop(0, `rgba(56,189,248,${alpha})`)
        grad.addColorStop(1, `rgba(56,189,248,0)`)
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
      }

      // --- INTERACTIVE GRID ---
      for (const p of points) {
        const dx = mx - p.ox
        const dy = my - p.oy
        const dist = Math.sqrt(dx * dx + dy * dy)

        let tx = p.ox, ty = p.oy
        if (dist < INFLUENCE) {
          const force = 1 - dist / INFLUENCE
          tx = p.ox + dx * force * (PULL / INFLUENCE) * 2.5
          ty = p.oy + dy * force * (PULL / INFLUENCE) * 2.5
        }

        p.vx += (tx - p.x) * 0.12
        p.vy += (ty - p.y) * 0.12
        p.vx *= 0.72
        p.vy *= 0.72
        p.x += p.vx
        p.y += p.vy
      }

      // Horizontal lines
      for (let r = 0; r < rows; r++) {
        ctx.beginPath()
        for (let c = 0; c < cols; c++) {
          const p = points[r * cols + c]
          if (c === 0) ctx.moveTo(p.x, p.y)
          else ctx.lineTo(p.x, p.y)
        }
        ctx.strokeStyle = 'rgba(56,189,248,0.09)'
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      // Vertical lines
      for (let c = 0; c < cols; c++) {
        ctx.beginPath()
        for (let r = 0; r < rows; r++) {
          const p = points[r * cols + c]
          if (r === 0) ctx.moveTo(p.x, p.y)
          else ctx.lineTo(p.x, p.y)
        }
        ctx.strokeStyle = 'rgba(56,189,248,0.09)'
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      // Grid dots
      for (const p of points) {
        const dx = mx - p.x
        const dy = my - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const glow = Math.max(0, 1 - dist / INFLUENCE)

        if (glow > 0) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, 1.2 + glow * 3, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(56,189,248,${0.2 + glow * 0.8})`
          ctx.shadowBlur = glow * 20
          ctx.shadowColor = '#38bdf8'
          ctx.fill()
          ctx.shadowBlur = 0
        } else {
          ctx.beginPath()
          ctx.arc(p.x, p.y, 1, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(56,189,248,0.1)'
          ctx.fill()
        }
      }

      // Ripple around cursor
      if (mx > 0) {
        const rippleR = 60 + Math.sin(time * 2) * 10
        ctx.beginPath()
        ctx.arc(mx, my, rippleR, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(56,189,248,0.07)'
        ctx.lineWidth = 1
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(mx, my, rippleR * 0.55, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(56,189,248,0.05)'
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      animRef.current = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)
    draw()

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  )
}
