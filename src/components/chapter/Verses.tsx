import { repeat } from "@/lib/utils";
import { api } from "@/services/api";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
  version: string;
  book: number;
  chapter: number;
}

export function Verses({ version, book, chapter }: Props) {
  const [verses, setVerses] = useState(0);
  useEffect(() => {
    api.getVerses(version, book, chapter).then((data) => setVerses(data.length));
  }, [book, chapter, version]);

  return (
    <>
      {repeat(verses, (i) => (
        <Link
          href={`/bible/${version}/${book}/${chapter}/${i + 1}`}
          style={{ aspectRatio: "1 / 1" }}
          className="chapter-number aspect-square flex items-center justify-center rounded-sm bg-highlight-active"
          key={i}
        >
          {i + 1}
        </Link>
      ))}
    </>
  );
}
