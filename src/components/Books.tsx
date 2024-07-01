import { api } from "@/services/api";
import { Chapters } from "./Chapters";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

interface BooksProps {
  version?: string;
}

export default async function Books({ version = "nvi" }: BooksProps) {
  const books = await api.getBooks();
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
