'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  ArrowRight, ExternalLink, Mail, MapPin, Calendar,
  CheckCircle, Award, Database, Cpu, Rocket, Users,
  Building2, Shield, Globe, ChevronDown, Brain,
  BookOpen, Send, GraduationCap, X,
} from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import {
  PROJECTS, EXPERIENCE, SKILLS, PUBLIC_PROFILES, HIGHLIGHTS,
} from '@/lib/data'

// ─── Helpers ────────────────────────────────────────────────────────────────

function FadeUp({
  children, delay = 0, className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function SectionHeader({
  label, title, description,
}: {
  label: string
  title: string
  description?: string
}) {
  return (
    <FadeUp className="mb-12">
      <span className="section-label">{label}</span>
      <h2 className="section-title text-balance">{title}</h2>
      {description && (
        <p className="mt-4 text-muted max-w-2xl leading-relaxed text-base">{description}</p>
      )}
    </FadeUp>
  )
}

function StatusBadge({ status, color }: { status: string; color: 'green' | 'blue' | 'yellow' }) {
  const map = {
    green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/25',
    yellow: 'bg-amber-500/10 text-amber-400 border-amber-500/25',
  }
  const dot = { green: 'bg-emerald-400', blue: 'bg-blue-400', yellow: 'bg-amber-400' }
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono border whitespace-nowrap flex-shrink-0 ${map[color]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot[color]}`} />
      {status}
    </span>
  )
}

function TechTag({ tech }: { tech: string }) {
  return <span className="tag-mono">{tech}</span>
}

// ─── Platform SVG Icons ──────────────────────────────────────────────────────

function PlatformSvg({ name, color }: { name: string; color: string }) {
  const svgs: Record<string, React.ReactNode> = {
    linkedin: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    github: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    huggingface: (
      <svg viewBox="0 0 95 88" fill="currentColor" className="w-5 h-5">
        <path d="M47.206 0C21.137 0 0 19.69 0 43.97c0 24.281 21.137 43.97 47.206 43.97S94.41 68.251 94.41 43.97C94.41 19.69 73.273 0 47.206 0zm0 6.62c22.566 0 40.862 16.73 40.862 37.35S69.772 81.32 47.206 81.32c-22.565 0-40.86-16.73-40.86-37.35S24.64 6.62 47.206 6.62zm-9.01 18.51a6.5 6.5 0 00-6.5 6.5 6.5 6.5 0 006.5 6.5 6.5 6.5 0 006.5-6.5 6.5 6.5 0 00-6.5-6.5zm18.02 0a6.5 6.5 0 00-6.5 6.5 6.5 6.5 0 006.5 6.5 6.5 6.5 0 006.5-6.5 6.5 6.5 0 00-6.5-6.5zm-22.2 20.5c-.73 0-1.41.35-1.84.95-.43.6-.54 1.36-.3 2.06 2.49 7.32 9.36 12.25 17.12 12.25 7.76 0 14.62-4.93 17.12-12.25.24-.7.13-1.46-.3-2.06-.43-.6-1.1-.95-1.84-.95H34.016z" />
      </svg>
    ),
    kaggle: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.825 23.859c-.022.092-.097.141-.185.141h-3.085a.283.283 0 01-.222-.107L11.6 17.894l-1.378 1.337v4.558a.22.22 0 01-.219.22H7.515a.22.22 0 01-.22-.22V.158a.22.22 0 01.22-.22h2.488a.22.22 0 01.218.22v13.092l5.985-6.092a.277.277 0 01.224-.097h3.166c.08 0 .153.044.183.119.03.074.012.158-.043.215l-6.044 6.148 6.121 9.864a.19.19 0 01.012.215z" />
      </svg>
    ),
    orcid: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 01-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.016-5.325 5.016h-3.919V7.416zm1.444 1.303v7.444h2.297c2.563 0 3.903-1.613 3.903-3.722 0-2.016-1.228-3.722-3.812-3.722h-2.388z" />
      </svg>
    ),
    researchgate: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M19.586 0c-.818 0-1.508.19-2.073.565-.563.377-.97.936-1.213 1.68a12 12 0 00-.39 2.256 22.8 22.8 0 00-.1 2.473v1.28c0 1.39.099 2.601.3 3.637.2 1.037.536 1.843 1.007 2.418.473.574 1.133.86 1.98.86.49 0 .908-.074 1.254-.219a2.8 2.8 0 00.857-.63 4.47 4.47 0 00.603-1.07 6.83 6.83 0 00.316-1.577 25.3 25.3 0 00.101-2.295V9.08c0-1.452-.055-2.608-.164-3.468-.109-.86-.277-1.53-.506-2.01a2.1 2.1 0 00-.845-1.022A2.28 2.28 0 0019.586 0zM10.98 8.516c-2.434 0-4.39 1.956-4.39 4.39s1.956 4.39 4.39 4.39 4.39-1.956 4.39-4.39-1.956-4.39-4.39-4.39zM2 0C.896 0 0 .896 0 2v20c0 1.104.896 2 2 2h20c1.104 0 2-.896 2-2V2c0-1.104-.896-2-2-2H2zm17.586 1.277c.361 0 .673.09.936.27.263.18.48.469.652.863.172.394.299.914.38 1.561.08.647.12 1.45.12 2.41v1.12c0 1.4-.04 2.53-.12 3.39-.08.86-.218 1.52-.414 1.98a2.4 2.4 0 01-.77 1.072 1.962 1.962 0 01-1.222.367c-.538 0-.966-.186-1.283-.558-.317-.371-.546-.942-.688-1.713-.141-.77-.212-1.786-.212-3.046V8.99c0-1.1.044-2.05.131-2.852.088-.801.229-1.43.424-1.886.196-.456.452-.79.77-.998.317-.209.705-.313 1.164-.313l.132.336zm-8.606 8.516c1.723 0 3.12 1.396 3.12 3.12 0 1.723-1.397 3.119-3.12 3.119a3.122 3.122 0 01-3.119-3.12c0-1.722 1.396-3.119 3.12-3.119z" />
      </svg>
    ),
    academia: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0L1.5 4.2V7h21V4.2L12 0zM4.5 9v10h2V9h-2zm6.5 0v10h2V9h-2zm6.5 0v10h2V9h-2zM1.5 21v2h21v-2H1.5z" />
      </svg>
    ),
    devpost: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M6.002 1.61L0 12.004 6.002 22.4h11.996L24 12.004 17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.16 6.302-6.456 6.302H7.595zm2.517 2.449v7.714h1.332c2.255 0 3.912-.879 3.912-3.857 0-2.936-1.683-3.857-3.912-3.857z" />
      </svg>
    ),
    gitlab: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 01-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 014.82 2a.43.43 0 01.58 0 .42.42 0 01.11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0118.6 2a.43.43 0 01.58 0 .42.42 0 01.11.18l2.44 7.51 1.22 3.78a.84.84 0 01-.3.94z" />
      </svg>
    ),
    youtube: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
      </svg>
    ),
  }
  return (
    <div style={{ color }}>
      {svgs[name] ?? <Globe className="w-5 h-5" />}
    </div>
  )
}

// ─── Section: Hero ───────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      aria-label="Introduction"
    >
      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            'radial-gradient(circle, var(--border) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.5,
        }}
      />

      {/* Gradient fade at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'linear-gradient(to bottom, transparent, var(--bg))',
        }}
      />

      {/* ECG animation */}
      <div
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="w-full h-32 opacity-[0.12]"
        >
          <path
            className="ecg-path"
            d="M0,60 L180,60 C195,60 200,48 210,48 C220,48 225,60 240,60
               L340,60 L348,70 L353,8 L360,88 L368,60
               L500,60 C515,60 520,42 530,42 C540,42 545,60 560,60
               L720,60 L730,60 C745,60 750,48 760,48 C770,48 775,60 790,60
               L890,60 L898,70 L903,8 L910,88 L918,60
               L1050,60 C1065,60 1070,42 1080,42 C1090,42 1095,60 1110,60
               L1440,60"
            fill="none"
            stroke="var(--accent-green)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="container-main relative z-10 pt-28 pb-16">
        <div className="max-w-3xl">
          {/* Open-to badge */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="mb-8"
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs border"
              style={{
                borderColor: 'var(--accent-green)',
                color: 'var(--accent-green)',
                background: 'rgba(0,255,135,0.06)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              Open to: Clinical AI · Research Collaborations · Healthcare Innovation
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="text-4xl sm:text-5xl lg:text-[3.4rem] font-heading font-semibold tracking-tight leading-[1.1] mb-6"
          >
            Building{' '}
            <span className="text-accent">Clinical AI,</span>{' '}
            Healthcare Data, and{' '}
            <span className="text-accent-blue">Medication Safety</span>{' '}
            Systems for the Future of Healthcare
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="font-mono text-sm text-muted mb-6"
          >
            B.Pharm Student · AI Engineer · Co-Founder, Kemirix Health Technologies
          </motion.p>

          {/* Intro */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-base sm:text-lg max-w-2xl mb-10 leading-relaxed text-muted"
          >
            I build clinical AI systems, healthcare datasets, and medication safety
            infrastructure designed to help healthcare professionals make safer and more
            informed decisions. My work combines pharmacy, artificial intelligence, machine
            learning, and healthcare data systems to improve patient safety and clinical
            decision support.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.5 }}
            className="flex flex-wrap gap-3"
          >
            <a href="#projects" className="btn-primary">
              View Projects <ArrowRight size={15} />
            </a>
            <a href="#contact" className="btn-secondary">
              <Mail size={15} /> Contact Me
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted"
        aria-label="Scroll down"
      >
        <ChevronDown size={18} className="animate-bounce" />
      </motion.a>
    </section>
  )
}

// ─── Section: What I'm Building ──────────────────────────────────────────────

const FOCUS_AREAS = [
  {
    Icon: Brain,
    title: 'Clinical AI',
    description:
      'Building AI systems that support safer medication decisions and clinical decision support at the point of care.',
    accentColor: '#00FF87',
  },
  {
    Icon: Database,
    title: 'Healthcare Data',
    description:
      'Creating pharmacovigilance and drug interaction datasets for research, model training, and healthcare AI development.',
    accentColor: '#0066FF',
  },
  {
    Icon: Shield,
    title: 'Medication Safety',
    description:
      'Developing tools that identify drug interactions, pharmacogenomic risks, and contraindications before patient harm occurs.',
    accentColor: '#9B59B6',
  },
  {
    Icon: BookOpen,
    title: 'Education Technology',
    description:
      'Building AI-powered learning systems for healthcare and science education that improve student outcomes at scale.',
    accentColor: '#E67E22',
  },
]

function WhatImBuilding() {
  return (
    <section className="section-padding" aria-label="Focus Areas">
      <div className="container-main">
        <SectionHeader
          label="Focus Areas"
          title="What I'm Building"
          description="Every project targets a real clinical or educational problem at the intersection of healthcare and artificial intelligence."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FOCUS_AREAS.map((area, i) => (
            <FadeUp key={area.title} delay={i * 0.07}>
              <div className="card-base p-6 h-full group hover:-translate-y-0.5 transition-all duration-200">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{
                    background: `${area.accentColor}14`,
                    color: area.accentColor,
                  }}
                >
                  <area.Icon size={20} />
                </div>
                <h3 className="font-heading font-semibold text-base mb-2">{area.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{area.description}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Section: About ──────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <section id="about" className="section-padding" aria-label="About Emmanuel">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Portrait */}
          <FadeUp className="lg:col-span-2">
            <div className="relative max-w-sm mx-auto lg:mx-0">
              <div
                className="w-full aspect-[4/5] rounded-2xl overflow-hidden flex items-center justify-center"
                style={{
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                }}
              >
                {/*
                  Replace the placeholder below with:
                  <Image src="/emmanuel-portrait.jpg" alt="Emmanuel Bain Oduwo" fill className="object-cover" />
                  once you add the photo to /public/
                */}
                <div className="flex flex-col items-center gap-4 py-16 text-muted">
                  <div
                    className="w-28 h-28 rounded-full flex items-center justify-center text-3xl font-heading font-bold"
                    style={{ background: 'var(--border)', color: 'var(--accent-green)' }}
                  >
                    EBO
                  </div>
                  <span className="text-xs font-mono opacity-60">[ Add photo to /public/ ]</span>
                </div>
              </div>
              {/* Accent corner decorations */}
              <div
                className="absolute -bottom-3 -right-3 w-16 h-16 rounded-xl -z-10"
                style={{ background: 'var(--accent-green)', opacity: 0.08 }}
              />
              <div
                className="absolute -top-3 -left-3 w-10 h-10 rounded-lg -z-10"
                style={{ background: 'var(--accent-blue)', opacity: 0.1 }}
              />
            </div>
          </FadeUp>

          {/* Bio */}
          <FadeUp delay={0.12} className="lg:col-span-3">
            <span className="section-label">About Me</span>
            <h2 className="section-title mb-6">Emmanuel Bain Oduwo</h2>
            <div className="space-y-4 text-base leading-relaxed text-muted">
              <p>
                I am a Bachelor of Pharmacy student at Parul University and Co-Founder of{' '}
                <span style={{ color: 'var(--text)' }} className="font-medium">
                  Kemirix Health Technologies.
                </span>
              </p>
              <p>
                My work focuses on the intersection of healthcare, artificial intelligence,
                and medication safety. I build clinical AI systems, healthcare datasets, and
                machine learning infrastructure that help healthcare professionals make safer
                decisions and support healthcare research.
              </p>
              <p>
                My long-term goal is to contribute to the development of trustworthy
                clinical decision-support systems that improve healthcare outcomes at scale.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-5 text-sm text-muted">
              <span className="flex items-center gap-2">
                <MapPin size={14} className="text-accent flex-shrink-0" />
                Parul University, India
              </span>
              <span className="flex items-center gap-2">
                <Calendar size={14} className="text-accent flex-shrink-0" />
                Graduating June 2028
              </span>
              <span className="flex items-center gap-2">
                <GraduationCap size={14} className="text-accent flex-shrink-0" />
                Current GPA: 7.75
              </span>
            </div>

            <div className="mt-8 flex gap-3">
              <a href="#projects" className="btn-primary text-xs px-4 py-2">
                View Projects <ArrowRight size={14} />
              </a>
              <a href="#contact" className="btn-secondary text-xs px-4 py-2">
                <Mail size={14} /> Contact
              </a>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

// ─── Section: Selected Highlights ────────────────────────────────────────────

const ICON_MAP: Record<string, React.ElementType> = {
  building: Building2,
  database: Database,
  cpu: Cpu,
  shield: Shield,
  award: Award,
  rocket: Rocket,
  users: Users,
  graduation: GraduationCap,
}

function HighlightsSection() {
  return (
    <section className="section-padding" aria-label="Selected Highlights">
      <div className="container-main">
        <SectionHeader
          label="Evidence"
          title="Selected Highlights"
          description="Credentials, certifications, contributions, and verifiable evidence of work."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {HIGHLIGHTS.map((h, i) => {
            const Icon = ICON_MAP[h.icon] ?? CheckCircle
            return (
              <FadeUp key={i} delay={i * 0.04}>
                <div className="card-base p-4 flex items-start gap-3 hover:-translate-y-0.5 transition-all duration-200">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'rgba(0,255,135,0.1)', color: 'var(--accent-green)' }}
                  >
                    <Icon size={15} />
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>
                    {h.text}
                  </p>
                </div>
              </FadeUp>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Section: Projects ───────────────────────────────────────────────────────

function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
  return (
    <div className="card-base p-6 sm:p-8 flex flex-col h-full hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <span className="font-mono text-xs text-accent-blue mb-1.5 block">{project.category}</span>
          <h3 className="font-heading font-semibold text-lg leading-tight">{project.title}</h3>
        </div>
        <StatusBadge status={project.status} color={project.statusColor} />
      </div>

      <div className="space-y-4 mb-6 flex-1">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted mb-1.5">Problem</p>
          <p className="text-sm leading-relaxed text-muted">{project.problem}</p>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted mb-1.5">Solution</p>
          <p className="text-sm leading-relaxed text-muted">{project.solution}</p>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted mb-1.5">Impact</p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>
            {project.impact}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.technologies.map((tech) => (
          <TechTag key={tech} tech={tech} />
        ))}
      </div>

      <div
        className="flex flex-wrap gap-4 pt-4 border-t"
        style={{ borderColor: 'var(--border)' }}
      >
        {project.link ? (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:opacity-80 transition-opacity"
          >
            <Globe size={13} /> View Live <ExternalLink size={11} />
          </a>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-xs text-muted font-mono">
            Link coming soon
          </span>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted hover:text-accent transition-colors"
          >
            GitHub <ExternalLink size={11} />
          </a>
        )}
      </div>
    </div>
  )
}

function ProjectsSection() {
  const featured = PROJECTS.filter((p) => p.featured)
  const others = PROJECTS.filter((p) => !p.featured)

  return (
    <section id="projects" className="section-padding" aria-label="Projects">
      <div className="container-main">
        <SectionHeader
          label="Projects"
          title="Featured Projects"
          description="Clinical AI systems, medication safety infrastructure, and healthcare datasets designed for real-world impact."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {featured.slice(0, 2).map((p, i) => (
            <FadeUp key={p.id} delay={i * 0.08}>
              <ProjectCard project={p} />
            </FadeUp>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-16">
          {featured.slice(2).map((p, i) => (
            <FadeUp key={p.id} delay={i * 0.08}>
              <ProjectCard project={p} />
            </FadeUp>
          ))}
        </div>

        <FadeUp>
          <h3 className="font-heading font-semibold text-xl mb-6">More Projects</h3>
        </FadeUp>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {others.map((p, i) => (
            <FadeUp key={p.id} delay={i * 0.08}>
              <ProjectCard project={p} />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Section: Built & Deployed ───────────────────────────────────────────────

const BUILT_ITEMS = [
  {
    title: 'AfriPharma ADR Watch',
    description:
      'Open pharmacovigilance dataset for African drug safety research. Published on Hugging Face.',
    status: 'Published' as const,
    color: 'green' as const,
    link: 'https://huggingface.co/datasets/PLACEHOLDER',
  },
  {
    title: 'Kemirix DDI Database',
    description:
      'Structured drug-drug interaction dataset for clinical AI development. Published on Hugging Face.',
    status: 'Published' as const,
    color: 'green' as const,
    link: 'https://huggingface.co/datasets/PLACEHOLDER',
  },
  {
    title: 'Kemirix Clinical Platform',
    description:
      'Medication safety platform — drug interactions, pharmacogenomics, contraindication screening.',
    status: 'In Development' as const,
    color: 'blue' as const,
    link: null,
  },
  {
    title: 'DrugD Clinical AI',
    description:
      'RAG-powered clinical AI assistant for medication guidance, herb-drug interactions, and drug safety.',
    status: 'In Development' as const,
    color: 'blue' as const,
    link: null,
  },
  {
    title: 'Cloud TPU Training Pipeline',
    description:
      'Production LLM fine-tuning infrastructure on Google Cloud TPU v5e using PyTorch/XLA and JAX.',
    status: 'Active' as const,
    color: 'green' as const,
    link: null,
  },
  {
    title: 'LYSI 4 Educational Platform',
    description:
      'AI-powered school management and adaptive learning platform for healthcare and science students.',
    status: 'In Development' as const,
    color: 'blue' as const,
    link: null,
  },
]

function BuiltDeployedSection() {
  return (
    <section className="section-padding" aria-label="Built and Deployed">
      <div className="container-main">
        <SectionHeader
          label="Built & Deployed"
          title="Tangible Outcomes"
          description="Public deployments, published datasets, and active production systems with verifiable evidence."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BUILT_ITEMS.map((item, i) => (
            <FadeUp key={item.title} delay={i * 0.06}>
              <div className="card-base p-5 flex flex-col h-full hover:-translate-y-0.5 transition-all duration-200">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="font-heading font-semibold text-sm leading-tight">{item.title}</h3>
                  <StatusBadge status={item.status} color={item.color} />
                </div>
                <p className="text-xs text-muted leading-relaxed flex-1 mb-4">{item.description}</p>
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:opacity-80 transition-opacity"
                  >
                    View Evidence <ExternalLink size={12} />
                  </a>
                ) : (
                  <span className="text-xs text-muted font-mono">Link coming soon</span>
                )}
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Section: Research & Data ─────────────────────────────────────────────────

const RESEARCH_CERTS = [
  { title: 'PhysioNet Credentialed Researcher', org: 'MIT / PhysioNet', Icon: Shield },
  { title: 'DrugBank Academic License', org: 'DrugBank / LifeSci', Icon: Database },
  { title: 'CITI Human Research Ethics', org: 'CITI Program', Icon: Award },
  { title: 'CITI Data & Specimen Research', org: 'CITI Program', Icon: Award },
]

const RESEARCH_DATASETS = [
  {
    title: 'AfriPharma ADR Watch',
    description:
      'Open pharmacovigilance dataset focused on adverse drug reactions across Africa, designed for drug safety research and clinical AI training.',
    tags: ['Pharmacovigilance', 'MedDRA', 'ADR', 'Africa'],
    link: 'https://huggingface.co/datasets/PLACEHOLDER',
    status: 'Published',
  },
  {
    title: 'Kemirix DDI Database',
    description:
      'Curated clinical drug-drug interaction database for use in medication safety AI, clinical decision support training, and healthcare ML research.',
    tags: ['Drug Interactions', 'Clinical AI', 'DDI', 'Safety'],
    link: 'https://huggingface.co/datasets/PLACEHOLDER',
    status: 'Published',
  },
  {
    title: 'Clinical Reasoning Datasets',
    description:
      'Healthcare datasets curated for LLM fine-tuning, evaluation, and clinical reasoning benchmarks.',
    tags: ['LLM Training', 'Clinical NLP', 'Healthcare AI', 'Benchmarks'],
    link: null,
    status: 'In Development',
  },
]

function ResearchSection() {
  return (
    <section id="research" className="section-padding" aria-label="Research and Data Contributions">
      <div className="container-main">
        <SectionHeader
          label="Research"
          title="Research & Data Contributions"
          description="Published datasets, research certifications, and healthcare AI contributions."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Datasets */}
          <FadeUp>
            <h3
              className="font-heading font-semibold text-base mb-5"
              style={{ color: 'var(--accent-blue)' }}
            >
              Published Datasets
            </h3>
            <div className="space-y-4">
              {RESEARCH_DATASETS.map((ds) => (
                <div key={ds.title} className="card-base p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h4 className="font-heading font-medium text-sm">{ds.title}</h4>
                    <StatusBadge
                      status={ds.status}
                      color={ds.status === 'Published' ? 'green' : 'blue'}
                    />
                  </div>
                  <p className="text-xs text-muted mb-3 leading-relaxed">{ds.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {ds.tags.map((t) => <TechTag key={t} tech={t} />)}
                  </div>
                  {ds.link && (
                    <a
                      href={ds.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-accent hover:opacity-80"
                    >
                      Hugging Face Dataset <ExternalLink size={11} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </FadeUp>

          {/* Credentials */}
          <FadeUp delay={0.1}>
            <h3
              className="font-heading font-semibold text-base mb-5"
              style={{ color: 'var(--accent-blue)' }}
            >
              Research Credentials
            </h3>
            <div className="space-y-3">
              {RESEARCH_CERTS.map((cert) => (
                <div key={cert.title} className="card-base p-4 flex items-start gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(0,255,135,0.1)', color: 'var(--accent-green)' }}
                  >
                    <cert.Icon size={15} />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{cert.title}</p>
                    <p className="text-xs text-muted mt-0.5">{cert.org}</p>
                    <span
                      className="font-mono text-xs mt-1 inline-block"
                      style={{ color: 'var(--accent-green)' }}
                    >
                      Verified Credential
                    </span>
                  </div>
                </div>
              ))}

              {/* Extra context */}
              <div
                className="rounded-xl p-4 mt-2"
                style={{ background: 'rgba(0,102,255,0.05)', border: '1px solid rgba(0,102,255,0.15)' }}
              >
                <p className="text-xs leading-relaxed" style={{ color: 'var(--accent-blue)' }}>
                  All datasets are designed to advance pharmacovigilance research and support
                  clinical AI development, with a focus on populations underrepresented in
                  existing global databases.
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

// ─── Section: Experience ──────────────────────────────────────────────────────

function ExperienceSection() {
  return (
    <section id="experience" className="section-padding" aria-label="Experience">
      <div className="container-main">
        <SectionHeader
          label="Experience"
          title="Work & Research Experience"
        />
        <div className="space-y-5">
          {EXPERIENCE.map((exp, i) => (
            <FadeUp key={`${exp.role}-${exp.company}`} delay={i * 0.08}>
              <div className="card-base p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
                  <div>
                    <h3 className="font-heading font-semibold text-lg">{exp.role}</h3>
                    <p className="text-accent text-sm font-medium mt-0.5">{exp.company}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs text-muted">{exp.period}</span>
                    <span
                      className="font-mono text-xs px-2 py-0.5 rounded"
                      style={{ background: 'var(--border)', color: 'var(--text-muted)' }}
                    >
                      {exp.type}
                    </span>
                  </div>
                </div>
                <ul className="space-y-2.5">
                  {exp.contributions.map((c, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-muted">
                      <CheckCircle size={14} className="text-accent mt-0.5 flex-shrink-0" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Section: Teaching & Community ───────────────────────────────────────────

const IMPACT_STATS = [
  { number: '50+', label: 'Students taught Biology, Chemistry, and Mathematics', Icon: BookOpen },
  { number: '30+', label: 'Learners trained in Python, AI, ML, and Data Science', Icon: Cpu },
  { number: '2', label: 'Educational technology platforms built and deployed', Icon: Globe },
  { number: '80+', label: 'Total students impacted across science, AI, and programming', Icon: Users },
]

const TEACHING_CATEGORIES = [
  {
    title: 'Science Education',
    items: ['Biology, Chemistry, Mathematics', 'Taught 50+ students', 'Secondary and tertiary level'],
  },
  {
    title: 'AI & Technology Training',
    items: ['Python, AI, ML, Data Science', 'TechFryz learning programs', '30+ learners trained'],
  },
  {
    title: 'EdTech Development',
    items: ['LYSI 4 Solutions platform', 'AI Healthcare Learning Platform', 'School management systems'],
  },
]

function TeachingSection() {
  return (
    <section className="section-padding" aria-label="Teaching and Community Impact">
      <div className="container-main">
        <SectionHeader
          label="Impact"
          title="Teaching & Community Impact"
          description="Extending healthcare and technology knowledge to the next generation of learners."
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {IMPACT_STATS.map((stat, i) => (
            <FadeUp key={stat.label} delay={i * 0.08}>
              <div className="card-base p-5 text-center flex flex-col items-center">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                  style={{ background: 'rgba(0,255,135,0.1)', color: 'var(--accent-green)' }}
                >
                  <stat.Icon size={18} />
                </div>
                <p className="font-heading font-bold text-3xl text-accent mb-1">{stat.number}</p>
                <p className="text-xs text-muted leading-relaxed text-center">{stat.label}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {TEACHING_CATEGORIES.map((cat, i) => (
            <FadeUp key={cat.title} delay={i * 0.08}>
              <div className="card-base p-5">
                <h4
                  className="font-heading font-semibold text-sm mb-4"
                  style={{ color: 'var(--accent-blue)' }}
                >
                  {cat.title}
                </h4>
                <ul className="space-y-2">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-muted">
                      <span className="accent-dot flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Section: Education ───────────────────────────────────────────────────────

const DEGREE_COURSES = [
  'Pharmacology', 'Clinical Pharmacy', 'Medicinal Chemistry',
  'Organic Chemistry', 'Pharmacokinetics', 'Pathophysiology',
  'Pharmaceutics', 'Drug Regulatory Affairs', 'Rational Use of Medicines',
]

const ADDITIONAL_CREDENTIALS = [
  { title: 'PhysioNet Credentialed Researcher', org: 'MIT / PhysioNet', Icon: Shield },
  { title: 'DrugBank Academic License', org: 'DrugBank / LifeSci', Icon: Database },
  { title: 'CITI Human Research Ethics', org: 'CITI Program', Icon: Award },
  { title: 'CITI Data & Specimen Research', org: 'CITI Program', Icon: Award },
  { title: 'Goethe-Zertifikat A1', org: 'Goethe-Institut', Icon: Globe },
]

function EducationSection() {
  return (
    <section id="education" className="section-padding" aria-label="Education">
      <div className="container-main">
        <SectionHeader label="Education" title="Education & Credentials" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Degree card */}
          <FadeUp>
            <div className="card-base p-6 sm:p-8 h-full">
              <div className="flex items-start gap-4 mb-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(0,102,255,0.1)', color: 'var(--accent-blue)' }}
                >
                  <GraduationCap size={22} />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg">Bachelor of Pharmacy</h3>
                  <p className="text-accent text-sm font-medium mt-0.5">Parul University</p>
                  <p className="text-muted text-xs mt-1 font-mono">2024 – June 2028 · GPA: 7.75</p>
                </div>
              </div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted mb-3">
                Relevant Coursework
              </p>
              <div className="flex flex-wrap gap-1.5">
                {DEGREE_COURSES.map((c) => <TechTag key={c} tech={c} />)}
              </div>
            </div>
          </FadeUp>

          {/* Credentials card */}
          <FadeUp delay={0.1}>
            <div className="card-base p-6 sm:p-8 h-full">
              <h3 className="font-heading font-semibold text-base mb-5">Additional Credentials</h3>
              <div className="space-y-1">
                {ADDITIONAL_CREDENTIALS.map((cred) => (
                  <div
                    key={cred.title}
                    className="flex items-center gap-3 py-3 border-b last:border-0"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(0,255,135,0.08)', color: 'var(--accent-green)' }}
                    >
                      <cred.Icon size={13} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{cred.title}</p>
                      <p className="text-xs text-muted">{cred.org}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

// ─── Section: Skills ──────────────────────────────────────────────────────────

function SkillsSection() {
  return (
    <section id="skills" className="section-padding" aria-label="Skills">
      <div className="container-main">
        <SectionHeader
          label="Skills"
          title="Technical & Clinical Skills"
          description="Bridging pharmaceutical science with modern AI engineering, MLOps, and clinical informatics."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.entries(SKILLS).map(([category, skills], i) => (
            <FadeUp key={category} delay={i * 0.06}>
              <div className="card-base p-5 h-full">
                <h3
                  className="font-heading font-semibold text-sm mb-4"
                  style={{ color: 'var(--accent-blue)' }}
                >
                  {category}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((skill) => <TechTag key={skill} tech={skill} />)}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Section: Public Profiles ─────────────────────────────────────────────────

function PublicProfilesSection() {
  return (
    <section className="section-padding" aria-label="Public Profiles">
      <div className="container-main">
        <SectionHeader
          label="Profiles"
          title="Public Profiles"
          description="Research identity, open-source contributions, and professional presence across platforms."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {PUBLIC_PROFILES.map((profile, i) => (
            <FadeUp key={profile.name} delay={i * 0.04}>
              <a
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-base p-5 flex flex-col gap-3 hover:-translate-y-0.5 transition-all duration-200 group block"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${profile.color}18` }}
                    >
                      <PlatformSvg name={profile.icon} color={profile.color} />
                    </div>
                    <h3 className="font-heading font-semibold text-sm">{profile.name}</h3>
                  </div>
                  <ExternalLink
                    size={13}
                    className="text-muted group-hover:text-accent transition-colors flex-shrink-0"
                  />
                </div>
                <p className="text-xs text-muted leading-relaxed">{profile.description}</p>
              </a>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Section: Open To ─────────────────────────────────────────────────────────

const OPEN_TO = [
  'Clinical AI Engineering',
  'Healthcare Machine Learning',
  'Drug Safety Research',
  'Pharmacovigilance',
  'Clinical Informatics',
  'Healthcare Data Science',
  'Startup Collaborations',
  'Research Partnerships',
]

function OpenToSection() {
  return (
    <section className="section-padding" aria-label="Open To">
      <div className="container-main">
        <SectionHeader
          label="Availability"
          title="Open To"
          description="Currently accepting opportunities that align with healthcare AI, clinical research, and medication safety."
        />
        <FadeUp>
          <div className="card-base p-8 max-w-2xl">
            <div className="flex flex-wrap gap-3">
              {OPEN_TO.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border"
                  style={{
                    borderColor: 'var(--accent-green)',
                    color: 'var(--accent-green)',
                    background: 'rgba(0,255,135,0.05)',
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {item}
                </span>
              ))}
            </div>
            <div
              className="mt-8 pt-6 border-t flex flex-col sm:flex-row gap-3"
              style={{ borderColor: 'var(--border)' }}
            >
              <a href="#contact" className="btn-primary">
                <Mail size={15} /> Get in Touch
              </a>
              <a
                href="mailto:emmanuelbain@kemirix.com"
                className="btn-secondary"
              >
                emmanuelbain@kemirix.com <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

// ─── Section: Contact ─────────────────────────────────────────────────────────

type FormState = { name: string; email: string; organization: string; subject: string; message: string }
type SubmitStatus = 'idle' | 'sending' | 'sent' | 'error'

function ContactSection() {
  const [form, setForm] = useState<FormState>({
    name: '', email: '', organization: '', subject: '', message: '',
  })
  const [status, setStatus] = useState<SubmitStatus>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = 'var(--accent-green)'
  }
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = 'var(--border)'
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'var(--bg)',
    border: '1px solid var(--border)',
    color: 'var(--text)',
    borderRadius: '0.5rem',
    padding: '0.625rem 1rem',
    fontSize: '0.875rem',
    outline: 'none',
    transition: 'border-color 0.15s ease',
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL ?? ''
      const res = await fetch(`${apiBase}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', organization: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section-padding" aria-label="Contact">
      <div className="container-main">
        <SectionHeader
          label="Contact"
          title="Get in Touch"
          description="Whether you're working on clinical AI, healthcare research, or have an opportunity to discuss — I'd like to hear from you."
        />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Contact details */}
          <FadeUp className="lg:col-span-2">
            <div className="space-y-6">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-muted mb-3">Email</p>
                <a
                  href="mailto:emmanuelbain@kemirix.com"
                  className="flex items-center gap-2 text-sm hover:text-accent transition-colors"
                >
                  <Mail size={14} className="text-accent" />
                  emmanuelbain@kemirix.com
                </a>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-muted mb-3">Location</p>
                <p className="flex items-center gap-2 text-sm text-muted">
                  <MapPin size={14} className="text-accent flex-shrink-0" />
                  Parul University, India
                </p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-muted mb-3">Response Time</p>
                <p className="text-sm text-muted">Usually within 48 hours</p>
              </div>

              <div className="divider" />

              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-muted mb-3">Best For</p>
                <ul className="space-y-2">
                  {[
                    'Research collaborations',
                    'Clinical AI opportunities',
                    'Dataset inquiries',
                    'Speaking or teaching',
                    'Healthcare innovation projects',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-muted">
                      <span className="accent-dot flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeUp>

          {/* Form */}
          <FadeUp delay={0.1} className="lg:col-span-3">
            {status === 'sent' ? (
              <div
                className="card-base p-8 flex flex-col items-center justify-center gap-4 text-center min-h-72"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(0,255,135,0.12)', color: 'var(--accent-green)' }}
                >
                  <CheckCircle size={24} />
                </div>
                <h3 className="font-heading font-semibold text-lg">Message Sent</h3>
                <p className="text-sm text-muted max-w-xs">
                  Thank you for reaching out. I'll get back to you within 48 hours.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="btn-secondary mt-2 text-xs px-4 py-2"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card-base p-6 sm:p-8 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block font-mono text-xs text-muted mb-1.5">
                      Name *
                    </label>
                    <input
                      id="name" name="name" type="text" required
                      value={form.name} onChange={handleChange}
                      onFocus={handleFocus} onBlur={handleBlur}
                      placeholder="Your name"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-mono text-xs text-muted mb-1.5">
                      Email *
                    </label>
                    <input
                      id="email" name="email" type="email" required
                      value={form.email} onChange={handleChange}
                      onFocus={handleFocus} onBlur={handleBlur}
                      placeholder="your@email.com"
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="organization" className="block font-mono text-xs text-muted mb-1.5">
                      Organization
                    </label>
                    <input
                      id="organization" name="organization" type="text"
                      value={form.organization} onChange={handleChange}
                      onFocus={handleFocus} onBlur={handleBlur}
                      placeholder="Company / Institution"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block font-mono text-xs text-muted mb-1.5">
                      Subject *
                    </label>
                    <input
                      id="subject" name="subject" type="text" required
                      value={form.subject} onChange={handleChange}
                      onFocus={handleFocus} onBlur={handleBlur}
                      placeholder="What's this about?"
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block font-mono text-xs text-muted mb-1.5">
                    Message *
                  </label>
                  <textarea
                    id="message" name="message" required rows={5}
                    value={form.message} onChange={handleChange}
                    onFocus={handleFocus} onBlur={handleBlur}
                    placeholder="Tell me about your project, opportunity, or collaboration..."
                    style={{ ...inputStyle, resize: 'none' }}
                  />
                </div>

                {status === 'error' && (
                  <p className="text-sm text-red-400 flex items-center gap-2">
                    <X size={14} />
                    Something went wrong. Please email me at{' '}
                    <a
                      href="mailto:emmanuelbain@kemirix.com"
                      className="underline hover:opacity-80"
                    >
                      emmanuelbain@kemirix.com
                    </a>
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary w-full justify-center disabled:opacity-60"
                >
                  {status === 'sending' ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send size={14} /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer
      className="py-10 border-t"
      style={{ borderColor: 'var(--border)' }}
      role="contentinfo"
    >
      <div className="container-main">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
          <div className="flex items-center gap-3">
            <span className="font-heading font-semibold text-accent text-base">EBO</span>
            <span className="text-xs font-mono">Emmanuel Bain Oduwo</span>
          </div>
          <p className="text-xs text-center">
            Clinical AI · Medication Safety · Healthcare Research
          </p>
          <p className="text-xs font-mono">
            © {new Date().getFullYear()} · bain.me
          </p>
        </div>
      </div>
    </footer>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <WhatImBuilding />
        <AboutSection />
        <HighlightsSection />
        <ProjectsSection />
        <BuiltDeployedSection />
        <ResearchSection />
        <ExperienceSection />
        <TeachingSection />
        <EducationSection />
        <SkillsSection />
        <PublicProfilesSection />
        <OpenToSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}