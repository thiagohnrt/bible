import { TRANSLATIONS_DEFAULT } from "@/constants/bible";
import Verse from "../chapter/Verse";

async function apiBollsLife<T = any>(url: string): Promise<T> {
  const response = await fetch(`https://bolls.life${url}`);
  if (response.status === 200) {
    return await response.json();
  }
  throw new Error(response.statusText);
}

export async function VerseOfDay() {
  const verse = await apiBollsLife(`/get-verse/${TRANSLATIONS_DEFAULT}/${58}/${4}/${12}`);

  return (
    <div>
      <h1 className="text-2xl pb-4">Versículo do dia</h1>
      <Verse className="pb-2" text={verse.text} />
      <div className="text-right">Hebreus 4:12</div>
    </div>
  );
}
