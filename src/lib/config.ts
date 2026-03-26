import { env } from "./env"

export const config = {
  api: {
    baseUrl: env.NEXT_PUBLIC_API_URL,
    timeoutMs: 1000,
  },
}
