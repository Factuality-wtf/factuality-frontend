import FactSection from "@/components/FactSection";
import { FactClient } from "@/lib/factClient";

type PageProps = {
  params: Promise<{
    id: string;
    slug: string;
  }>;
};

export default async function FactPage({ params }: PageProps) {
  const { id } = await params;

  const client = new FactClient();
  const fact = await client.getFactById(id);

  return (
    <main className="flex flex-col items-center md:items-start justify-between text-text w-3/4 m-4">
      <div className="flex flex-col text-center md:text-left items-start justify-between gap-y-4">
        <FactSection initialFact={fact} />
      </div>
    </main>
  );
}
