import { ChapterNavigationDesktop } from "@/components/chapter/ChapterNavigationDesktop";
import { ChapterNavigationMobile } from "@/components/chapter/ChapterNavigationMobile";
import { ChaptersSidebar } from "@/components/chapter/ChaptersSidebar";
import { ScrollControl } from "@/components/chapter/ScrollControl";
import { TopNavigation } from "@/components/chapter/TopNavigation";
import { Container } from "@/components/root/Container";
import { headers } from "next/headers";
import { userAgent } from "next/server";

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
  const { device } = userAgent({ headers: headers() });

  if (device.type === "mobile") {
    return (
      <Container>
        {children}
        <TopNavigation className="chapter-top-navigation right-2 bottom-40" />
        <ChapterNavigationMobile version={version} book={book} chapter={chapter} />
        <ScrollControl />
      </Container>
    );
  } else {
    return (
      <Container>
        <div className="flex gap-4">
          <div className="basis-4/6">
            {children}
            <ChapterNavigationDesktop version={version} book={book} chapter={chapter} />
          </div>
          <div className="basis-2/6">
            <div className="sticky top-20">
              <ChaptersSidebar version={version} book={book} chapter={chapter} />
            </div>
            <TopNavigation className="chapter-top-navigation-desktop right-10 bottom-10" />
          </div>
        </div>
      </Container>
    );
  }
}
