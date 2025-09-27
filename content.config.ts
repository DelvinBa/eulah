import { defineContentConfig, defineCollection, z } from "@nuxt/content";
import { asSitemapCollection } from "@nuxtjs/sitemap/content";
export default defineContentConfig({
  collections: {
    blog: defineCollection(
      asSitemapCollection({
        type: "page",
        source: "blog/**/*.md",
        schema: z.object({
          title: z.string(),
          description: z.string(),
          date: z.string(), // This ensures the "date" column exists
          author: z.string(),
          tags: z.array(z.string()),
          image: z.string().optional(),
        }),
      })
    ),
    projekte: defineCollection(
      asSitemapCollection({
        type: "page",
        source: "projekte/**/*.md",
        schema: z.object({
          title: z.string(),
          subtitle: z.string(), // Kurz‐Beschreibung
          story: z.string(), // ausführliche Story
          image: z.string().optional(),
          images: z.array(z.string()).optional(),
          video: z.string().optional(),
          numbers: z.string(), // Removed the trailing comma here
        }),
      })
    ),
    standorte: defineCollection(
      asSitemapCollection({
        type: "page",
        source: "standorte/**/*.md",
        schema: z.object({
          // Core
          slug: z.string().optional(), // falls Dateiname ≠ Slug
          city: z.string(), // "Bielefeld"
          region: z.string().optional(), // "NRW"
          businessName: z.string().optional(), // "Eulah IT"

          // SEO
          title: z.string(), // H1/SEO-Title (Pflicht)
          metaTitle: z.string().optional(), // eigener <title>, wenn abweichend
          metaDescription: z.string().optional(), // <meta name="description">

          // Hero (neue strukturierte Variante)
          hero: z
            .object({
              title: z.string().optional(),
              subtitle: z.string().optional(),
              image: z.string().optional(),
              ctaText: z.string().optional(),
              ctaHref: z.string().url().optional(),
            })
            .optional(),

          // Abwärtskompatible, flache Hero-Felder (optional)
          headline: z.string().optional(),
          heroSubtitle: z.string().optional(),
          ctaText: z.string().optional(),
          ctaHref: z.string().url().optional(),
          secondaryCtaText: z.string().optional(),
          secondaryCtaHref: z.string().url().optional(),

          // Lange Textblöcke (werden in der Seite absatzweise gerendert)
          longIntro: z.string().optional(),
          longDeepDive: z.string().optional(),

          // Intro-Snippet/Kicker
          intro: z
            .object({
              kicker: z.string().optional(),
              bullets: z.array(z.string()).optional(),
            })
            .optional(),

          // Trust-Karten
          trust: z
            .object({
              cards: z
                .array(
                  z.object({
                    title: z.string(),
                    text: z.string(),
                  })
                )
                .optional(),
            })
            .optional(),

          // Lokaler Abschnitt
          local: z
            .object({
              heading: z.string().optional(),
              paragraphs: z.array(z.string()).optional(),
            })
            .optional(),

          // Kontextualisierte Ressourcen (ersetzt "externalLinks", kann parallel existieren)
          resources: z
            .object({
              heading: z.string().optional(),
              items: z
                .array(
                  z.object({
                    label: z.string(),
                    href: z.string().url(),
                    blurb: z.string().optional(),
                  })
                )
                .optional(),
            })
            .optional(),

          // Legacy: einfache Linkliste (weiterhin erlaubt)
          externalLinks: z
            .array(
              z.object({
                label: z.string(),
                href: z.string().url(),
              })
            )
            .optional(),

          // Nearby-Crosslinks
          nearby: z
            .object({
              heading: z.string().optional(),
              slugs: z.array(z.string()).optional(),
            })
            .optional(),

          // Bottom-CTA (separat vom Hero)
          cta: z
            .object({
              title: z.string().optional(),
              text: z.string().optional(),
              ctaText: z.string().optional(),
              ctaHref: z.string().url().optional(),
            })
            .optional(),
        }),
      })
    ),
  },
});
