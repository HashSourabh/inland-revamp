/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8f9fc',
          100: '#e8ecf6',
          200: '#d0daea',
          300: '#aabbd9',
          400: '#8096c5',
          500: '#5f76b0',
          600: 'rgb(var(--color-primary))',
          700: '#3d4d79',
          800: '#354065',
          900: '#2f3854',
          950: '#1e2235',
        },
        secondary: {
          50: '#fff8f1',
          100: '#feecdd',
          200: '#fcd6bb',
          300: '#fab88d',
          400: '#f79158',
          500: 'rgb(var(--color-secondary))',
          600: '#e6541d',
          700: '#bc3d19',
          800: '#96331b',
          900: '#792e19',
          950: '#41140a',
        },
        accent: {
          50: '#f7f8e7',
          100: '#eef0c8',
          200: '#e1e496',
          300: '#d1d25c',
          400: '#c3c133',
          500: '#a4a226',
          600: '#7d7b1d',
          700: '#5c5a1b',
          800: '#4c491b',
          900: '#403d1a',
          950: '#232109',
        },
        neutral: {
          50: '#f9f9f9',
          100: '#f0f0f0',
          200: '#e4e4e4',
          300: '#d1d1d1',
          400: '#b4b4b4',
          500: '#9a9a9a',
          600: '#818181',
          700: '#6a6a6a',
          800: '#5a5a5a',
          900: '#4e4e4e',
          950: '#282828',
        }
      },
      fontFamily: {
        sans: ['var(--font-work-sans)', 'ui-sans-serif', 'system-ui'],
        serif: ['var(--font-dm-sans)', 'ui-serif', 'Georgia'],
        heading: ['var(--font-dm-sans)', 'ui-serif', 'Georgia'],
        body: ['var(--font-work-sans)', 'ui-sans-serif', 'system-ui'],
      },
      fontSize: {
        'display-1': ['3.5rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'display-2': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'hero': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      },
      backgroundImage: {
        'hero-pattern': "url('/images/hero-pattern.png')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'property-card': '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.02)',
        'hover-card': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        'property': '1rem',
      },
      spacing: {
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      gridTemplateColumns: {
        'property-grid': 'repeat(auto-fill, minmax(300px, 1fr))',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
} 