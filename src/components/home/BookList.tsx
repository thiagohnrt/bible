"use client";

import { cn } from "@/lib/shad";
import { BibleContext } from "@/providers/bibleProvider";
import { api, Book, Translation } from "@/services/api";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Container } from "../root/Container";

interface Props {
  device?: {
    model?: string;
    type?: string;
    vendor?: string;
  };
  className?: string;
}

export function BookList({ device, className }: Props) {
  const { translation } = useContext(BibleContext);
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    if (device?.type !== "mobile" && translation) {
      api.getBooks(translation.identifier).then((books) => setBooks(books));
    }
  }, [device, translation]);

  if (!translation || device?.type === "mobile") {
    return <></>;
  }

  return (
    <div className={cn("py-6", className)}>
      <Container>
        <h1 className="text-lg font-bold mb-6">Livros</h1>
        <div className="grid grid-cols-2">
          <BooksTestament
            translation={translation}
            testament="Antigo Testamento"
            books={books.filter((book) => book.book < 40)}
          />
          <BooksTestament
            translation={translation}
            testament="Novo Testamento"
            books={books.filter((book) => book.book >= 40)}
          />
        </div>
      </Container>
    </div>
  );
}

function BooksTestament({
  translation,
  testament,
  books,
}: {
  translation: Translation;
  testament: string;
  books: Book[];
}) {
  const searchParams = useSearchParams();
  const parallel = searchParams.get("parallel");
  return (
    <div>
      <h2 className="font-bold pb-4">{testament}</h2>
      <div className="md:columns-2 lg:columns-3">
        {books.map((book) => {
          const search = parallel ? `?parallel=${parallel}` : "";
          return (
            <Link
              href={`/bible/${translation.identifier}/${book.book}${search}`}
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
