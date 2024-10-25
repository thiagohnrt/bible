"use client";

import { ChapterContext } from "@/providers/chapterProvider";
import { Book, Verse as IVerse } from "@/services/api";
import { useContext } from "react";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "../ui/drawer";
import Verse from "./Verse";
import * as bolls from "@/custom/bolls";
import { RootContext } from "@/providers/rootProvider";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";

interface Props {
  book: Book;
  chapter: number;
}

export function CommentDrawer({ book, chapter }: Props) {
  const { device } = useContext(RootContext);
  const { verseComment, setVerseComment } = useContext(ChapterContext);

  if (device.type !== "mobile") {
    return (
      <Dialog id="comment" open={!!verseComment} onOpenChange={() => setVerseComment(null)}>
        <DialogContent className="flex flex-col h-svh w-lvw p-0 md:max-w-lg md:h-auto md:max-h-[90vh] md:border md:rounded-lg">
          <DialogHeader className="p-6 pb-3">
            <DialogTitle>
              {bolls.book(book).name} {chapter}:{verseComment?.verse}
            </DialogTitle>
            <DialogDescription>Comentário</DialogDescription>
          </DialogHeader>
          <div className="p-6 pt-0 overflow-y-auto">{verseComment && <Comment verse={verseComment} />}</div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={!!verseComment} onClose={() => setVerseComment(null)}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            {bolls.book(book).name} {chapter}:{verseComment?.verse}
          </DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>{verseComment && <Comment verse={verseComment} />}</DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function Comment({ verse }: { verse: IVerse }) {
  const addPrefixToLinks = (htmlString: string, prefix: string): string => {
    // Expressão regular para encontrar as tags <a> com o atributo href
    const regex = /(<a\s+href=['"])([^'"]*)(['"][^>]*>)/g;

    // Substitui o valor do href adicionando o prefixo
    const modifiedHtmlString = htmlString.replace(regex, `$1${prefix}$2$3`);

    return modifiedHtmlString;
  };

  return (
    <>
      {verse?.text ? <Verse text={verse?.text} comment={true} /> : <></>}
      <div className="py-1"></div>
      {verse?.comment ? (
        <div
          className="[&>a]:underline"
          dangerouslySetInnerHTML={{ __html: addPrefixToLinks(verse?.comment!, "/bible") }}
        ></div>
      ) : (
        <></>
      )}
    </>
  );
}
