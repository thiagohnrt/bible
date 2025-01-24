import { BetaMessage } from "@/components/home/BetaMessage";
import { BookList } from "@/components/home/BookList";
import { DecisionReading } from "@/components/home/DecisionReading";
import { IntallApp } from "@/components/home/IntallApp";
import { VerseOfTheDay } from "@/components/home/VerseOfTheDay";
import { Container } from "@/components/root/Container";
import { headers } from "next/headers";
import { userAgent } from "next/server";

export const runtime = "edge";

export default function HomePage() {
  const { device } = userAgent({ headers: headers() });
  return (
    <>
      <Container>
        <VerseOfTheDay className="mb-8" />
        <DecisionReading className="mb-8" />
        <BetaMessage className="mb-8" />
        <IntallApp device={device} className="mb-8" />
      </Container>
      <BookList device={device} className="bg-neutral-200 dark:bg-neutral-800" />
    </>
  );
}
