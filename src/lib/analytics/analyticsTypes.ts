export type AnalyticsEventType = 'view' | 'share' | 'click';

export interface AnalyticsEvent {
  type: AnalyticsEventType;
  factId?: string;
  shareTarget?: string;
  source?: string;
  medium?: string;
  referrer?: string;
}
