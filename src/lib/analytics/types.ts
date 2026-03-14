export type AnalyticsEventType = 'view' | 'share' | 'copy' | 'open';

export interface AnalyticsEvent {
  type: AnalyticsEventType;
  factId?: string;
  path?: string;
  shareTarget?: string;
  source?: string;
  medium?: string;
  campaign?: string;
  experiment?: string;
  variant?: string;
  referrer?: string;
  userAgent?: string;
  sessionId?: string;
  country?: string;
  device?: string;
  browser?: string;
  ipAddress?: string;
}
