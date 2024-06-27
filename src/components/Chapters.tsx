interface ChaptersProps {
  total: number;
}

export function Chapters({ total }: ChaptersProps) {
  return (
    <div className="grid grid-cols-6 gap-4">
      {"."
        .repeat(total - 1)
        .split(".")
        .map((n, i) => (
          <div
            style={{ aspectRatio: "1 / 1" }}
            className="bg-zinc-800 aspect-square flex items-center justify-center rounded-sm"
            key={i}
          >
            {i + 1}
          </div>
        ))}
    </div>
  );
}
