import { env } from "./env"

export const config = {
  api: {
    baseUrl: env.API_URL,
    timeoutMs: 1000,
  },
}
