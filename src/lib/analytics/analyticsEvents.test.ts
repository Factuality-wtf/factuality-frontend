import { describe, expect, it, vi } from 'vitest';
import * as analyticsClient from './analyticsClient';
import { trackClick, trackPageView, trackShare } from './analyticsEvents';

describe('analyticsEvents', () => {
  it('tracks page views', () => {
    const spy = vi.spyOn(analyticsClient, 'sendAnalyticsEvent').mockResolvedValue(undefined);

    trackPageView('abc');

    expect(spy).toHaveBeenCalledWith({
      type: 'view',
      factId: 'abc',
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

  it('tracks clicks', () => {
    const spy = vi.spyOn(analyticsClient, 'sendAnalyticsEvent').mockResolvedValue(undefined);

    trackClick('nav-cta');

    expect(spy).toHaveBeenCalledWith({
      type: 'click',
      source: 'nav-cta',
    });
  });
});
