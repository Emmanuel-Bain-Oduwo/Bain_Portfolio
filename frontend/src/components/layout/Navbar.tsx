'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import ThemeToggle from '@/components/ui/ThemeToggle'

const NAV_LINKS = [
  { href: '#projects', label: 'Projects' },
  { href: '#research', label: 'Research' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-main border-b border-color backdrop-blur-sm'
          : 'bg-transparent'
      }`}
      role="banner"
    >
      <nav
        className="container-main flex items-center justify-between h-16"
        aria-label="Primary navigation"
      >
        <a
          href="#top"
          className="font-heading font-semibold text-sm tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          aria-label="Emmanuel Bain Oduwo — home"
        >
          <span className="text-accent">EBO</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted hover:text-accent transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 rounded"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#contact"
            className="hidden md:inline-flex btn-primary text-xs px-4 py-2"
          >
            Get in touch
          </a>
          <button
            className="md:hidden p-2 rounded-lg hover:bg-card transition-colors duration-150"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="md:hidden bg-main border-b border-color"
          >
            <div className="container-main py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 px-2 text-sm font-medium text-muted hover:text-accent transition-colors duration-150 border-b border-color last:border-0"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-3 btn-primary justify-center"
              >
                Get in touch
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}