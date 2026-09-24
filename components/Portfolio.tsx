'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ExternalLink, Monitor, Smartphone, ArrowUpRight } from 'lucide-react'

const projects = [
  {
    id: 'tharushad-portfolio',
    title: 'Tharushad Dilshan Portfolio',
    category: 'Personal Portfolio Website',
    description:
      'A sleek, modern personal portfolio website built for Tharushad Dilshan. Showcases his skills, projects, and professional presence with an immersive design and smooth animations.',
    link: 'https://tharushadilshan.vercel.app/',
    desktopImg: '/w1.png',
    mobileImg: '/m1.png',
    tags: ['Portfolio', 'Web Design', 'Vercel', 'Animations'],
    accentColor: '#00a8ff',
    glowColor: 'rgba(0, 168, 255, 0.15)',
    borderColor: 'rgba(0, 168, 255, 0.3)',
  },
]

export default function Portfolio() {
  return (
    <section id="portfolio" className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent" />
      <div className="grid-bg absolute inset-0 opacity-40" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[600px] bg-cyan-600/5 blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[500px] bg-blue-600/5 blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/20 mb-6">
            <span className="font-orbitron text-xs text-accent tracking-[3px] uppercase">
              Our Work
            </span>
          </div>
          <h2 className="section-title text-gradient mb-4">Client Projects</h2>
          <div className="neon-line max-w-xs mx-auto mb-6" />
          <p className="section-subtitle max-w-2xl mx-auto">
            Real solutions we have built for real clients. Every project crafted with
            precision, performance, and stunning design.
          </p>
        </motion.div>

        {/* Project Cards */}
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            id={`project-${project.id}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            className="relative rounded-3xl overflow-hidden mb-12 group"
            style={{
              background: 'rgba(5, 5, 20, 0.7)',
              border: `1px solid ${project.borderColor}`,
              boxShadow: `0 0 40px ${project.glowColor}`,
              backdropFilter: 'blur(12px)',
            }}
          >
            {/* Top glow line */}
            <div
              className="absolute top-0 left-0 right-0 h-[1px] opacity-60"
              style={{ background: `linear-gradient(90deg, transparent, ${project.accentColor}, transparent)` }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Left: Info Panel */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                {/* Category badge */}
                <div className="inline-flex items-center gap-2 mb-5">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-orbitron font-600 tracking-[2px] uppercase"
                    style={{
                      background: `${project.glowColor}`,
                      border: `1px solid ${project.borderColor}`,
                      color: project.accentColor,
                    }}
                  >
                    {project.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-orbitron font-800 text-2xl md:text-3xl text-white mb-4 leading-tight group-hover:text-gradient transition-all duration-500">
                  {project.title}
                </h3>

                <p className="text-white/60 text-sm leading-relaxed mb-6 font-space">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-orbitron font-600 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Live link button */}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 group/btn self-start"
                >
                  <span
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-orbitron font-700 text-sm tracking-[2px] uppercase transition-all duration-300 group-hover/btn:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${project.accentColor}22, ${project.accentColor}11)`,
                      border: `1px solid ${project.accentColor}`,
                      color: project.accentColor,
                      boxShadow: `0 0 20px ${project.glowColor}`,
                    }}
                  >
                    <ExternalLink size={16} />
                    View Live Site
                    <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                  </span>
                </a>

                {/* Device icons */}
                <div className="flex items-center gap-3 mt-6">
                  <div className="flex items-center gap-1.5 text-white/30 text-xs font-space">
                    <Monitor size={13} />
                    <span>Desktop</span>
                  </div>
                  <span className="text-white/20">•</span>
                  <div className="flex items-center gap-1.5 text-white/30 text-xs font-space">
                    <Smartphone size={13} />
                    <span>Mobile</span>
                  </div>
                </div>
              </div>

              {/* Right: Screenshots */}
              <div className="relative p-6 md:p-8 flex items-center justify-center min-h-[360px] lg:min-h-[480px]">
                {/* Desktop screenshot */}
                <motion.div
                  whileHover={{ scale: 1.03, rotate: -1 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="relative w-full max-w-[380px] aspect-[16/10] rounded-xl overflow-hidden shadow-2xl"
                  style={{
                    border: `1px solid ${project.borderColor}`,
                    boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 30px ${project.glowColor}`,
                  }}
                >
                  {/* Browser bar mock */}
                  <div
                    className="absolute top-0 left-0 right-0 h-7 z-10 flex items-center px-3 gap-1.5"
                    style={{ background: 'rgba(5,5,20,0.9)', borderBottom: `1px solid ${project.borderColor}` }}
                  >
                    <div className="w-2 h-2 rounded-full bg-red-500/80" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
                    <div className="w-2 h-2 rounded-full bg-green-500/80" />
                    <div
                      className="ml-2 flex-1 h-3.5 rounded-full flex items-center px-2"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                    >
                      <span className="text-white/30 text-[8px] font-space truncate">
                        tharushadilshan.vercel.app
                      </span>
                    </div>
                  </div>
                  <Image
                    src={project.desktopImg}
                    alt={`${project.title} desktop view`}
                    fill
                    sizes="(max-width: 768px) 90vw, 380px"
                    className="object-cover object-top"
                    style={{ paddingTop: '28px' }}
                  />
                  {/* Monitor icon label */}
                  <div className="absolute bottom-2 right-2 z-10">
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm">
                      <Monitor size={10} className="text-white/50" />
                      <span className="text-white/50 text-[9px] font-space">Desktop</span>
                    </div>
                  </div>
                </motion.div>

                {/* Mobile screenshot — floating overlay */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="absolute bottom-4 right-4 md:bottom-8 md:right-6 w-[90px] md:w-[110px] aspect-[9/19] rounded-2xl overflow-hidden shadow-2xl z-20"
                  style={{
                    border: `1px solid ${project.borderColor}`,
                    boxShadow: `0 10px 40px rgba(0,0,0,0.6), 0 0 20px ${project.glowColor}`,
                  }}
                >
                  {/* Phone notch */}
                  <div
                    className="absolute top-0 left-0 right-0 h-5 z-10 flex items-center justify-center"
                    style={{ background: 'rgba(5,5,20,0.95)' }}
                  >
                    <div className="w-12 h-2 rounded-full bg-black/80" />
                  </div>
                  <Image
                    src={project.mobileImg}
                    alt={`${project.title} mobile view`}
                    fill
                    sizes="110px"
                    className="object-cover object-top"
                    style={{ paddingTop: '20px' }}
                  />
                  {/* Mobile icon label */}
                  <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 z-10">
                    <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-black/60 backdrop-blur-sm">
                      <Smartphone size={8} className="text-white/50" />
                      <span className="text-white/50 text-[7px] font-space">Mobile</span>
                    </div>
                  </div>
                </motion.div>

                {/* Floating glow behind screenshots */}
                <div
                  className="absolute inset-0 rounded-3xl pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at 70% 50%, ${project.glowColor} 0%, transparent 70%)`,
                  }}
                />
              </div>
            </div>
          </motion.div>
        ))}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-4"
        >
          <p className="text-white/40 font-space text-sm tracking-wider">
            More projects coming soon — yours could be next 🚀
          </p>
        </motion.div>
      </div>
    </section>
  )
}
