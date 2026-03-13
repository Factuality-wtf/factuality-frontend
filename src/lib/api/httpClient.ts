import { config } from '../config';

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

export class HttpClient {
  async get<T>(path: string): Promise<T> {
    const res = await fetch(`${config.api.baseUrl}${path}`, {
      signal: AbortSignal.timeout(config.api.timeoutMs),
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new ApiError(res.status, 'Upstream responded with error');
    }

    const data: unknown = await res.json();
    return data as T;
  }

  async post<T>(path: string, body: unknown): Promise<T> {
    const res = await fetch(`${config.api.baseUrl}${path}`, {
      signal: AbortSignal.timeout(config.api.timeoutMs),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
      body: JSON.stringify(body),
      keepalive: true,
    });

    if (!res.ok) {
      throw new ApiError(res.status, 'Upstream responded with error');
    }

    const data: unknown = await res.json();
    return data as T;
  }
}

export const httpClient = new HttpClient();
