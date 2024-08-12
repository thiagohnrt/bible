"use client";

import { cn } from "@/lib/utils";
import { api, Book } from "@/services/api";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

interface Props {
  version: string;
  book: number;
  chapter: number;
}

export function ChapterNavigation({ version, book: bookId, chapter }: Props) {
  const [book, setBook] = useState<Book>({} as Book);

  useEffect(() => {
    api.getBook(version, bookId).then((b) => setBook(b));
  }, [bookId, version]);

  return (
    <div
      className="h-20 px-2 z-20 bg-background fixed left-0 right-0 border-t flex justify-between items-center"
      style={{ bottom: "calc(4rem - 1px)" }}
    >
      <ChapterPrev version={version} book={bookId} bookData={book} chapter={chapter} />
      <ChapterBook version={version} book={bookId} bookData={book} chapter={chapter} />
      <ChapterNext version={version} book={bookId} bookData={book} chapter={chapter} />
    </div>
  );
}

interface PropsChildren extends Props {
  bookData: Book;
}

function ChapterBook({ version, bookData: book, chapter }: PropsChildren) {
  return (
    <Link className="self-stretch flex-auto flex items-center" href={`/bible/${version}#${book.book}`}>
      <div
        className="w-full h-14 text-center text-sm font-bold overflow-hidden bg-highlight-active"
        style={{ lineHeight: "3.5rem" }}
      >
        {book.name ? `${book.name} ${chapter}` : ""}
      </div>
    </Link>
  );
}

function ChapterPrev({ version, bookData: book, chapter }: PropsChildren) {
  let linkPrev = `/bible/${version}/${book.book}/${+chapter - 1}`;
  if (chapter == 1) {
    if (book.bookPrev) {
      linkPrev = `/bible/${version}/${book.bookPrev.book}/${book.bookPrev.chapters}`;
    } else {
      linkPrev = "#";
    }
  }
  return (
    <Link href={linkPrev} className={cn("self-stretch flex items-center justify-end")}>
      <div className="bg-highlight rounded-l-full h-14 w-14" style={{ padding: 2 }}>
        <div className="rounded-full h-full w-full flex items-center justify-center bg-highlight-active">
          <RiArrowLeftSLine size={24} className={linkPrev === "#" ? "hidden" : ""} />
        </div>
      </div>
    </Link>
  );
}

function ChapterNext({ version, bookData: book, chapter }: PropsChildren) {
  let linkNext = `/bible/${version}/${book.book}/${+chapter + 1}`;
  if (book.chapters == chapter) {
    if (book.bookNext) {
      linkNext = `/bible/${version}/${book.bookNext.book}/1`;
    } else {
      linkNext = "#";
    }
  } else {
  }
  return (
    <Link href={linkNext} className="self-stretch flex items-center justify-start">
      <div className="bg-highlight rounded-r-full h-14 w-14" style={{ padding: 2 }}>
        <div className="rounded-full h-full w-full flex items-center justify-center bg-highlight-active">
          <RiArrowRightSLine size={24} className={linkNext === "#" ? "hidden" : ""} />
        </div>
      </div>
    </Link>
  );
}
