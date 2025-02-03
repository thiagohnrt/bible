import Image from "next/image";
import { MdShare } from "react-icons/md";

import { getVerseOfTheDay } from "@/services/verseOfTheDay";
import {} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { VerseOfTheDayText } from "./VerseOfTheDayText";

interface Props {
  className?: string;
}

export async function VerseOfTheDay({ className }: Props) {
  const { image: imgSrc } = await getVerseOfTheDay();

  return (
    <div className={className}>
      <h1 className="text-lg font-normal mb-2">Versículo do dia</h1>
      <Dialog id="verseOfTheDay">
        <DialogTrigger className="w-full">
          <div className="flex items-center text-left p-8 relative min-h-60">
            <Image
              src={imgSrc}
              alt="Versículo do dia"
              placeholder="blur"
              fill={true}
              style={{ objectFit: "cover", zIndex: 1 }}
              className="rounded-lg"
            />
            <VerseOfTheDayText className="[&>.votd-verse]:text-xl" />
          </div>
        </DialogTrigger>
        <DialogContent className="h-svh w-lvw p-0">
          <DialogHeader className="hidden">
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="flex flex-col justify-center p-8 relative">
            <h1 className="mb-4 text-white" style={{ zIndex: 2 }}>
              Versículo do dia
            </h1>
            <Image
              src={imgSrc}
              alt="Versículo do dia"
              placeholder="blur"
              fill={true}
              style={{ objectFit: "cover", zIndex: 1 }}
            />
            <VerseOfTheDayText className="[&>.votd-verse]:text-2xl [&>.votd-verse]:leading-10 [&>.votd-book]:text-base" />
          </div>
          <DialogFooter
            className="absolute left-0 right-0 bottom-0 flex flex-row justify-center gap-8 p-6 text-white"
            style={{ zIndex: 3 }}
          >
            <div
              className="flex items-center justify-center w-16 h-16 rounded-full active:shadow-xl transition-shadow"
              style={{ zIndex: 5 }}
            >
              <MdShare size={24} />
            </div>
            <div
              className="absolute -left-10 -right-10 -bottom-10 h-10"
              style={{
                zIndex: 4,
                boxShadow: "0 0px 100px 10px rgba(0, 0, 0, 1)",
              }}
            ></div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
