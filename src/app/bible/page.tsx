import { TRANSLATIONS_DEFAULT } from "@/constants/bible";
import VersionPage from "./[version]/page";

export default function BiblePage() {
  return <VersionPage params={{ version: TRANSLATIONS_DEFAULT }} />;
}
