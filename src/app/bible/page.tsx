"use client";

import { BibleContext } from "@/providers/bibleProvider";
import { useContext } from "react";
import VersionPage from "./[version]/page";

export default function BiblePage() {
  const { translation } = useContext(BibleContext);

  if (!translation) {
    return <></>;
  }

  return <VersionPage params={{ version: translation.short_name }} />;
}
