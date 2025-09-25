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
          title: z.string(), // "IT-Unternehmen in Bielefeld"
          metaDescription: z.string().optional(),
          slug: z.string().optional(), // falls Dateiname ≠ Slug
          city: z.string(), // "Bielefeld"
          region: z.string().optional(), // "NRW"
          headline: z.string().optional(),
          heroSubtitle: z.string().optional(),
          heroImage: z.string().optional(),
          ctaText: z.string().optional(),
          ctaHref: z.string().optional(),
          secondaryCtaText: z.string().optional(),
          secondaryCtaHref: z.string().optional(),
          badges: z.array(z.string()).optional(), // kleine Trust-Claims
          usps: z.array(z.string()).optional(), // Bullet-Points
          externalLinks: z
            .array(
              z.object({
                label: z.string(),
                href: z.string().url(),
              })
            )
            .optional(),
          businessName: z.string().optional(), // "Eulah IT"
        }),
      })
    ),
  },
});
