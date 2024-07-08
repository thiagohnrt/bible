import { Chapter } from "@/services/api";
import Link from "next/link";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

interface Props {
  chapter: Chapter;
}

export function ChapterNavigation({ chapter }: Props) {
  return (
    <div className="h-[60px] px-2 z-20 dark:bg-neutral-950 bg-neutral-50 fixed left-0 bottom-[59px] right-0 border-t flex justify-between items-center">
      <Link
        href={`/`}
        className="self-stretch w-12 flex items-center justify-end"
      >
        <div className="bg-neutral-800 rounded-l-full h-[45px] w-[45px]">
          <div className="rounded-full h-full w-full flex items-center justify-center">
            <RiArrowLeftSLine size={18} />
          </div>
        </div>
      </Link>
      <Link
        className="self-stretch flex-auto flex items-center"
        href={`/bible/${chapter.book.version}/${chapter.book.abbrev.pt}`}
      >
        <div
          className="w-full h-[45px] text-center bg-neutral-800 text-sm"
          style={{ lineHeight: "45px" }}
        >
          {chapter.book.name} {chapter.chapter.number}
        </div>
      </Link>
      <Link
        href={`/`}
        className="self-stretch w-12 flex items-center justify-start"
      >
        <div className="bg-neutral-800 rounded-r-full h-[45px] w-[45px]">
          <div className="rounded-full h-full w-full flex items-center justify-center">
            <RiArrowRightSLine size={18} />
          </div>
        </div>
      </Link>
    </div>
  );
}
