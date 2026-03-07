import { FactClient } from "@/lib/factClient";
import { Fact } from "@/lib/factClient";
import { useState } from "react";

const defaultFact: Fact = {
  id: "default",
  body: "Discover random facts about anything and everything all in one place!",
  name: "Welcome",
  created: "",
  modified: "",
  property: "factually.wtf",
  url: "",
  socialSharing: {
    title: "Welcome to factually.wtf",
    description:
      "Discover random facts about anything and everything all in one place!",
  },
};

const client = new FactClient();

export const useFact = () => {
  const [fact, setFact] = useState<Fact>(defaultFact);
  const [loading, setLoading] = useState(false);

  const fetchFact = async () => {
    setLoading(true);

    try {
      const data = await client.getFact();
      setFact(data);
    } catch (error) {
      console.error("Fact fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return { fact, fetchFact, loading };
};
