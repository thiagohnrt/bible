"use client";

import { cn, getBibleHistory } from "@/lib/utils";
import Verse from "../chapter/Verse";
import { BibleHistory } from "@/app/bible/[version]/[book]/[chapter]/page";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { BibleContext } from "@/providers/bibleProvider";

interface Props {
  className?: string;
}

export function SuggestedReading({ className }: Props) {
  const { translation } = useContext(BibleContext);

  return (
    <Link
      href={`/bible/${translation?.short_name}/43/1`}
      className={cn("block rounded-md p-4 bg-highlight-active", className)}
    >
      <div className="flex justify-between">
        <p>Sugestão de leitura</p>
        <p className="text-sm leading-6 font-bold">Começar</p>
      </div>
      <div className="pt-4">
        <p className="text-lg font-bold pb-3">João 1 - {translation?.short_name}</p>
        <Verse
          text={"No princípio era aquele que é a Palavra. Ele estava com Deus, e era Deus..."}
          className=" line-clamp-2 text-base leading-7"
        />
      </div>
    </Link>
  );
}
