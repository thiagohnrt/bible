"use client";

import { api, Book } from "@/services/api";
import { Accordion, AccordionContent, AccordionItemFocus, AccordionTrigger } from "../ui/accordion";
import { Chapters } from "../chapter/Chapters";
import { useEffect, useRef, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { usePathname } from "next/navigation";
import { repeat } from "@/lib/utils";
import * as bolls from "@/custom/bolls";

interface Props {
  version: string;
}

export function Books({ version }: Props) {
  const [books, setBooks] = useState<Book[]>([]);
  const [bookId, setBookId] = useState("");
  const itemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const pathname = usePathname();

  useEffect(() => {
    api.getBooks(version).then((data) => setBooks(data));
  }, [version]);

  useEffect(() => {
    if (books.length) {
      const bookId = location.search.substring(1);
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
        {repeat(66, (i) => {
          return (
            <div className="py-4" key={i}>
              <Skeleton className="h-6 bg-highlight" />
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
            <AccordionTrigger className="text-left">{bolls.book(book).name}</AccordionTrigger>
            <AccordionContent>
              <Chapters version={version} book={book} />
            </AccordionContent>
          </AccordionItemFocus>
        );
      })}
    </Accordion>
  );
}
