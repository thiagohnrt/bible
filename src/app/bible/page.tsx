import { TRANSLATION_DEFAULT } from "@/constants/bible";
import VersionPage from "./[version]/page";

export default function BiblePage() {
  return <VersionPage params={{ version: TRANSLATION_DEFAULT }} />;
}
