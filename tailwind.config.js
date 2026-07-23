/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        surface: {
          DEFAULT: '#FFFFFF',
          subtle: '#F7F8FA',
          sunken: '#EEF0F4',
        },
        ink: {
          DEFAULT: '#14171F',
          soft: '#4B5160',
          faint: '#8991A3',
        },
        line: '#E6E8EE',
        brand: {
          50: '#EEF0FF',
          100: '#E0E3FF',
          400: '#7C7FF2',
          500: '#4F46E5',
          600: '#4338CA',
          700: '#3730A3',
        },
        p0: { DEFAULT: '#16A34A', bg: '#EAFBF1', ring: '#16A34A' },
        p1: { DEFAULT: '#CA8A04', bg: '#FEF9E7', ring: '#EAB308' },
        p2: { DEFAULT: '#EA580C', bg: '#FFF1E9', ring: '#F97316' },
        p3: { DEFAULT: '#DC2626', bg: '#FDECEC', ring: '#EF4444' },
      },
      boxShadow: {
        soft: '0 1px 2px rgba(20,23,31,0.04), 0 1px 8px rgba(20,23,31,0.04)',
        card: '0 2px 6px rgba(20,23,31,0.05), 0 8px 24px -8px rgba(20,23,31,0.08)',
        drawer: '-8px 0 32px -8px rgba(20,23,31,0.18)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(6px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.6s linear infinite',
        fadeUp: 'fadeUp 0.35s ease-out both',
      },
    },
  },
  plugins: [],
}
