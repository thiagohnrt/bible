import Verse from "@/components/chapter/Verse";
import { VersionLink } from "@/components/home/VersionLink";
import { api } from "@/services/api";

export default async function HomePage() {
  const [verse, versions] = await Promise.all([
    api.getVerse("nvi", "hb", 4, 12),
    api.getVersions(),
  ]);

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
