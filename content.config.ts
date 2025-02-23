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
  },
});
