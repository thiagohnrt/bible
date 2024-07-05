import Books from "@/components/Books";

export default function VersionPage({
  params: { version },
}: {
  params: { version: string };
}) {
  return <Books version={version} />;
}
