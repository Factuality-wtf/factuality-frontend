import { sendAnalyticsEvent } from './client';

export function trackPageView(factId?: string, path?: string): void {
  sendAnalyticsEvent({
    type: 'view',
    factId,
    path,
  });
}

export function trackShare(factId: string, target: string): void {
  sendAnalyticsEvent({
    type: 'share',
    factId,
    shareTarget: target,
  });
}

export function trackCopy(factId?: string): void {
  sendAnalyticsEvent({
    type: 'copy',
    factId,
  });
}
