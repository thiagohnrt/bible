import { db } from "@/database/bibleDB";
import { bibleUtils } from "@/lib/bibleUtils";
import { BibleContext } from "@/providers/bibleProvider";
import { ChapterContext } from "@/providers/chapterProvider";
import { Book, Translation } from "@/services/api";
import { forwardRef, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { HiOutlineSwitchVertical } from "react-icons/hi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { CompareVersesItem } from "./CompareVersesItem";
import { CompareVersesManager } from "./CompareVersesManager";
import { CompareVersesVersions } from "./CompareVersesVersions";

interface Props {
  book: Book;
  chapter: number;
  children: ReactNode;
}

export const CompareVerses = forwardRef<HTMLDivElement, Props>(({ book, chapter, children }: Props, ref) => {
  const { languages } = useContext(BibleContext);
  const { versesSelected } = useContext(ChapterContext);
  const [translations, setTranslations] = useState<Translation[]>([]);

  const renderTranslations = useCallback(() => {
    const allTranslations = languages.map((language) => language.translations).flat();

    const translationsToCompare = db.getTranslationsToCompare();
    const translations = allTranslations
      .filter((translation) => translationsToCompare.includes(translation.identifier))
      .sort((a, b) => translationsToCompare.indexOf(a.identifier) - translationsToCompare.indexOf(b.identifier));

    setTranslations(translations);
  }, [languages]);

  useEffect(() => {
    renderTranslations();
  }, [languages, renderTranslations]);

  return (
    <Dialog id="compare" ref={ref}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex flex-col h-svh w-lvw p-0 md:max-w-lg md:h-auto md:max-h-[90vh] md:border md:rounded-lg">
        <DialogHeader className="p-6 pb-3">
          <DialogTitle>Comparar Versículo</DialogTitle>
          <DialogDescription></DialogDescription>
          <div>
            <h3 className="text-2xl my-2">{bibleUtils.formatVerseAddress(book, chapter, versesSelected)}</h3>
          </div>
        </DialogHeader>
        <div className="p-6 pt-0 flex-1 overflow-y-auto">
          {translations.map((translation, i) => {
            return (
              <CompareVersesItem
                translation={translation}
                book={book}
                chapter={chapter}
                verses={versesSelected.map((verse) => verse.verse)}
                key={`${translation.identifier}-${i}`}
              />
            );
          })}
        </div>
        <DialogFooter className="border-t flex flex-row cursor-pointer select-none ">
          <CompareVersesManager languages={languages} onClose={renderTranslations}>
            <div className="flex-1 flex p-6 items-center justify-center gap-2 active:bg-neutral-100 dark:active:bg-neutral-900 transition-colors">
              <HiOutlineSwitchVertical size={20} />
              <span>Reordenar</span>
            </div>
          </CompareVersesManager>
          <CompareVersesVersions languages={languages} onClose={renderTranslations}>
            <div className="flex-1 flex p-6 items-center justify-center gap-2 active:bg-neutral-100 dark:active:bg-neutral-900 transition-colors">
              <FiPlus size={20} />
              <span>Adicionar versão</span>
            </div>
          </CompareVersesVersions>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});
CompareVerses.displayName = "CompareVerses";
