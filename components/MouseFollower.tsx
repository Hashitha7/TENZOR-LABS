'use client'
import { useEffect, useRef } from 'react'

export default function MouseFollower() {
  // Refs for direct DOM access — zero React re-renders on mouse move
  const dotRef = useRef<HTMLDivElement>(null)
  const ringOuterRef = useRef<HTMLDivElement>(null)  // JS controls position
  const ringInnerRef = useRef<HTMLDivElement>(null)  // CSS controls scale only
  const glowRef = useRef<HTMLDivElement>(null)
  const isPointerRef = useRef(false)

  useEffect(() => {
    // Target positions
    let mouseX = 0, mouseY = 0
    // Lagged positions (smoothed)
    let dotX = 0, dotY = 0
    let ringX = 0, ringY = 0
    let glowX = 0, glowY = 0
    let visible = true
    let rafId: number

    // --- lerp helper ---
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!visible) {
        visible = true
        setOpacity(1)
      }

      // Detect pointer-cursor elements
      const target = e.target as HTMLElement
      const clickable = !!target.closest('a, button, [role="button"], input, textarea, select, label')
      if (clickable !== isPointerRef.current) {
        isPointerRef.current = clickable
        // Scale ring inner via CSS transform — separate from position
        if (ringInnerRef.current) {
          ringInnerRef.current.style.transform = `scale(${clickable ? 1.8 : 1})`
          ringInnerRef.current.style.opacity = clickable ? '0.9' : '0.6'
          ringInnerRef.current.style.borderColor = clickable ? 'rgba(0,212,255,0.9)' : 'rgba(0,168,255,0.55)'
          ringInnerRef.current.style.boxShadow = clickable
            ? '0 0 18px rgba(0,212,255,0.6)'
            : '0 0 8px rgba(0,168,255,0.25)'
        }
        // Dot shrinks when pointer
        if (dotRef.current) {
          dotRef.current.style.transform = `translate(-50%, -50%) scale(${clickable ? 0.4 : 1})`
          dotRef.current.style.background = clickable ? 'rgba(0,212,255,1)' : 'rgba(0,168,255,0.95)'
        }
      }
    }

    const setOpacity = (val: number) => {
      const o = String(val)
      if (dotRef.current) dotRef.current.style.opacity = o
      if (ringOuterRef.current) ringOuterRef.current.style.opacity = o
      if (glowRef.current) glowRef.current.style.opacity = val === 0 ? '0' : '0.8'
    }

    const onMouseLeave = () => { visible = false; setOpacity(0) }
    const onMouseEnter = () => { visible = true; setOpacity(1) }

    // RAF loop — all positions computed here, zero React state
    const animate = () => {
      // Dot: fast lerp (almost instant)
      dotX = lerp(dotX, mouseX, 0.55)
      dotY = lerp(dotY, mouseY, 0.55)

      // Ring: medium lerp
      ringX = lerp(ringX, mouseX, 0.18)
      ringY = lerp(ringY, mouseY, 0.18)

      // Glow: slow lerp
      glowX = lerp(glowX, mouseX, 0.07)
      glowY = lerp(glowY, mouseY, 0.07)

      // Apply positions via transform (GPU-accelerated, no layout thrash)
      if (dotRef.current) {
        dotRef.current.style.left = `${dotX}px`
        dotRef.current.style.top = `${dotY}px`
      }
      // Ring outer: position only (no scale here — scale is on inner)
      if (ringOuterRef.current) {
        ringOuterRef.current.style.left = `${ringX}px`
        ringOuterRef.current.style.top = `${ringY}px`
      }
      if (glowRef.current) {
        glowRef.current.style.left = `${glowX}px`
        glowRef.current.style.top = `${glowY}px`
      }

      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      {/* === GLOW AURA (slowest, largest) === */}
      <div
        ref={glowRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9990,
          width: 420,
          height: 420,
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(0,168,255,0.07) 0%, rgba(0,168,255,0.025) 45%, transparent 70%)',
          opacity: 0.8,
          willChange: 'left, top',
          top: 0,
          left: 0,
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* === RING OUTER (position via JS) → RING INNER (scale via CSS only) === */}
      {/* Separating position and scale into two elements prevents transform conflict */}
      <div
        ref={ringOuterRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9997,
          width: 40,
          height: 40,
          top: 0,
          left: 0,
          transform: 'translate(-50%, -50%)',
          willChange: 'left, top',
          transition: 'opacity 0.35s ease',
        }}
      >
        {/* Inner handles scale — completely independent transform */}
        <div
          ref={ringInnerRef}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '1px solid rgba(0,168,255,0.55)',
            boxShadow: '0 0 8px rgba(0,168,255,0.25)',
            opacity: 0.6,
            transform: 'scale(1)',
            // Only transition scale/opacity/color — NOT position
            transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s, border-color 0.2s, box-shadow 0.25s',
            willChange: 'transform',
          }}
        />
      </div>

      {/* === DOT (fast, centered on cursor) === */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9999,
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: 'rgba(0,168,255,0.95)',
          boxShadow: '0 0 8px rgba(0,168,255,0.9), 0 0 16px rgba(0,168,255,0.4)',
          top: 0,
          left: 0,
          transform: 'translate(-50%, -50%) scale(1)',
          willChange: 'left, top',
          // Only transition scale/color — NOT position (RAF handles that)
          transition: 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1), background 0.2s, box-shadow 0.2s, opacity 0.35s ease',
        }}
      />
    </>
  )
}
