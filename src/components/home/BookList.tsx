"use client";

import { BibleContext } from "@/providers/bibleProvider";
import { api, Book, Translation } from "@/services/api";
import { useContext, useEffect, useState } from "react";
import * as bolls from "@/custom/bolls";
import Link from "next/link";
import { cn } from "@/lib/utils";
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
      api.getBooks(translation.short_name).then((books) => setBooks(books));
    }
  }, [device, translation]);

  if (!translation || device?.type === "mobile") {
    return <></>;
  }

  return (
    <div className={cn("py-6 bg-highlight", className)}>
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
  return (
    <div>
      <h2 className="font-bold pb-4">{testament}</h2>
      <div className="md:columns-2 lg:columns-3">
        {books.map((book, i) => (
          <Link
            href={`/bible/${translation.short_name}/${book.book}`}
            className="block leading-7 hover:underline"
            key={i}
          >
            {bolls.book(book).name}
          </Link>
        ))}
      </div>
    </div>
  );
}