import Verse from "@/components/Verse";
import { api } from "@/services/api";
import { ChapterProps } from "./layout";

export default async function ChapterPage({
  params: { version, book, chapter },
}: ChapterProps) {
  const data = await api.getChapter(version, book, chapter);
  return (
    <>
      <h1 className="text-2xl pb-4">
        {data.book.name} {data.chapter.number}
      </h1>
      <div className="pb-8">
        {data.verses.map((verse, i) => (
          <Verse number={verse.number} text={verse.text} key={i} />
        ))}
      </div>
    </>
  );
}
