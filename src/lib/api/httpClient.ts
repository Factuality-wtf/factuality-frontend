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
  private resolveUrl(path: string): string {
    if (/^https?:\/\//.test(path)) {
      return path;
    }

    const base = config.api.baseUrl.trim();
    if (!base) {
      throw new Error('Missing API base URL');
    }

    let url: URL;
    try {
      url = new URL(base);
    } catch {
      throw new Error(`Invalid API base URL: ${base}`);
    }

    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${url.origin}${url.pathname.replace(/\/+$/, '')}${normalizedPath}`;
  }

  async get<T>(path: string): Promise<T> {
    let res: Response;
    try {
      res = await fetch(this.resolveUrl(path), {
        signal: AbortSignal.timeout(config.api.timeoutMs),
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      });
    } catch (error) {
      if (error instanceof DOMException && error.name === 'TimeoutError') {
        throw new ApiError(504, 'Request timed out');
      }
      throw new ApiError(503, 'Unable to connect to backend');
    }

    if (!res.ok) {
      throw new ApiError(res.status, 'Upstream responded with error');
    }

    const data: unknown = await res.json();
    return data as T;
  }

  async post<T>(path: string, body: unknown): Promise<T> {
    const res = await fetch(this.resolveUrl(path), {
      signal: AbortSignal.timeout(config.api.timeoutMs),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
      body: JSON.stringify(body),
      keepalive: true,
    });

    if (!res.ok) {
      console.log('RES ERROR: ', res);
      throw new ApiError(res.status, 'Upstream responded with error');
    }

    const data: unknown = await res.json();
    return data as T;
  }
}

export const httpClient = new HttpClient();
