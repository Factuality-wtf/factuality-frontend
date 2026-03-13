import { sendAnalyticsEvent } from './analyticsClient';

export function trackPageView(factId?: string): void {
  sendAnalyticsEvent({
    type: 'view',
    factId,
  });
}

export function trackShare(factId: string, target: string): void {
  sendAnalyticsEvent({
    type: 'share',
    factId,
    shareTarget: target,
  });
}

export function trackClick(name: string): void {
  sendAnalyticsEvent({
    type: 'click',
    source: name,
  });
}
