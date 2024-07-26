import { Books } from "@/components/book/Books";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  params: { version: string };
}

export default function VersionPage({ params: { version } }: Props) {
  return <Books version={version} />;
}
