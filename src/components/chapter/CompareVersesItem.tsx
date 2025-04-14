import { api, Book, Translation, Verse as IVerse } from "@/services/api";
import { useContext, useEffect, useState } from "react";
import Verse from "./Verse";
import { BibleContext } from "@/providers/bibleProvider";
import { useRouter } from "next/navigation";
import { TfiCommentAlt } from "react-icons/tfi";
import { Skeleton } from "../ui/skeleton";
import { bibleUtils } from "@/lib/bibleUtils";
import { CommentDrawer } from "./CommentDrawer";

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
  const [data, setData] = useState<Data>({ verses: [], comments: [] });
  const router = useRouter();

  useEffect(() => {
    setData({ verses: [], comments: [] });
    (async () => {
      const data = await Promise.all(
        verses.map((verse) => api.getVerse(translation.identifier, book.book, chapter, verse))
      );
      setData({ verses: data, comments: data.filter((i) => i.comment) });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [translation.identifier]);

  const onVersesSelected = () => {
    if (translation.identifier !== translationCurrent?.identifier) {
      setTranslationContext(translation);
      router.push(
        `/bible/${translation.identifier}/${book.book}/${chapter}/${bibleUtils.formatVerseNumbers(data.verses)}`
      );
    }
  };

  if (data.verses.length === 0) {
    return (
      <div className="flex flex-col pb-8">
        <div className="flex items-center gap-2 pb-2">
          <div>{translation.short_name}</div>
          <small className="opacity-50">{translation.full_name}</small>
        </div>
        <Skeleton className="h-24" />
      </div>
    );
  }

  return (
    <div className="flex flex-col pb-8">
      <div className="flex items-center gap-2 pb-2">
        <div>{translation.short_name}</div>
        <small className="opacity-50">{translation.full_name}</small>
      </div>
      <div className="flex gap-4">
        <div className="flex-shrink-0 w-[4px] bg-black dark:bg-white rounded-full"></div>
        <div className="flex gap-2 justify-between">
          <div className="flex-auto cursor-pointer" onClick={onVersesSelected}>
            {data.verses.map((item, i) => {
              return (
                <Verse
                  number={data.verses.length > 1 ? item.verse : undefined}
                  text={item.text}
                  key={"verse-" + i}
                  className="inline mr-1"
                  classNameVerse="text-base leading-7"
                />
              );
            })}
          </div>
          <div className="flex flex-col flex-grow-0 flex-shrink-0 basis-8">
            {data.comments.map((verse, i) => (
              <CommentDrawer book={book} chapter={chapter} verse={verse} key={`comment-${verse.verse}`}>
                <div className="flex flex-1 justify-center pt-3 cursor-pointer">
                  <TfiCommentAlt size={12} />
                </div>
              </CommentDrawer>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
