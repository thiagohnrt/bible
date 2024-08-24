import { cn } from "@/lib/utils";
import { Merriweather } from "next/font/google";
import { TfiCommentAlt } from "react-icons/tfi";

const font = Merriweather({ subsets: ["latin"], weight: "300" });

interface VerseProps {
  text: string;
  number?: number;
  onClick?: () => void;
  className?: string;
  style?: { [key: string]: string };
}

export default function Verse({ number, text, onClick, className, style }: VerseProps) {
  return (
    <div
      data-verse={number}
      onClick={onClick}
      className={cn(font.className, "[&>sup]:hidden text-lg leading-9", className)}
      style={style}
      dangerouslySetInnerHTML={{ __html: text }}
    ></div>
  );
}
