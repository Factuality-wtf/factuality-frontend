import { useState } from "react";

export const useFact = (initialFact: string) => {
  const [fact, setFact] = useState(initialFact);
  const [loading, setLoading] = useState(false);

  const fetchFact = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/fact");
      const data = await res.json();
      setFact(data.fact);
    } catch (err) {
      console.error("Fetch failed:", err);
      setFact("Error fetching fact.");
    } finally {
      setLoading(false);
    }
  };

  return { fact, fetchFact, loading };
};
