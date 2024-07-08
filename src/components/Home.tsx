import Verse from "@/components/Verse";
import { api } from "@/services/api";
import { VersionList } from "./VersionList";

interface HomeProps {
  version?: string;
}

export default async function Home({ version = "nvi" }: HomeProps) {
  const verse = await api.getVerse(version, "hb", 4, 12);
  return (
    <>
      <div>
        <Verse className="pb-2" text={verse.text} />
        <div className="text-right">Hebreus 4:12</div>
      </div>
      <VersionList />
    </>
  );
}
