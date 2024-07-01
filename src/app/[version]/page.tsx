import Books from "@/components/Books";
import Home from "@/components/Home";

export default function VersionPage({
  params: { version },
}: {
  params: { version: string };
}) {
  return <Books version={version} />;
}
