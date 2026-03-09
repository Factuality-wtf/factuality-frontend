import FactController from "@components/Facts/FactsController";
import { DEFAULT_FACT } from "@/lib/factDefaults";

export default function Home() {
  return <FactController initialFact={DEFAULT_FACT} />;
}
