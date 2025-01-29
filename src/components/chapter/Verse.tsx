import { cn } from "@/lib/shad";
import { Merriweather } from "next/font/google";

const font = Merriweather({ subsets: ["latin"], weight: "300" });

interface VerseProps {
  text: string;
  number?: number;
  comment?: boolean;
  onClick?: () => void;
  className?: string;
  style?: { [key: string]: string };
}

export default function Verse({ number, text, comment = false, onClick, className, style }: VerseProps) {
  return (
    <div
      id={`verse-${number}`}
      data-verse={number}
      onClick={onClick}
      className={cn(font.className, "text-lg leading-9 [&>s]:hidden", !comment ? "[&>sup]:hidden" : "", className)}
      style={style}
      dangerouslySetInnerHTML={{ __html: text }}
    ></div>
  );
}
