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
  robots: {},
  content: {
    build: {
      markdown: {
        remarkPlugins: {
          // 'remark-reading-time': {},  // Remove or comment out this line
          "remark-emoji": {
            options: { emoticon: true },
          },
          "remark-gfm": false,
        },
      },
    },
  },

  routeRules: {
    "/": { swr: 900 },
    "/blog": { swr: 900 },
    "/blog/**": { prerender: true, swr: 900 },
    "/projekte": { swr: 900 },
    "/projekte/**": { prerender: true, swr: 900 },
    "/api/**": { isr: false },
  },
  nitro: {
    prerender: {
      crawlLinks: false, // don’t try to walk /blog at build
      failOnError: false, // avoid aborting build if some prerender fails
    },
  },

  ogImage: { enabled: false },
  site: {
    url: "https://www.eulah.de",
    name: "Eulah IT",
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
    "@fortawesome/fontawesome-free/css/all.min.css",
  ],

  postcss: {
    plugins: {
      "postcss-import": {}, // Importiere CSS-Dateien
      tailwindcss: {}, // TailwindCSS
      autoprefixer: {}, // Automatische Präfixe für Browserkompatibilität
    },
  },
  security: {
    nonce: true, // Enables nonce support in SSR mode
    headers: {
      contentSecurityPolicy: {
        "default-src": ["'self'", "https:"], // Restrict sources to self and HTTPS
        "script-src": [
          "'self'",
          "'strict-dynamic'",
          "'unsafe-eval'",
          "'unsafe-inline'", // Needed for some inline scripts
          "'nonce-{{nonce}}'", // Allows secure nonce-based execution
          "wasm-unsafe-eval", // **Allows WebAssembly execution**
        ],
        "worker-src": ["'self'", "blob:"], // Allow Web Workers (if used)
        "style-src": ["'self'", "https:", "'unsafe-inline'"],
        "img-src": ["'self'", "data:", "https:"],
        "font-src": ["'self'", "https:", "data:"],
        "object-src": ["'none'"], // Block all `<object>` elements
        "script-src-attr": ["'none'"], // Block inline event handlers
        "upgrade-insecure-requests": true, // Enforce HTTPS
      },
    },
  },

  compatibilityDate: "2025-01-06", // Setze ein Kompatibilitätsdatum, falls erforderlich
});
