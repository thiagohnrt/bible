"use client";

import { ChapterContext } from "@/providers/chapterProvider";
import { Book, Verse } from "@/services/api";
import { ReactNode, useContext } from "react";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "../ui/drawer";
import { share } from "@/lib/share";
import { clipboard } from "@/lib/clipboard";

interface Props {
  book: Book;
  chapter: number;
}

export function VerseDrawer({ book, chapter }: Props) {
  const { verses, setVerses } = useContext(ChapterContext);

  const formatVerses = (data: Verse[]): string => {
    const verses = data.map(({ verse }) => verse);
    if (verses.length === 0) return "";

    let result: string[] = [];
    let start = verses[0];

    for (let i = 1; i <= verses.length; i++) {
      if (verses[i] !== verses[i - 1] + 1) {
        if (start === verses[i - 1]) {
          result.push(`${start}`);
        } else {
          result.push(`${start}-${verses[i - 1]}`);
        }
        start = verses[i];
      }
    }

    return result.join(", ");
  };

  const handleShare = () => {
    share({
      text: `${verses.map((verse) => verse.text).join("")} ${book.name} ${chapter}:${formatVerses(verses)}`,
    });
  };

  const handleCopy = async () => {
    await clipboard.writeText(
      `${verses.map((verse) => verse.text).join("")} ${book.name} ${chapter}:${formatVerses(verses)}`
    );
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
            {book.name} {chapter}:{formatVerses(verses)}
          </DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <div className="whitespace-nowrap overflow-x-auto mb-4">
            <ActionButton onClick={handleShare}>Compartilhar</ActionButton>
            <ActionButton onClick={handleCopy}>Copiar</ActionButton>
            <ActionButton>Comparar</ActionButton>
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

function ActionButton({ children, ...props }: { children: ReactNode; onClick?: () => void }) {
  return (
    <div className="inline-block mr-[10px] px-3 py-2 rounded-full bg-highlight-active text-sm" {...props}>
      {children}
    </div>
  );
}

function BookmarkColor({ color }: { color: string }) {
  return <div className="inline-block mr-[15px] w-[30px] h-[30px] rounded" style={{ backgroundColor: color }}></div>;
}
