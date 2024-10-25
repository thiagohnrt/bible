"use client";

import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import Link from "next/link";
import { cn } from "@/lib/utils";
import * as bolls from "@/custom/bolls";
import { api, Book } from "@/services/api";
import { useEffect, useState } from "react";

interface Props {
  version: string;
  book: number;
  chapter: number;
}

export function ChapterNavigationDesktop({ version, book: bookId, chapter }: Props) {
  const [book, setBook] = useState<Book>({} as Book);

  useEffect(() => {
    api.getBook(version, bookId).then((data) => setBook(data));
  }, [bookId, version]);

  let linkPrev = `/bible/${version}/${book.book}/${+chapter - 1}`;
  let chapterPrev = `${bolls.book(book).name ?? ""} ${+chapter - 1}`;
  if (chapter == 1) {
    if (book.bookPrev) {
      linkPrev = `/bible/${version}/${book.bookPrev.book}/${book.bookPrev.chapters}`;
      chapterPrev = `${bolls.book(book.bookPrev).name ?? ""} ${book.bookPrev.chapters}`;
    } else {
      linkPrev = "#";
    }
  }

  let linkNext = `/bible/${version}/${book.book}/${+chapter + 1}`;
  let chapterNext = `${bolls.book(book).name ?? ""} ${+chapter + 1}`;
  if (book.chapters == chapter) {
    if (book.bookNext) {
      linkNext = `/bible/${version}/${book.bookNext.book}/1`;
      chapterNext = `${bolls.book(book.bookNext).name ?? ""} 1`;
    } else {
      linkNext = "#";
    }
  }
  return (
    <div className="flex justify-between">
      <div>
        <Link href={linkPrev} className={cn("flex items-center gap-2", linkPrev === "#" && "hidden")}>
          <div className="flex h-14 w-14 rounded-full items-center justify-center bg-highlight-active cursor-pointer">
            <RiArrowLeftSLine size={24} />
          </div>
          {chapterPrev}
        </Link>
      </div>
      <div>
        <Link href={linkNext} className={cn("flex items-center gap-2", linkNext === "#" && "hidden")}>
          {chapterNext}
          <div className="flex h-14 w-14 rounded-full items-center justify-center bg-highlight-active cursor-pointer">
            <RiArrowRightSLine size={24} />
          </div>
        </Link>
      </div>
    </div>
  );
}
