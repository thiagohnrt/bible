"use client";

import { Container } from "@/components/root/Container";
import { Skeleton } from "@/components/ui/skeleton";
import { stringToNumber } from "@/lib/utils";
import { api, Language } from "@/services/api";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function LanguagesPage() {
  const [languages, setLanguages] = useState<Language[]>([]);

  useEffect(() => {
    api.getLanguages().then((languages) => setLanguages(languages));
  }, []);

  if (languages.length === 0) {
    return (
      <Container className="py-6">
        <h2 className="text-lg font-bold mb-6">Idiomas</h2>
        <div className="columns-2 lg:columns-3 space-y-2">
          {Array.from({ length: 30 }).map(() => (
            <Skeleton key={crypto.randomUUID()} className="w-36 h-6" />
          ))}
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-6">
      <h2 className="text-lg font-bold mb-6">Idiomas</h2>
      <div className="columns-2 lg:columns-3 space-y-2">
        {languages
          .toSorted((a, b) => a.language.localeCompare(b.language))
          .map((language) => (
            <Link
              href={`/languages/${stringToNumber(language.language)}`}
              className="block leading-7 hover:underline"
              key={language.language}
            >
              {language.language}
            </Link>
          ))}
      </div>
    </Container>
  );
}
