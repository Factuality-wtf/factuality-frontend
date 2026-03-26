'use client';

import { Fact } from '@/lib/facts/factsTypes';
import { useFact } from '@/app/hooks/useFact';
import FactDisplay from './FactDisplay';
import FactButton from './FactButton';
import ShareButtons from '@components/ShareElements/ShareButtons';

type Props = {
  initialFact: Fact;
  initialError?: string | null;
};

export default function FactController({ initialFact, initialError = null }: Props) {
  const { fact, fetchFact, loading, error } = useFact(initialFact);
  const displayError = error ?? initialError;

  return (
    <div className="flex flex-col gap-y-4 items-start">
      <FactDisplay fact={fact} error={displayError} />

      <div className="flex flex-col md:flex-row gap-6 my-4">
        <FactButton onClick={fetchFact} loading={loading} />
        <ShareButtons fact={fact} />
      </div>
    </div>
  );
}
