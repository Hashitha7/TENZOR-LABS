'use client'
import { useEffect, useRef, Suspense, lazy, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const ThreeScene = lazy(() => import('./3d/ThreeScene'))

function ParticleDots() {
  const containerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const particles: HTMLDivElement[] = []
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div')
      const size = Math.random() * 4 + 1
      p.className = 'particle'
      p.style.cssText = `
        width: ${size}px; height: ${size}px;
        left: ${Math.random() * 100}%;
        animation-duration: ${Math.random() * 15 + 8}s;
        animation-delay: ${Math.random() * 10}s;
        opacity: ${Math.random() * 0.6 + 0.2};
      `
      container.appendChild(p)
      particles.push(p)
    }
    return () => particles.forEach(p => p.remove())
  }, [])
  return <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none" />
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  // Raw mouse values
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  // ✅ Spring config — snappy but smooth
  // Higher stiffness = faster response | Higher damping = less bounce
  const springCfg = { stiffness: 120, damping: 28, mass: 0.6 }
  const smoothX = useSpring(rawX, springCfg)
  const smoothY = useSpring(rawY, springCfg)

  // ✅ ALL useTransform calls declared at TOP LEVEL — no hooks in JSX
  // Layer 0: 3D Canvas (deepest layer, moves most)
  const canvasX = useTransform(smoothX, [-1, 1], [-18, 18])
  const canvasY = useTransform(smoothY, [-1, 1], [-12, 12])

  // Layer 1: Background glows (deep, slow)
  const glow1X = useTransform(smoothX, [-1, 1], [-35, 35])
  const glow1Y = useTransform(smoothY, [-1, 1], [-25, 25])
  const glow2X = useTransform(smoothX, [-1, 1], [22, -22])
  const glow2Y = useTransform(smoothY, [-1, 1], [18, -18])

  // Layer 2: Content block (medium)
  const contentX = useTransform(smoothX, [-1, 1], [-10, 10])
  const contentY = useTransform(smoothY, [-1, 1], [-7, 7])

  // Layer 3: Title (closest, most pronounced)
  const titleX = useTransform(smoothX, [-1, 1], [-5, 5])
  const titleY = useTransform(smoothY, [-1, 1], [-3, 3])

  const onMouseMove = useCallback((e: MouseEvent) => {
    const section = sectionRef.current
    if (!section) return
    const rect = section.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    rawX.set((e.clientX - cx) / (rect.width / 2))
    rawY.set((e.clientY - cy) / (rect.height / 2))
  }, [rawX, rawY])

  const onMouseLeave = useCallback(() => {
    rawX.set(0)
    rawY.set(0)
  }, [rawX, rawY])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    section.addEventListener('mousemove', onMouseMove)
    section.addEventListener('mouseleave', onMouseLeave)
    return () => {
      section.removeEventListener('mousemove', onMouseMove)
      section.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [onMouseMove, onMouseLeave])

  const scrollToServices = () => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
  const scrollToContact  = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg scanlines"
    >
      {/* Background glows — parallax layer 1 */}
      <motion.div
        style={{ x: glow1X, y: glow1Y }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-blue-600/8 blur-[130px] pointer-events-none"
      />
      <motion.div
        style={{ x: glow2X, y: glow2Y }}
        className="absolute top-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-cyan-500/6 blur-[80px] pointer-events-none"
      />
      <div className="absolute bottom-1/4 left-1/4 w-[250px] h-[250px] rounded-full bg-blue-500/5 blur-[80px] pointer-events-none" />

      {/* 3D Canvas — deepest parallax layer */}
      <motion.div className="hero-canvas" style={{ x: canvasX, y: canvasY }}>
        <Suspense fallback={null}>
          <ThreeScene />
        </Suspense>
      </motion.div>

      <ParticleDots />

      {/* Content — mid parallax layer */}
      <motion.div
        style={{ x: contentX, y: contentY }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/30 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="font-space text-xs text-accent tracking-[3px] uppercase">Software Company</span>
        </motion.div>

        {/* Title — closest parallax layer */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          style={{ x: titleX, y: titleY }}
        >
          <h1 className="section-title mb-2">
            <span className="text-gradient glitch-text block" data-text="TENZOR">TENZOR</span>
            <span className="text-gradient-silver block">LABS</span>
          </h1>
        </motion.div>

        {/* Neon divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="neon-line max-w-xs mx-auto my-6"
        />

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex items-center justify-center gap-4 mb-6"
        >
          {['INNOVATE', 'BUILD', 'EVOLVE'].map((word, i) => (
            <div key={word} className="flex items-center gap-4">
              <span className="font-orbitron text-sm font-600 tracking-[4px] text-white/80 hover:text-accent transition-colors cursor-default">
                {word}
              </span>
              {i < 2 && <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />}
            </div>
          ))}
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="section-subtitle max-w-2xl mx-auto mb-10"
        >
          We help university students turn their ideas into working solutions.
          Expert support in IT, Data Science, Software Development &amp; AI Projects.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button id="hero-cta-services" onClick={scrollToServices} className="btn-primary">
            Our Services
          </button>
          <button id="hero-cta-contact" onClick={scrollToContact} className="btn-outline">
            Contact Us
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
          onClick={scrollToServices}
        >
          <span className="font-orbitron text-[10px] tracking-[3px] text-white/40">SCROLL</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ChevronDown size={20} className="text-accent" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
