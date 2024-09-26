import { ReactNode, useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { BibleContext } from "@/providers/bibleProvider";
import { ChapterContext } from "@/providers/chapterProvider";
import { api, Book, Translation } from "@/services/api";
import * as bolls from "@/custom/bolls";
import { formatVerses, sortTranslations } from "@/lib/utils";
import { CompareVersesItem } from "./CompareVersesItem";
import { db } from "@/database/bibleDB";
import { VscSettings } from "react-icons/vsc";

interface Props {
  book: Book;
  chapter: number;
  children: ReactNode;
}

export function CompareVerses({ book, chapter, children }: Props) {
  const { translation: translationContext } = useContext(BibleContext);
  const { verses } = useContext(ChapterContext);
  const [translations, setTranslations] = useState<Translation[]>([]);

  useEffect(() => {
    (async () => {
      if (translationContext) {
        const languages = await api.getLanguages();

        const allTranslations = languages.map((language) => language.translations).flat();

        const translationsSaved = db.getTranslationsSaved();
        const translations = allTranslations.filter(
          (translation) => translationsSaved[translation.short_name] === "done"
        );

        setTranslations(translations ?? []);
      }
    })();
  }, [translationContext]);

  return (
    <Dialog id="compare">
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex flex-col justify-between h-svh w-lvw p-0">
        <DialogHeader className="p-6 pb-3">
          <DialogTitle>Comparar Versículo</DialogTitle>
          <DialogDescription></DialogDescription>
          <div>
            <h3 className="text-3xl my-3">
              {bolls.book(book).name} {chapter}:{formatVerses(verses)}
            </h3>
          </div>
        </DialogHeader>
        <div className="p-6 pt-0 flex-1 overflow-y-auto">
          {sortTranslations(translations).map((translation, i) => {
            return (
              <CompareVersesItem
                translation={translation}
                book={book}
                chapter={chapter}
                verses={verses.map((verse) => verse.verse)}
                key={i}
              />
            );
          })}
        </div>
        <DialogFooter className="p-6 border-t flex flex-row items-center justify-center gap-2 active:bg-neutral-100 dark:active:bg-neutral-900 transition-colors">
          <VscSettings size={20} />
          <span>Versões</span>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
