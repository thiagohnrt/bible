"use client";

import { BibleContext } from "@/providers/bibleProvider";
import { useContext, useEffect, useState } from "react";
import VersionPage from "./[version]/page";

export default function BiblePage() {
  const { translation: translationContext } = useContext(BibleContext);
  const [translation, setTranslation] = useState(translationContext);

  useEffect(() => {
    setTranslation(translationContext);
  }, [translationContext]);

  if (!translation) {
    return <></>;
  }

  return <VersionPage params={{ version: translation.short_name }} />;
}
