import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Clinical AI & Healthcare Technology Services',
  description:
    'Emmanuel Bain Oduwo offers Clinical AI development, Healthcare Data Engineering, Medication Safety Consulting, AI/ML Model Development, Healthcare Software Development, and AI Training. Book a discovery call today.',
  keywords: [
    'Clinical AI Services',
    'Healthcare AI Consulting',
    'Medication Safety Consulting',
    'Drug Interaction AI Development',
    'Pharmacovigilance Services',
    'Healthcare Machine Learning Services',
    'Clinical AI Developer for Hire',
    'Healthcare Data Engineering',
    'AI Training Healthcare',
    'Book Clinical AI Consultation',
    'Healthcare Software Development',
    'Emmanuel Bain Oduwo Services',
  ],
  alternates: {
    canonical: 'https://www.bainiac.me/services',
  },
  openGraph: {
    title: 'Clinical AI & Healthcare Technology Services — Emmanuel Bain Oduwo',
    description:
      'Clinical AI development, medication safety consulting, healthcare data engineering, and more. Book a discovery call.',
    url: 'https://www.bainiac.me/services',
    type: 'website',
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
