"use client";

import { RootContext } from "@/providers/rootProvider";
import { Book, Verse as IVerse } from "@/services/api";
import { useContext } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import Verse from "./Verse";

interface Props {
  translationId: string;
  book: Book;
  chapter: number;
  verse: IVerse;
  children: React.ReactNode;
}

export function CommentDrawer({ translationId, book, chapter, verse, children }: Props) {
  const { device } = useContext(RootContext);

  if (device.type !== "mobile") {
    return (
      <Dialog id="comment">
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="flex flex-col h-svh w-lvw p-0 md:max-w-lg md:h-auto md:max-h-[90vh] md:border md:rounded-lg">
          <DialogHeader className="p-6 pb-3">
            <DialogTitle>
              {book.name} {chapter}:{verse?.verse}
            </DialogTitle>
            <DialogDescription>Comentário</DialogDescription>
          </DialogHeader>
          <div className="p-6 pt-0 overflow-y-auto">
            {verse && <Comment translationId={translationId} verse={verse} />}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            {book.name} {chapter}:{verse?.verse}
          </DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>{verse && <Comment translationId={translationId} verse={verse} />}</DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function Comment({ translationId, verse }: { translationId: string; verse: IVerse }) {
  const addPrefixToLinks = (htmlString: string, prefix: string): string => {
    // Expressão regular para encontrar as tags <a> com o atributo href
    const regex = /(<a\s+href=['"])([^'"]*)(['"][^>]*>)/g;

    // Substitui o valor do href adicionando o prefixo
    const modifiedHtmlString = htmlString.replace(regex, `$1${prefix}$2$3`);

    return modifiedHtmlString;
  };

  return (
    <>
      {verse?.text ? (
        <Verse translationId={translationId} text={verse?.text} comment={true} formatting="text" />
      ) : (
        <></>
      )}
      <div className="py-1"></div>
      {verse?.comment ? (
        <div
          className="[&>a]:underline"
          dangerouslySetInnerHTML={{ __html: addPrefixToLinks(verse.comment, "/bible") }}
        ></div>
      ) : (
        <></>
      )}
    </>
  );
}
