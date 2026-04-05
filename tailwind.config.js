/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      borderRadius: {
        'none': '0',
        'sm': '12px',
        'DEFAULT': '20px',
        'md': '20px',
        'lg': '30px',
        'xl': '40px',
        'full': '9999px',
      },
      boxShadow: {
        'soft': '0 10px 30px rgba(0, 0, 0, 0.08)',
        'soft-md': '0 15px 40px rgba(0, 0, 0, 0.12)',
        'soft-lg': '0 20px 60px rgba(0, 0, 0, 0.15)',
        'inner-soft': 'inset 0 2px 8px rgba(0, 0, 0, 0.06)',
      },
      colors: {
        background: '#F5F5F7',
        surface: '#FFFFFF',
        'surface-secondary': '#F0F0F5',
        'text-primary': '#1D1D1F',
        'text-secondary': '#6E6E73',
        'text-tertiary': '#AEAEB2',
        border: '#D2D2D7',
        'border-light': '#E5E5EA',
        accent: {
          DEFAULT: '#0071E3',
          hover: '#0077ED',
          light: '#EBF4FF',
        },
        danger: {
          DEFAULT: '#FF3B30',
          light: '#FFF0EE',
        },
        success: {
          DEFAULT: '#30D158',
          light: '#EDFBF2',
        },
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '6': '24px',
        '8': '32px',
        '12': '48px',
        '16': '64px',
      },
      fontSize: {
        'xs': ['11px', { lineHeight: '16px', letterSpacing: '0.01em' }],
        'sm': ['13px', { lineHeight: '18px', letterSpacing: '0em' }],
        'base': ['15px', { lineHeight: '22px', letterSpacing: '0em' }],
        'lg': ['17px', { lineHeight: '24px', letterSpacing: '-0.01em' }],
        'xl': ['20px', { lineHeight: '28px', letterSpacing: '-0.015em' }],
        '2xl': ['24px', { lineHeight: '32px', letterSpacing: '-0.02em' }],
        '3xl': ['30px', { lineHeight: '38px', letterSpacing: '-0.025em' }],
        '4xl': ['36px', { lineHeight: '44px', letterSpacing: '-0.03em' }],
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-in-out',
        'slide-up': 'slideUp 200ms ease-in-out',
        'scale-in': 'scaleIn 150ms ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      transitionDuration: {
        'fast': '150ms',
        'base': '200ms',
        'slow': '250ms',
      },
      transitionTimingFunction: {
        'apple': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
