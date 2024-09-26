"use client";

import { ChapterContext } from "@/providers/chapterProvider";
import { Book } from "@/services/api";
import { forwardRef, ReactNode, useContext } from "react";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "../ui/drawer";
import { share } from "@/lib/share";
import { clipboard } from "@/lib/clipboard";
import * as bolls from "@/custom/bolls";
import { BibleContext } from "@/providers/bibleProvider";
import { CompareVerses } from "./CompareVerses";
import { formatVerses } from "@/lib/utils";

interface Props {
  book: Book;
  chapter: number;
}

export function VerseDrawer({ book, chapter }: Props) {
  const { translation } = useContext(BibleContext);
  const { verses, setVerses } = useContext(ChapterContext);

  const verseFull = () => {
    const el = document.createElement("DIV");
    el.innerHTML = verses.map((verse) => verse.text).join("");
    el.querySelectorAll("sup").forEach((sup) => el.removeChild(sup)); // NAA
    el.querySelectorAll("s").forEach((sup) => el.removeChild(sup)); // KJV
    const versesText = ((el.innerText || el.textContent) ?? "").replace(/\n/g, " ").replace(/  /g, " ").trim();
    return `${versesText}\n${bolls.book(book).name} ${chapter}:${formatVerses(verses)} ${
      translation && bolls.translation(translation).short_name
    }`;
  };

  const handleShare = () => {
    share({
      text: verseFull(),
    });
  };

  const handleCopy = async () => {
    await clipboard.writeText(verseFull());
    closeDrawer();
  };

  const closeDrawer = () => {
    setVerses([]);
  };

  return (
    <Drawer open={verses.length > 0} onClose={() => setVerses([])} modal={false}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            {bolls.book(book).name} {chapter}:{formatVerses(verses)}
          </DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <div className="whitespace-nowrap overflow-x-auto mb-4">
            <ActionButton onClick={handleShare}>Compartilhar</ActionButton>
            <ActionButton onClick={handleCopy}>Copiar</ActionButton>
            <CompareVerses book={book} chapter={chapter}>
              <ActionButton>Comparar</ActionButton>
            </CompareVerses>
            <ActionButton>Imagem</ActionButton>
          </div>
          <div className="whitespace-nowrap overflow-x-auto mb-4">
            <BookmarkColor color="cadetblue" />
            <BookmarkColor color="chocolate" />
            <BookmarkColor color="cornflowerblue" />
            <BookmarkColor color="darkcyan" />
            <BookmarkColor color="darkgoldenrod" />
            <BookmarkColor color="darkgreen" />
            <BookmarkColor color="dimgray" />
            <BookmarkColor color="dodgerblue" />
            <BookmarkColor color="salmon" />
            <BookmarkColor color="sienna" />
            <BookmarkColor color="yellowgreen" />
            <BookmarkColor color="fuchsia" />
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export const ActionButton = forwardRef<
  HTMLDivElement,
  {
    children: ReactNode;
    onClick?: () => void;
  }
>(({ children, ...props }, ref) => {
  return (
    <div className="inline-block mr-[10px] px-3 py-2 rounded-full bg-highlight-active text-sm" ref={ref} {...props}>
      {children}
    </div>
  );
});
ActionButton.displayName = "ActionButton";

function BookmarkColor({ color }: { color: string }) {
  return <div className="inline-block mr-[15px] w-[30px] h-[30px] rounded" style={{ backgroundColor: color }}></div>;
}
