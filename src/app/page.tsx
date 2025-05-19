"use client";

import { useFact } from "./hooks/useFact";
import FactDisplay from "../components/FactDisplay";
import FactButton from "../components/FactButton";

export default function Home() {
  const { fact, fetchFact, loading } = useFact();

  return (
    <main className="flex flex-col items-center md:items-start justify-between text-text w-3/4 m-4 ">
      <div className="flex flex-col text-center md:text-left items-start justify-between gap-y-4">
        <FactDisplay fact={fact} />
        <div className="flex flex-col gap-y-4 my-4">
          <FactButton onClick={fetchFact} loading={loading} />
        </div>
      </div>
    </main>
  );
}
