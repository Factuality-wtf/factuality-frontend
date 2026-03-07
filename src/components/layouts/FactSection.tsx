"use client";

import { useFact } from "../../app/hooks/useFact";
import FactDisplay from "../FactDisplay";
import FactButton from "../FactButton";
import { Fact } from "@/lib/factClient";

type Props = {
  initialFact: Fact;
};

export default function FactSection({ initialFact }: Props) {
  const { fact, fetchFact, loading } = useFact(initialFact);

  return (
    <>
      <FactDisplay fact={fact} />
      <div className="flex flex-col gap-y-4 my-4">
        <FactButton onClick={fetchFact} loading={loading} />
      </div>
    </>
  );
}
