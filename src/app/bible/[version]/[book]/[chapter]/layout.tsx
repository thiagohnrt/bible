import { ChapterNavigation } from "@/components/chapter/ChapterNavigation";

export interface ChapterProps {
  params: { version: string; book: number; chapter: number };
}

interface Props extends ChapterProps {
  children: React.ReactNode;
}

export default async function ChapterLayout({ children, params: { version, book, chapter } }: Props) {
  return (
    <>
      {children}
      <ChapterNavigation version={version} book={book} chapter={chapter} />
    </>
  );
}
