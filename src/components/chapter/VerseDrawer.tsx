"use client";

import { cn } from "@/lib/shad";
import { clipboard } from "@/lib/clipboard";
import { share } from "@/lib/share";
import { BibleContext } from "@/providers/bibleProvider";
import { ChapterContext } from "@/providers/chapterProvider";
import { RootContext } from "@/providers/rootProvider";
import { Book } from "@/services/api";
import { forwardRef, ReactNode, useContext, useState } from "react";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "../ui/drawer";
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "../ui/toast";
import { CompareVerses } from "./CompareVerses";
import { bibleUtils } from "@/lib/bibleUtils";

interface Props {
  book: Book;
  chapter: number;
}

export function VerseDrawer({ book, chapter }: Props) {
  const { device } = useContext(RootContext);
  const { translation } = useContext(BibleContext);
  const { verses, setVerses } = useContext(ChapterContext);

  const verseFull = () => {
    const versesText = bibleUtils.versesToString(verses);
    return `${versesText}\n\n${bibleUtils.formatVerseAddress(book, chapter, verses, translation)}`;
  };

  const handleShare = () => {
    share({
      text: verseFull(),
    });
  };

  const handleCopy = async () => {
    await clipboard.writeText(verseFull());
    if (device.type === "mobile") {
      closeDrawer();
    }
  };

  const closeDrawer = () => {
    setVerses([]);
  };

  if (device.type !== "mobile") {
    return (
      <ToastProvider swipeDirection="up">
        <Toast open={verses.length > 0} onOpenChange={(open) => !open && closeDrawer()} duration={86400000}>
          <div className="grid gap-3">
            <ToastTitle className="text-lg">{bibleUtils.formatVerseAddress(book, chapter, verses)}</ToastTitle>
            <ToastDescription>
              <VerseActions book={book} chapter={chapter} share={handleShare} copy={handleCopy} isMobile={false} />
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
          <DrawerTitle>{bibleUtils.formatVerseAddress(book, chapter, verses)}</DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <VerseActions book={book} chapter={chapter} share={handleShare} copy={handleCopy} isMobile={true} />
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
  isMobile: boolean;
}

function VerseActions({ book, chapter, share, copy, isMobile }: VerseActionsProps) {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = () => {
    copy();
    if (!isMobile) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    }
  };
  return (
    <>
      <div className="whitespace-nowrap overflow-x-auto mb-4">
        <ActionButton onClick={share}>Compartilhar</ActionButton>
        <ActionButton className={cn(isCopied && "bg-green-500")} onClick={handleCopy}>
          {isCopied ? "Copiado" : "Copiar"}
        </ActionButton>
        <CompareVerses book={book} chapter={chapter}>
          <ActionButton>Comparar</ActionButton>
        </CompareVerses>
        <ActionButton>
          Imagem <span className="opacity-50">(em breve)</span>
        </ActionButton>
      </div>
      <span className="opacity-50">(Em breve)</span>
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
    className?: string;
    onClick?: () => void;
  }
>(({ className, children, ...props }, ref) => {
  return (
    <div
      className={cn(
        "inline-block mr-[10px] px-3 py-2 rounded-full transition-colors text-sm cursor-pointer",
        "bg-neutral-200 dark:active:bg-neutral-300 dark:hover:bg-neutral-300",
        "dark:bg-neutral-800 dark:active:bg-neutral-700 dark:hover:bg-neutral-700",
        className
      )}
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
