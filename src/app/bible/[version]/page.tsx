import { Books } from "@/components/book/Books";
import { Container } from "@/components/root/Container";

interface Props {
  params: { version: string };
}

export default function VersionPage({ params: { version } }: Props) {
  return (
    <Container>
      <Books version={version} />
    </Container>
  );
}
