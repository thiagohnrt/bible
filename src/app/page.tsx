import { DecisionReading } from "@/components/home/DecisionReading";
import { VerseOfTheDay } from "@/components/home/VerseOfTheDay";

export const runtime = "edge";

export default function HomePage() {
  return (
    <>
      <VerseOfTheDay className="mb-8" />
      <DecisionReading className="mb-8" />
    </>
  );
}
