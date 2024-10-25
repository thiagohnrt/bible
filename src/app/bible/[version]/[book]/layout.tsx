import { BookList } from "@/components/home/BookList";
import { headers } from "next/headers";
import { userAgent } from "next/server";

interface Props {
  children: React.ReactNode;
}

export default async function BookLayout({ children }: Props) {
  const { device } = userAgent({ headers: headers() });
  return (
    <>
      {children}
      <BookList device={device} className="mt-8" />
    </>
  );
}
