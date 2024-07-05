import Verse from "@/components/Verse";
import { api } from "@/services/api";
import Link from "next/link";

interface HomeProps {
  version?: string;
}

export default async function Home({ version = "nvi" }: HomeProps) {
  const verse = await api.getVerse(version, "hb", 4, 12);
  return (
    <>
      <Verse className="pb-2" text={verse.text} />
      <div className="text-right">Hebreus 4:12</div>
      <div>
        <h1 className="text-2xl py-3">Versões</h1>
        <Link href="/bible/nvi" className="block py-1">
          Nova Versão Internacional
        </Link>
        <Link href="/bible/acf" className="block py-1">
          Almeida Corrigida Fiel
        </Link>
      </div>
    </>
  );
}
