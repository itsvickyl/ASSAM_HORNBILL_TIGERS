/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5B0000',
        secondary: '#7A0B0B',
        accent: '#C9A227',
        surface: '#F9F9F9',
        ink: '#1A1A1A',
        'primary-dark': '#3D0000',
        'accent-dark': '#A88520',
        'accent-light': '#E0C050',
      },
      fontFamily: {
        heading: ['"Bebas Neue"', 'sans-serif'],
        body: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        premium: '16px',
      },
      boxShadow: {
        soft: '0 8px 30px rgba(0, 0, 0, 0.08)',
        elevated: '0 16px 50px rgba(0, 0, 0, 0.12)',
        'soft-hover': '0 12px 40px rgba(0, 0, 0, 0.14)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '120': '30rem',
      },
      fontSize: {
        'hero': ['120px', { lineHeight: '1', letterSpacing: '0.02em' }],
        'display': ['80px', { lineHeight: '1.05', letterSpacing: '0.02em' }],
        'title': ['48px', { lineHeight: '1.1' }],
        'subtitle': ['32px', { lineHeight: '1.2' }],
        'stat': ['64px', { lineHeight: '1', letterSpacing: '0.02em' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.4s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.4s ease-out forwards',
        'count-up': 'countUp 1.5s ease-out forwards',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
        'zoom-subtle': 'zoomSubtle 20s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201, 162, 39, 0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(201, 162, 39, 0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        zoomSubtle: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
      },
      backgroundImage: {
        'tiger-stripe': `repeating-linear-gradient(
          -45deg,
          transparent,
          transparent 20px,
          rgba(0, 0, 0, 0.06) 20px,
          rgba(0, 0, 0, 0.06) 40px
        )`,
      },
    },
  },
  plugins: [],
}
