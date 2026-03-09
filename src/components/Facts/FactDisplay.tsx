import { Fact } from "@/lib/factClient";

type FactDisplayProps = {
  fact: Fact;
};

export default function FactDisplay({ fact }: FactDisplayProps) {
  return (
    <div className="grid gap-y-4">
      <div className="min-h-20">
        <p className="text-2xl md:text-4xl">{fact.body}</p>
      </div>
    </div>
  );
}
