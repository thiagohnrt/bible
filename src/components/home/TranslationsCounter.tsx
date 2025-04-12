"use client";

import { db } from "@/database/bibleDB";
import { api } from "@/services/api";
import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";

export function TranslationsCounter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [totalLanguages, setTotalLanguages] = useState(0);
  const [totalTranslations, setTotalTranslations] = useState(0);

  const fetchTranslations = async () => {
    const languages = await api.getLanguages();
    setTotalLanguages(languages.length);
    setTotalTranslations(languages.flatMap((language) => language.translations).length);
  };

  useEffect(() => {
    db.updateLanguages().then((hasNew) => {
      if (hasNew) fetchTranslations();
    });
    fetchTranslations();
  }, []);

  return (
    <div ref={ref} className="block rounded-md p-4 bg-highlight-active">
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
    </div>
  );
}
