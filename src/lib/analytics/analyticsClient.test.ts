import { describe, expect, it, vi } from 'vitest';
import { ApiError, httpClient } from '../api/httpClient';
import { sendAnalyticsEvent } from './analyticsClient';

describe('sendAnalyticsEvent', () => {
  it('posts analytics event with browser metadata', async () => {
    vi.spyOn(httpClient, 'post').mockResolvedValue(undefined);
    vi.stubGlobal('document', { referrer: 'https://example.com/source' });
    vi.stubGlobal('navigator', { userAgent: 'Mozilla/5.0 Chrome/133.0.0.0' });
    vi.stubGlobal('window', {
      location: {
        search: '?utm_source=google&utm_medium=search&utm_campaign=spring',
        pathname: '/facts/11111111-1111-4111-8111-111111111111/fact-slug',
      },
      sessionStorage: {
        getItem: vi.fn().mockReturnValue('session-123'),
        setItem: vi.fn(),
      },
    });

    await sendAnalyticsEvent({
      type: 'view',
      factId: '11111111-1111-4111-8111-111111111111',
    });

    expect(httpClient.post).toHaveBeenCalledWith('/analytics/event', {
      event_type: 'view',
      fact_id: '11111111-1111-4111-8111-111111111111',
      path: '/facts/11111111-1111-4111-8111-111111111111/fact-slug',
      share_target: null,
      source: 'google',
      medium: 'search',
      campaign: 'spring',
      experiment: null,
      variant: null,
      referrer: 'https://example.com/source',
      user_agent: 'Mozilla/5.0 Chrome/133.0.0.0',
      session_id: 'session-123',
      country: null,
      device: 'desktop',
      browser: 'chrome',
      ip_address: null,
    });
  });

  it('sends root path with null fact id when fact id is missing/invalid', async () => {
    vi.spyOn(httpClient, 'post').mockResolvedValue(undefined);
    vi.stubGlobal('document', { referrer: '' });
    vi.stubGlobal('navigator', { userAgent: 'Mozilla/5.0 Safari/537.36' });
    vi.stubGlobal('window', {
      location: { search: '', pathname: '/' },
      sessionStorage: {
        getItem: vi.fn().mockReturnValue('session-123'),
        setItem: vi.fn(),
      },
    });

    await sendAnalyticsEvent({
      type: 'view',
      factId: 'default',
    });

    expect(httpClient.post).toHaveBeenCalledWith(
      '/analytics/event',
      expect.objectContaining({
        event_type: 'view',
        fact_id: null,
        path: '/',
        source: 'direct',
        medium: 'none',
      }),
    );
  });

  it('swallows fetch failures without logging noise', async () => {
    const err = new TypeError('Failed to fetch');
    vi.spyOn(httpClient, 'post').mockRejectedValue(err);
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.stubGlobal('document', { referrer: '' });
    vi.stubGlobal('navigator', { userAgent: 'vitest-agent' });
    vi.stubGlobal('window', {
      location: { search: '', pathname: '/' },
      sessionStorage: {
        getItem: vi.fn().mockReturnValue('session-123'),
        setItem: vi.fn(),
      },
    });

    await expect(
      sendAnalyticsEvent({
        type: 'open',
      }),
    ).resolves.toBeUndefined();

    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('logs unexpected analytics failures', async () => {
    const err = new ApiError(500, 'Upstream responded with error');
    vi.spyOn(httpClient, 'post').mockRejectedValue(err);
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.stubGlobal('document', { referrer: '' });
    vi.stubGlobal('navigator', { userAgent: 'vitest-agent' });
    vi.stubGlobal('window', {
      location: { search: '', pathname: '/' },
      sessionStorage: {
        getItem: vi.fn().mockReturnValue('session-123'),
        setItem: vi.fn(),
      },
    });

    await expect(
      sendAnalyticsEvent({
        type: 'open',
      }),
    ).resolves.toBeUndefined();

    expect(errorSpy).toHaveBeenCalledWith('Analytics failed', err);
  });
});
