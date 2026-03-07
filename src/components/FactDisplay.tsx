import { Fact } from "@/lib/factClient";

type FactDisplayProps = {
  fact: Fact;
};

export default function FactDisplay({ fact }: FactDisplayProps) {
  return (
    <div>
      <p className="text-2xl md:text-4xl py-6">{fact.body}</p>
    </div>
  );
}
