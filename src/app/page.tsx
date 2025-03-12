import { BetaMessage } from "@/components/home/BetaMessage";
import { BookList } from "@/components/home/BookList";
import { DecisionReading } from "@/components/home/DecisionReading";
import { IntallApp } from "@/components/home/IntallApp";
import { TranslationsCounter } from "@/components/home/TranslationsCounter";
import { VerseOfTheDay } from "@/components/home/VerseOfTheDay";
import { Container } from "@/components/root/Container";
import { headers } from "next/headers";
import { userAgent } from "next/server";

export const runtime = "edge";

export default function HomePage() {
  const { device } = userAgent({ headers: headers() });
  return (
    <>
      <Container className="space-y-8 pb-8">
        <VerseOfTheDay />
        <DecisionReading />
        <TranslationsCounter />
        <BetaMessage />
        <IntallApp device={device} />
      </Container>
      <BookList device={device} className="bg-neutral-200 dark:bg-neutral-800" />
    </>
  );
}
