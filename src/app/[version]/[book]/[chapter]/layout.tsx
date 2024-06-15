import BottomNavigator from "@/components/BottomNavigator";

export default function ChapterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <BottomNavigator />
    </>
  );
}
