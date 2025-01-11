// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@primevue/nuxt-module',
    '@nuxtjs/seo',
    '@nuxt/image',
    '@nuxt/devtools',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@nuxt/fonts',
  ],

  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap',
        },
      ],
    },
  },

  primevue: {
        options: {
            theme: 'none'
        }
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
