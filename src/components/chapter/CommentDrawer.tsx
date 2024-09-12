"use client";

import { ChapterContext } from "@/providers/chapterProvider";
import { Book } from "@/services/api";
import { useContext } from "react";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "../ui/drawer";
import Verse from "./Verse";
import * as bolls from "@/custom/bolls";

interface Props {
  book: Book;
  chapter: number;
}

export function CommentDrawer({ book, chapter }: Props) {
  const { verseComment, setVerseComment } = useContext(ChapterContext);

  const addPrefixToLinks = (htmlString: string, prefix: string): string => {
    // Expressão regular para encontrar as tags <a> com o atributo href
    const regex = /(<a\s+href=['"])([^'"]*)(['"][^>]*>)/g;

    // Substitui o valor do href adicionando o prefixo
    const modifiedHtmlString = htmlString.replace(regex, `$1${prefix}$2$3`);

    return modifiedHtmlString;
  };

  return (
    <Drawer open={!!verseComment} onClose={() => setVerseComment(null)}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            {bolls.book(book).name} {chapter}:{verseComment?.verse}
          </DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          {verseComment?.text ? <Verse text={verseComment?.text} comment={true} /> : <></>}
          <div className="py-1"></div>
          {verseComment?.comment ? (
            <div
              className="[&>a]:underline"
              dangerouslySetInnerHTML={{ __html: addPrefixToLinks(verseComment?.comment!, "/bible") }}
            ></div>
          ) : (
            <></>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
