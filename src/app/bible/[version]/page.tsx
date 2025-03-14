"use client";

import { BooksAccordion } from "@/components/book/BooksAccordion";
import { BooksList } from "@/components/book/BooksList";
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
        <BooksAccordion version={version} device={device} />
      </Container>
    );
  } else {
    return <BooksList version={version} device={device} />;
  }
}
