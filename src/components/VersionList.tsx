"use client";

import { BibleContext } from "@/contexts/bibleContext";
import Link from "next/link";
import { useContext } from "react";

export function VersionList() {
  const { setVersion } = useContext(BibleContext);
  return (
    <div>
      <h1 className="text-2xl py-3">Versões</h1>
      <Link
        href="/bible/nvi"
        onClick={() => setVersion("nvi")}
        className="block py-1"
      >
        Nova Versão Internacional
      </Link>
      <Link
        href="/bible/acf"
        onClick={() => setVersion("acf")}
        className="block py-1"
      >
        Almeida Corrigida Fiel
      </Link>
    </div>
  );
}
