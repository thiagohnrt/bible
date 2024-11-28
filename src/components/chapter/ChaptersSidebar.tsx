"use client";

import { useEffect, useState } from "react";
import { Chapters } from "./Chapters";
import { api, Book } from "@/services/api";
import { Skeleton } from "../ui/skeleton";

interface Props {
  version: string;
  book: number;
  chapter: number;
}

export function ChaptersSidebar({ version, book: bookId, chapter }: Props) {
  const [book, setBook] = useState<Book>({} as Book);

  useEffect(() => {
    api.getBook(version, bookId).then((b) => setBook(b));
  }, [bookId, version]);

  if (!book.chapters) {
    return (
      <>
        <Skeleton className="w-1/2 h-10 bg-highlight" />
        <Skeleton className="h-60 mt-2 bg-highlight" />
      </>
    );
  }

  return (
    <>
      <h2 className="pb-4">{book.name}</h2>
      <Chapters
        version={version}
        book={book}
        chapter={chapter}
        className="md:grid-cols-6 lg:grid-cols-10 gap-2 [&>.chapter-number]:text-sm"
      />
    </>
  );
}
