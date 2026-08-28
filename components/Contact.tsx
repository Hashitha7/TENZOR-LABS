'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, MessageCircle, Mail, MapPin, Send, CheckCircle } from 'lucide-react'

const contacts = [
  {
    id: 'whatsapp-1',
    icon: Phone,
    label: 'WhatsApp (Sasmitha)',
    value: '076 839 8475',
    href: 'https://wa.me/94768394875',
    color: '#25D366',
    bg: 'rgba(37, 211, 102, 0.1)',
    border: 'rgba(37, 211, 102, 0.3)',
  },
  {
    id: 'whatsapp-2',
    icon: MessageCircle,
    label: 'WhatsApp (Hashitha)',
    value: '078 899 3717',
    href: 'https://wa.me/94788993717',
    color: '#25D366',
    bg: 'rgba(37, 211, 102, 0.1)',
    border: 'rgba(37, 211, 102, 0.3)',
  },
  {
    id: 'email',
    icon: Mail,
    label: 'Email Us',
    value: 'tenzor.labs@gmail.com',
    href: 'mailto:tenzor.labs@gmail.com',
    color: '#00a8ff',
    bg: 'rgba(0, 168, 255, 0.1)',
    border: 'rgba(0, 168, 255, 0.3)',
  },
  {
    id: 'location',
    icon: MapPin,
    label: 'Location',
    value: 'Sri Lanka',
    href: '#',
    color: '#f59e0b',
    bg: 'rgba(245, 158, 11, 0.1)',
    border: 'rgba(245, 158, 11, 0.3)',
  },
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate form submission
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1500)
  }

  return (
    <section id="contact" className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-px neon-line opacity-30" />
      <div className="grid-bg absolute inset-0 opacity-50" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[600px] bg-blue-600/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-600/4 blur-[120px] pointer-events-none" />

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
              Contact Us
            </span>
          </div>
          <h2 className="section-title text-gradient mb-4">Get In Touch</h2>
          <div className="neon-line max-w-xs mx-auto mb-6" />
          <p className="section-subtitle max-w-2xl mx-auto">
            Ready to start your project? Send us a message on WhatsApp or fill out
            the form — we&apos;ll get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="font-orbitron font-700 text-xl text-white mb-8">
              Reach Us Directly
            </h3>

            <div className="space-y-4 mb-10">
              {contacts.map((contact) => {
                const Icon = contact.icon
                return (
                  <a
                    key={contact.id}
                    id={`contact-${contact.id}`}
                    href={contact.href}
                    target={contact.href.startsWith('http') ? '_blank' : undefined}
                    rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group hover:scale-[1.02] block"
                    style={{
                      background: contact.bg,
                      border: `1px solid ${contact.border}`,
                    }}
                  >
                    <div
                      className="contact-icon-wrapper flex-shrink-0"
                      style={{
                        background: `${contact.bg}`,
                        border: `1px solid ${contact.border}`,
                      }}
                    >
                      <Icon size={22} style={{ color: contact.color }} />
                    </div>
                    <div>
                      <p className="text-white/50 text-xs font-orbitron tracking-wider uppercase mb-1">
                        {contact.label}
                      </p>
                      <p className="text-white font-space font-600 text-base">
                        {contact.value}
                      </p>
                    </div>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ color: contact.color }}>
                        <path d="M7 17L17 7M7 7h10v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </a>
                )
              })}
            </div>

            {/* WhatsApp CTA */}
            <div className="gradient-border p-6">
              <div className="p-6 rounded-2xl bg-darker">
                <p className="font-orbitron text-sm text-accent tracking-wider mb-2">
                  FASTEST RESPONSE
                </p>
                <p className="text-white/70 font-space text-sm mb-4">
                  Send us a WhatsApp message for the quickest reply.
                  We&apos;re usually available within a few hours!
                </p>
                <div className="flex gap-3">
                  <a
                    id="whatsapp-cta-1"
                    href="https://wa.me/94768394875?text=Hi%20TENZOR%20LABS,%20I%20need%20help%20with%20my%20project"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex-1 text-center text-xs flex items-center justify-center gap-2"
                    style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
                  >
                    <MessageCircle size={14} />
                    076 839 8475
                  </a>
                  <a
                    id="whatsapp-cta-2"
                    href="https://wa.me/94788993717?text=Hi%20TENZOR%20LABS,%20I%20need%20help%20with%20my%20project"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex-1 text-center text-xs flex items-center justify-center gap-2"
                    style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
                  >
                    <MessageCircle size={14} />
                    078 899 3717
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="glass-dark rounded-3xl p-8 border-glow">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full py-16 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center mb-6 animate-pulse">
                    <CheckCircle size={36} className="text-green-400" />
                  </div>
                  <h3 className="font-orbitron font-700 text-xl text-white mb-3">
                    Message Sent!
                  </h3>
                  <p className="text-white/60 font-space text-sm max-w-xs">
                    Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', subject: '', message: '' }) }}
                    className="mt-6 btn-outline text-sm"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="font-orbitron font-700 text-xl text-white mb-6">
                    Send a Message
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-orbitron text-xs text-white/50 tracking-wider uppercase mb-2 block">
                        Your Name
                      </label>
                      <input
                        id="form-name"
                        type="text"
                        required
                        placeholder="John Doe"
                        className="form-input"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="font-orbitron text-xs text-white/50 tracking-wider uppercase mb-2 block">
                        Email
                      </label>
                      <input
                        id="form-email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        className="form-input"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-orbitron text-xs text-white/50 tracking-wider uppercase mb-2 block">
                      Subject
                    </label>
                    <select
                      id="form-subject"
                      required
                      className="form-input"
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      style={{ background: 'rgba(0, 168, 255, 0.04)', color: formData.subject ? 'white' : 'rgba(255,255,255,0.35)' }}
                    >
                      <option value="" disabled>Select a service...</option>
                      <option value="web-dev" style={{ background: '#050510' }}>Web & Software Development</option>
                      <option value="data-analysis" style={{ background: '#050510' }}>Data Analysis & Visualization</option>
                      <option value="ml-ai" style={{ background: '#050510' }}>Machine Learning & AI</option>
                      <option value="fyp" style={{ background: '#050510' }}>Final Year Project Support</option>
                      <option value="other" style={{ background: '#050510' }}>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-orbitron text-xs text-white/50 tracking-wider uppercase mb-2 block">
                      Message
                    </label>
                    <textarea
                      id="form-message"
                      required
                      rows={5}
                      placeholder="Describe your project..."
                      className="form-input resize-none"
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <button
                    id="form-submit"
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full flex items-center justify-center gap-3"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
