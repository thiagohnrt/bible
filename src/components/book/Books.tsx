"use client";

import { api, Book } from "@/services/api";
import { Accordion, AccordionContent, AccordionItemFocus, AccordionTrigger } from "../ui/accordion";
import { Chapters } from "../chapter/Chapters";
import { useEffect, useRef, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { usePathname } from "next/navigation";

interface Props {
  version: string;
}

export function Books({ version }: Props) {
  const [books, setBooks] = useState<Book[]>([]);
  const [bookId, setBookId] = useState("");
  const itemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const pathname = usePathname();

  useEffect(() => {
    if (!books.length) {
      api.getBooks(version).then((data) => setBooks(data));
    }
  }, [books, version]);

  useEffect(() => {
    if (books.length) {
      const bookId = location.hash.substring(1);
      if (itemRefs.current[`${bookId}`]) {
        setTimeout(
          (ref) => {
            setBookId(bookId);
            ref?.click();
          },
          250,
          itemRefs.current[`${bookId}`]
        );
      }
    }
  }, [books, pathname]);

  if (!books.length) {
    return (
      <>
        {"."
          .repeat(66)
          .split(".")
          .map((v, i) => {
            return (
              <div className="py-4" key={i}>
                <Skeleton className="h-6" />
              </div>
            );
          })}
      </>
    );
  }

  return (
    <Accordion type="single" collapsible className="w-full" value={bookId} onValueChange={setBookId}>
      {books.map((book, i) => {
        return (
          <AccordionItemFocus
            ref={(el) => {
              itemRefs.current[`${book.book}`] = el;
            }}
            value={`${book.book}`}
            key={i}
            className="border-none"
          >
            <AccordionTrigger className="text-left">{book.name}</AccordionTrigger>
            <AccordionContent>
              <Chapters version={version} book={book.book} total={book.chapters} />
            </AccordionContent>
          </AccordionItemFocus>
        );
      })}
    </Accordion>
  );
}
