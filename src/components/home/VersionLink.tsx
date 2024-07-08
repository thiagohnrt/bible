"use client";

import { BibleContext } from "@/contexts/bibleContext";
import { Version } from "@/services/api";
import Link from "next/link";
import { useContext } from "react";

interface Props {
  version: Version;
}

export function VersionLink({ version }: Props) {
  const { setVersion } = useContext(BibleContext);
  return (
    <Link
      href={`/bible/${version.short}`}
      onClick={() => setVersion(version.short)}
      className="block py-1"
    >
      {version.name}
    </Link>
  );
}
