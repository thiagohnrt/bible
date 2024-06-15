export default function Home() {
  const verses = 21;
  return (
    <>
      <h1 className="text-2xl pb-4">João</h1>
      <div className="grid grid-cols-6 gap-4">
        {"."
          .repeat(verses - 1)
          .split(".")
          .map((n, verse) => (
            <div
              style={{ aspectRatio: "1 / 1" }}
              className="bg-slate-800 aspect-square flex items-center justify-center rounded-sm"
              key={verse}
            >
              {verse + 1}
            </div>
          ))}
      </div>
    </>
  );
}
