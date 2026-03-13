import { httpClient } from '../api/httpClient';
import { AnalyticsEvent } from './analyticsTypes';

export async function sendAnalyticsEvent(event: AnalyticsEvent): Promise<void> {
  try {
    await httpClient.post('/analytics/event', {
      ...event,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
    });
  } catch (error) {
    console.error('Analytics failed', error);
  }
}
