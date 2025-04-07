type FactDisplayProps = {
  fact: string;
};

export default function FactDisplay({ fact }: FactDisplayProps) {
  return <p className="text-4xl">{fact}</p>;
}
