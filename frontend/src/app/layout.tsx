import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.bain.me'),
  title: {
    default: 'Emmanuel Bain Oduwo — Clinical AI Engineer & Healthcare AI Researcher',
    template: '%s | Emmanuel Bain Oduwo',
  },
  description:
    'Emmanuel Bain Oduwo is a pharmacy student and AI engineer building clinical AI systems, healthcare datasets, medication safety infrastructure, and healthcare education technologies. Co-Founder of Kemirix Health Technologies.',
  keywords: [
    'Clinical AI Engineer',
    'Healthcare AI Researcher',
    'Medication Safety',
    'Drug Interaction Intelligence',
    'Pharmacovigilance',
    'Healthcare Machine Learning',
    'Clinical Decision Support',
    'Healthcare Data Science',
    'Clinical AI Systems',
    'Pharmacy and Artificial Intelligence',
    'Medical AI Research',
    'Healthcare Education Technology',
    'Emmanuel Bain Oduwo',
    'Kemirix Health Technologies',
    'AfriPharma ADR Watch',
    'LLM Fine-Tuning Healthcare',
    'Drug Interaction AI',
    'Pharmacogenomics AI',
  ],
  authors: [{ name: 'Emmanuel Bain Oduwo' }],
  creator: 'Emmanuel Bain Oduwo',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.bain.me',
    siteName: 'Emmanuel Bain Oduwo',
    title: 'Emmanuel Bain Oduwo — Clinical AI Engineer & Healthcare AI Researcher',
    description:
      'Building clinical AI systems, healthcare datasets, medication safety infrastructure, and healthcare education technologies that help healthcare professionals make safer and more informed decisions.',
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
      'Building clinical AI systems, healthcare datasets, and medication safety infrastructure.',
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
    canonical: 'https://www.bain.me',
  },
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
                'Building clinical AI systems, healthcare datasets, medication safety infrastructure, and healthcare education technologies.',
              url: 'https://www.bain.me',
              sameAs: [
                'https://linkedin.com/in/PLACEHOLDER',
                'https://github.com/PLACEHOLDER',
                'https://huggingface.co/PLACEHOLDER',
                'https://kaggle.com/PLACEHOLDER',
                'https://orcid.org/PLACEHOLDER',
              ],
              worksFor: {
                '@type': 'Organization',
                name: 'Kemirix Health Technologies',
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
              ],
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