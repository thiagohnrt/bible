import Verse from "@/components/Verse";
import { api } from "@/services/api";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
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
      <div className="h-12 z-20 dark:bg-neutral-950 bg-neutral-50 fixed left-0 bottom-[59px] right-0 border-t flex justify-between items-center">
        <Link
          href={`/`}
          className="self-stretch w-12 flex items-center justify-end"
        >
          <div className="bg-neutral-800 rounded-l-full h-8 w-8">
            <div className="rounded-full h-full w-full flex items-center justify-center">
              <RiArrowLeftSLine size={18} />
            </div>
          </div>
        </Link>
        <Link
          className="self-stretch flex-auto flex items-center"
          href={`/bible/${version}/${book}`}
        >
          <div className="w-full h-8 text-center leading-8 bg-neutral-800 text-sm">
            {data.book.name} {data.chapter.number}
          </div>
        </Link>
        <Link
          href={`/`}
          className="self-stretch w-12 flex items-center justify-start"
        >
          <div className="bg-neutral-800 rounded-r-full h-8 w-8">
            <div className="rounded-full h-full w-full flex items-center justify-center">
              <RiArrowRightSLine size={18} />
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
