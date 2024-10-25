import { api, Book, Translation, Verse as IVerse } from "@/services/api";
import { useContext, useEffect, useState } from "react";
import Verse from "./Verse";
import * as bolls from "@/custom/bolls";
import { formatVerses, setTranslationStorage } from "@/lib/utils";
import { BibleContext } from "@/providers/bibleProvider";
import { useRouter } from "next/navigation";
import { TfiCommentAlt } from "react-icons/tfi";
import { ChapterContext } from "@/providers/chapterProvider";

interface Props {
  translation: Translation;
  book: Book;
  chapter: number;
  verses: number[];
}

interface Data {
  verses: IVerse[];
  comments: IVerse[];
}

export function CompareVersesItem({ translation, book, chapter, verses }: Props) {
  const { translation: translationCurrent, setTranslation: setTranslationContext } = useContext(BibleContext);
  const { setVerseComment } = useContext(ChapterContext);

  const [data, setData] = useState<Data>({ verses: [], comments: [] });
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const data = await Promise.all(
        verses.map((verse) => api.getVerse(translation.short_name, book.book, chapter, verse))
      );
      setData({ verses: data, comments: data.filter((i) => i.comment) });
    })();
  }, [book, chapter, translation, verses]);

  const onVersesSelected = () => {
    if (translation.short_name !== translationCurrent?.short_name) {
      setTranslationContext(translation);
      setTranslationStorage(translation);
      router.push(`/bible/${translation.short_name}/${book.book}/${chapter}/${formatVerses(data.verses)}`);
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
        <div className="flex gap-2 justify-between">
          <div className="flex-auto" onClick={onVersesSelected}>
            {data.verses.map((item, i) => {
              return (
                <Verse
                  number={data.verses.length > 1 ? item.verse : undefined}
                  text={item.text}
                  key={i}
                  className="text-base leading-7 inline mr-1"
                />
              );
            })}
          </div>
          <div className="flex flex-col flex-grow-0 flex-shrink-0 basis-8">
            {data.comments.map((verse, i) => (
              <div
                key={i}
                className="flex flex-1 justify-center pt-3 cursor-pointer"
                onClick={() => setVerseComment(verse)}
              >
                <TfiCommentAlt size={12} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
