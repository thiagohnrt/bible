import { TRANSLATIONS_DEFAULT } from "@/constants/bible";
import Verse from "../chapter/Verse";
import { Verse as IVerse } from "@/services/api";

async function apiBible<T = any>(url: string): Promise<T> {
  const response = await fetch(`${process.env.APP_URL}/api/bible?path=${url}`);
  if (response.status === 200) {
    return await response.json();
  }
  throw new Error(response.statusText);
}

interface Props {
  className?: string;
}

export async function VerseOfDay({ className }: Props) {
  const verse = await apiBible<IVerse>(`/get-verse/${TRANSLATIONS_DEFAULT}/${58}/${4}/${12}`);

  if (!verse) {
    return <></>;
  }

  return (
    <div className={className}>
      <h1 className="text-2xl pb-4">Versículo do dia</h1>
      <Verse className="pb-2" text={verse.text} />
      <div className="text-right">Hebreus 4:12</div>
    </div>
  );
}
