"use client";

import { cn } from "@/lib/shad";
import { BibleContext } from "@/providers/bibleProvider";
import { Book } from "@/services/api";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { BsLayoutSidebarReverse } from "react-icons/bs";
import { Skeleton } from "../ui/skeleton";
import { Chapters } from "./Chapters";

interface Props {
  version: string;
  book: number;
  chapter: number;
}

export function ChaptersSidebar({ version, book: bookId, chapter }: Props) {
  const { getBook } = useContext(BibleContext);
  const [book, setBook] = useState<Book | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  useLayoutEffect(() => {
    getBook(version, bookId).then(setBook);
  }, [bookId, getBook, version]);

  useEffect(() => {
    const collapsed = localStorage.getItem("chapter_sidebar_collapsed");
    setCollapsed(collapsed === "true");
  }, []);

  const onCollapse = () => {
    localStorage.setItem("chapter_sidebar_collapsed", String(!collapsed));
    setCollapsed(!collapsed);
  };

  if (!book) {
    return (
      <div className={collapsed ? "basis-7" : "basis-2/6"}>
        <Skeleton className={cn("w-full h-6 bg-highlight", !collapsed && "hidden")} />
        <Skeleton className={cn("w-1/2 h-10 bg-highlight", collapsed && "hidden")} />
        <Skeleton className={cn("h-60 mt-2 bg-highlight", collapsed && "hidden")} />
      </div>
    );
  }

  return (
    <div className={cn("transition-all duration-300", collapsed ? "basis-7" : "basis-2/6")}>
      <div className="sticky top-20">
        <div className={cn("flex items-center pb-4")}>
          <div className={cn("transition-opacity", collapsed ? "opacity-0" : "opacity-100 delay-300")}>
            <h2 className={collapsed ? "hidden" : "leading-4"}>{book.name}</h2>
          </div>
          <div className="flex-1 flex justify-end">
            <div
              className="cursor-pointer"
              title={collapsed ? "Exibir menu de capítulos" : "Fechar menu de capítulos"}
              onClick={onCollapse}
            >
              <BsLayoutSidebarReverse size={18} />
            </div>
          </div>
        </div>
        <div className={cn("transition-opacity", collapsed ? "opacity-0" : "opacity-100 delay-300")}>
          <Chapters
            version={version}
            book={book}
            chapter={chapter}
            className={cn(
              "md:grid-cols-6 lg:grid-cols-10 gap-2 [&>.chapter-number]:text-sm",
              collapsed ? "hidden" : ""
            )}
          />
        </div>
      </div>
    </div>
  );
}
