import { z } from 'zod';

const schema = z.object({
  API_URL: z.string().trim().url(),
});

export const env = schema.parse({
  API_URL: process.env.API_URL,
});
