"use client";

import { api, Book } from "@/services/api";
import { Accordion, AccordionContent, AccordionItemFocus, AccordionTrigger } from "../ui/accordion";
import { Chapters } from "../chapter/Chapters";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

interface Props {
  version: string;
}

export function Books({ version }: Props) {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    if (!books.length) {
      api.getBooks(version).then((data) => setBooks(data));
    }
  }, [books, version]);

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
    <Accordion type="single" collapsible className="w-full">
      {books.map((book, i) => {
        return (
          <AccordionItemFocus value={"item-" + i} key={i} className="border-none">
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
