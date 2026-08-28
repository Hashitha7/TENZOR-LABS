'use client'
import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Shield, Users, Clock, Tag } from 'lucide-react'

const features = [
  {
    id: 'quality',
    icon: Shield,
    title: 'Quality Work',
    description: 'Every project is crafted with precision and attention to detail.',
    color: '#00a8ff',
  },
  {
    id: 'student-friendly',
    icon: Users,
    title: 'Student Friendly',
    description: 'We understand student budgets and tight deadlines.',
    color: '#00d4ff',
  },
  {
    id: 'on-time',
    icon: Clock,
    title: 'On-Time Delivery',
    description: 'We honor deadlines — your submission date is our priority.',
    color: '#0066ff',
  },
  {
    id: 'affordable',
    icon: Tag,
    title: 'Affordable Pricing',
    description: 'Premium quality support at prices students can actually afford.',
    color: '#6366f1',
  },
]

const stats = [
  { value: 50, suffix: '+', label: 'Projects Completed' },
  { value: 100, suffix: '%', label: 'Client Satisfaction' },
  { value: 4, suffix: '+', label: 'Service Areas' },
  { value: 2, suffix: '', label: 'Expert Developers' },
]

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2000
    const step = Math.ceil(value / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <span ref={ref} className="counter-value text-4xl md:text-5xl font-900">
      {count}{suffix}
    </span>
  )
}

export default function WhyUs() {
  return (
    <section id="why-us" className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[600px] bg-blue-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[600px] bg-cyan-600/5 blur-[120px] pointer-events-none" />

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
              Why Choose Us
            </span>
          </div>
          <h2 className="section-title text-gradient mb-4">The TENZOR Advantage</h2>
          <div className="neon-line max-w-xs mx-auto mb-6" />
          <p className="section-subtitle max-w-2xl mx-auto">
            We provide reliable support, practical solutions and guidance
            to help you complete your projects successfully.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              id={`stat-${i}`}
              className="text-center p-6 glass border-glow rounded-2xl hover:border-blue-400/40 transition-all duration-300 group"
            >
              <div className="mb-2">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="font-orbitron text-xs text-white/50 tracking-[2px] uppercase group-hover:text-accent transition-colors">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.id}
                id={`feature-${feature.id}`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="feature-item group"
              >
                <div
                  className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `${feature.color}22`,
                    border: `1px solid ${feature.color}44`,
                    boxShadow: `0 0 20px ${feature.color}20`,
                  }}
                >
                  <Icon size={24} style={{ color: feature.color }} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-orbitron font-700 text-white text-base mb-1 group-hover:text-gradient transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                {/* Animated check */}
                <div
                  className="ml-auto flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{ background: `${feature.color}33`, border: `1px solid ${feature.color}` }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke={feature.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
