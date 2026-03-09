import FactSection from "@components/FactSection";
import { DEFAULT_FACT } from "@/lib/factDefaults";

export default function Home() {
  return <FactSection initialFact={DEFAULT_FACT} />;
}
