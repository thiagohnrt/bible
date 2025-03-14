"use client";

import { cn } from "@/lib/shad";
import { api, Book } from "@/services/api";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Container } from "../root/Container";
import { BibleContext } from "@/providers/bibleProvider";
import { Skeleton } from "../ui/skeleton";

interface Props {
  version?: string;
  device?: {
    model?: string;
    type?: string;
    vendor?: string;
  };
  className?: string;
}

export function BooksList({ version, device, className }: Props) {
  const [books, setBooks] = useState<Book[]>([]);
  const { translation } = useContext(BibleContext);
  const [currentVersion, setCurrentVersion] = useState<string>(version ?? "");
  const oldTestament = "Antigo Testamento";
  const newTestament = "Novo Testamento";

  useEffect(() => {
    if (!currentVersion && translation) {
      setCurrentVersion(translation.identifier);
    }
  }, [currentVersion, translation]);

  useEffect(() => {
    if (device?.type !== "mobile" && currentVersion) {
      api.getBooks(currentVersion).then((books) => setBooks(books));
    }
  }, [device, currentVersion]);

  if (device?.type === "mobile") {
    return <></>;
  }

  if (books.length === 0) {
    return (
      <div className={cn("py-6", className)}>
        <Container>
          <h1 className="text-lg font-bold mb-6">Livros</h1>
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
              key={book.book}
            >
              {book.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
