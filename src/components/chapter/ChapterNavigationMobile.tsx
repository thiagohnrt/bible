"use client";

import { cn } from "@/lib/shad";
import { BibleContext } from "@/providers/bibleProvider";
import { Book } from "@/services/api";
import Link from "next/link";
import { useContext, useLayoutEffect, useRef, useState } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { StoriesNavigation } from "./StoriesNavigation";

interface Props {
  version: string;
  book: number;
  chapter: number;
}

export function ChapterNavigationMobile({ version, book: bookId, chapter }: Props) {
  const { getBook, translation } = useContext(BibleContext);
  const [book, setBook] = useState<Book | null>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    getBook(version, bookId).then(setBook);
  }, [bookId, getBook, version]);

  return (
    <div
      className={cn(
        "chapter-navigation",
        "fixed left-0 right-0 h-20 px-2 z-20",
        "bg-background border-t",
        "transition-all duration-500"
      )}
      style={{ bottom: "calc(4rem - 1px)" }}
      ref={parentRef}
    >
      {!book || !translation ? (
        <></>
      ) : (
        <div className="flex justify-between items-center gap-2 h-full">
          <div className="flex flex-1 justify-between items-center">
            <ChapterPrev version={version} book={book} chapter={chapter} />
            <ChapterBook version={version} book={book} chapter={chapter} />
            <ChapterNext version={version} book={book} chapter={chapter} />
          </div>
          <StoriesNavigation translation={translation} parent={parentRef} />
        </div>
      )}
    </div>
  );
}

interface PropsChildren {
  version: string;
  book: Book;
  chapter: number;
}

function ChapterBook({ version, book, chapter }: PropsChildren) {
  return (
    <Link className="self-stretch flex-auto flex items-center" href={`/bible/${version}?${book.book}-${chapter}`}>
      <div
        className="chapter-book w-full h-14 text-center text-sm font-bold overflow-hidden bg-highlight-active"
        style={{ lineHeight: "3.5rem" }}
      >
        {book.name ? `${book.name} ${chapter}` : ""}
      </div>
    </Link>
  );
}

function ChapterPrev({ version, book, chapter }: PropsChildren) {
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
      <div className="chapter-prev h-14 w-14 rounded-l-full bg-highlight transition-colors" style={{ padding: 2 }}>
        <div className="chapter-prev-btn rounded-full h-full w-full flex items-center justify-center bg-highlight-active">
          <RiArrowLeftSLine size={24} className={linkPrev === "#" ? "hidden" : ""} />
        </div>
      </div>
    </Link>
  );
}

function ChapterNext({ version, book, chapter }: PropsChildren) {
  let linkNext = `/bible/${version}/${book.book}/${+chapter + 1}`;
  if (book.chapters == chapter) {
    if (book.bookNext) {
      linkNext = `/bible/${version}/${book.bookNext.book}/1`;
    } else {
      linkNext = "#";
    }
  }
  return (
    <Link href={linkNext} className="self-stretch flex items-center justify-start">
      <div className="chapter-next h-14 w-14 rounded-r-full bg-highlight transition-colors" style={{ padding: 2 }}>
        <div className="chapter-next-btn rounded-full h-full w-full flex items-center justify-center bg-highlight-active">
          <RiArrowRightSLine size={24} className={linkNext === "#" ? "hidden" : ""} />
        </div>
      </div>
    </Link>
  );
}
