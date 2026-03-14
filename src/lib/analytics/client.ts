import { httpClient } from '../api/httpClient';
import { AnalyticsEvent } from './types';
import { getSessionId } from './sessions';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const SEARCH_ENGINES = ['google.', 'bing.', 'duckduckgo.', 'yahoo.', 'baidu.', 'yandex.'];

type TrafficAttribution = {
  source: string;
  medium: string;
  campaign: string | null;
  referrer: string | null;
};

function isUuid(value?: string): value is string {
  return typeof value === 'string' && UUID_REGEX.test(value);
}

function parseBrowser(userAgent: string): string {
  if (/Edg\//i.test(userAgent)) return 'edge';
  if (/Chrome\//i.test(userAgent) && !/Edg\//i.test(userAgent)) return 'chrome';
  if (/Safari\//i.test(userAgent) && !/Chrome\//i.test(userAgent)) return 'safari';
  if (/Firefox\//i.test(userAgent)) return 'firefox';
  return 'other';
}

function parseDevice(userAgent: string): string {
  if (/iPhone|Android.+Mobile|Mobile/i.test(userAgent)) return 'mobile';
  if (/iPad|Tablet|Android/i.test(userAgent)) return 'tablet';
  return 'desktop';
}

function isSearchReferrer(hostname: string): boolean {
  return SEARCH_ENGINES.some((engine) => hostname.includes(engine));
}

function getAttribution(): TrafficAttribution {
  const searchParams = new URLSearchParams(window.location.search);
  const utmSource = searchParams.get('utm_source');
  const utmMedium = searchParams.get('utm_medium');
  const utmCampaign = searchParams.get('utm_campaign');
  const referrer = document.referrer || null;

  if (utmSource) {
    return {
      source: utmSource,
      medium: utmMedium ?? 'campaign',
      campaign: utmCampaign,
      referrer,
    };
  }

  if (!referrer) {
    return {
      source: 'direct',
      medium: 'none',
      campaign: utmCampaign,
      referrer: null,
    };
  }

  try {
    const referrerHost = new URL(referrer).hostname.toLowerCase();
    return {
      source: referrerHost.replace(/^www\./, ''),
      medium: isSearchReferrer(referrerHost) ? 'search' : 'referral',
      campaign: utmCampaign,
      referrer,
    };
  } catch {
    return {
      source: 'referrer_unknown',
      medium: 'referral',
      campaign: utmCampaign,
      referrer,
    };
  }
}

function isIgnoredAnalyticsError(error: unknown): boolean {
  if (error instanceof TypeError) {
    return true;
  }

  if (error instanceof DOMException && error.name === 'AbortError') {
    return true;
  }

  return false;
}

export async function sendAnalyticsEvent(event: AnalyticsEvent): Promise<void> {
  try {
    const userAgent = event.userAgent ?? navigator.userAgent ?? null;
    const attribution = getAttribution();
    const factId = isUuid(event.factId) ? event.factId : null;
    const path = event.path ?? window.location.pathname ?? '/';

    const payload = {
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

    await httpClient.post('/analytics/event', payload);
  } catch (error) {
    if (isIgnoredAnalyticsError(error)) {
      return;
    }

    console.error('Analytics failed', error);
  }
}
