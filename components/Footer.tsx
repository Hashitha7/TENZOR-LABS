'use client'
import Image from 'next/image'
import { Phone, MessageCircle } from 'lucide-react'

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Why Choose Us', href: '#why-us' },
  { label: 'Our Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
]

const services = [
  'Web & Software Development',
  'Data Analysis & Visualization',
  'Machine Learning & AI',
  'Final Year Project Support',
]

export default function Footer() {
  const handleNav = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-blue-500/10 overflow-hidden">
      {/* Top neon line */}
      <div className="neon-line opacity-60" />

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-600/4 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10">
                <Image src="/logo.png" alt="TENZOR LABS" fill sizes="40px" className="object-contain" />
              </div>
              <div>
                <span className="font-orbitron font-900 text-white tracking-widest text-base">TENZOR </span>
                <span className="font-orbitron font-900 text-gradient tracking-widest text-base">LABS</span>
              </div>
            </div>
            <p className="text-white/50 font-space text-sm leading-relaxed mb-5">
              Turning ideas into working solutions. Your trusted partner for IT & Data Science projects.
            </p>
            <div className="flex items-center gap-2 text-white/40 text-xs font-orbitron tracking-[3px]">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              INNOVATE • BUILD • EVOLVE
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-orbitron font-700 text-white text-sm tracking-[2px] uppercase mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNav(link.href)}
                    className="text-white/50 hover:text-accent font-space text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-blue-500/50 group-hover:bg-accent transition-colors" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-orbitron font-700 text-white text-sm tracking-[2px] uppercase mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map(service => (
                <li key={service}>
                  <button
                    onClick={() => handleNav('#services')}
                    className="text-white/50 hover:text-accent font-space text-sm transition-colors duration-200 flex items-center gap-2 group text-left"
                  >
                    <span className="w-1 h-1 rounded-full bg-blue-500/50 group-hover:bg-accent transition-colors flex-shrink-0" />
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-orbitron font-700 text-white text-sm tracking-[2px] uppercase mb-5">
              Contact
            </h4>
            <div className="space-y-3">
              <a
                id="footer-whatsapp-1"
                href="https://wa.me/94768394875"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/50 hover:text-accent transition-colors group"
              >
                <Phone size={14} className="text-green-400 flex-shrink-0" />
                <span className="font-space text-sm group-hover:text-accent">076 839 8475</span>
              </a>
              <a
                id="footer-whatsapp-2"
                href="https://wa.me/94788993717"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/50 hover:text-accent transition-colors group"
              >
                <MessageCircle size={14} className="text-green-400 flex-shrink-0" />
                <span className="font-space text-sm group-hover:text-accent">078 899 3717</span>
              </a>
            </div>

            {/* WhatsApp quick button */}
            <a
              id="footer-whatsapp-cta"
              href="https://wa.me/94768394875?text=Hi%20TENZOR%20LABS"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-orbitron font-700 tracking-wider text-white transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
            >
              <MessageCircle size={14} />
              WhatsApp Us
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="neon-line opacity-20 mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 font-space text-xs">
            © {new Date().getFullYear()} TENZOR LABS. All rights reserved.
          </p>
          <p className="text-white/20 font-orbitron text-[10px] tracking-[3px]">
            BUILT WITH ❤️ IN SRI LANKA
          </p>
        </div>
      </div>
    </footer>
  )
}
