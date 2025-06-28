import { ChapterRead } from "@/app/bible/[version]/[book]/[chapter]/page";
import { bibleUtils } from "@/lib/bibleUtils";
import { cn } from "@/lib/shad";
import { getBibleHistory } from "@/lib/utils";
import { Verse as IVerse } from "@/services/api";
import { useEffect, useState } from "react";
import { MdHistory } from "react-icons/md";
import Verse from "../chapter/Verse";
import { Carousel, CarouselContent, CarouselDotButtons, CarouselItem } from "../ui/carousel";

interface Props {
  className?: string;
}

export function HistoryReading({ className }: Props) {
  const [bibleHistory, setBibleHistory] = useState<ChapterRead[]>([]);
  useEffect(() => {
    const data = getBibleHistory().reverse();
    setBibleHistory(data);
  }, []);
  return (
    <div className={cn("flex flex-col rounded-md bg-highlight p-4", className)}>
      <div className="flex items-center gap-2">
        <p>Histórico de leitura</p>
        <MdHistory size={18} />
      </div>
      <div className="flex-1 pt-4">
        <Carousel className="h-full">
          <CarouselContent className="conteudo h-full">
            {bibleHistory.slice(1, 10).map((item, index) => (
              <CarouselItem key={`bible-history-item-${index}`} className="h-full">
                <div className="py-1 h-full">
                  <p className="text-lg font-medium pb-3">
                    {item.book.name} {item.chapter}:{item.verse?.verse ?? 1} {item.translation}
                  </p>
                  <Verse
                    text={bibleUtils.versesToString([{ text: item.verse.text } as IVerse], { withNumb: false })}
                    formatting="text"
                    classNameVerse="line-clamp-2 text-base leading-7"
                  />
                </div>
              </CarouselItem>
            ))}
            {bibleHistory.length > 10 && (
              <CarouselItem className="h-full">
                <div className="py-1 h-full">
                  <p className="text-lg font-medium pb-3">... e mais {bibleHistory.length - 10} capítulos</p>
                  <p className="text-sm text-muted-foreground">
                    Você pode ver o histórico completo na página de{" "}
                    <a href="/history" className="underline">
                      histórico
                    </a>
                    .
                  </p>
                </div>
              </CarouselItem>
            )}
            {bibleHistory.length === 0 && (
              <CarouselItem className="h-full">
                <div className="py-1 h-full">
                  <p className="text-lg font-medium pb-3">Nenhum capítulo lido</p>
                  <p className="text-sm text-muted-foreground">
                    Aqui você verá os capítulos que você leu recentemente. Assim que você ler um capítulo, ele aparecerá
                    aqui.
                  </p>
                </div>
              </CarouselItem>
            )}
            {bibleHistory.length === 1 && (
              <CarouselItem className="h-full">
                <div className="py-1 h-full">
                  <p className="text-lg font-medium pb-3">Você leu apenas um capítulo</p>
                  <p className="text-sm text-muted-foreground">Continue lendo para que mais capítulos apareçam aqui.</p>
                </div>
              </CarouselItem>
            )}
          </CarouselContent>
          <CarouselDotButtons />
        </Carousel>
      </div>
    </div>
  );
}
