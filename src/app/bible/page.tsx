"use client";

import { useContext } from "react";
import VersionPage from "./[version]/page";
import { BibleContext } from "@/contexts/bibleContext";

export default function BiblePage() {
  const { version } = useContext(BibleContext);
  return <VersionPage params={{ version }} />;
}
