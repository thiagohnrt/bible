import Verse from "@/components/Verse";
import { api } from "@/services/api";
import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default async function ChapterPage({
  params: { version, book, chapter },
}: {
  params: { version: string; book: string; chapter: number };
}) {
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
      <div className="h-12 z-20 dark:bg-neutral-950 bg-neutral-50 fixed left-0 bottom-11 right-0 border-t flex justify-between items-center">
        <Link
          href={`/`}
          className="h-full w-12 flex items-center justify-center"
        >
          <CaretLeftIcon />
        </Link>
        <Link href={`/${version}/${book}`}>
          {data.book.name} {data.chapter.number}
        </Link>
        <Link
          href={`/`}
          className="h-full w-12 flex items-center justify-center"
        >
          <CaretRightIcon />
        </Link>
      </div>
    </>
  );
}
