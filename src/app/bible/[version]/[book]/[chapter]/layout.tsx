import { ChapterNavigation } from "@/components/chapter/ChapterNavigation";
import { api } from "@/services/api";
import Link from "next/link";

export interface ChapterProps {
  params: { version: string; book: number; chapter: number };
}

interface Props extends ChapterProps {
  children: React.ReactNode;
}

export default async function ChapterLayout({
  children,
  params: { version, book, chapter },
}: Props) {
  const bookData = await api.getBook(version, book);
  return (
    <>
      {children}
      <ChapterNavigation version={version} book={bookData} chapter={chapter} />
    </>
  );
}
