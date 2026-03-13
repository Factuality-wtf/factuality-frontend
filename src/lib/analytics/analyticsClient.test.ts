import { describe, expect, it, vi } from 'vitest';
import { httpClient } from '../api/httpClient';
import { sendAnalyticsEvent } from './analyticsClient';

describe('sendAnalyticsEvent', () => {
  it('posts analytics event with browser metadata', async () => {
    vi.spyOn(httpClient, 'post').mockResolvedValue(undefined);
    vi.stubGlobal('document', { referrer: 'https://example.com/source' });
    vi.stubGlobal('navigator', { userAgent: 'vitest-agent' });

    await sendAnalyticsEvent({
      type: 'view',
      factId: 'fact-123',
    });

    expect(httpClient.post).toHaveBeenCalledWith('/analytics/event', {
      type: 'view',
      factId: 'fact-123',
      referrer: 'https://example.com/source',
      userAgent: 'vitest-agent',
    });
  });

  it('swallows analytics failures and logs them', async () => {
    const err = new Error('network down');
    vi.spyOn(httpClient, 'post').mockRejectedValue(err);
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.stubGlobal('document', { referrer: '' });
    vi.stubGlobal('navigator', { userAgent: 'vitest-agent' });

    await expect(
      sendAnalyticsEvent({
        type: 'click',
        source: 'button',
      }),
    ).resolves.toBeUndefined();

    expect(errorSpy).toHaveBeenCalledWith('Analytics failed', err);
  });
});
