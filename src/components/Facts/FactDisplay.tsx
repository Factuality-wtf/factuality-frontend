import { Fact } from '@/lib/facts/factsTypes';

type FactDisplayProps = {
  fact: Fact;
  error?: string | null;
};

export default function FactDisplay({ fact, error = null }: FactDisplayProps) {
  return (
    <div className="grid gap-y-4 items-start ">
      <div className="min-h-40 md:min-h-20 wrap-break-word min-inline-sm leading-snug tracking-wide">
        <p className="text-4xl text-text text-left">{error ?? fact.body}</p>
      </div>
    </div>
  );
}
