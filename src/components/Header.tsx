import Link from "next/link";
import { PiLeafFill } from "react-icons/pi";

export default function Header() {
  return (
    <header className="px-4 h-12 border-b flex items-center">
      <Link href="/" className="flex flex-nowrap items-center gap-1">
        <PiLeafFill size={18} />
        <h1>Bíblia</h1>
      </Link>
    </header>
  );
}
