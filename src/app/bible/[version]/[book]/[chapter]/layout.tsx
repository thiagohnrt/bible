import { ChapterNavigation } from "@/components/chapter/ChapterNavigation";
import { api } from "@/services/api";
import Link from "next/link";

export interface ChapterProps {
  params: { version: string; book: string; chapter: number };
}

interface Props extends ChapterProps {
  children: React.ReactNode;
}

export default async function ChapterLayout({
  children,
  params: { version, book, chapter },
}: Props) {
  const data = await api.getChapter(version, book, chapter);
  return (
    <>
      {children}
      <ChapterNavigation chapter={data} />
    </>
  );
}
