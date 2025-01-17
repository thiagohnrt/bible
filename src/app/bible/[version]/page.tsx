"use client";

import { Books } from "@/components/book/Books";
import { BookList } from "@/components/home/BookList";
import { Container } from "@/components/root/Container";
import { RootContext } from "@/providers/rootProvider";
import { useContext } from "react";

interface Props {
  params: { version: string };
}

export default function VersionPage({ params: { version } }: Props) {
  const { device } = useContext(RootContext);
  if (device.type === "mobile") {
    return (
      <Container>
        <Books version={version} device={device} />
      </Container>
    );
  } else {
    return <BookList device={device} />;
  }
}
