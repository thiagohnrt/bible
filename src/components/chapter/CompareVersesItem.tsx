import { api, Book, Translation, Verse as IVerse } from "@/services/api";
import { useContext, useEffect, useState } from "react";
import Verse from "./Verse";
import * as bolls from "@/custom/bolls";
import { formatVerses, setTranslationStorage } from "@/lib/utils";
import { BibleContext } from "@/providers/bibleProvider";
import { useRouter } from "next/navigation";

interface Props {
  translation: Translation;
  book: Book;
  chapter: number;
  verses: number[];
}

export function CompareVersesItem({ translation, book, chapter, verses }: Props) {
  const { translation: translationCurrent, setTranslation: setTranslationContext } = useContext(BibleContext);
  const [data, setData] = useState<IVerse[]>([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const data = await Promise.all(
        verses.map((verse) => api.getVerse(translation.short_name, book.book, chapter, verse))
      );
      setData(data);
    })();
  }, [book, chapter, translation, verses]);

  const onVersesSelected = () => {
    if (translation.short_name !== translationCurrent?.short_name) {
      setTranslationContext(translation);
      setTranslationStorage(translation);
      router.push(`/bible/${translation.short_name}/${book.book}/${chapter}/${formatVerses(data)}`);
    }
  };

  return (
    <div className="flex flex-col pb-8">
      <div className="flex items-center gap-2 pb-2">
        <div>{bolls.translation(translation).short_name}</div>
        <small className="opacity-50">{bolls.translation(translation).full_name}</small>
      </div>
      <div className="flex gap-4">
        <div className="flex-shrink-0 w-[4px] bg-black dark:bg-white rounded-full"></div>
        <div onClick={onVersesSelected}>
          {data.map((item, i) => {
            return (
              <Verse
                number={data.length > 1 ? item.verse : undefined}
                text={item.text}
                key={i}
                className="text-base leading-7 inline mr-1"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
