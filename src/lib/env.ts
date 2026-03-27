import { z } from 'zod';

const schema = z.object({
  API_URL: z.string().trim().url(),
});

const parsed = schema.safeParse({
  API_URL: process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL,
});

if (!parsed.success) {
  throw new Error(
    'Missing or invalid API URL. Set API_URL (preferred) or NEXT_PUBLIC_API_URL in the environment.',
  );
}

export const env = parsed.data;
