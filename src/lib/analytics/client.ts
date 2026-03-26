import { httpClient } from '../api/httpClient';
import { AnalyticsEvent } from './types';
import { buildAnalyticsPayload } from './payload';
import { isIgnoredAnalyticsError } from './validation';

export const sendAnalyticsEvent = async (event: AnalyticsEvent): Promise<void> => {
  try {
    const payload = buildAnalyticsPayload(event);
    await httpClient.post('/analytics/event', payload);
  } catch (error) {
    if (isIgnoredAnalyticsError(error)) return;

    console.error('Analytics failed', error);
  }
};
