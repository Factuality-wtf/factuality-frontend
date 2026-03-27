import { useState } from 'react';
import { useRouter } from 'next/navigation';

import type { Fact } from '@/lib/facts/factsTypes';
import { DEFAULT_FACT } from '@/lib/facts/factDefaults';
import { buildFactUrl } from '@/lib/facts/factUtils';

const MIN_LOADING_TIME = 5000;

export const useFact = (initialFact: Fact = DEFAULT_FACT) => {
  const router = useRouter();

  const [fact, setFact] = useState<Fact>(initialFact);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFact = async () => {
    setLoading(true);
    setError(null);
    const start = Date.now();
    const initialError = "500 Brain not here. Coul'nt fetch fact";

    try {
      const res = await fetch('/api/fact', {
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const { data: nextFact } = (await res.json()) as { data?: Fact };
      if (!nextFact) {
        throw new Error('Invalid data format');
      }

      setFact(nextFact);

      router.push(buildFactUrl(nextFact));
    } catch (err) {
      console.error('Fetch failed:', err);
      setError(initialError);
    } finally {
      const elapsed = Date.now() - start;

      if (elapsed < MIN_LOADING_TIME) {
        await new Promise((r) => setTimeout(r, MIN_LOADING_TIME - elapsed));
      }
      setLoading(false);
    }
  };

  return { fact, fetchFact, loading, error };
};
