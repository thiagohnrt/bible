import { DecisionReading } from "@/components/home/DecisionReading";
import { VerseOfTheDay } from "@/components/home/VerseOfTheDay";

export default function HomePage() {
  return (
    <>
      <VerseOfTheDay className="mb-8" />
      <DecisionReading className="mb-8" />
    </>
  );
}
