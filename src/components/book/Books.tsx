"use client";

import { api, Book } from "@/services/api";
import { Accordion, AccordionContent, AccordionItemFocus, AccordionTrigger } from "../ui/accordion";
import { Chapters } from "../chapter/Chapters";
import { useEffect, useRef, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { usePathname } from "next/navigation";
import { repeat } from "@/lib/utils";

interface Props {
  version: string;
  device?: {
    model?: string;
    type?: string;
    vendor?: string;
  };
}

export function Books({ version, device }: Props) {
  const [books, setBooks] = useState<Book[]>([]);
  const [data, setData] = useState<{ bookId: string; chapter: number }>({ bookId: "", chapter: 0 });
  const itemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const pathname = usePathname();

  useEffect(() => {
    api.getBooks(version).then((data) => setBooks(data));
  }, [version]);

  useEffect(() => {
    if (books.length) {
      const bookId = location.search.substring(1).split("-")[0];
      const chapter = +location.search.substring(1).split("-")[1];
      if (itemRefs.current[`${bookId}`]) {
        setTimeout(
          (ref) => {
            setData({ bookId, chapter });
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
    <Accordion
      type="single"
      collapsible
      className="w-full"
      value={data.bookId}
      onValueChange={(value) => setData({ ...data, bookId: value })}
    >
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
              <Chapters
                version={version}
                book={book}
                chapter={book.book === +data.bookId ? data.chapter : 0}
                device={device}
              />
            </AccordionContent>
          </AccordionItemFocus>
        );
      })}
    </Accordion>
  );
}
