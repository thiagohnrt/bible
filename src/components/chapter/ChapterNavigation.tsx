import { cn } from "@/lib/utils";
import { Book } from "@/services/api";
import Link from "next/link";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

interface Props {
  version: string;
  book: Book;
  chapter: number;
}

export function ChapterNavigation({ version, book, chapter }: Props) {
  return (
    <div
      className="h-16 px-2 z-20 dark:bg-neutral-950 bg-neutral-50 fixed left-0 right-0 border-t flex justify-between items-center"
      style={{ bottom: "calc(4rem - 1px)" }}
    >
      <ChapterPrev version={version} book={book} chapter={chapter} />
      <ChapterBook version={version} book={book} chapter={chapter} />
      <ChapterNext version={version} book={book} chapter={chapter} />
    </div>
  );
}

function ChapterBook({ version, book, chapter }: Props) {
  return (
    <Link
      className="self-stretch flex-auto flex items-center"
      href={`/bible/${version}/${book.bookid}`}
    >
      <div
        className="w-full h-14 text-center bg-neutral-800 text-sm overflow-hidden"
        style={{ lineHeight: "3.5rem" }}
      >
        {book.name} {chapter}
      </div>
    </Link>
  );
}

function ChapterPrev({ version, book, chapter }: Props) {
  let linkPrev = `/bible/${version}/${book.bookid}/${+chapter - 1}`;
  if (chapter == 1) {
    if (book.bookPrev) {
      linkPrev = `/bible/${version}/${book.bookPrev.bookid}/${book.bookPrev.chapters}`;
    } else {
      linkPrev = "#";
    }
  }
  return (
    <Link
      href={linkPrev}
      className={cn("self-stretch flex items-center justify-end")}
    >
      <div className="bg-neutral-800 rounded-l-full h-14 w-14">
        <div className="rounded-full h-full w-full flex items-center justify-center">
          <RiArrowLeftSLine
            size={18}
            className={linkPrev === "#" ? "hidden" : ""}
          />
        </div>
      </div>
    </Link>
  );
}

function ChapterNext({ version, book, chapter }: Props) {
  let linkNext = `/bible/${version}/${book.bookid}/${+chapter + 1}`;
  if (book.chapters == chapter) {
    if (book.bookNext) {
      linkNext = `/bible/${version}/${book.bookNext.bookid}/1`;
    } else {
      linkNext = "#";
    }
  } else {
  }
  return (
    <Link
      href={linkNext}
      className="self-stretch flex items-center justify-start"
    >
      <div className="bg-neutral-800 rounded-r-full h-14 w-14">
        <div className="rounded-full h-full w-full flex items-center justify-center">
          <RiArrowRightSLine
            size={18}
            className={linkNext === "#" ? "hidden" : ""}
          />
        </div>
      </div>
    </Link>
  );
}
