import { cn } from "@/lib/utils";
import { Book } from "@/services/api";
import Link from "next/link";

interface ChaptersProps {
  version: string;
  book: Book;
  chapter?: number;
  className?: string;
}

export function Chapters({ version, book, chapter, className }: ChaptersProps) {
  return (
    <div className={cn("grid grid-cols-6 md:grid-cols-10 lg:grid-cols-15 gap-4", className)}>
      {"."
        .repeat(book.chapters - 1)
        .split(".")
        .map((n, i) => (
          <Link
            href={`/bible/${version}/${book.book}/${i + 1}`}
            style={{ aspectRatio: "1 / 1" }}
            className={cn(
              "chapter-number aspect-square flex items-center justify-center rounded-sm bg-highlight-active",
              chapter == i + 1 && "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-black"
            )}
            key={i}
          >
            {i + 1}
          </Link>
        ))}
    </div>
  );
}
