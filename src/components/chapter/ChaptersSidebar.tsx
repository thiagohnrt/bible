"use client";

import { cn } from "@/lib/shad";
import { api, Book } from "@/services/api";
import { useEffect, useState } from "react";
import { TbLayoutSidebarRightCollapse, TbLayoutSidebarRightExpand } from "react-icons/tb";
import { Skeleton } from "../ui/skeleton";
import { Chapters } from "./Chapters";

interface Props {
  version: string;
  book: number;
  chapter: number;
}

export function ChaptersSidebar({ version, book: bookId, chapter }: Props) {
  const [book, setBook] = useState<Book>({} as Book);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    api.getBook(version, bookId).then((b) => setBook(b));
  }, [bookId, version]);

  useEffect(() => {
    const collapsed = localStorage.getItem("chapter_sidebar_collapsed");
    setCollapsed(collapsed === "true");
  }, []);

  const onCollapse = () => {
    localStorage.setItem("chapter_sidebar_collapsed", String(!collapsed));
    setCollapsed(!collapsed);
  };

  if (!book.chapters) {
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
            <h2 className={collapsed ? "hidden" : ""}>{book.name}</h2>
          </div>
          <div className="flex-1 flex justify-end">
            <div
              className="cursor-pointer"
              title={collapsed ? "Exibir menu de capítulos" : "Fechar menu de capítulos"}
              onClick={onCollapse}
            >
              {collapsed ? <TbLayoutSidebarRightExpand size={24} /> : <TbLayoutSidebarRightCollapse size={24} />}
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
