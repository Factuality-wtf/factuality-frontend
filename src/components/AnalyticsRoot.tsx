'use client';

import { usePageAnalytics } from '@/app/hooks/usePageAnalytics';

export default function AnalyticsRoot() {
  usePageAnalytics();

  return null;
}
