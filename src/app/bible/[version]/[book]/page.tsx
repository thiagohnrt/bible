import { Chapters } from "@/components/chapter/Chapters";
import { api } from "@/services/api";

export default async function BookPage({
  params: { version, book },
}: {
  params: { version: string; book: number };
}) {
  const data = await api.getBook(version, book);
  return (
    <>
      <h1 className="text-3xl pb-4">{data.name}</h1>
      <Chapters version={version} book={book} total={data.chapters} />
    </>
  );
}
