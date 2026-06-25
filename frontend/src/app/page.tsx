'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import {
  ArrowRight, ExternalLink, Mail, MapPin, Calendar,
  CheckCircle, Award, Database, Cpu, Rocket, Users,
  Building2, Shield, Globe, Brain, BookOpen, Send,
  GraduationCap, X, ChevronDown,
} from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import { PROJECTS, EXPERIENCE, SKILLS, PUBLIC_PROFILES, HIGHLIGHTS } from '@/lib/data'

// ─── Motion wrapper ─────────────────────────────────────────────────────────

function Up({
  children, delay = 0, className = '',
}: {
  children: React.ReactNode; delay?: number; className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Section header ──────────────────────────────────────────────────────────

function SectionHead({ label, title, sub }: { label: string; title: string; sub?: string }) {
  return (
    <Up className="mb-10">
      <span className="label">{label}</span>
      <h2 className="h2">{title}</h2>
      {sub && <p className="muted text-base max-w-xl leading-relaxed">{sub}</p>}
    </Up>
  )
}

// ─── Status badge ────────────────────────────────────────────────────────────

function Badge({ status, color }: { status: string; color: 'green' | 'blue' }) {
  return (
    <span className={color === 'green' ? 'badge-green' : 'badge-blue'}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {status}
    </span>
  )
}

// ─── Platform icons ──────────────────────────────────────────────────────────

function PlatformIcon({ name, color }: { name: string; color: string }) {
  const icons: Record<string, React.ReactNode> = {
    linkedin: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.063 2.063 0 110-4.126 2.063 2.063 0 010 4.126zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
    github: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>,
    huggingface: <svg viewBox="0 0 95 88" fill="currentColor" className="w-5 h-5"><path d="M47.206 0C21.137 0 0 19.69 0 43.97c0 24.281 21.137 43.97 47.206 43.97S94.41 68.251 94.41 43.97C94.41 19.69 73.273 0 47.206 0zm0 6.62c22.566 0 40.862 16.73 40.862 37.35S69.772 81.32 47.206 81.32c-22.565 0-40.86-16.73-40.86-37.35S24.64 6.62 47.206 6.62zm-9.01 18.51a6.5 6.5 0 00-6.5 6.5 6.5 6.5 0 006.5 6.5 6.5 6.5 0 006.5-6.5 6.5 6.5 0 00-6.5-6.5zm18.02 0a6.5 6.5 0 00-6.5 6.5 6.5 6.5 0 006.5 6.5 6.5 6.5 0 006.5-6.5 6.5 6.5 0 00-6.5-6.5zm-22.2 20.5c-.73 0-1.41.35-1.84.95-.43.6-.54 1.36-.3 2.06 2.49 7.32 9.36 12.25 17.12 12.25 7.76 0 14.62-4.93 17.12-12.25.24-.7.13-1.46-.3-2.06-.43-.6-1.1-.95-1.84-.95H34.016z"/></svg>,
    kaggle: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M18.825 23.859c-.022.092-.097.141-.185.141h-3.085a.283.283 0 01-.222-.107L11.6 17.894l-1.378 1.337v4.558a.22.22 0 01-.219.22H7.515a.22.22 0 01-.22-.22V.158a.22.22 0 01.22-.22h2.488a.22.22 0 01.218.22v13.092l5.985-6.092a.277.277 0 01.224-.097h3.166c.08 0 .153.044.183.119.03.074.012.158-.043.215l-6.044 6.148 6.121 9.864a.19.19 0 01.012.215z"/></svg>,
    orcid: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 01-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.016-5.325 5.016h-3.919V7.416zm1.444 1.303v7.444h2.297c2.563 0 3.903-1.613 3.903-3.722 0-2.016-1.228-3.722-3.812-3.722h-2.388z"/></svg>,
    researchgate: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19.586 0c-.818 0-1.508.19-2.073.565-.563.377-.97.936-1.213 1.68a12 12 0 00-.39 2.256 22.8 22.8 0 00-.1 2.473v1.28c0 1.39.099 2.601.3 3.637.2 1.037.536 1.843 1.007 2.418.473.574 1.133.86 1.98.86.49 0 .908-.074 1.254-.219a2.8 2.8 0 00.857-.63 4.47 4.47 0 00.603-1.07 6.83 6.83 0 00.316-1.577 25.3 25.3 0 00.101-2.295V9.08c0-1.452-.055-2.608-.164-3.468-.109-.86-.277-1.53-.506-2.01a2.1 2.1 0 00-.845-1.022A2.28 2.28 0 0019.586 0zM10.98 8.516c-2.434 0-4.39 1.956-4.39 4.39s1.956 4.39 4.39 4.39 4.39-1.956 4.39-4.39-1.956-4.39-4.39-4.39zM2 0C.896 0 0 .896 0 2v20c0 1.104.896 2 2 2h20c1.104 0 2-.896 2-2V2c0-1.104-.896-2-2-2H2zm17.586 1.277c.361 0 .673.09.936.27.263.18.48.469.652.863.172.394.299.914.38 1.561.08.647.12 1.45.12 2.41v1.12c0 1.4-.04 2.53-.12 3.39-.08.86-.218 1.52-.414 1.98a2.4 2.4 0 01-.77 1.072 1.962 1.962 0 01-1.222.367c-.538 0-.966-.186-1.283-.558-.317-.371-.546-.942-.688-1.713-.141-.77-.212-1.786-.212-3.046V8.99c0-1.1.044-2.05.131-2.852.088-.801.229-1.43.424-1.886.196-.456.452-.79.77-.998.317-.209.705-.313 1.164-.313l.132.336zm-8.606 8.516c1.723 0 3.12 1.396 3.12 3.12 0 1.723-1.397 3.119-3.12 3.119a3.122 3.122 0 01-3.119-3.12c0-1.722 1.396-3.119 3.12-3.119z"/></svg>,
    academia: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 0L1.5 4.2V7h21V4.2L12 0zM4.5 9v10h2V9h-2zm6.5 0v10h2V9h-2zm6.5 0v10h2V9h-2zM1.5 21v2h21v-2H1.5z"/></svg>,
    devpost: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M6.002 1.61L0 12.004 6.002 22.4h11.996L24 12.004 17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.16 6.302-6.456 6.302H7.595zm2.517 2.449v7.714h1.332c2.255 0 3.912-.879 3.912-3.857 0-2.936-1.683-3.857-3.912-3.857z"/></svg>,
    gitlab: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 01-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 014.82 2a.43.43 0 01.58 0 .42.42 0 01.11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0118.6 2a.43.43 0 01.58 0 .42.42 0 01.11.18l2.44 7.51 1.22 3.78a.84.84 0 01-.3.94z"/></svg>,
    youtube: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>,
  }
  return <div style={{ color }}>{icons[name] ?? <Globe className="w-5 h-5" />}</div>
}

// ─── HERO ────────────────────────────────────────────────────────────────────

const STATS = [
  { num: '5+', label: 'Projects Built' },
  { num: '10+', label: 'Technologies' },
  { num: '3+', label: 'Years Building' },
  { num: '80+', label: 'Students Taught' },
]

function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      aria-label="Introduction"
    >
      {/* Subtle grid bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          backgroundImage: 'radial-gradient(circle, var(--border) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          opacity: 0.4,
        }}
      />
      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 inset-x-0 h-48 pointer-events-none"
        aria-hidden
        style={{ background: 'linear-gradient(to bottom, transparent, var(--bg))' }}
      />

      <div className="wrap relative z-10 pt-28 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* ── Left ── */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.4 }}
              className="mb-7"
            >
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-mono text-xs border"
                style={{
                  borderColor: 'var(--accent-green)',
                  color: 'var(--accent-green)',
                  background: 'var(--accent-glow)',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                Open to: Clinical AI · Research · Healthcare Innovation
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16, duration: 0.55 }}
              className="font-heading font-semibold tracking-tight leading-[1.08] mb-5"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.1rem)' }}
            >
              Building{' '}
              <span className="accent">Clinical AI,</span>{' '}
              Healthcare Data &{' '}
              <span className="accent-blue">Medication Safety</span>{' '}
              Systems
            </motion.h1>

            {/* Role line */}
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.28 }}
              className="font-mono text-sm muted mb-5"
            >
              B.Pharm Student · AI Engineer · Co-Founder, Kemirix Health Technologies
            </motion.p>

            {/* Intro */}
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.34 }}
              className="text-base muted max-w-lg leading-relaxed mb-8"
            >
              I build clinical AI systems and medication safety infrastructure that help
              healthcare professionals make safer, more informed decisions — combining pharmacy,
              AI, and healthcare data engineering.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <a href="#projects" className="btn-green">
                View Projects <ArrowRight size={15} />
              </a>
              <a href="#contact" className="btn-outline">
                <Mail size={15} /> Contact Me
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.52 }}
              className="grid grid-cols-4 gap-0 divide-x"
              style={{ borderColor: 'var(--border)', border: '1px solid var(--border)', borderRadius: '1rem', overflow: 'hidden' }}
            >
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col items-center justify-center py-4 px-2 text-center"
                  style={{ background: 'var(--card)' }}
                >
                  <span
                    className="font-heading font-bold text-2xl"
                    style={{ color: 'var(--accent-green)' }}
                  >
                    {s.num}
                  </span>
                  <span className="font-mono text-[10px] muted mt-0.5 leading-tight">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Photo + ECG ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.22, duration: 0.6 }}
            className="flex flex-col items-center gap-6"
          >
            {/* Photo */}
            <div className="relative">
              {/* Glow ring */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  boxShadow: '0 0 60px 8px var(--accent-glow)',
                  borderRadius: '1rem',
                }}
              />
              <div
                className="relative overflow-hidden"
                style={{
                  width: 'min(380px, 90vw)',
                  height: 'min(440px, 70vw)',
                  borderRadius: '1rem',
                  border: '2px solid var(--accent-green)',
                }}
              >
                <Image
                  src="/emmanuel-portrait.jpg"
                  alt="Emmanuel Bain Oduwo"
                  fill
                  className="object-cover object-top"
                  priority
                />
                {/* Name overlay at bottom */}
                <div
                  className="absolute bottom-0 inset-x-0 p-4"
                  style={{ background: 'linear-gradient(to top, rgba(8,13,10,0.9) 60%, transparent)' }}
                >
                  <p className="font-heading font-semibold text-lg text-white">Emmanuel Bain Oduwo</p>
                  <p className="font-mono text-xs" style={{ color: 'var(--accent-green)' }}>
                    Parul University · GPA 7.75
                  </p>
                </div>
              </div>
            </div>

            {/* ECG */}
            <div className="w-full overflow-hidden" style={{ opacity: 0.7 }}>
              <svg viewBox="0 0 600 60" className="w-full" preserveAspectRatio="none" style={{ height: 48 }}>
                <path
                  className="ecg-path"
                  d="M0,30 L80,30 L90,30 C95,30 98,22 103,22 C108,22 110,30 116,30
                     L180,30 L188,38 L194,4 L200,52 L206,30
                     L280,30 C285,30 288,18 293,18 C298,18 300,30 306,30
                     L380,30 L388,38 L394,4 L400,52 L406,30
                     L480,30 C485,30 488,22 493,22 C498,22 500,30 506,30
                     L600,30"
                  fill="none"
                  stroke="var(--accent-green)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#building"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 muted"
        aria-label="Scroll down"
      >
        <ChevronDown size={20} className="animate-bounce" />
      </motion.a>
    </section>
  )
}

