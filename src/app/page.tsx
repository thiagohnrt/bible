import Verse from "@/components/chapter/Verse";
import { api } from "@/services/api";

export default async function HomePage() {
  const verse = await api.getVerse("NVIPT", 58, 4, 12);
  return (
    <>
      <div>
        <h1 className="text-2xl pb-4">Versículo do dia</h1>
        <Verse className="pb-2" text={verse.text} />
        <div className="text-right">Hebreus 4:12</div>
      </div>
    </>
  );
}
