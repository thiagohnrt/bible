"use client";

import { cn } from "@/lib/shad";
import { BibleContext } from "@/providers/bibleProvider";
import { Book } from "@/services/api";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { Container } from "../root/Container";
import { Skeleton } from "../ui/skeleton";

interface Props {
  version?: string;
  device?: {
    model?: string;
    type?: string;
    vendor?: string;
  };
  className?: string;
  backIcon?: boolean;
}

export function BooksList({ version, device, className, backIcon = false }: Props) {
  const { translation, books: booksContext } = useContext(BibleContext);
  const [currentVersion, setCurrentVersion] = useState<string>(version ?? "");
  const router = useRouter();
  const oldTestament = "Antigo Testamento";
  const newTestament = "Novo Testamento";

  useEffect(() => {
    if (!currentVersion && translation) {
      setCurrentVersion(translation.identifier);
    }
  }, [currentVersion, translation]);

  if (device?.type === "mobile") {
    return <></>;
  }

  const translationBooks = booksContext.filter((book) => book.translation === currentVersion);
  const books = translationBooks.filter((book, i) => {
    return translationBooks.findIndex((b) => b.book === book.book) === i;
  });

  if (books.length === 0) {
    return (
      <div className={cn("py-6", className)}>
        <Container>
          <h1 className="text-lg font-bold mb-6">Livros</h1>
          <Skeleton className="mb-6 h-9 w-64"></Skeleton>
          <div className="grid grid-cols-2">
            {<BooksSkeleton testament={oldTestament} totalBooks={39} />}
            {<BooksSkeleton testament={newTestament} totalBooks={27} />}
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className={cn("py-6", className)}>
      <Container>
        <h1 className="text-lg font-bold mb-6">Livros</h1>
        <h2 className="mb-6 flex items-center">
          {backIcon && (
            <HiArrowNarrowLeft
              size={36}
              className="p-2 -ml-2 rounded-full cursor-pointer hover:bg-neutral-800 transition-all"
              onClick={() => router.back()}
            />
          )}
          <span className="font-semibold">{`${translation?.short_name} - ${translation?.full_name}`}</span>
        </h2>
        <div className="grid grid-cols-2">
          <BooksTestament
            translation={currentVersion}
            testament={oldTestament}
            books={books.filter((book) => book.book < 40)}
          />
          <BooksTestament
            translation={currentVersion}
            testament={newTestament}
            books={books.filter((book) => book.book >= 40)}
          />
        </div>
      </Container>
    </div>
  );
}

function BooksSkeleton({ testament, totalBooks }: { testament: string; totalBooks: number }) {
  return (
    <div>
      <h2 className="font-bold pb-4">{testament}</h2>
      <div className="md:columns-2 lg:columns-3 space-y-2">
        {Array.from({ length: totalBooks }).map((_, i) => (
          <Skeleton key={`book-${testament}-${i}`} className="w-36 h-6" />
        ))}
      </div>
    </div>
  );
}

function BooksTestament({ translation, testament, books }: { translation: string; testament: string; books: Book[] }) {
  const searchParams = useSearchParams();
  const parallel = searchParams.get("parallel");
  if (books.length === 0) {
    return <></>;
  }
  return (
    <div>
      <h2 className="font-bold pb-4">{testament}</h2>
      <div className="md:columns-2 lg:columns-3">
        {books.map((book) => {
          const search = parallel ? `?parallel=${parallel}` : "";
          return (
            <Link
              href={`/bible/${translation}/${book.book}${search}`}
              className="block leading-7 hover:underline"
              key={testament + book.book}
            >
              {book.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
