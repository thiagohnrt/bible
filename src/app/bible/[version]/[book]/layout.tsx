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
      <BookList device={device} className="bg-neutral-200 dark:bg-neutral-800 mt-8" />
    </>
  );
}
