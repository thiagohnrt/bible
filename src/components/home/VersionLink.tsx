import { Translation } from "@/services/api";
import Link from "next/link";

interface Props {
  translation: Translation;
}

export function TranslationLink({ translation }: Props) {
  return (
    <Link href={`/bible/${translation.short_name}`} className="block py-1">
      {translation.full_name}
    </Link>
  );
}
