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
import { RootContext } from "@/providers/rootProvider";
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "../ui/toast";

interface Props {
  book: Book;
  chapter: number;
}

export function VerseDrawer({ book, chapter }: Props) {
  const { device } = useContext(RootContext);
  const { translation } = useContext(BibleContext);
  const { verses, setVerses } = useContext(ChapterContext);

  const verseFull = () => {
    const el = document.createElement("DIV");
    el.innerHTML = verses.map((verse) => verse.text).join(" ");
    el.querySelectorAll("sup").forEach((sup) => el.removeChild(sup)); // NAA
    el.querySelectorAll("s").forEach((sup) => el.removeChild(sup)); // KJV
    const versesText = ((el.innerText || el.textContent) ?? "").replace(/\n/g, " ").replace(/  /g, " ").trim();
    return `${versesText}\n\n${bolls.book(book).name} ${chapter}:${formatVerses(verses)} ${
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

  if (device.type !== "mobile") {
    return (
      <ToastProvider swipeDirection="up">
        <Toast open={verses.length > 0} onOpenChange={(open) => !open && closeDrawer()} duration={86400000}>
          <div className="grid gap-3">
            <ToastTitle className="text-lg">
              {bolls.book(book).name} {chapter}:{formatVerses(verses)}
            </ToastTitle>
            <ToastDescription>
              <VerseActions book={book} chapter={chapter} share={handleShare} copy={handleCopy} />
            </ToastDescription>
          </div>
          <ToastClose />
        </Toast>
        <ToastViewport className="md:max-w-[500px] z-[49]" />
      </ToastProvider>
    );
  }

  return (
    <Drawer open={verses.length > 0} onClose={() => closeDrawer()} modal={false}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            {bolls.book(book).name} {chapter}:{formatVerses(verses)}
          </DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <VerseActions book={book} chapter={chapter} share={handleShare} copy={handleCopy} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

interface VerseActionsProps {
  book: Book;
  chapter: number;
  share: () => void;
  copy: () => void;
}

function VerseActions({ book, chapter, share, copy }: VerseActionsProps) {
  return (
    <>
      <div className="whitespace-nowrap overflow-x-auto mb-4">
        <ActionButton onClick={share}>Compartilhar</ActionButton>
        <ActionButton onClick={copy}>Copiar</ActionButton>
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
    </>
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
    <div
      className="inline-block mr-[10px] px-3 py-2 rounded-full bg-highlight-active text-sm cursor-pointer"
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});
ActionButton.displayName = "ActionButton";

function BookmarkColor({ color }: { color: string }) {
  return <div className="inline-block mr-[15px] w-[30px] h-[30px] rounded" style={{ backgroundColor: color }}></div>;
}
