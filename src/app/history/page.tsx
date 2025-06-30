"use client";

import { Container } from "@/components/root/Container";
import { bibleUtils } from "@/lib/bibleUtils";
import { getBibleHistory } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChapterRead } from "../bible/[version]/[book]/[chapter]/page";

export default function HistoryPage() {
  const [bibleHistory, setBibleHistory] = useState<{ [label: string]: ChapterRead[] }>({});

  useEffect(() => {
    const bibleHistory = getBibleHistory().reverse();
    const groups: { [label: string]: ChapterRead[] } = {};
    bibleHistory.forEach((history) => {
      const label = bibleUtils.formatHistoryDate(history.date);
      if (!groups[label]) groups[label] = [];
      groups[label].push(history);
    });
    setBibleHistory(groups);
  }, []);

  return (
    <Container className="flex flex-col px-0">
      <h1 className="text-2xl font-bold mb-4 px-6">Histórico de Leitura</h1>
      <div className="flex flex-col gap-2">
        {Object.entries(bibleHistory).map(([label, items]) => (
          <div key={label} className="pb-4 px-3">
            <div className="text-sm font-bold px-3">{label}</div>
            {items.map((history, index) => (
              <Link
                href={`/bible/${history.translationId}/${history.book.id}/${history.chapter}`}
                key={index}
                className="block py-2 px-3 rounded-md active:bg-neutral-200 hover:bg-neutral-200 dark:active:bg-neutral-800 dark:hover:bg-neutral-800 transition-colors"
              >
                {history.book.name} {history.chapter}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </Container>
  );
}
