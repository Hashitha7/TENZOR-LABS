'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ExternalLink, Code2, Mail } from 'lucide-react'

const team = [
  {
    id: 'sasmitha',
    name: 'Sasmitha Udaya Sri',
    role: 'Co-Founder & Data Science Lead',
    degree: 'B.Sc. (Hons) in Information Technology',
    specialization: 'Specialized in Data Science',
    university: 'SLIIT',
    photo: '/Sasmitha.jpeg',
    gradient: 'from-blue-600 to-cyan-500',
    borderColor: 'rgba(0, 168, 255, 0.4)',
    glowColor: 'rgba(0, 168, 255, 0.2)',
    skills: ['Python', 'Data Science', 'Machine Learning', 'Data Visualization'],
  },
  {
    id: 'hashitha',
    name: 'Hashitha Danidu',
    role: 'Co-Founder & Software Lead',
    ownerBadge: 'Company Owner',
    degree: 'BSc (Hons) in Software Engineering',
    specialization: 'Software Architecture & Development',
    university: 'SLIIT City Uni',
    photo: '/Hashitha.jpeg',
    gradient: 'from-indigo-600 to-blue-500',
    borderColor: 'rgba(99, 102, 241, 0.4)',
    glowColor: 'rgba(99, 102, 241, 0.2)',
    skills: ['Software Engineering', 'Web Dev', 'API Design', 'System Design'],
  },
]

export default function Team() {
  return (
    <section id="team" className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/8 to-transparent" />
      <div className="grid-bg absolute inset-0 opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-600/5 blur-[150px] pointer-events-none" />

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
              Who We Are
            </span>
          </div>
          <h2 className="section-title text-gradient mb-4">Meet The Team</h2>
          <div className="neon-line max-w-xs mx-auto mb-6" />
          <p className="section-subtitle max-w-2xl mx-auto">
            Two passionate developers dedicated to helping students succeed
            with their academic and professional projects.
          </p>
        </motion.div>

        {/* Team Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {team.map((member, i) => (
            <motion.div
              key={member.id}
              id={`team-${member.id}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
              className="team-card p-8 group"
              style={{ '--card-border': member.borderColor } as React.CSSProperties}
            >
              {/* Top glow accent */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${member.borderColor}, transparent)` }}
              />

              {/* Avatar — real photo */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  {/* Outer glow ring */}
                  <div
                    className="absolute -inset-[3px] rounded-full"
                    style={{
                      background: `linear-gradient(135deg, ${member.borderColor}, transparent 60%, ${member.borderColor})`,
                      filter: `blur(1px)`,
                    }}
                  />
                  {/* Photo container */}
                  <div
                    className="relative w-28 h-28 rounded-full overflow-hidden group-hover:scale-105 transition-transform duration-300 z-10"
                    style={{
                      boxShadow: `0 0 30px ${member.glowColor}, 0 0 60px ${member.glowColor.replace('0.2', '0.1')}`,
                      border: `2px solid ${member.borderColor}`,
                    }}
                  >
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      sizes="112px"
                      className="object-cover object-top"
                      priority
                    />
                  </div>
                  {/* Online indicator */}
                  <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-green-400 border-2 border-darker z-20" />
                  {/* Pulse ring on hover */}
                  <div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                    style={{
                      background: 'transparent',
                      border: `1px solid ${member.borderColor}`,
                      animation: 'pulse-ring-member 2s ease-out infinite',
                      transform: 'scale(1.15)',
                    }}
                  />
                </div>
              </div>

              {/* Info */}
              <div className="text-center mb-6">
                <h3 className="font-orbitron font-800 text-xl text-white mb-1 group-hover:text-gradient transition-all duration-300">
                  {member.name}
                </h3>

                {/* Company Owner badge — only shown if ownerBadge field exists */}
                {'ownerBadge' in member && (
                  <div className="flex justify-center mb-2">
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-orbitron font-700 tracking-[2px] uppercase"
                      style={{
                        background: 'linear-gradient(135deg, rgba(251,191,36,0.15), rgba(245,158,11,0.08))',
                        border: '1px solid rgba(251,191,36,0.5)',
                        color: '#fbbf24',
                        boxShadow: '0 0 12px rgba(251,191,36,0.2)',
                      }}
                    >
                      👑 {(member as typeof member & { ownerBadge: string }).ownerBadge}
                    </span>
                  </div>
                )}

                <p className="text-accent text-sm font-space font-600 mb-3 tracking-wide">
                  {member.role}
                </p>

                <div className="neon-line max-w-16 mx-auto mb-4 opacity-50" />

                <p className="text-white/70 text-sm font-space mb-1">{member.degree}</p>
                <p className="text-white/50 text-xs font-space mb-1">{member.specialization}</p>
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mt-2 text-xs font-orbitron font-600 tracking-wider"
                  style={{
                    background: `${member.borderColor.replace('0.4', '0.1')}`,
                    border: `1px solid ${member.borderColor}`,
                    color: member.borderColor.includes('99') ? '#a5b4fc' : '#7dd3fc',
                  }}
                >
                  🎓 {member.university}
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {member.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs rounded-full text-white/60 font-space tracking-wide"
                    style={{
                      background: `${member.glowColor}`,
                      border: `1px solid ${member.borderColor.replace('0.4', '0.2')}`,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Social links */}
              <div className="flex justify-center gap-3">
                <button
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    background: `${member.glowColor}`,
                    border: `1px solid ${member.borderColor}`,
                  }}
                  aria-label={`${member.name} LinkedIn`}
                >
                  <ExternalLink size={15} className="text-white/70" />
                </button>
                <button
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    background: `${member.glowColor}`,
                    border: `1px solid ${member.borderColor}`,
                  }}
                  aria-label={`${member.name} GitHub`}
                >
                  <Code2 size={15} className="text-white/70" />
                </button>
                <button
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    background: `${member.glowColor}`,
                    border: `1px solid ${member.borderColor}`,
                  }}
                  aria-label={`${member.name} Email`}
                >
                  <Mail size={15} className="text-white/70" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Team tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="font-orbitron text-sm text-white/30 tracking-[4px] uppercase">
            INNOVATE • BUILD • EVOLVE
          </p>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes pulse-ring-member {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.3); opacity: 0; }
        }
      `}</style>
    </section>
  )
}
