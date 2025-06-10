"use client";

import { Chapters } from "@/components/chapter/Chapters";
import { Container } from "@/components/root/Container";
import { Skeleton } from "@/components/ui/skeleton";
import * as bolls from "@/custom/bolls";
import { repeat } from "@/lib/utils";
import { BibleContext } from "@/providers/bibleProvider";
import { Book, Translation } from "@/services/api";
import { useContext, useEffect, useLayoutEffect, useState } from "react";

export default function BookPage({ params: { version, book: bookId } }: { params: { version: string; book: number } }) {
  const { books, getBook } = useContext(BibleContext);
  const [book, setBook] = useState<Book | null>(null);

  useLayoutEffect(() => {
    if (books.length) {
      getBook(version, bookId).then((b) => setBook(b));
    }
  }, [bookId, books, getBook, version]);

  useEffect(() => {
    if (book) {
      const translation: Translation = { identifier: version, short_name: version, full_name: version };
      document.title = `${book.name} - ${bolls.translation(translation).short_name} | BibleHonor`;
    }
  }, [book, version]);

  if (!book) {
    return (
      <Container>
        <Skeleton className="w-1/3 h-9 mb-4" />
        <div className="grid grid-cols-6 md:grid-cols-10 lg:grid-cols-15 gap-4">
          {repeat(12, (i) => {
            return (
              <Skeleton key={`skltn-book-${i}`} style={{ aspectRatio: "1 / 1" }} className="aspect-square rounded-sm" />
            );
          })}
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <h1 className="text-3xl pb-4">{book.name}</h1>
      <Chapters version={version} book={book} />
    </Container>
  );
}
