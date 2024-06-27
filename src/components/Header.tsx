import Link from "next/link";

export default function Header() {
  return (
    <header className="px-4 h-12 border-b flex items-center">
      <Link href="/">Bíblia</Link>
    </header>
  );
}
