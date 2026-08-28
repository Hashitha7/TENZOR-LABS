'use client'
import { useRef, useState, MouseEvent } from 'react'
import { motion, useInView } from 'framer-motion'
import { Code2, BarChart3, Brain, GraduationCap } from 'lucide-react'

const services = [
  {
    id: 'web-dev',
    icon: Code2,
    title: 'Web & Software Development',
    description:
      'Custom web applications, APIs, and software solutions built with modern technologies. From simple landing pages to complex enterprise systems.',
    tags: ['React', 'Next.js', 'Node.js', 'Python'],
    gradient: 'from-blue-600/20 to-cyan-500/20',
    border: 'hover:border-blue-400/60',
    glow: '0 0 40px rgba(0, 168, 255, 0.15)',
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-500/15',
  },
  {
    id: 'data-analysis',
    icon: BarChart3,
    title: 'Data Analysis & Visualization',
    description:
      'Transform raw data into actionable insights. Statistical analysis, data cleaning, interactive dashboards, and compelling visualizations.',
    tags: ['Python', 'Pandas', 'Tableau', 'Power BI'],
    gradient: 'from-cyan-600/20 to-teal-500/20',
    border: 'hover:border-cyan-400/60',
    glow: '0 0 40px rgba(0, 212, 255, 0.15)',
    iconColor: 'text-cyan-400',
    iconBg: 'bg-cyan-500/15',
  },
  {
    id: 'ml-ai',
    icon: Brain,
    title: 'Machine Learning & AI Projects',
    description:
      'Build intelligent systems — predictive models, NLP applications, computer vision solutions, and deep learning architectures.',
    tags: ['TensorFlow', 'Scikit-learn', 'PyTorch', 'OpenAI'],
    gradient: 'from-purple-600/20 to-blue-500/20',
    border: 'hover:border-purple-400/60',
    glow: '0 0 40px rgba(139, 92, 246, 0.15)',
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-500/15',
  },
  {
    id: 'fyp',
    icon: GraduationCap,
    title: 'Final Year Project Support',
    description:
      'End-to-end support for your FYP — from topic selection, proposal writing, development, documentation, to presentation preparation.',
    tags: ['Research', 'Documentation', 'Development', 'Guidance'],
    gradient: 'from-indigo-600/20 to-blue-500/20',
    border: 'hover:border-indigo-400/60',
    glow: '0 0 40px rgba(99, 102, 241, 0.15)',
    iconColor: 'text-indigo-400',
    iconBg: 'bg-indigo-500/15',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
}

function SpotlightCard({ children, className, id, style }: {
  children: React.ReactNode
  className?: string
  id?: string
  style?: React.CSSProperties
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [spotPos, setSpotPos] = useState({ x: 0, y: 0, opacity: 0 })

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    setSpotPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
    })
  }
  const onMouseLeave = () => setSpotPos(p => ({ ...p, opacity: 0 }))

  return (
    <div
      ref={cardRef}
      id={id}
      className={className}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Spotlight glow */}
      <div
        className="absolute inset-0 rounded-[20px] pointer-events-none transition-opacity duration-300 overflow-hidden"
        style={{ opacity: spotPos.opacity }}
      >
        <div
          style={{
            position: 'absolute',
            left: spotPos.x,
            top: spotPos.y,
            width: 300,
            height: 300,
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(0,168,255,0.12) 0%, rgba(0,168,255,0.04) 40%, transparent 70%)',
            borderRadius: '50%',
            transition: 'opacity 0.3s',
          }}
        />
      </div>
      {children}
    </div>
  )
}

export default function Services() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="services" className="relative py-28 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-blue-600/4 blur-[150px] pointer-events-none" />
      <div className="grid-bg absolute inset-0 opacity-50" />

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
              What We Do
            </span>
          </div>
          <h2 className="section-title text-gradient mb-4">Our Services</h2>
          <div className="neon-line max-w-xs mx-auto mb-6" />
          <p className="section-subtitle max-w-2xl mx-auto">
            We provide reliable support, practical solutions and guidance to help
            you complete your projects successfully.
          </p>
        </motion.div>

        {/* Service Cards */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {services.map((service) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <SpotlightCard
                  id={`service-${service.id}`}
                  className={`service-card group ${service.border}`}
                  style={{ '--card-glow': service.glow } as React.CSSProperties}
                >
                  {/* Corner decoration */}
                  <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden rounded-br-none rounded-tl-none pointer-events-none">
                    <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-bl ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  </div>

                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-2xl ${service.iconBg} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={28} className={service.iconColor} strokeWidth={1.5} />
                  </div>

                  <h3 className="font-orbitron font-700 text-lg text-white mb-3 group-hover:text-gradient transition-all duration-300">
                    {service.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-orbitron font-600 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Arrow indicator */}
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-accent">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </SpotlightCard>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-white/50 font-space mb-4 text-sm">
            Need a custom solution? Let&apos;s talk!
          </p>
          <button
            id="services-cta"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-outline"
          >
            Get a Free Quote
          </button>
        </motion.div>
      </div>
    </section>
  )
}
