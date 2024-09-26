import { api, Book, Translation, Verse as IVerse } from "@/services/api";
import { useEffect, useState } from "react";
import Verse from "./Verse";

interface Props {
  translation: Translation;
  book: Book;
  chapter: number;
  verses: number[];
}

export function CompareVersesItem({ translation, book, chapter, verses }: Props) {
  const [data, setData] = useState<IVerse[]>([]);

  useEffect(() => {
    (async () => {
      const data = await Promise.all(
        verses.map((verse) => api.getVerse(translation.short_name, book.book, chapter, verse))
      );
      setData(data);
    })();
  }, [book, chapter, translation, verses]);

  return (
    <div className="flex flex-col pb-8">
      <div className="flex items-center gap-2 pb-2">
        <div>{translation.short_name}</div>
        <small className="opacity-50">{translation.full_name}</small>
      </div>
      <div className="flex gap-4">
        <div className="flex-shrink-0 w-[4px] bg-black dark:bg-white rounded-full"></div>
        <div>
          {data.map((item, i) => {
            return <Verse text={item.text} key={i} className="text-base leading-7" />;
          })}
        </div>
      </div>
    </div>
  );
}
