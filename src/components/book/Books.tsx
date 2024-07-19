import { api } from "@/services/api";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Chapters } from "../chapter/Chapters";

interface Props {
  version: string;
}

export async function Books({ version }: Props) {
  const books = await api.getBooks(version);

  return (
    <Accordion type="single" collapsible className="w-full">
      {books.map((book, i) => {
        return (
          <AccordionItem value={"item-" + i} key={i} className="border-none">
            <AccordionTrigger className="text-left">
              {book.name}
            </AccordionTrigger>
            <AccordionContent>
              <Chapters
                version={version}
                book={book.bookid}
                total={book.chapters}
              />
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
