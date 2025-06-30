"use client";

import { db } from "@/database/bibleDB";
import { BibleContext } from "@/providers/bibleProvider";
import { useInView } from "motion/react";
import Link from "next/link";
import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import CountUp from "react-countup";

export function TranslationsCounter() {
  const { languages, setLanguages } = useContext(BibleContext);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [totalLanguages, setTotalLanguages] = useState(0);
  const [totalTranslations, setTotalTranslations] = useState(0);

  useLayoutEffect(() => {
    setTotalLanguages(languages.length);
    setTotalTranslations(languages.flatMap((language) => language.translations).length);
  }, [languages]);

  useEffect(() => {
    db.updateLanguages().then(({ hasNew, languages }) => {
      if (hasNew) {
        // setLanguages(languages!);
      }
    });
  }, [setLanguages]);

  return (
    <Link href="/languages" ref={ref} className="block rounded-md p-4 bg-highlight-active">
      <div className="flex justify-around">
        <div className="flex flex-col items-center">
          <div className="text-5xl">{isInView ? <CountUp end={totalLanguages} duration={3} /> : <span>0</span>}</div>
          <h3>Idiomas</h3>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-5xl">{isInView ? <CountUp end={totalTranslations} duration={3} /> : <span>0</span>}</div>
          <h3>Versões</h3>
        </div>
      </div>
    </Link>
  );
}