// ─── WHAT I'M BUILDING ───────────────────────────────────────────────────────

const FOCUS = [
  { Icon: Brain, title: 'Clinical AI', desc: 'AI systems for safer medication decisions and clinical decision support at point of care.', color: '#00FF87' },
  { Icon: Database, title: 'Healthcare Data', desc: 'Pharmacovigilance and drug interaction datasets for research and AI model training.', color: '#3D8EFF' },
  { Icon: Shield, title: 'Medication Safety', desc: 'Tools to identify drug interactions, pharmacogenomic risks, and contraindications.', color: '#A855F7' },
  { Icon: BookOpen, title: 'Education Technology', desc: 'AI-powered learning systems for healthcare and science education at scale.', color: '#F97316' },
]

function WhatBuilding() {
  return (
    <section id="building" className="section-sm" aria-label="Focus Areas">
      <div className="wrap">
        <SectionHead label="Focus Areas" title="What I'm Building" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FOCUS.map((f, i) => (
            <Up key={f.title} delay={i * 0.06}>
              <div className="card-hover p-6 h-full">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${f.color}18`, color: f.color }}
                >
                  <f.Icon size={20} />
                </div>
                <h3 className="font-heading font-semibold text-base mb-2">{f.title}</h3>
                <p className="muted text-sm leading-relaxed">{f.desc}</p>
              </div>
            </Up>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── ABOUT (compact two-column) ──────────────────────────────────────────────

function About() {
  return (
    <section id="about" className="section-sm" aria-label="About">
      <div className="wrap">
        <div
          className="card p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center"
        >
          {/* Bio */}
          <Up className="lg:col-span-2">
            <span className="label">About Me</span>
            <h2 className="h3 mb-4">Emmanuel Bain Oduwo</h2>
            <div className="space-y-3 text-base muted leading-relaxed">
              <p>
                Bachelor of Pharmacy student at{' '}
                <span style={{ color: 'var(--text)' }} className="font-medium">Parul University</span>{' '}
                and Co-Founder of{' '}
                <span style={{ color: 'var(--text)' }} className="font-medium">Kemirix Health Technologies.</span>
              </p>
              <p>
                My work sits at the intersection of healthcare, artificial intelligence, and medication safety.
                I build clinical AI systems, healthcare datasets, and ML infrastructure that support safer
                clinical decisions and advance healthcare research.
              </p>
              <p>
                Long-term goal: trustworthy clinical decision-support systems that improve healthcare outcomes at scale.
              </p>
            </div>
            <div className="flex flex-wrap gap-5 mt-6 text-sm muted">
              <span className="flex items-center gap-2">
                <MapPin size={14} className="accent flex-shrink-0" /> Parul University, India
              </span>
              <span className="flex items-center gap-2">
                <Calendar size={14} className="accent flex-shrink-0" /> Graduating June 2028
              </span>
              <span className="flex items-center gap-2">
                <GraduationCap size={14} className="accent flex-shrink-0" /> GPA: 7.75
              </span>
            </div>
          </Up>

          {/* Quick credentials */}
          <Up delay={0.1} className="lg:col-span-1">
            <div
              className="rounded-2xl p-5 space-y-3"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
            >
              {[
                { label: 'PhysioNet Researcher', icon: Shield },
                { label: 'DrugBank License', icon: Database },
                { label: 'CITI Ethics Certified', icon: Award },
                { label: 'CITI Data Research Certified', icon: Award },
                { label: 'Goethe-Zertifikat A1', icon: Globe },
              ].map(({ label, icon: Icon }) => (
                <div key={label} className="flex items-center gap-3">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--accent-glow)', color: 'var(--accent-green)' }}
                  >
                    <Icon size={13} />
                  </div>
                  <span className="text-sm" style={{ color: 'var(--text)' }}>{label}</span>
                </div>
              ))}
            </div>
          </Up>
        </div>
      </div>
    </section>
  )
}

// ─── HIGHLIGHTS (compact) ────────────────────────────────────────────────────

const ICON_MAP: Record<string, React.ElementType> = {
  building: Building2, database: Database, cpu: Cpu,
  shield: Shield, award: Award, rocket: Rocket,
  users: Users, graduation: GraduationCap,
}

function Highlights() {
  return (
    <section className="section-sm" aria-label="Highlights">
      <div className="wrap">
        <SectionHead label="Evidence" title="Selected Highlights" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {HIGHLIGHTS.map((h, i) => {
            const Icon = ICON_MAP[h.icon] ?? CheckCircle
            return (
              <Up key={i} delay={i * 0.035}>
                <div
                  className="flex items-start gap-3 p-4 rounded-xl transition-all duration-150 hover:-translate-y-0.5"
                  style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'var(--accent-glow)', color: 'var(--accent-green)' }}
                  >
                    <Icon size={14} />
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>{h.text}</p>
                </div>
              </Up>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── PROJECTS ────────────────────────────────────────────────────────────────

function ProjectCard({ p }: { p: typeof PROJECTS[0] }) {
  return (
    <div className="card-hover p-6 flex flex-col h-full">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <span className="font-mono text-xs accent-blue mb-1 block">{p.category}</span>
          <h3 className="font-heading font-semibold text-lg leading-tight">{p.title}</h3>
        </div>
        <Badge status={p.status} color={p.statusColor === 'green' ? 'green' : 'blue'} />
      </div>
      <div className="space-y-3 mb-5 flex-1">
        <p className="text-sm muted leading-relaxed"><span className="font-mono text-xs uppercase tracking-wider" style={{ color: 'var(--accent-green)' }}>Problem · </span>{p.problem}</p>
        <p className="text-sm muted leading-relaxed"><span className="font-mono text-xs uppercase tracking-wider" style={{ color: 'var(--accent-blue)' }}>Solution · </span>{p.solution}</p>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>{p.impact}</p>
      </div>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {p.technologies.map((t) => <span key={t} className="tag">{t}</span>)}
      </div>
      <div className="pt-4 divide-line flex gap-4 items-center">
        {p.link ? (
          <a href={p.link} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium accent hover:opacity-75 transition-opacity">
            <Globe size={12} /> View Live <ExternalLink size={11} />
          </a>
        ) : (
          <span className="font-mono text-xs muted">Link coming soon</span>
        )}
        {p.github && (
          <a href={p.github} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs muted hover:text-[var(--accent-green)] transition-colors">
            GitHub <ExternalLink size={11} />
          </a>
        )}
      </div>
    </div>
  )
}

function Projects() {
  const featured = PROJECTS.filter((p) => p.featured)
  const rest = PROJECTS.filter((p) => !p.featured)
  return (
    <section id="projects" className="section" aria-label="Projects">
      <div className="wrap">
        <SectionHead
          label="Projects"
          title="Featured Projects"
          sub="Clinical AI systems, medication safety infrastructure, and healthcare datasets."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          {featured.slice(0, 2).map((p, i) => <Up key={p.id} delay={i * 0.07}><ProjectCard p={p} /></Up>)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-12">
          {featured.slice(2).map((p, i) => <Up key={p.id} delay={i * 0.07}><ProjectCard p={p} /></Up>)}
        </div>
        {rest.length > 0 && (
          <>
            <Up><h3 className="h3 mb-5">More Projects</h3></Up>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {rest.map((p, i) => <Up key={p.id} delay={i * 0.07}><ProjectCard p={p} /></Up>)}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

// ─── EXPERIENCE + SKILLS (side by side) ─────────────────────────────────────

function Experience() {
  return (
    <section id="experience" className="section" aria-label="Experience">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* Experience */}
          <div>
            <SectionHead label="Experience" title="Work & Research" />
            <div className="space-y-5">
              {EXPERIENCE.map((exp, i) => (
                <Up key={`${exp.role}-${exp.company}`} delay={i * 0.07}>
                  <div className="card p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                      <div>
                        <h3 className="font-heading font-semibold text-base">{exp.role}</h3>
                        <p className="text-sm font-medium mt-0.5 accent">{exp.company}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="font-mono text-xs muted">{exp.period}</span>
                        <span
                          className="font-mono text-xs px-2 py-0.5 rounded"
                          style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}
                        >
                          {exp.type}
                        </span>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {exp.contributions.map((c, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-sm muted">
                          <CheckCircle size={13} className="accent mt-1 flex-shrink-0" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Up>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div id="skills">
            <SectionHead label="Skills" title="Technical & Clinical" />
            <div className="space-y-4">
              {Object.entries(SKILLS).map(([cat, skills], i) => (
                <Up key={cat} delay={i * 0.05}>
                  <div className="card p-5">
                    <h4 className="font-heading font-semibold text-sm mb-3 accent-blue">{cat}</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.map((s) => <span key={s} className="tag">{s}</span>)}
                    </div>
                  </div>
                </Up>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── TEACHING + EDUCATION (side by side) ────────────────────────────────────

function TeachingEducation() {
  const stats = [
    { num: '50+', label: 'KCSE Students', sub: 'Biology · Chemistry · Maths', Icon: BookOpen },
    { num: '30+', label: 'AI/ML Learners', sub: 'Python · Data Science · AI', Icon: Cpu },
    { num: '80+', label: 'Total Impacted', sub: 'Science & Technology', Icon: Users },
    { num: '2', label: 'EdTech Platforms', sub: 'Built & Deployed', Icon: Globe },
  ]
  const courses = [
    'Pharmacology', 'Clinical Pharmacy', 'Medicinal Chemistry',
    'Organic Chemistry', 'Pharmacokinetics', 'Pathophysiology',
    'Pharmaceutics', 'Drug Regulatory Affairs', 'Rational Use of Medicines',
  ]
  return (
    <section className="section-sm" aria-label="Teaching and Education">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Teaching */}
          <div>
            <SectionHead label="Impact" title="Teaching & Community" />
            <div className="grid grid-cols-2 gap-3 mb-5">
              {stats.map((s, i) => (
                <Up key={s.label} delay={i * 0.06}>
                  <div className="card p-4 text-center">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center mx-auto mb-2"
                      style={{ background: 'var(--accent-glow)', color: 'var(--accent-green)' }}
                    >
                      <s.Icon size={17} />
                    </div>
                    <p className="font-heading font-bold text-2xl accent">{s.num}</p>
                    <p className="font-semibold text-sm">{s.label}</p>
                    <p className="font-mono text-xs muted">{s.sub}</p>
                  </div>
                </Up>
              ))}
            </div>
            <Up delay={0.15}>
              <div
                className="rounded-xl p-4 text-sm muted leading-relaxed"
                style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
              >
                Taught KCSE students through <strong style={{ color: 'var(--text)' }}>Bainiac Tuition Centre</strong> in Biology,
                Chemistry & Mathematics, and trained learners in Python, AI, ML & Data Science through{' '}
                <a href="https://www.techfryz.com/" target="_blank" rel="noopener noreferrer"
                  className="font-medium accent hover:opacity-80">TechFryz ↗</a>.
              </div>
            </Up>
          </div>

          {/* Education */}
          <div id="education">
            <SectionHead label="Education" title="Degree & Credentials" />
            <Up>
              <div className="card p-6 mb-4">
                <div className="flex items-start gap-4 mb-5">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(61,142,255,0.1)', color: 'var(--accent-blue)' }}
                  >
                    <GraduationCap size={22} />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-base">Bachelor of Pharmacy</h3>
                    <p className="text-sm font-medium accent mt-0.5">Parul University, India</p>
                    <p className="font-mono text-xs muted mt-1">Aug 2024 – June 2028 · GPA: 7.75</p>
                  </div>
                </div>
                <p className="font-mono text-xs uppercase tracking-wider muted mb-3">Coursework</p>
                <div className="flex flex-wrap gap-1.5">
                  {courses.map((c) => <span key={c} className="tag">{c}</span>)}
                </div>
              </div>
            </Up>
            <Up delay={0.08}>
              <div className="card p-5">
                <h4 className="font-heading font-semibold text-sm mb-4">Additional Credentials</h4>
                <div className="space-y-2">
                  {[
                    { title: 'PhysioNet Credentialed Researcher', org: 'MIT / PhysioNet', Icon: Shield },
                    { title: 'DrugBank Academic License', org: 'DrugBank / LifeSci', Icon: Database },
                    { title: 'CITI Human Research Ethics', org: 'CITI Program', Icon: Award, url: 'https://www.citiprogram.org/verify/?w15441d2a-0873-4ef5-a225-d33c34689f63-76019699' },
                    { title: 'CITI Data & Specimen Research', org: 'CITI Program', Icon: Award, url: 'https://www.citiprogram.org/verify/?k7c0f8ae2-5100-44fb-a260-8515449dc293-76019699' },
                    { title: 'Goethe-Zertifikat A1', org: 'Goethe-Institut', Icon: Globe },
                  ].map((cred) => (
                    <div
                      key={cred.title}
                      className="flex items-center gap-3 py-2.5 border-b last:border-0"
                      style={{ borderColor: 'var(--border)' }}
                    >
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: 'var(--accent-glow)', color: 'var(--accent-green)' }}
                      >
                        <cred.Icon size={13} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{cred.title}</p>
                        <p className="text-xs muted">{cred.org}</p>
                      </div>
                      {'url' in cred && cred.url && (
                        <a
                          href={cred.url} target="_blank" rel="noopener noreferrer"
                          className="text-xs accent hover:opacity-75 flex-shrink-0"
                          title="Verify certificate"
                        >
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Up>
          </div>

        </div>
      </div>
    </section>
  )
}

// ─── PUBLIC PROFILES ─────────────────────────────────────────────────────────

function Profiles() {
  return (
    <section className="section-sm" aria-label="Public Profiles">
      <div className="wrap">
        <SectionHead
          label="Profiles"
          title="Public Profiles"
          sub="Research identity, open-source work, and professional presence."
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {PUBLIC_PROFILES.map((p, i) => (
            <Up key={p.name} delay={i * 0.04}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover p-4 flex flex-col items-center gap-2.5 text-center group"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${p.color}1A` }}
                >
                  <PlatformIcon name={p.icon} color={p.color} />
                </div>
                <span className="font-semibold text-sm">{p.name}</span>
                <ExternalLink size={11} className="muted group-hover:accent transition-colors" />
              </a>
            </Up>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── OPEN TO + CONTACT (side by side) ───────────────────────────────────────

type FormState = { name: string; email: string; organization: string; subject: string; message: string }
type Status = 'idle' | 'sending' | 'sent' | 'error'

function OpenContact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', organization: '', subject: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'var(--bg)',
    border: '1px solid var(--border)',
    color: 'var(--text)',
    borderRadius: '0.75rem',
    padding: '0.625rem 1rem',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.15s',
    fontFamily: 'Inter, sans-serif',
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const base = process.env.NEXT_PUBLIC_API_URL ?? ''
      const res = await fetch(`${base}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) { setStatus('sent'); setForm({ name: '', email: '', organization: '', subject: '', message: '' }) }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  const OPEN_TO = ['Clinical AI Engineering', 'Healthcare Machine Learning', 'Drug Safety Research', 'Pharmacovigilance', 'Clinical Informatics', 'Research Partnerships', 'Startup Collaborations', 'Healthcare Data Science']

  return (
    <section id="contact" className="section" aria-label="Contact">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Open To */}
          <Up>
            <span className="label">Availability</span>
            <h2 className="h2">Open To</h2>
            <p className="muted text-base mb-6">Accepting opportunities aligned with healthcare AI, clinical research, and medication safety.</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {OPEN_TO.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium border"
                  style={{ borderColor: 'var(--accent-green)', color: 'var(--accent-green)', background: 'var(--accent-glow)' }}
                >
                  <span className="dot" />
                  {item}
                </span>
              ))}
            </div>
            <div className="card p-5 space-y-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-wider muted mb-1.5">Email</p>
                <a href="mailto:emmanuelbain@kemirix.com" className="text-base flex items-center gap-2 hover:accent transition-colors">
                  <Mail size={14} className="accent" /> emmanuelbain@kemirix.com
                </a>
              </div>
              <div className="divide-line pt-3">
                <p className="font-mono text-xs uppercase tracking-wider muted mb-2">Best For</p>
                <ul className="space-y-1.5">
                  {['Research collaborations', 'Clinical AI opportunities', 'Dataset inquiries', 'Healthcare innovation projects'].map((i) => (
                    <li key={i} className="flex items-center gap-2 text-sm muted">
                      <span className="dot" /> {i}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted">
                <MapPin size={12} className="flex-shrink-0 text-accent" />
                Parul University, India
              </div>
            </div>
          </Up>

          {/* Contact Form */}
          <Up delay={0.08}>
            <span className="label">Contact</span>
            <h2 className="h2">Get in Touch</h2>
            <p className="muted text-base mb-6">Working on clinical AI or healthcare research? I'd like to hear from you.</p>

            {status === 'sent' ? (
              <div className="card p-10 flex flex-col items-center gap-4 text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'var(--accent-glow)', color: 'var(--accent-green)' }}>
                  <CheckCircle size={22} />
                </div>
                <h3 className="font-heading font-semibold text-lg">Message Sent</h3>
                <p className="text-sm muted">I'll get back to you within 48 hours.</p>
                <button onClick={() => setStatus('idle')} className="btn-outline mt-1 text-xs">Send Another</button>
              </div>
            ) : (
              <form onSubmit={submit} className="card p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-xs muted mb-1.5">Name *</label>
                    <input name="name" type="text" required value={form.name} onChange={change}
                      placeholder="Your name" style={inputStyle}
                      onFocus={(e) => { e.target.style.borderColor = 'var(--accent-green)' }}
                      onBlur={(e) => { e.target.style.borderColor = 'var(--border)' }}
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs muted mb-1.5">Email *</label>
                    <input name="email" type="email" required value={form.email} onChange={change}
                      placeholder="your@email.com" style={inputStyle}
                      onFocus={(e) => { e.target.style.borderColor = 'var(--accent-green)' }}
                      onBlur={(e) => { e.target.style.borderColor = 'var(--border)' }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-xs muted mb-1.5">Organization</label>
                    <input name="organization" type="text" value={form.organization} onChange={change}
                      placeholder="Company / Institution" style={inputStyle}
                      onFocus={(e) => { e.target.style.borderColor = 'var(--accent-green)' }}
                      onBlur={(e) => { e.target.style.borderColor = 'var(--border)' }}
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs muted mb-1.5">Subject *</label>
                    <input name="subject" type="text" required value={form.subject} onChange={change}
                      placeholder="What's this about?" style={inputStyle}
                      onFocus={(e) => { e.target.style.borderColor = 'var(--accent-green)' }}
                      onBlur={(e) => { e.target.style.borderColor = 'var(--border)' }}
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-mono text-xs muted mb-1.5">Message *</label>
                  <textarea name="message" required rows={4} value={form.message} onChange={change}
                    placeholder="Tell me about your project, opportunity, or collaboration..."
                    style={{ ...inputStyle, resize: 'none' }}
                    onFocus={(e) => { e.target.style.borderColor = 'var(--accent-green)' }}
                    onBlur={(e) => { e.target.style.borderColor = 'var(--border)' }}
                  />
                </div>
                {status === 'error' && (
                  <p className="text-sm text-red-400 flex items-center gap-2">
                    <X size={14} /> Failed. Email{' '}
                    <a href="mailto:emmanuelbain@kemirix.com" className="underline hover:opacity-80">
                      emmanuelbain@kemirix.com
                    </a>
                  </p>
                )}
                <button type="submit" disabled={status === 'sending'} className="btn-green w-full justify-center disabled:opacity-50">
                  {status === 'sending' ? 'Sending…' : <><Send size={14} /> Send Message</>}
                </button>
              </form>
            )}
          </Up>
        </div>
      </div>
    </section>
  )
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="py-8 divide-line" role="contentinfo">
      <div className="wrap flex flex-col sm:flex-row items-center justify-between gap-4 text-sm muted">
        <div className="flex items-center gap-3">
          <span className="font-heading font-bold text-lg accent">EBO</span>
          <span className="font-mono text-xs">Emmanuel Bain Oduwo</span>
        </div>
        <p className="text-xs text-center">Clinical AI · Medication Safety · Healthcare Research</p>
        <p className="font-mono text-xs">© {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function Page() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium"
        style={{ background: 'var(--accent-green)', color: 'var(--bg)' }}
      >
        Skip to main content
      </a>
      <Navbar />
      <main>
        <Hero />
        <WhatBuilding />
        <About />
        <Highlights />
        <Projects />
        <Experience />
        <TeachingEducation />
        <Profiles />
        <OpenContact />
      </main>
      <Footer />
    </>
  )
}
