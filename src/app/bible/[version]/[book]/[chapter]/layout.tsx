import { ChapterNavigationDesktop } from "@/components/chapter/ChapterNavigationDesktop";
import { ChapterNavigationMobile } from "@/components/chapter/ChapterNavigationMobile";
import { ChaptersSidebar } from "@/components/chapter/ChaptersSidebar";
import { ScrollControl } from "@/components/chapter/ScrollControl";
import { TopNavigation } from "@/components/chapter/TopNavigation";
import { VersionsSidebar } from "@/components/chapter/VersionsSidebar";
import { Container } from "@/components/root/Container";
import { ChapterProvider } from "@/providers/chapterProvider";
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

type Props = Readonly<
  {
    children: React.ReactNode;
  } & ChapterProps
>;

export default function ChapterLayout({ children, params: { version, book, chapter } }: Props) {
  const { device } = userAgent({ headers: headers() });

  if (device.type === "mobile") {
    return (
      <ChapterProvider>
        <Container>
          {children}
          <TopNavigation className="chapter-top-navigation right-2 bottom-40" />
          <ChapterNavigationMobile version={version} book={book} chapter={chapter} />
          <ScrollControl />
        </Container>
      </ChapterProvider>
    );
  } else {
    return (
      <ChapterProvider>
        <div className="flex gap-4 px-6">
          <VersionsSidebar />
          <div className="flex-1">
            {children}
            <ChapterNavigationDesktop version={version} />
          </div>
          <ChaptersSidebar version={version} book={book} chapter={chapter} />
          <TopNavigation className="chapter-top-navigation-desktop right-10 bottom-10" />
        </div>
      </ChapterProvider>
    );
  }
}
