import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const md = (folder: string) => glob({ pattern: '*.md', base: `./src/content/${folder}` });

export const collections = {
  articles: defineCollection({
    loader: md('articles'),
    schema: z.object({
      title: z.string(),
      summary: z.string(),
      author: z.string(),
      section: z.enum(['Features', 'News', 'Perspectives', 'Profiles']),
      topic: z.string(),
      date: z.coerce.date(),
      image: z.string(),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
  }),
  writers: defineCollection({
    loader: md('writers'),
    schema: z.object({
      name: z.string(),
      role: z.string().default('Contributing writer'),
      portrait: z.string().nullish(),
    }),
  }),
  committee: defineCollection({
    loader: md('committee'),
    schema: z.object({ name: z.string(), role: z.string(), portrait: z.string().nullish() }),
  }),
  events: defineCollection({
    loader: md('events'),
    schema: z.object({
      title: z.string(),
      date: z.coerce.date(),
      time: z.string().nullish(),
      venue: z.string().nullish(),
      summary: z.string(),
      signupUrl: z.string().nullish(),
    }),
  }),
};
