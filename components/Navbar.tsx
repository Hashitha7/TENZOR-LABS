'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Home, Briefcase, Info, LayoutTemplate, Users, Mail } from 'lucide-react'

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
      // Detect active section
      const sections = navLinks.map(l => l.href.replace('#', ''))
      for (const id of sections.reverse()) {
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

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass-dark border-b border-blue-500/10 py-3'
            : 'bg-transparent py-6'
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

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                id={`nav-${link.label.toLowerCase()}`}
                onClick={() => handleNavClick(link.href)}
                className={`nav-link ${
                  activeSection === link.href.replace('#', '')
                    ? 'text-accent'
                    : ''
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex">
            <button
              id="nav-cta"
              onClick={() => handleNavClick('#contact')}
              className="btn-primary text-xs px-6 py-3"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            id="nav-mobile-toggle"
            className="md:hidden text-white hover:text-accent transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[72px] left-0 right-0 bottom-0 z-40 glass-dark border-t border-blue-500/10 px-6 pt-6 pb-8 md:hidden flex flex-col overflow-y-auto"
            style={{ backdropFilter: 'blur(20px)' }}
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => {
                const Icon = link.icon
                const isActive = activeSection === link.href.replace('#', '')
                return (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={`flex items-center gap-4 text-left p-4 rounded-xl border transition-all duration-300 w-full ${
                      isActive
                        ? 'bg-blue-500/10 border-blue-500/30 text-accent shadow-[0_0_20px_rgba(0,168,255,0.1)]'
                        : 'bg-transparent border-transparent text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon size={20} className={isActive ? 'text-accent' : 'text-white/40'} />
                    <span className="font-orbitron text-sm tracking-[2px]">{link.label}</span>
                  </button>
                )
              })}
            </div>
            <div className="mt-auto pt-6">
              <button
                onClick={() => handleNavClick('#contact')}
                className="btn-primary w-full py-4 text-sm justify-center"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
