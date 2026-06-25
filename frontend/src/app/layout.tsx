import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.bainiac.me'),
  title: {
    default: 'Emmanuel Bain Oduwo — Clinical AI Engineer & Healthcare AI Researcher',
    template: '%s | Emmanuel Bain Oduwo',
  },
  description:
    'Emmanuel Bain Oduwo — Clinical AI Engineer, Pharmacy student at Parul University, and Co-Founder of Kemirix Health Technologies. Building clinical AI systems, drug interaction tools, pharmacovigilance datasets, and medication safety infrastructure for hospitals, pharma companies, and health tech startups.',
  keywords: [
    'Emmanuel Bain Oduwo',
    'Clinical AI Engineer',
    'Healthcare AI Researcher',
    'Kemirix Health Technologies',
    'Medication Safety AI',
    'Drug Interaction AI',
    'Pharmacovigilance Dataset',
    'AfriPharma ADR Watch',
    'Clinical Decision Support',
    'Healthcare Machine Learning',
    'LLM Fine-Tuning Healthcare',
    'Pharmacogenomics AI',
    'Healthcare Data Engineering',
    'Clinical AI Systems',
    'Drug Safety Researcher',
    'Pharmacy Artificial Intelligence',
    'Medical AI Research',
    'Healthcare Software Development',
    'Clinical NLP',
    'RAG Clinical AI',
    'FastAPI Healthcare',
    'Google Cloud TPU Healthcare',
    'Parul University Pharmacy',
    'Nigeria Healthcare AI',
    'Africa Pharmacovigilance',
    'Clinical AI Consulting',
    'Healthcare AI Services',
    'Book Clinical AI Consultation',
  ],
  authors: [{ name: 'Emmanuel Bain Oduwo', url: 'https://www.bainiac.me' }],
  creator: 'Emmanuel Bain Oduwo',
  publisher: 'Emmanuel Bain Oduwo',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.bainiac.me',
    siteName: 'Emmanuel Bain Oduwo',
    title: 'Emmanuel Bain Oduwo — Clinical AI Engineer & Healthcare AI Researcher',
    description:
      'Building clinical AI systems, drug interaction tools, pharmacovigilance datasets, and medication safety infrastructure. Available for consulting, research collaborations, and healthcare AI projects.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Emmanuel Bain Oduwo — Clinical AI Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Emmanuel Bain Oduwo — Clinical AI Engineer',
    description:
      'Building clinical AI systems, drug interaction tools, and medication safety infrastructure for hospitals, pharma, and health tech.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://www.bainiac.me',
  },
  category: 'technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Emmanuel Bain Oduwo',
              jobTitle: 'Clinical AI Engineer & Pharmacy Student',
              description:
                'Clinical AI Engineer and Co-Founder of Kemirix Health Technologies. Building clinical AI systems, drug interaction tools, pharmacovigilance datasets, and medication safety infrastructure for hospitals, pharma companies, and health tech startups.',
              url: 'https://www.bainiac.me',
              email: 'emmanuelbain@kemirix.com',
              sameAs: [
                'https://www.linkedin.com/in/emmanuel-bain-240284382',
                'https://github.com/Emmanuel-Bain-Oduwo',
                'https://huggingface.co/Oduwo',
                'https://www.kaggle.com/bainnn',
                'https://orcid.org/0009-0008-9430-9311',
                'https://www.researchgate.net/profile/Emmanuel-Bain-Oduwo',
                'https://paruluniversity.academia.edu/EMMANUELBAINODUWO',
              ],
              worksFor: {
                '@type': 'Organization',
                name: 'Kemirix Health Technologies',
                url: 'https://drug.kemirix.com',
              },
              alumniOf: {
                '@type': 'CollegeOrUniversity',
                name: 'Parul University',
              },
              knowsAbout: [
                'Clinical AI',
                'Medication Safety',
                'Drug Interaction Intelligence',
                'Pharmacovigilance',
                'Healthcare Machine Learning',
                'Clinical Decision Support',
                'Pharmacogenomics',
                'LLM Fine-Tuning',
                'Healthcare Data Engineering',
              ],
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Clinical AI & Healthcare Technology Services',
                url: 'https://www.bainiac.me/services',
                itemListElement: [
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Clinical AI Development' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Healthcare Data Engineering' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Medication Safety Consulting' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI/ML Model Development' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Healthcare Software Development' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI & Data Science Training' } },
                ],
              },
            }),
          }}
        />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}