import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0A0F0D',
          card: '#111A14',
          border: '#1E2E22',
        },
        accent: {
          green: '#00FF87',
          blue: '#0066FF',
        },
        text: {
          primary: '#F0F0F0',
          muted: '#6B7B72',
        },
        light: {
          bg: '#F8FAF9',
          card: '#FFFFFF',
          border: '#E2E8E4',
          text: '#0D1A12',
          muted: '#5A6B62',
        },
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
      },
      animation: {
        'ecg': 'ecg 3s linear infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'pulse-green': 'pulseGreen 2s ease-in-out infinite',
      },
      keyframes: {
        ecg: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGreen: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(0, 255, 135, 0)' },
          '50%': { boxShadow: '0 0 0 6px rgba(0, 255, 135, 0.15)' },
        },
      },
      maxWidth: {
        '8xl': '88rem',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
}

export default config