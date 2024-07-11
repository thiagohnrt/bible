import { Version } from "@/services/api";
import Link from "next/link";

interface Props {
  version: Version;
}

export function VersionLink({ version }: Props) {
  return (
    <Link href={`/bible/${version.short}`} className="block py-1">
      {version.name}
    </Link>
  );
}
