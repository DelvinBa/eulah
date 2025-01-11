/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./src/components/**/*.{vue,js,ts}", 
    "./src/layouts/**/*.vue",           
    "./src/pages/**/*.vue",             
    "./src/plugins/**/*.{js,ts}",       
    "./src/app.vue",                    
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFFFFF', // Reines Weiß für Text
        secondary: '#A3A3A3', // Sanftes Grau für unterstützenden Text
        background: '#000000', // Reines Schwarz für Hintergrund
        accent: '#00D4FF', // Neonblau für Hover- und Highlight-Effekte
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        '2xl': "1536px",
      },
    },
  },
  plugins: [require('tailwindcss-primeui')],
}

