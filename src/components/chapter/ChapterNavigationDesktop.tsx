"use client";

import { cn } from "@/lib/shad";
import { ChapterContext } from "@/providers/chapterProvider";
import { api, Book } from "@/services/api";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

interface Props {
  version: string;
}

export function ChapterNavigationDesktop({ version }: Props) {
  const { data } = useContext(ChapterContext);
  const searchParams = useSearchParams();
  const parallel = searchParams.get("parallel");

  if (!data.length) {
    return <></>;
  }

  let linkPrev = `/bible/${version}/${data[0].book.book}/${+data[0].chapter - 1}`;
  let chapterPrev = `${data[0].book.name ?? ""} ${+data[0].chapter - 1}`;
  if (data[0].chapter == 1) {
    if (data[0].book.bookPrev) {
      linkPrev = `/bible/${version}/${data[0].book.bookPrev.book}/${data[0].book.bookPrev.chapters}`;
      chapterPrev = `${data[0].book.bookPrev.name ?? ""} ${data[0].book.bookPrev.chapters}`;
    } else {
      linkPrev = "#";
    }
  }

  let linkNext = `/bible/${version}/${data[0].book.book}/${+data[0].chapter + 1}`;
  let chapterNext = `${data[0].book.name ?? ""} ${+data[0].chapter + 1}`;
  if (data[0].book.chapters == data[0].chapter) {
    if (data[0].book.bookNext) {
      linkNext = `/bible/${version}/${data[0].book.bookNext.book}/1`;
      chapterNext = `${data[0].book.bookNext.name ?? ""} 1`;
    } else {
      linkNext = "#";
    }
  }
  return (
    <div className="flex justify-between">
      <div>
        <Link
          href={linkPrev !== "#" ? `${linkPrev}${parallel ? `?parallel=${parallel}` : ""}` : "#"}
          className={cn("flex items-center gap-2", linkPrev === "#" && "hidden")}
        >
          <div className="flex h-14 w-14 rounded-full items-center justify-center bg-highlight-active cursor-pointer">
            <RiArrowLeftSLine size={24} />
          </div>
          {chapterPrev}
        </Link>
      </div>
      <div>
        <Link
          href={linkNext !== "#" ? `${linkNext}${parallel ? `?parallel=${parallel}` : ""}` : "#"}
          className={cn("flex items-center gap-2", linkNext === "#" && "hidden")}
        >
          {chapterNext}
          <div className="flex h-14 w-14 rounded-full items-center justify-center bg-highlight-active cursor-pointer">
            <RiArrowRightSLine size={24} />
          </div>
        </Link>
      </div>
    </div>
  );
}
