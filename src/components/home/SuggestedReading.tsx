"use client";

import { cn } from "@/lib/shad";
import { BibleContext } from "@/providers/bibleProvider";
import Link from "next/link";
import { useContext } from "react";
import { IoIosArrowDropright } from "react-icons/io";
import Verse from "../chapter/Verse";

interface Props {
  className?: string;
}

export function SuggestedReading({ className }: Props) {
  const { translation } = useContext(BibleContext);

  return (
    <Link
      href={`/bible/${translation?.identifier}/43/1`}
      className={cn("block rounded-md p-4 bg-highlight-active", className)}
    >
      <div className="flex justify-between">
        <p>Sugestão de leitura</p>
        <div className="flex items-center gap-2">
          <p className="text-sm leading-6 font-bold">Começar</p>
          <IoIosArrowDropright />
        </div>
      </div>
      <div className="pt-4">
        <p className="text-lg font-bold pb-3">João 1 {translation?.short_name ?? ""}</p>
        <Verse
          text={"No princípio era aquele que é a Palavra. Ele estava com Deus, e era Deus..."}
          classNameVerse="line-clamp-2 text-base leading-7"
        />
      </div>
    </Link>
  );
}
