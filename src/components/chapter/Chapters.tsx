import Link from "next/link";

interface ChaptersProps {
  version: string;
  book: number;
  total: number;
}

export function Chapters({ version, book, total }: ChaptersProps) {
  return (
    <div className="grid grid-cols-6 gap-4">
      {"."
        .repeat(total - 1)
        .split(".")
        .map((n, i) => (
          <Link
            href={`/bible/${version}/${book}/${i + 1}`}
            style={{ aspectRatio: "1 / 1" }}
            className="bg-zinc-800 aspect-square flex items-center justify-center rounded-sm"
            key={i}
          >
            {i + 1}
          </Link>
        ))}
    </div>
  );
}
