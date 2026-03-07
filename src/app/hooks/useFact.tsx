import { useState } from "react";
import { useRouter } from "next/navigation";

import { FactClient, Fact } from "@/lib/factClient";
import { DEFAULT_FACT } from "@/lib/factDefaults";
import { buildFactUrl } from "@/lib/factUtils";

export const useFact = (initialFact: Fact = DEFAULT_FACT) => {
  const router = useRouter();

  const [fact, setFact] = useState<Fact>(initialFact);
  const [loading, setLoading] = useState(false);

  const fetchFact = async () => {
    setLoading(true);

    try {
      const client = new FactClient();
      const nextFact = await client.getFact();

      setFact(nextFact);

      router.push(buildFactUrl(nextFact));
    } catch (err) {
      console.error("Fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return { fact, fetchFact, loading };
};
