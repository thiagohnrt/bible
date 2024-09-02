"use client";

import { BibleContext } from "@/providers/bibleProvider";
import { api, Verse as IVerse } from "@/services/api";
import { useContext, useEffect, useState } from "react";
import Verse from "../chapter/Verse";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { MdMonochromePhotos, MdShare } from "react-icons/md";

interface Props {
  className?: string;
}

export function VerseOfDay({ className }: Props) {
  const { translation } = useContext(BibleContext);
  const [verse, setVerse] = useState<IVerse | null>(null);
  const [isMonochrome, setMonochrome] = useState(true);

  useEffect(() => {
    if (translation) {
      api.getVerse(translation.short_name, 58, 4, 12).then((data) => setVerse(data));
    }
  }, [translation]);

  const randomImage = (max: number): string => {
    const currentDate = new Date();
    const dayOfYear =
      (Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) -
        Date.UTC(currentDate.getFullYear(), 0, 0)) /
      86400000;
    return `/img/verseOfDay/${(dayOfYear % max) + 1}.jpg`;
  };

  const classNameImage = `flex flex-col justify-center gap-4 text-center text-white py-6 px-8 bg-center bg-cover ${
    isMonochrome ? "bg-blend-saturation" : ""
  }`;
  const styleImage = {
    backgroundImage: `${isMonochrome ? "linear-gradient(black, black)," : ""} url(${randomImage(5)})`,
    textShadow: "1px 1px 5px #000",
  };

  if (!verse) {
    return <></>;
  }

  return (
    <div className={className}>
      <h1 className="text-lg font-bold mb-2">Versículo do dia</h1>
      <Dialog id="verseOfDay">
        <DialogTrigger>
          <div className={cn("min-h-80 rounded-lg", classNameImage)} style={styleImage}>
            <Verse className="pb-2 text-base leading-9" text={verse.text} />
            <div className="text-sm">Hebreus 4:12</div>
          </div>
        </DialogTrigger>
        <DialogContent className="h-svh w-lvw p-0">
          <DialogHeader className="hidden">
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className={cn("", classNameImage)} style={styleImage}>
            <Verse className="pb-2 text-base leading-9" text={verse.text} />
            <div className="text-sm">Hebreus 4:12</div>
          </div>
          <DialogFooter className="absolute left-0 right-0 bottom-0 flex flex-row justify-center gap-8 p-8 text-white">
            <div className="flex items-center justify-center w-12 h-12 rounded-full active:shadow-xl transition-shadow">
              <MdShare size={20} />
            </div>
            <div
              className="flex items-center justify-center w-12 h-12 rounded-full active:shadow-xl transition-shadow"
              onClick={() => setMonochrome(!isMonochrome)}
            >
              <MdMonochromePhotos size={20} />
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
