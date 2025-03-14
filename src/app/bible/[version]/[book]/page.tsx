"use client";

import { Chapters } from "@/components/chapter/Chapters";
import { Skeleton } from "@/components/ui/skeleton";
import { api, Book, Translation } from "@/services/api";
import { useEffect, useState } from "react";
import { Container } from "@/components/root/Container";
import * as bolls from "@/custom/bolls";
import { repeat } from "@/lib/utils";

export default function BookPage({ params: { version, book } }: { params: { version: string; book: number } }) {
  const [bookData, setBookData] = useState<Book | null>(null);

  useEffect(() => {
    if (!bookData) {
      api.getBook(version, book).then((b) => setBookData(b));
    }
  }, [book, bookData, version]);

  useEffect(() => {
    if (bookData) {
      const translation: Translation = { identifier: version, short_name: version, full_name: version };
      document.title = `${bookData.name} - ${bolls.translation(translation).short_name} | BibleHonor`;
    }
  }, [bookData, version]);

  if (!bookData) {
    return (
      <Container>
        <Skeleton className="w-1/3 h-9 mb-4" />
        <div className="grid grid-cols-6 md:grid-cols-10 lg:grid-cols-15 gap-4">
          {repeat(12, (i) => {
            return <Skeleton style={{ aspectRatio: "1 / 1" }} className="aspect-square rounded-sm" />;
          })}
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <h1 className="text-3xl pb-4">{bookData.name}</h1>
      <Chapters version={version} book={bookData} />
    </Container>
  );
}
