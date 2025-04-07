"use client";

import { useFact } from "./hooks/useFact";
import FactDisplay from "../components/FactDisplay";
import FactButton from "../components/FactButton";

const defaultFact =
  "Discover random facts about anything and everything—science, history, weird trivia, and more—all in one place!";

export default function Home() {
  const { fact, fetchFact, loading } = useFact(defaultFact);

  return (
    <main className="flex flex-col items-start justify-between text-text w-3/4 p-12">
      <div className="flex flex-col items-start justify-between gap-y-4">
        <FactDisplay fact={fact} />
        <div className="flex flex-col gap-y-4 my-4">
          <FactButton onClick={fetchFact} loading={loading} />
        </div>
      </div>
    </main>
  );
}
