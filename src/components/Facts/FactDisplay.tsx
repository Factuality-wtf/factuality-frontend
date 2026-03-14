import { Fact } from '@/lib/facts/factsTypes';

type FactDisplayProps = {
  fact: Fact;
  error?: string | null;
};

export default function FactDisplay({ fact, error = null }: FactDisplayProps) {
  return (
    <div className="grid gap-y-4">
      <div className="min-h-20">
        <p className="text-2xl md:text-4xl">{error ?? fact.body}</p>
      </div>
    </div>
  );
}
