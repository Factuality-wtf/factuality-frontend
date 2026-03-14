import { AnalyticsEvent } from './types';
import { getSessionId } from './sessions';
import { getAttribution } from './attribution';
import {parseBrowser, parseDevice } from './device'
import { isUuid } from './validation';

export const buildAnalyticsPayload = (event: AnalyticsEvent) => {
  const userAgent = event.userAgent ?? navigator.userAgent ?? null;
  const attribution = getAttribution();
  const factId = isUuid(event.factId) ? event.factId : null;
  const path = event.path ?? window.location.pathname ?? '/';

  return {
    event_type: event.type,
    fact_id: factId,
    path,
    share_target: event.shareTarget ?? null,
    source: event.source ?? attribution.source,
    medium: event.medium ?? attribution.medium,
    campaign: event.campaign ?? attribution.campaign,
    experiment: event.experiment ?? null,
    variant: event.variant ?? null,
    referrer: event.referrer ?? attribution.referrer,
    user_agent: userAgent,
    session_id: event.sessionId ?? getSessionId(),
    country: event.country ?? null,
    device: event.device ?? (userAgent ? parseDevice(userAgent) : null),
    browser: event.browser ?? (userAgent ? parseBrowser(userAgent) : null),
    ip_address: event.ipAddress ?? null,
  };
}
