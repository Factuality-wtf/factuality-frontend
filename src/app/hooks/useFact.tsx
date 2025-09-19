import { useState } from "react";

const defaultFact =
  "Discover random facts about anything and everything—science, history, weird trivia, and more—all in one place!";

export const useFact = () => {
  const [fact, setFact] = useState(defaultFact);
  const [loading, setLoading] = useState(false);

  const fetchFact = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/fact");

      if (!res.ok) throw new Error("Request failed");

      const { fact } = await res.json();
      setFact(fact);
    } catch (err) {
      console.error("Fetch failed:", err);
      setFact("Error fetching fact.");
    } finally {
      setLoading(false);
    }
  };

  return { fact, fetchFact, loading };
};
