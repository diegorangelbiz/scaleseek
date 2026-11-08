import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One markdown file per experiment in src/content/experiments.
// The three facts (question, setup, result) live in frontmatter; the body is the full write-up.
const experiments = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experiments' }),
  schema: z.object({
    number: z.number().int().positive(),
    title: z.string(),
    topic: z.string(),
    status: z.enum(['Running', 'Concluded', 'Abandoned']),
    date: z.coerce.date(),
    summary: z.string(),
    question: z.string(),
    setup: z.string(),
    result: z.string(),
  }),
});

export const collections = { experiments };
