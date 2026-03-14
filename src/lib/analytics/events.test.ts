import { describe, expect, it, vi } from 'vitest';
import * as analyticsClient from './client';
import { trackCopy, trackPageView, trackShare } from './events';

describe('analyticsEvents', () => {
  it('tracks page views', () => {
    const spy = vi.spyOn(analyticsClient, 'sendAnalyticsEvent').mockResolvedValue(undefined);

    trackPageView('abc', '/facts/abc/test');

    expect(spy).toHaveBeenCalledWith({
      type: 'view',
      factId: 'abc',
      path: '/facts/abc/test',
    });
  });

  it('tracks shares', () => {
    const spy = vi.spyOn(analyticsClient, 'sendAnalyticsEvent').mockResolvedValue(undefined);

    trackShare('abc', 'twitter');

    expect(spy).toHaveBeenCalledWith({
      type: 'share',
      factId: 'abc',
      shareTarget: 'twitter',
    });
  });

  it('tracks copy actions', () => {
    const spy = vi.spyOn(analyticsClient, 'sendAnalyticsEvent').mockResolvedValue(undefined);

    trackCopy('abc');

    expect(spy).toHaveBeenCalledWith({
      type: 'copy',
      factId: 'abc',
    });
  });
});
