"use client";

import { repeat } from "@/lib/utils";
import { BibleContext } from "@/providers/bibleProvider";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { Chapters } from "../chapter/Chapters";
import { Accordion, AccordionContent, AccordionItemFocus, AccordionTrigger } from "../ui/accordion";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";

interface Props {
  version: string;
  device?: {
    model?: string;
    type?: string;
    vendor?: string;
  };
}

export function BooksAccordion({ version, device }: Props) {
  const { books: booksContext } = useContext(BibleContext);
  const [data, setData] = useState<{ book: string; current: { book: number; chapter: number } }>({
    book: "",
    current: { book: 0, chapter: 0 },
  });
  const itemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const pathname = usePathname();
  const [search, setSearch] = useState("");

  const normalize = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const books = booksContext
    .filter((b) => b.translation === version)
    .filter((b) => (search ? normalize(b.name.toLowerCase()).includes(normalize(search.toLowerCase())) : true));

  useEffect(() => {
    const books = booksContext.filter((b) => b.translation === version);
    if (books.length) {
      const book = location.search.substring(1).split("-")[0];
      const chapter = +location.search.substring(1).split("-")[1];
      if (itemRefs.current[`${book}`]) {
        setData({ book, current: { book: +book, chapter } });
        itemRefs.current[`${book}`]?.click();
      }
    }
  }, [booksContext, pathname, version]);

  if (!books.length && !search) {
    return (
      <>
        {repeat(66, (i) => {
          return (
            <div className="py-4" key={`ba-skltn-${i}`}>
              <Skeleton className="h-6 bg-highlight" />
            </div>
          );
        })}
      </>
    );
  }

  return (
    <div className="pt-8">
      <div
        className="fixed left-0 z-10 flex w-full items-center justify-between bg-background border-b px-4 py-2"
        style={{ top: "calc(4rem - 1px)" }}
      >
        <Input type="text" placeholder="Pesquisar livro" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <Accordion
        type="single"
        collapsible
        className="w-full"
        value={data.book}
        onValueChange={(value) => setData({ ...data, book: value })}
      >
        {books.map((book, i) => {
          return (
            <AccordionItemFocus
              ref={(el) => {
                itemRefs.current[`${book.book}`] = el;
              }}
              value={`${book.book}`}
              key={`book-accordion-${book.book}`}
              className="border-none"
            >
              <AccordionTrigger className="text-left">{book.name}</AccordionTrigger>
              <AccordionContent>
                <Chapters
                  version={version}
                  book={book}
                  chapter={book.book === data.current.book ? data.current.chapter : 0}
                  device={device}
                />
              </AccordionContent>
            </AccordionItemFocus>
          );
        })}
      </Accordion>
    </div>
  );
}
