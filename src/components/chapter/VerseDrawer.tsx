"use client";

import { CopyVerseOptions } from "@/interfaces/CopyVerseOptions";
import { bibleUtils } from "@/lib/bibleUtils";
import { clipboard } from "@/lib/clipboard";
import { cn } from "@/lib/shad";
import { share } from "@/lib/share";
import { BibleContext } from "@/providers/bibleProvider";
import { ChapterContext } from "@/providers/chapterProvider";
import { RootContext } from "@/providers/rootProvider";
import { Book, Verse as IVerse } from "@/services/api";
import Cookies from "js-cookie";
import { forwardRef, ReactNode, useContext, useEffect, useState } from "react";
import { IoTextOutline } from "react-icons/io5";
import { MdArrowDropDown } from "react-icons/md";
import { PiListNumbers, PiTextAlignJustifyLight, PiTextAlignLeftLight } from "react-icons/pi";
import { Checkbox } from "../ui/checkbox";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "../ui/drawer";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "../ui/toast";
import { CompareVerses } from "./CompareVerses";
import Verse from "./Verse";

export function VerseDrawer() {
  const { device } = useContext(RootContext);
  const { translation } = useContext(BibleContext);
  const { data, versesSelected, setVersesSelected } = useContext(ChapterContext);

  const verseFull = () => {
    Cookies.get("copy_verse_options");
    const options = Cookies.get("copy_verse_options");
    const parsedValue = options ? JSON.parse(options) : undefined;
    const versesText = bibleUtils.versesToString(versesSelected, parsedValue);
    if (parsedValue?.bookName ?? true) {
      return `${versesText}\n\n${bibleUtils.formatVerseAddress(
        data[0].book,
        data[0].chapter,
        versesSelected,
        translation
      )}`;
    } else {
      return versesText;
    }
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
    setVersesSelected([]);
  };

  if (!data.length) {
    return <></>;
  }

  if (device.type !== "mobile") {
    return (
      <ToastProvider swipeDirection="up">
        <Toast open={versesSelected.length > 0} onOpenChange={(open) => !open && closeDrawer()} duration={86400000}>
          <div className="grid gap-3">
            <ToastTitle className="text-lg">
              {bibleUtils.formatVerseAddress(data[0].book, data[0].chapter, versesSelected)}
            </ToastTitle>
            <ToastDescription>
              <VerseActions
                book={data[0].book}
                chapter={data[0].chapter}
                share={handleShare}
                copy={handleCopy}
                isMobile={false}
              />
            </ToastDescription>
          </div>
          <ToastClose />
        </Toast>
        <ToastViewport className="md:max-w-[500px] z-[49]" />
      </ToastProvider>
    );
  }

  return (
    <Drawer open={versesSelected.length > 0} onClose={() => closeDrawer()} modal={false}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{bibleUtils.formatVerseAddress(data[0].book, data[0].chapter, versesSelected)}</DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <VerseActions
            book={data[0].book}
            chapter={data[0].chapter}
            share={handleShare}
            copy={handleCopy}
            isMobile={true}
          />
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
  return (
    <>
      <div className="whitespace-nowrap overflow-x-auto mb-4">
        <ActionButton onClick={share}>Compartilhar</ActionButton>
        <CopyButton copy={copy} isMobile={isMobile} />
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
        "bg-neutral-200 active:bg-neutral-300 hover:bg-neutral-300",
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

export const CopyButton = forwardRef<
  HTMLButtonElement,
  {
    copy: () => void;
    isMobile: boolean;
  }
>(({ copy, isMobile, ...props }, ref) => {
  const [isCopied, setIsCopied] = useState(false);
  const [data, setData] = useState<CopyVerseOptions>({
    wrapText: true,
    withNumb: true,
    bookName: true,
  });

  useEffect(() => {
    const options = Cookies.get("copy_verse_options");
    if (options) {
      const parsedValue = JSON.parse(options) as CopyVerseOptions;
      setData(parsedValue);
    }
  }, []);

  const onCheckedChange = (att: string, checked: boolean) => {
    setData((prev) => ({ ...prev, [att]: checked }));
    const cookieValue = JSON.stringify({ ...data, [att]: checked });
    Cookies.set("copy_verse_options", cookieValue, { expires: 365, path: "/" });
    const el = document.body;
    el.setAttribute(`data-copy-${att.toLowerCase()}`, checked.toString());
  };

  const handleCopy = () => {
    copy();
    if (!isMobile) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    }
  };

  const versesFake: IVerse[] = [
    {
      pk: 1,
      book: 1,
      chapter: 1,
      verse: 1,
      text: "No princípio Deus criou os céus e a terra.",
    },
    {
      pk: 2,
      book: 1,
      chapter: 1,
      verse: 2,
      text: "A terra era vazia e sem forma definida, e o Espírito de Deus se movia por sobre as águas.",
    },
  ];

  return (
    <div
      className={cn(
        "inline-flex rounded-full cursor-pointer text-sm",
        "mr-[10px] [&>*]:px-3 [&>*]:py-2",
        "bg-neutral-200 dark:bg-neutral-800 transition-colors"
      )}
    >
      <button
        ref={ref}
        type="button"
        className={cn(
          "rounded-s-full",
          "active:bg-neutral-300 hover:bg-neutral-300",
          "dark:active:bg-neutral-700 dark:hover:bg-neutral-700",
          isCopied && "bg-green-500 active:bg-green-500 hover:bg-green-500",
          isCopied && "dark:bg-green-500 dark:active:bg-green-500 dark:hover:bg-green-500"
        )}
        onClick={handleCopy}
        {...props}
      >
        {isCopied ? "Copiado" : "Copiar"}
      </button>
      <Popover>
        <PopoverTrigger asChild>
          <div
            dir="rtl"
            className={cn(
              "rounded-s-full flex items-center justify-center",
              "active:bg-neutral-300 hover:bg-neutral-300",
              "dark:active:bg-neutral-700 dark:hover:bg-neutral-700"
            )}
          >
            <MdArrowDropDown />
          </div>
        </PopoverTrigger>
        <PopoverContent align="end" side="top" className="w-[350px]">
          <div className="border rounded-md p-2 mb-4">
            {versesFake.map((verse) => (
              <Verse
                text={verse.text}
                number={data.withNumb ? verse.verse : undefined}
                key={verse.pk}
                classNameVerse="text-xs leading-6"
                className={cn("[&>.verse-num]:text-[.5rem] mr-1", !data.wrapText && "inline")}
              />
            ))}
            {data.bookName && <div className="text-xs mt-4">Gênesis 1:1-2 NBV-P</div>}
          </div>
          <div className="space-y-2">
            <div className="flex w-full items-center space-x-2">
              <Checkbox
                id="wrapText"
                checked={data.wrapText}
                onCheckedChange={(e) => onCheckedChange("wrapText", !!e.valueOf())}
              />
              <label htmlFor="wrapText" className="cursor-pointer flex-1">
                Quebra de texto
              </label>
              {data.wrapText ? <PiTextAlignLeftLight /> : <PiTextAlignJustifyLight />}
            </div>
            <div className="flex w-full items-center space-x-2">
              <Checkbox
                id="text-only"
                checked={data.withNumb}
                onCheckedChange={(e) => onCheckedChange("withNumb", !!e.valueOf())}
              />
              <label htmlFor="text-only" className="cursor-pointer flex-1">
                Copiar com a numeração
              </label>
              {data.withNumb ? <PiListNumbers /> : <IoTextOutline />}
            </div>
            <div className="flex w-full items-center space-x-2">
              <Checkbox
                id="bookName"
                checked={data.bookName}
                onCheckedChange={(e) => onCheckedChange("bookName", !!e.valueOf())}
              />
              <label htmlFor="bookName" className="cursor-pointer flex-1">
                Nome do livro
              </label>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
});
CopyButton.displayName = "CopyButton";

function BookmarkColor({ color }: { color: string }) {
  return <div className="inline-block mr-[15px] w-[30px] h-[30px] rounded" style={{ backgroundColor: color }}></div>;
}
