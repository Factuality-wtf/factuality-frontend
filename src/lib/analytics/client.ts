import { AnalyticsEvent } from './types';
import { buildAnalyticsPayload } from './payload';
import { isIgnoredAnalyticsError } from './validation';

export const sendAnalyticsEvent = async (event: AnalyticsEvent): Promise<void> => {
  try {
    const payload = buildAnalyticsPayload(event);
    const res = await fetch('/api/analytics/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
      keepalive: true,
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error('Analytics request failed');
    }
  } catch (error) {
    if (isIgnoredAnalyticsError(error)) return;

    console.error('Analytics failed', error);
  }
};
