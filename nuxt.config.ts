export default defineNuxtConfig({
  ssr: true,
  modules: [
    "@primevue/nuxt-module",
    "@nuxtjs/seo",
    "@nuxt/image",
    "@nuxt/devtools",
    "@nuxtjs/robots",
    "@nuxtjs/sitemap",
    "@nuxt/fonts",
    "@nuxt/content",
    "nuxt-particles",
    "nuxt-security",
    [
      "nuxt-mail",
      {
        message: {
          to: process.env.SMTP_TO,
          from: process.env.SMTP_FROM,
        },
        smtp: {
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        },
      },
    ],
  ],
  robots: {
    disallow: ["/blog", "/projekte"],
  },

  particles: {
    mode: "full",
    lazy: true,
  },
  site: {
    url: "https://eulah.de",
    name: "Eulah Webseite",
  },

  primevue: {
    options: {
      theme: "none",
    },
  },
  build: {
    transpile: ["gsap"],
  },

  srcDir: "src/", // Der src-Ordner als Quellverzeichnis

  css: [
    "@/assets/css/main.css", // Haupt-CSS-Datei; der Pfad beginnt mit src
  ],

  postcss: {
    plugins: {
      "postcss-import": {}, // Importiere CSS-Dateien
      tailwindcss: {}, // TailwindCSS
      autoprefixer: {}, // Automatische Präfixe für Browserkompatibilität
    },
  },

  compatibilityDate: "2025-01-06", // Setze ein Kompatibilitätsdatum, falls erforderlich
});
