export default defineNuxtConfig({
  modules: [
    '@primevue/nuxt-module',
    '@nuxtjs/seo',
    '@nuxt/image',
    '@nuxt/devtools',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@nuxt/fonts',
    [
      'nuxt-mail',
      {
        message: {
          to: 'info@eulah.de',
          from: 'info@eulah.de',
        },
        smtp: {
          host: 'smtp.hostinger.com',
          port: 465,
          auth: {
            user: 'bachodelvin@gmail.com',
            pass: 'Wirkillen88!',
          },
        },
      },
    ],
  ],

  primevue: {
    options: {
      theme: 'none',
    },
  },

  srcDir: 'src/', // Der src-Ordner als Quellverzeichnis

  css: [
    '@/assets/css/main.css', // Haupt-CSS-Datei; der Pfad beginnt mit src
  ],

  postcss: {
    plugins: {
      'postcss-import': {}, // Importiere CSS-Dateien
      tailwindcss: {}, // TailwindCSS
      autoprefixer: {}, // Automatische Präfixe für Browserkompatibilität
    },
  },

  compatibilityDate: '2025-01-06', // Setze ein Kompatibilitätsdatum, falls erforderlich
});
