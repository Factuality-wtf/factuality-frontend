import { FactClient } from "@/lib/factClient";

type PageProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: PageProps) {
  const client = new FactClient();
  const fact = await client.getFactById(params.id);

  return {
    title: fact.socialSharing.title,
    description: fact.socialSharing.description,
  };
}

export default async function FactPage({ params }: PageProps) {
  const client = new FactClient();
  const fact = await client.getFactById(params.id);

  return (
    <main className="flex flex-col w-3/4 m-4">
      <p className="text-3xl py-6">{fact.body}</p>
    </main>
  );
}
