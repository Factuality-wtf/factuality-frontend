import { config } from "./config"

const MIN_LOADING_TIME = 400;

export type Fact = {
  id: string
  body: string
  name: string
  created: string
  modified: string
  property: string
  url: string
  social_sharing: {
    title: string
    description: string
  }
}

export class UpstreamError extends Error {
  constructor(
    public readonly status: number,
    message: string
  ) {
    super(message)
  }
}

export class FactClient {
  async getFact(): Promise<Fact> {

    const res = await fetch(`${config.api.baseUrl}/fact/random`, {
      signal: AbortSignal.timeout(config.api.timeoutMs),
      headers: { Accept: "application/json" },
      cache: "no-store",
    })

    if (!res.ok) {
      throw new UpstreamError(res.status, "Upstream responded with error")
    }

    const data: unknown = await res.json()

    return this.parse(data)
  }

  async getFactById(id: string): Promise<Fact> {
    const res = await fetch(`${config.api.baseUrl}/fact/${id}`, {
      signal: AbortSignal.timeout(config.api.timeoutMs),
      headers: { Accept: "application/json" },
      cache: "no-store",
    })

    if (!res.ok) {
      throw new UpstreamError(res.status, "Upstream responded with error")
    }

    const data: unknown = await res.json()

    return this.parse(data)
  }

  private parse(data: unknown): Fact {
    if (
      typeof data === "object" &&
      data !== null &&
      "body" in data &&
      "id" in data
    ) {
      return data as Fact
    }

    throw new UpstreamError(502, "Malformed upstream response")
  }
}
