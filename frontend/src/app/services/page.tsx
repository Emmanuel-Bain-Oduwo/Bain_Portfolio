'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Brain, Database, Shield, BookOpen, Code2, FlaskConical,
  ArrowRight, Mail, CheckCircle, ExternalLink, Send, X, Calendar, Clock,
} from 'lucide-react'
import Navbar from '@/components/layout/Navbar'

function Up({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const SERVICES = [
  {
    Icon: Brain,
    title: 'Clinical AI Development',
    tagline: 'Build AI systems that make healthcare safer',
    color: '#00FF87',
    description:
      'End-to-end development of clinical AI systems — from architecture to deployment. Specialising in medication safety, drug interaction detection, pharmacogenomics screening, and clinical decision support.',
    deliverables: [
      'Drug interaction checking APIs',
      'Contraindication screening systems',
      'Pharmacogenomics risk modules',
      'RAG-powered clinical assistants',
      'LLM fine-tuning for clinical NLP',
    ],
    ideal: 'Hospital systems, health tech startups, pharma R&D teams',
  },
  {
    Icon: Database,
    title: 'Healthcare Data Engineering',
    tagline: 'Clinical datasets built for AI',
    color: '#3D8EFF',
    description:
      'Curation, structuring, and publication of clinical datasets for pharmacovigilance, drug safety, and healthcare AI model training. Includes MedDRA coding, ICH E2B compliance, and Hugging Face / Kaggle publishing.',
    deliverables: [
      'Pharmacovigilance dataset creation',
      'Drug-drug interaction databases',
      'Clinical reasoning datasets for LLMs',
      'Data pipeline design and automation',
      'Open dataset publication and documentation',
    ],
    ideal: 'Research institutions, AI companies, clinical data teams',
  },
  {
    Icon: Shield,
    title: 'Medication Safety Consulting',
    tagline: 'Reduce drug errors before they happen',
    color: '#A855F7',
    description:
      'Expert consulting on building medication safety tooling — drug interaction workflows, adverse event detection, clinical risk stratification, and regulatory-aligned safety reporting frameworks.',
    deliverables: [
      'Medication safety system design',
      'Drug interaction workflow consulting',
      'Adverse drug reaction (ADR) reporting frameworks',
      'Pharmacovigilance system architecture',
      'Clinical risk assessment frameworks',
    ],
    ideal: 'Pharmacies, hospital systems, regulatory affairs teams',
  },
  {
    Icon: FlaskConical,
    title: 'AI/ML Model Development',
    tagline: 'Production-ready models for healthcare',
    color: '#F97316',
    description:
      'Training, fine-tuning, and deploying machine learning models for healthcare applications — from risk assessment models to large language models on cloud TPU infrastructure.',
    deliverables: [
      'Clinical ML model development',
      'LLM fine-tuning on Google Cloud TPU',
      'PEFT/LoRA fine-tuning pipelines',
      'Model evaluation and benchmarking',
      'MLOps infrastructure (Docker, FastAPI, CI/CD)',
    ],
    ideal: 'AI startups, pharma tech teams, research labs',
  },
  {
    Icon: Code2,
    title: 'Healthcare Software Development',
    tagline: 'Full-stack systems built for clinical use',
    color: '#06B6D4',
    description:
      'Full-stack development of healthcare web applications and APIs using FastAPI, Next.js, and PostgreSQL. Built for clinical workflows, research platforms, and health education systems.',
    deliverables: [
      'FastAPI healthcare backend development',
      'Clinical web application development',
      'PostgreSQL database architecture',
      'REST API design for healthcare systems',
      'Deployment on Railway, Vercel, Google Cloud',
    ],
    ideal: 'Health tech companies, hospitals, digital health startups',
  },
  {
    Icon: BookOpen,
    title: 'AI & Data Science Training',
    tagline: 'Upskill your team in healthcare AI',
    color: '#EAB308',
    description:
      'Structured training programs in Python, machine learning, data science, and AI — tailored for healthcare professionals, science students, and early-career technologists.',
    deliverables: [
      'Python for AI/ML/Data Science programs',
      'Healthcare AI curriculum design',
      'Hands-on workshop facilitation',
      'Clinical data science training',
      'Custom team upskilling programs',
    ],
    ideal: 'Universities, hospital staff, corporate teams, bootcamps',
  },
]

const PROCESS = [
  { step: '01', title: 'Discovery Call', desc: 'We discuss your problem, goals, timeline, and what a successful outcome looks like.' },
  { step: '02', title: 'Proposal & Scope', desc: 'I send a clear proposal with deliverables, timeline, and pricing — no surprises.' },
  { step: '03', title: 'Build & Collaborate', desc: 'Regular updates and check-ins throughout. You see progress, not just a final result.' },
  { step: '04', title: 'Deliver & Support', desc: 'Clean handoff with documentation. Post-delivery support included.' },
]

const SERVICE_OPTIONS = [
  'Clinical AI Development',
  'Healthcare Data Engineering',
  'Medication Safety Consulting',
  'AI/ML Model Development',
  'Healthcare Software Development',
  'AI & Data Science Training',
  'Discovery Call (General)',
]

type BookingStatus = 'idle' | 'sending' | 'sent' | 'error'

function BookingSection() {
  const [form, setForm] = useState({
    name: '', email: '', organization: '',
    service: '', preferred_date: '', preferred_time: '', timezone: '', notes: '',
  })
  const [status, setStatus] = useState<BookingStatus>('idle')

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'var(--bg)',
    border: '1px solid var(--border)',
    color: 'var(--text)',
    borderRadius: '0.75rem',
    padding: '0.625rem 1rem',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.15s',
    fontFamily: 'Inter, sans-serif',
  }

  const focus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = 'var(--accent-green)'
  }
  const blur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = 'var(--border)'
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const base = process.env.NEXT_PUBLIC_API_URL ?? ''
      const res = await fetch(`${base}/api/booking`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', organization: '', service: '', preferred_date: '', preferred_time: '', timezone: '', notes: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="book" className="section">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* Left — info */}
          <Up>
            <span className="label">Book a Call</span>
            <h2 className="font-heading font-semibold tracking-tight mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: 1.15 }}>
              Let's talk about <span className="accent">your project</span>
            </h2>
            <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--text-muted)' }}>
              Whether you're a hospital, pharma company, AI startup, or research institution —
              fill in the form and I'll get back to you within 24–48 hours to confirm a time.
            </p>
            <div className="space-y-4">
              {[
                { Icon: Calendar, text: 'Discovery calls are free — no commitment required' },
                { Icon: Clock, text: 'I reply within 24–48 hours to confirm a time' },
                { Icon: Mail, text: 'Or email directly: emmanuelbain@kemirix.com' },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'var(--accent-glow)', color: 'var(--accent-green)' }}>
                    <Icon size={17} />
                  </div>
                  <p className="text-base leading-relaxed pt-1.5" style={{ color: 'var(--text)' }}>{text}</p>
                </div>
              ))}
            </div>
          </Up>

          {/* Right — form */}
          <Up delay={0.08}>
            {status === 'sent' ? (
              <div className="card p-12 flex flex-col items-center gap-4 text-center">
                <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'var(--accent-glow)', color: 'var(--accent-green)' }}>
                  <CheckCircle size={26} />
                </div>
                <h3 className="font-heading font-semibold text-xl">Booking Request Sent</h3>
                <p className="text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>I'll confirm a time with you within 24–48 hours.</p>
                <button onClick={() => setStatus('idle')} className="btn-outline mt-2 text-sm">Book Another</button>
              </div>
            ) : (
              <form onSubmit={submit} className="card p-6 lg:p-8 space-y-5">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>Name *</label>
                    <input name="name" type="text" required value={form.name} onChange={change}
                      placeholder="Your full name" style={inputStyle} onFocus={focus} onBlur={blur} />
                  </div>
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>Email *</label>
                    <input name="email" type="email" required value={form.email} onChange={change}
                      placeholder="your@email.com" style={inputStyle} onFocus={focus} onBlur={blur} />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>Organization / Company</label>
                  <input name="organization" type="text" value={form.organization} onChange={change}
                    placeholder="Hospital, startup, university..." style={inputStyle} onFocus={focus} onBlur={blur} />
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>Service Interested In *</label>
                  <select name="service" required value={form.service} onChange={change}
                    style={{ ...inputStyle, cursor: 'pointer' }} onFocus={focus} onBlur={blur}>
                    <option value="">Select a service...</option>
                    {SERVICE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>Preferred Date</label>
                    <input name="preferred_date" type="date" value={form.preferred_date} onChange={change}
                      style={inputStyle} onFocus={focus} onBlur={blur} />
                  </div>
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>Preferred Time</label>
                    <input name="preferred_time" type="time" value={form.preferred_time} onChange={change}
                      style={inputStyle} onFocus={focus} onBlur={blur} />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>Your Timezone</label>
                  <input name="timezone" type="text" value={form.timezone} onChange={change}
                    placeholder="e.g. WAT (UTC+1), IST (UTC+5:30), EST..." style={inputStyle} onFocus={focus} onBlur={blur} />
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>Tell Me About Your Project</label>
                  <textarea name="notes" rows={4} value={form.notes} onChange={change}
                    placeholder="Briefly describe what you're working on, your goals, and what you need help with..."
                    style={{ ...inputStyle, resize: 'none' }} onFocus={focus} onBlur={blur} />
                </div>

                {status === 'error' && (
                  <p className="text-sm text-red-400 flex items-center gap-2">
                    <X size={14} /> Something went wrong. Email me directly at{' '}
                    <a href="mailto:emmanuelbain@kemirix.com" className="underline">emmanuelbain@kemirix.com</a>
                  </p>
                )}

                <button type="submit" disabled={status === 'sending'} className="btn-green w-full justify-center disabled:opacity-50 text-base">
                  {status === 'sending' ? 'Sending…' : <><Send size={15} /> Book a Discovery Call</>}
                </button>
              </form>
            )}
          </Up>

        </div>
      </div>
    </section>
  )
}

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ── */}
        <section className="relative min-h-[50vh] flex flex-col justify-center overflow-hidden pt-32 pb-16">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, var(--border) 1px, transparent 1px)',
              backgroundSize: '36px 36px',
              opacity: 0.35,
            }}
          />
          <div className="wrap relative z-10">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
              <span className="label">Services</span>
              <h1
                className="font-heading font-semibold tracking-tight mb-5"
                style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', lineHeight: 1.1 }}
              >
                Clinical AI & Healthcare <br />
                <span className="accent">Technology Services</span>
              </h1>
              <p className="text-lg muted max-w-2xl leading-relaxed mb-8">
                I work with healthcare organisations, AI companies, research institutions, and startups to build
                clinical AI systems, healthcare datasets, and medication safety infrastructure that creates
                real-world impact.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#services" className="btn-green">
                  See Services <ArrowRight size={16} />
                </a>
                <a href="mailto:emmanuelbain@kemirix.com" className="btn-outline">
                  <Mail size={16} /> Start a Conversation
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Services grid ── */}
        <section id="services" className="section">
          <div className="wrap">
            <Up className="mb-12">
              <span className="label">What I Offer</span>
              <h2 className="h2">Services</h2>
              <p className="muted text-lg max-w-2xl leading-relaxed">
                Each engagement is tailored to your specific challenge. I don't do templates — I build what your problem actually needs.
              </p>
            </Up>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((s, i) => (
                <Up key={s.title} delay={i * 0.06}>
                  <div className="card-hover p-7 h-full flex flex-col">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 flex-shrink-0"
                      style={{ background: `${s.color}18`, color: s.color }}
                    >
                      <s.Icon size={22} />
                    </div>
                    <p className="font-mono text-sm mb-1" style={{ color: s.color }}>{s.tagline}</p>
                    <h3 className="font-heading font-semibold text-xl mb-3">{s.title}</h3>
                    <p className="text-base muted leading-relaxed mb-5 flex-1">{s.description}</p>
                    <div className="mb-5">
                      <p className="font-mono text-xs uppercase tracking-wider muted mb-3">Deliverables</p>
                      <ul className="space-y-2">
                        {s.deliverables.map((d) => (
                          <li key={d} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--text)' }}>
                            <CheckCircle size={14} className="accent mt-1 flex-shrink-0" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div
                      className="pt-4 divide-line"
                    >
                      <p className="font-mono text-xs muted mt-3">
                        <span className="uppercase tracking-wider">Ideal for: </span>
                        {s.ideal}
                      </p>
                    </div>
                  </div>
                </Up>
              ))}
            </div>
          </div>
        </section>

        {/* ── Process ── */}
        <section className="section-sm">
          <div className="wrap">
            <Up className="mb-10">
              <span className="label">How It Works</span>
              <h2 className="h2">My Process</h2>
            </Up>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {PROCESS.map((p, i) => (
                <Up key={p.step} delay={i * 0.07}>
                  <div className="card p-6 h-full">
                    <span
                      className="font-mono font-bold text-3xl mb-4 block"
                      style={{ color: 'var(--accent-green)', opacity: 0.6 }}
                    >
                      {p.step}
                    </span>
                    <h4 className="font-heading font-semibold text-lg mb-2">{p.title}</h4>
                    <p className="text-base muted leading-relaxed">{p.desc}</p>
                  </div>
                </Up>
              ))}
            </div>
          </div>
        </section>

        {/* ── Booking Form ── */}
        <BookingSection />

        {/* ── CTA ── */}
        <section className="section-sm">
          <div className="wrap">
            <Up>
              <div
                className="rounded-2xl p-8 lg:p-12 flex flex-col sm:flex-row items-center justify-between gap-6"
                style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
              >
                <div>
                  <h2 className="font-heading font-semibold text-2xl mb-2">
                    Prefer to email directly?
                  </h2>
                  <p className="muted text-base">Reach out at any time — I reply within 48 hours.</p>
                </div>
                <div className="flex flex-wrap gap-3 flex-shrink-0">
                  <a href="mailto:emmanuelbain@kemirix.com" className="btn-green whitespace-nowrap">
                    <Mail size={16} /> emmanuelbain@kemirix.com
                  </a>
                  <a href="/" className="btn-outline whitespace-nowrap">
                    View Portfolio <ExternalLink size={15} />
                  </a>
                </div>
              </div>
            </Up>
          </div>
        </section>

      </main>

      <footer className="py-8 divide-line" role="contentinfo">
        <div className="wrap flex flex-col sm:flex-row items-center justify-between gap-4 text-base muted">
          <div className="flex items-center gap-3">
            <span className="font-heading font-bold text-xl accent">EBO</span>
            <span className="font-mono text-sm">Emmanuel Bain Oduwo</span>
          </div>
          <a href="/" className="text-sm hover:accent transition-colors">← Back to Portfolio</a>
          <p className="font-mono text-sm">© {new Date().getFullYear()}</p>
        </div>
      </footer>
    </>
  )
}
