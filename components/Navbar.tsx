'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Home, Briefcase, Info, LayoutTemplate, Users, Mail, ArrowRight } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '#home', icon: Home },
  { label: 'Services', href: '#services', icon: Briefcase },
  { label: 'Why Us', href: '#why-us', icon: Info },
  { label: 'Portfolio', href: '#portfolio', icon: LayoutTemplate },
  { label: 'Team', href: '#team', icon: Users },
  { label: 'Contact', href: '#contact', icon: Mail },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      const sections = navLinks.map(l => l.href.replace('#', ''))
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    setTimeout(() => {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 300)
  }

  return (
    <>
      {/* ── TOP NAVBAR BAR ── */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
            ? 'glass-dark border-b border-blue-500/10 py-3'
            : 'bg-transparent py-5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('#home')}
            className="flex items-center gap-2 sm:gap-3 group flex-shrink-0"
            id="nav-logo"
          >
            <div className="relative w-8 h-8 sm:w-10 sm:h-10">
              <Image
                src="/logo.png"
                alt="TENZOR LABS Logo"
                fill
                sizes="(max-width: 640px) 32px, 40px"
                className="object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline">
              <span className="font-orbitron font-900 text-sm sm:text-base text-white tracking-[2px] sm:tracking-widest group-hover:text-accent transition-colors leading-none sm:leading-normal">
                TENZOR
              </span>
              <span className="font-orbitron font-900 text-sm sm:text-base text-gradient tracking-[2px] sm:tracking-widest sm:ml-1 leading-none sm:leading-normal">
                LABS
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                id={`nav-${link.label.toLowerCase().replace(' ', '-')}`}
                onClick={() => handleNavClick(link.href)}
                className={`nav-link ${activeSection === link.href.replace('#', '') ? 'text-accent' : ''
                  }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex">
            <button
              id="nav-cta"
              onClick={() => handleNavClick('#contact')}
              className="btn-primary text-xs px-6 py-3"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            id="nav-mobile-toggle"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/5 text-white hover:text-accent hover:border-blue-500/40 transition-all duration-300"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={20} />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={20} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* ── MOBILE FULL DRAWER ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Dark backdrop */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 md:hidden"
              style={{ background: 'rgba(2,2,8,0.88)', backdropFilter: 'blur(6px)' }}
            />

            {/* Slide-in drawer from right */}
            <motion.div
              key="mobile-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[82vw] max-w-[300px] md:hidden flex flex-col"
              style={{
                background: 'linear-gradient(160deg, #050514 0%, #03030c 100%)',
                borderLeft: '1px solid rgba(0,168,255,0.2)',
                boxShadow: '-30px 0 80px rgba(0,0,0,0.7), 0 0 40px rgba(0,168,255,0.04)',
              }}
            >
              {/* Decorative top glow */}
              <div
                className="absolute top-0 left-0 right-0 h-[1px]"
                style={{ background: 'linear-gradient(90deg, transparent, #00a8ff80, transparent)' }}
              />
              <div
                className="absolute top-0 right-0 w-40 h-40 pointer-events-none"
                style={{ background: 'radial-gradient(circle at top right, rgba(0,168,255,0.08) 0%, transparent 70%)' }}
              />

              {/* Drawer Header */}
              <div
                className="flex items-center justify-between px-5 py-4 flex-shrink-0"
                style={{ borderBottom: '1px solid rgba(0,168,255,0.08)' }}
              >
                <div className="flex items-center gap-2">
                  <div className="relative w-6 h-6">
                    <Image src="/logo.png" alt="Logo" fill sizes="24px" className="object-contain" />
                  </div>
                  <span className="font-orbitron text-xs text-white/70 tracking-[3px] uppercase">
                    TENZOR <span className="text-gradient">LABS</span>
                  </span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-all duration-200"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Nav Links */}
              <nav className="flex-1 overflow-y-auto px-3 py-5">
                <p className="font-orbitron text-[9px] text-white/20 tracking-[3px] uppercase px-2 mb-3">
                  Navigation
                </p>
                <div className="flex flex-col gap-1">
                  {navLinks.map((link, i) => {
                    const Icon = link.icon
                    const isActive = activeSection === link.href.replace('#', '')
                    return (
                      <motion.button
                        key={link.href}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.055, duration: 0.28, ease: 'easeOut' }}
                        onClick={() => handleNavClick(link.href)}
                        className="relative flex items-center gap-3 w-full text-left px-3 py-3.5 rounded-xl transition-all duration-250 group"
                        style={
                          isActive
                            ? {
                              background: 'linear-gradient(135deg, rgba(0,168,255,0.13), rgba(0,102,255,0.07))',
                              border: '1px solid rgba(0,168,255,0.28)',
                              boxShadow: '0 0 16px rgba(0,168,255,0.07)',
                            }
                            : {
                              background: 'transparent',
                              border: '1px solid transparent',
                            }
                        }
                      >
                        {/* Left accent bar when active */}
                        {isActive && (
                          <div
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full"
                            style={{ background: 'linear-gradient(180deg, #00a8ff, #00d4ff)' }}
                          />
                        )}

                        {/* Icon container */}
                        <div
                          className="w-9 h-9 flex-shrink-0 rounded-lg flex items-center justify-center transition-all duration-300"
                          style={
                            isActive
                              ? { background: 'rgba(0,168,255,0.18)', border: '1px solid rgba(0,168,255,0.35)' }
                              : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }
                          }
                        >
                          <Icon
                            size={16}
                            style={{ color: isActive ? '#00a8ff' : 'rgba(255,255,255,0.35)' }}
                          />
                        </div>

                        {/* Label */}
                        <span
                          className="font-orbitron text-xs tracking-[2px]"
                          style={{ color: isActive ? '#ffffff' : 'rgba(255,255,255,0.55)' }}
                        >
                          {link.label}
                        </span>

                        {/* Animated arrow */}
                        <ArrowRight
                          size={12}
                          className="ml-auto transition-all duration-300 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"
                          style={{ color: isActive ? '#00a8ff' : 'rgba(255,255,255,0.25)' }}
                        />
                      </motion.button>
                    )
                  })}
                </div>
              </nav>

              {/* CTA Footer */}
              <div
                className="px-4 pb-7 pt-4 flex-shrink-0"
                style={{ borderTop: '1px solid rgba(0,168,255,0.07)' }}
              >
                <motion.button
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.38, duration: 0.3 }}
                  onClick={() => handleNavClick('#contact')}
                  className="btn-primary w-full py-3.5 text-xs justify-center"
                >
                  Get Started
                </motion.button>
                <p className="text-center text-white/15 font-space text-[10px] mt-3 tracking-[2px]">
                  TENZOR LABS © 2026
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
