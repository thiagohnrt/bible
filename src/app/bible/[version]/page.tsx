"use client";

import { Chapters } from "@/components/chapter/Chapters";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { api, Book } from "@/services/api";
import { useCallback, useEffect, useState } from "react";

export default function VersionPage({
  params: { version },
}: {
  params: { version: string };
}) {
  const [books, setBooks] = useState<Book[]>([]);

  const fetchBooks = useCallback(async () => {
    const data = await api.getBooks();
    setBooks(data);
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  if (!books.length) {
    return "."
      .repeat(66)
      .split(".")
      .map((v, i) => {
        return (
          <div className="py-4" key={i}>
            <Skeleton className="h-6" />
          </div>
        );
      });
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      {books.map((book, index) => {
        return (
          <AccordionItem
            value={"item-" + index}
            key={index}
            className="border-none"
          >
            <AccordionTrigger>{book.name}</AccordionTrigger>
            <AccordionContent>
              <Chapters
                version={version}
                book={book.abbrev.pt}
                total={book.chapters}
              />
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
