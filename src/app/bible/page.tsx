import VersionPage from "./[version]/page";

export default function BiblePage() {
  const version = "NVIPT";
  return <VersionPage params={{ version }} />;
}
