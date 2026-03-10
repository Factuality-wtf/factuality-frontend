"use client";

import { useFact } from "@/app/hooks/useFact";
import FactDisplay from "./FactDisplay";
import FactButton from "./FactButton";
import { Fact } from "@/lib/factClient";
import ShareButtons from "@components/ShareElements/ShareButtons";

type Props = {
  initialFact: Fact;
};

export default function FactController({ initialFact }: Props) {
  const { fact, fetchFact, loading } = useFact(initialFact);

  return (
    <div className="flex flex-col gap-y-4">
      <FactDisplay fact={fact} />

      <div className="flex gap-x-4 my-4">
        <FactButton onClick={fetchFact} loading={loading} />
        <ShareButtons fact={fact} />
      </div>
    </div>
  );
}
