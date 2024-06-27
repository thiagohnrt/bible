import { Chapters } from "@/components/Chapters";

export default function Home() {
  const verses = 21;
  return (
    <>
      <h1 className="text-2xl pb-4">João</h1>
      <Chapters total={21} />
    </>
  );
}
