type FactDisplayProps = {
  fact: string;
};

export default function FactDisplay({ fact }: FactDisplayProps) {
  return <p className="text-2xl md:text-4xl py-6">{fact}</p>;
}
