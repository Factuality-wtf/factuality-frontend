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

  return <FactSection initialFact={fact} />;
}
