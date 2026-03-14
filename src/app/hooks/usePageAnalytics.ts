'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackPageView } from '@/lib/analytics/analyticsEvents';

const UUID_PATH_SEGMENT_REGEX =
  /(?:^|\/)([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})(?:\/|$)/i;

function getFactIdFromPath(pathname: string): string | undefined {
  const match = pathname.match(UUID_PATH_SEGMENT_REGEX);
  return match?.[1];
}

export function usePageAnalytics(): void {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedKey = useRef<string>('');
  const searchKey = searchParams.toString();

  useEffect(() => {
    if (!pathname) return;

    const trackingKey = `${pathname}?${searchKey}`;
    if (lastTrackedKey.current === trackingKey) return;

    trackPageView(getFactIdFromPath(pathname), pathname);
    lastTrackedKey.current = trackingKey;
  }, [pathname, searchKey]);
}
