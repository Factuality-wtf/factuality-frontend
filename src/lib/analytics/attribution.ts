const SEARCH_ENGINES = ['google.', 'bing.', 'duckduckgo.', 'yahoo.', 'baidu.', 'yandex.'];

type TrafficAttribution = {
  source: string;
  medium: string;
  campaign: string | null;
  referrer: string | null;
};

function isSearchReferrer(hostname: string): boolean {
  return SEARCH_ENGINES.some((engine) => hostname.includes(engine));
}

export function getAttribution(): TrafficAttribution {
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
