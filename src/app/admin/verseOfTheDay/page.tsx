"use client";

import { DialogFormVerseOfTheDay } from "@/components/admin/verseOfTheDay/DialogFormVerseOfTheDay";
import { Container } from "@/components/root/Container";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import * as bolls from "@/custom/bolls";
import { bibleUtils } from "@/lib/bibleUtils";
import { repeat } from "@/lib/utils";
import { IVerseOfTheDay } from "@/models/verseOfTheDayModel";
import { Book, Verse } from "@/services/api";
import { useCallback, useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";

interface DataList extends IVerseOfTheDay {
  address: string;
}

export default function VerseOfTheDayPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [verses, setVerses] = useState<DataList[]>([]);
  let versesFiltered: DataList[] = [];

  const fechVerses = useCallback(async () => {
    setIsLoading(true);
    const response = await fetch("/api/admin/verseOfTheDay");
    const data: IVerseOfTheDay[] = await response.json();
    const list = data.map((verseOfTheDay) => ({
      ...verseOfTheDay,
      address: bibleUtils.formatVerseAddress(
        bolls.book({ book: verseOfTheDay.book, language: "Portuguese" } as Book),
        verseOfTheDay.chapter,
        verseOfTheDay.verses.map((verse) => ({ verse } as Verse))
      ),
    }));

    setVerses(list);
    setIsLoading(false);
  }, []);

  const updateList = useCallback(() => {
    fechVerses();
  }, [fechVerses]);

  useEffect(() => {
    fechVerses();
  }, [fechVerses]);

  const repeatsEveryDayAndMonth = (verse: DataList) => {
    if (verse.date) {
      return (
        <div className="text-sm">
          {`${verse.repeat ? "Todo dia" : "Em"} ` +
            new Date(verse.date).toLocaleDateString("pt-BR", {
              day: "numeric",
              month: "short",
            })}
        </div>
      );
    }
    return <></>;
  };

  if (search) {
    versesFiltered = verses.filter((item) =>
      item.address.toLowerCase().includes(search.replace(/\s+/g, " ").trim().toLowerCase())
    );
  } else {
    versesFiltered = verses;
  }

  return (
    <Container className="px-0">
      <div className="flex flex-col h-[calc(100vh-10rem)]">
        <div className="px-6 pb-4">
          <h1 className="text-xl pb-4">Versículo do Dia</h1>
          <Input
            type="text"
            placeholder="Pesquisar versículo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="px-6 pb-24 overflow-y-auto">
          <ul className="[&_li]:py-2">
            {isLoading
              ? repeat(20, (i) => (
                  <li key={i}>
                    <Skeleton className="w-full h-6"></Skeleton>
                  </li>
                ))
              : versesFiltered.map((item, i) => (
                  <DialogFormVerseOfTheDay
                    data={item}
                    key={`${item.book}-${item.chapter}-${item.verses.join("-")}-${i}`}
                    onSaved={updateList}
                  >
                    <li
                      key={`${item.book}-${item.chapter}-${item.verses.join("-")}-${i}`}
                      className="border-b flex items-center justify-between"
                    >
                      <div>{item.address}</div>
                      {repeatsEveryDayAndMonth(item)}
                    </li>
                  </DialogFormVerseOfTheDay>
                ))}
          </ul>
        </div>
      </div>
      <DialogFormVerseOfTheDay onSaved={updateList}>
        <div
          className={
            "fixed right-6 bottom-24 z-10 flex gap-2 p-4 rounded-full items-center justify-center bg-highlight-active shadow-md shadow-black cursor-pointer transition-all duration-500"
          }
        >
          <BiPlus size={24} />
          Novo
        </div>
      </DialogFormVerseOfTheDay>
    </Container>
  );
}
