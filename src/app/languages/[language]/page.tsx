"use client";

import { Container } from "@/components/root/Container";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/database/bibleDB";
import { sortTranslations, stringToNumber } from "@/lib/utils";
import { BibleContext } from "@/providers/bibleProvider";
import { api, Language, Translation } from "@/services/api";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

interface Props {
  params: { language: string };
}

export default function LanguagePage({ params: { language } }: Props) {
  const router = useRouter();
  const [lang, setLang] = useState<Language | null>(null);
  const { setTranslation: setTranslationContext, setTranslationsOffline } = useContext(BibleContext);

  useEffect(() => {
    api.getLanguages().then((languages) => {
      const filtered = languages.filter((lang) => stringToNumber(lang.language) === +language);
      setLang(filtered[0]);
    });
  }, [language]);

  if (!lang) {
    return (
      <Container className="py-6">
        <h2 className="text-lg font-bold mb-6">Versões</h2>
        <Skeleton className="w-36 h-6 mb-6" />
        <div className="columns-2 lg:columns-3 space-y-2">
          {Array.from({ length: 12 }).map(() => (
            <Skeleton key={crypto.randomUUID()} className="w-36 h-6" />
          ))}
        </div>
      </Container>
    );
  }

  const onTranslationSelected = async (translation: Translation) => {
    db.saveTranslation(translation.identifier, setTranslationsOffline);
    setTranslationContext(translation);
    router.push(`/bible/${translation.identifier}`);
  };

  return (
    <Container className="py-6">
      <h2 className="text-lg font-bold mb-6">Versões</h2>
      <h3 className="font-bold mb-6">{lang?.language}</h3>
      <div className="columns-2 lg:columns-3 space-y-2">
        {sortTranslations(lang?.translations ?? []).map((translation) => (
          <a
            href={`/bible/${translation.identifier}`}
            className="block leading-7 hover:underline"
            key={translation.identifier}
            onClick={(e) => {
              e.preventDefault();
              onTranslationSelected(translation);
            }}
          >
            {translation.full_name}
          </a>
        ))}
      </div>
    </Container>
  );
}
