import { describe, expect, it, vi } from 'vitest';
import { ApiError, HttpClient } from './httpClient';

describe('HttpClient', () => {
  it('sends GET requests and returns JSON payloads', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ id: 'fact-1' }),
    });
    const timeoutSpy = vi
      .spyOn(AbortSignal, 'timeout')
      .mockReturnValue(new AbortController().signal);
    vi.stubGlobal('fetch', fetchMock);

    const client = new HttpClient();
    await expect(client.get<{ id: string }>('/fact/random')).resolves.toEqual({
      id: 'fact-1',
    });

    expect(timeoutSpy).toHaveBeenCalledWith(1000);
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.example.test/fact/random',
      expect.objectContaining({
        cache: 'no-store',
        headers: { Accept: 'application/json' },
      }),
    );
  });

  it('throws ApiError when GET response is not ok', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 502,
      }),
    );

    const client = new HttpClient();

    await expect(client.get('/fact/random')).rejects.toEqual(
      expect.objectContaining({
        status: 502,
        message: 'Upstream responded with error',
      }),
    );
  });

  it('sends POST requests with JSON body', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ success: true }),
    });
    vi.stubGlobal('fetch', fetchMock);
    vi.spyOn(AbortSignal, 'timeout').mockReturnValue(new AbortController().signal);

    const client = new HttpClient();
    await expect(
      client.post<{ success: boolean }>('/analytics/event', {
        type: 'view',
      }),
    ).resolves.toEqual({ success: true });

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.example.test/analytics/event',
      expect.objectContaining({
        method: 'POST',
        keepalive: true,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'view' }),
      }),
    );
  });

  it('throws ApiError when POST response is not ok', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      }),
    );
    vi.spyOn(AbortSignal, 'timeout').mockReturnValue(new AbortController().signal);

    const client = new HttpClient();

    await expect(client.post('/analytics/event', {})).rejects.toBeInstanceOf(ApiError);
  });
});
