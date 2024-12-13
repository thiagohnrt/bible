import { Books } from "@/components/book/Books";
import { Container } from "@/components/root/Container";
import { headers } from "next/headers";
import { userAgent } from "next/server";

interface Props {
  params: { version: string };
}

export default function VersionPage({ params: { version } }: Props) {
  const { device } = userAgent({ headers: headers() });
  return (
    <Container>
      <Books version={version} device={device} />
    </Container>
  );
}
