import { ContinueReading } from "@/components/home/ContinueReading";
import { VerseOfDay } from "@/components/home/VerseOfDay";

export default function HomePage() {
  return (
    <>
      <VerseOfDay className="mb-8" />
      <ContinueReading className="mb-8" />
    </>
  );
}
