"use client";

import FactSection from "@components/FactSection";
import { DEFAULT_FACT } from "@/lib/factDefaults";

export default function Home() {
  return (
    <main className="flex flex-col items-center md:items-start justify-between text-text w-3/4 m-4">
      <div className="flex flex-col text-center md:text-left items-start justify-between gap-y-4">
        <FactSection initialFact={DEFAULT_FACT} />
      </div>
    </main>
  );
}
