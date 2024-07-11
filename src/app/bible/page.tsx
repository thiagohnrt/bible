import VersionPage from "./[version]/page";

export default function BiblePage() {
  const version = "nvi";
  return <VersionPage params={{ version }} />;
}
