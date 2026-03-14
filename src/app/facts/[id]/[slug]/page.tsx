import { cache } from 'react';
import type { Metadata } from 'next';
import { FactClient } from '@/lib/facts/factClient';
import { DEFAULT_FACT } from '@/lib/facts/factDefaults';
import FactController from '@components/Facts/FactsController';

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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id, slug } = await params;

  const fact = await getFact(id).catch(() => null);

  if (!fact) {
    return {
      title: 'Did You Know?',
      description: 'fact',
      openGraph: {
        title: 'Did You Know?',
        description: 'fact',
        url: `/${id}/${slug}`,
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        description: 'fact',
      },
    };
  }

  return {
    title: 'Did You Know?',
    description: fact.body,
    openGraph: {
      title: 'Did You Know?',
      description: fact.body,
      url: `/${id}/${slug}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      description: fact.name,
    },
  };
}

export default async function FactPage({ params }: PageProps) {
  const { id } = await params;
  const initialError = "500 Brain not here. Coul'nt fetch fact";

  const fact = await getFact(id).catch(() => null);

  if (!fact) {
    return <FactController initialFact={DEFAULT_FACT} initialError={initialError} />;
  }

  return <FactController initialFact={fact} />;
}
