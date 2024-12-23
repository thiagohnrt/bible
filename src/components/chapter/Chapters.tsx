import { cn } from "@/lib/utils";
import { Book } from "@/services/api";
import LinkNext from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Verses } from "./Verses";
import { useSearchParams } from "next/navigation";

interface ChaptersProps {
  version: string;
  book: Book;
  chapter?: number;
  className?: string;
  device?: {
    model?: string;
    type?: string;
    vendor?: string;
  };
}

export function Chapters({ version, book, chapter, className, device }: ChaptersProps) {
  return (
    <div className={cn("grid grid-cols-6 md:grid-cols-10 lg:grid-cols-15 gap-4", className)}>
      {"."
        .repeat(book.chapters - 1)
        .split(".")
        .map((n, i) => {
          if (device?.type === "mobile") {
            return <Button version={version} book={book} chapter={i + 1} key={i} chapterCurrent={chapter} />;
          } else {
            return <Link version={version} book={book} chapter={i + 1} key={i} chapterCurrent={chapter} />;
          }
        })}
    </div>
  );
}

interface LinkProps {
  version: string;
  book: Book;
  chapter: number;
  chapterCurrent?: number;
}

function Link({ version, book, chapter, chapterCurrent }: LinkProps) {
  const searchParams = useSearchParams();
  const parallel = searchParams.get("parallel");
  return (
    <LinkNext
      href={`/bible/${version}/${book.book}/${chapter}${parallel ? `?parallel=${parallel}` : ""}`}
      style={{ aspectRatio: "1 / 1" }}
      className={cn(
        "chapter-number aspect-square flex items-center justify-center rounded-sm bg-highlight-active",
        chapter == chapterCurrent && "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-black"
      )}
    >
      {chapter}
    </LinkNext>
  );
}

function Button({ version, book, chapter, chapterCurrent }: LinkProps) {
  return (
    <Dialog id="select-verse">
      <DialogTrigger asChild>
        <div
          style={{ aspectRatio: "1 / 1" }}
          className={cn(
            "chapter-number aspect-square flex items-center justify-center rounded-sm bg-highlight-active",
            chapter == chapterCurrent && "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-black"
          )}
        >
          {chapter}
        </div>
      </DialogTrigger>
      <DialogContent className="flex flex-col h-svh w-lvw p-0 md:max-w-lg md:h-auto md:max-h-[90vh] md:border md:rounded-lg">
        <DialogHeader className="p-6 pb-3">
          <DialogTitle>
            {book.name} {chapter}
          </DialogTitle>
          <DialogDescription>Selecione o versículo</DialogDescription>
        </DialogHeader>
        <div className="px-6 pb-6 overflow-y-auto grid grid-cols-6 gap-4">
          <Verses version={version} book={book.book} chapter={chapter} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
