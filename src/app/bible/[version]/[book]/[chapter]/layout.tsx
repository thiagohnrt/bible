import { ChapterNavigation } from "@/components/chapter/ChapterNavigation";
import { TopNavigation } from "@/components/chapter/TopNavigation";

export interface ChapterProps {
  params: {
    version: string;
    book: number;
    chapter: number;
    verse?: string;
  };
}

interface Props extends ChapterProps {
  children: React.ReactNode;
}

export default async function ChapterLayout({ children, params: { version, book, chapter } }: Props) {
  return (
    <>
      {children}
      <ChapterNavigation version={version} book={book} chapter={chapter} />
      <TopNavigation />
    </>
  );
}
