// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/components/**/*.{vue,js,ts}", 
    "./src/layouts/**/*.vue",           
    "./src/pages/**/*.vue",             
    "./src/plugins/**/*.{js,ts}",       
    "./src/app.vue",
    "./content/blog/**/*.md"             
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'rgb(var(--color-primary-rgb) / <alpha-value>)',
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
          800: 'var(--color-primary-800)',
          900: 'var(--color-primary-900)',
          rgb: 'var(--color-primary-rgb)',
        },
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        'accent-dark': '#CC7A00',
        'accent-hover': '#E68A00',
        'accent-light': '#FFB84D',
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        dark: 'var(--color-dark)',
        'gradient-start': 'var(--color-surface)',
        'gradient-end': 'var(--color-background)',
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'], // Moderne und auffällige Schriftart für Überschriften
        body: ['Roboto', 'sans-serif'], // Klare Schriftart für Fließtext
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        '2xl': "1536px",
        'xs': '475px', // Zusätzlicher Breakpoint für kleine Geräte
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInUp: {
          '0%': { transform: 'translateY(40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        carousel: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 1.5s ease-out forwards',
        'slide-in-up': 'slideInUp 1s ease-out forwards',
        'bounce': 'bounce 2s infinite',
        'carousel': 'carousel 30s linear infinite',
        'rotate': 'rotate 4s linear infinite',
      },
      boxShadow: {
        '3xl': '0 35px 60px rgba(0, 0, 0, 0.7)',
        'xl': '0 20px 25px rgba(0, 0, 0, 0.1)',
      },
      transitionProperty: {
        'height': 'height',
      },
    },
  },
  plugins: [
    require('tailwindcss-primeui'),
    require('@tailwindcss/typography'),


  ],
}
