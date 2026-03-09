import { cache } from "react";
import type { Metadata } from "next";
import FactSection from "@/components/FactSection";
import { FactClient } from "@/lib/factClient";

type PageProps = {
  params: Promise<{
    id: string;
    slug: string;
  }>;
};

const client = new FactClient();

export const getFact = cache(async (id: string) => {
  return client.getFactById(id);
});

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id, slug } = await params;

  const fact = await getFact(id);

  return {
    title: "Did You Know?",
    description: fact.body,
    openGraph: {
      title: "Did You Know?",
      description: fact.body,
      url: `/${id}/${slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      description: fact.name,
    },
  };
}

export default async function FactPage({ params }: PageProps) {
  const { id } = await params;

  const fact = await getFact(id);

  return <FactSection initialFact={fact} />;
}
