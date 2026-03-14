export function parseBrowser(userAgent: string): string {
  if (/Edg\//i.test(userAgent)) return 'edge';
  if (/Chrome\//i.test(userAgent) && !/Edg\//i.test(userAgent)) return 'chrome';
  if (/Safari\//i.test(userAgent) && !/Chrome\//i.test(userAgent)) return 'safari';
  if (/Firefox\//i.test(userAgent)) return 'firefox';
  return 'other';
}

export function parseDevice(userAgent: string): string {
  if (/iPhone|Android.+Mobile|Mobile/i.test(userAgent)) return 'mobile';
  if (/iPad|Tablet|Android/i.test(userAgent)) return 'tablet';
  return 'desktop';
}
