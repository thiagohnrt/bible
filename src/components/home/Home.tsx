import { api } from "@/services/api";
import { VersionLink } from "./VersionLink";
import Verse from "../chapter/Verse";

export default async function Home() {
  const verse = await api.getVerse("nvi", "hb", 4, 12);
  const versions = await api.getVersions();
  return (
    <>
      <div>
        <h1 className="text-2xl pb-4">Versículo do dia</h1>
        <Verse className="pb-2" text={verse.text} />
        <div className="text-right">Hebreus 4:12</div>
      </div>
      <div>
        <h2 className="text-2xl py-3">Versões</h2>
        {versions.map((version, i) => {
          return <VersionLink version={version} key={i} />;
        })}
      </div>
    </>
  );
}
