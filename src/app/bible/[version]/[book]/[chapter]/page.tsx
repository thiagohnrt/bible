import { api } from "@/services/api";
import { ChapterProps } from "./layout";
import Verse from "@/components/chapter/Verse";
import { cn } from "@/lib/utils";

export default async function ChapterPage({
  params: { version, book, chapter },
}: ChapterProps) {
  const [translation, bookData, verses] = await Promise.all([
    api.getTranslation(version),
    api.getBook(version, book),
    api.getVerses(version, book, chapter),
  ]);

  return (
    <>
      <h1 className={cn("text-3xl pb-8", translation.dir ? "text-right" : "")}>
        {bookData.name} {chapter}
      </h1>
      <div className="pb-20" dir={translation.dir}>
        {verses.map((verse, i) => (
          <Verse number={verse.verse} text={verse.text} key={i} />
        ))}
      </div>
    </>
  );
}
