import { FactClient } from "@/lib/factClient";
import { Fact } from "@/lib/factClient";
import { useRouter } from "next/navigation";
import { useState } from "react";

const defaultFact: Fact = {
  id: "default",
  body: "Discover random facts about anything and everything all in one place!",
  name: "Welcome",
  created: "",
  modified: "",
  property: "factually.wtf",
  url: "",
  social_sharing: {
    title: "Welcome to factually.wtf",
    description:
      "Discover random facts about anything and everything all in one place!",
  },
};

const client = new FactClient();

export const useFact = (initialFact: Fact = defaultFact) => {
  const router = useRouter();
  const [fact, setFact] = useState<Fact>(initialFact);
  const [loading, setLoading] = useState(false);

  const fetchFact = async () => {
    setLoading(true);

    try {
      const nextFact = await client.getFact();
      setFact(nextFact);

      const slug = nextFact.url.split("/").pop();

      if (slug) {
        router.push(`/facts/${nextFact.id}/${slug}`);
      }
    } catch (error) {
      console.error("Fact fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };
  return { fact, fetchFact, loading };
};
