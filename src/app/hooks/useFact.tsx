import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { FactClient } from '@/lib/facts/factClient';
import { Fact } from '@/lib/facts/factsTypes';
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
      const client = new FactClient();
      const nextFact = await client.getFact();

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
