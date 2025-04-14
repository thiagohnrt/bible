import { cn } from "@/lib/shad";
import { Merriweather } from "next/font/google";

const font = Merriweather({ subsets: ["latin"], weight: "300" });

interface VerseProps {
  text: string;
  number?: number;
  comment?: boolean;
  onClick?: () => void;
  className?: string;
  classNameVerse?: string;
  style?: { [key: string]: string };
  formatting?: "html" | "text";
}

export default function Verse({
  number,
  text,
  comment = false,
  onClick,
  className,
  classNameVerse,
  style,
  formatting = "html",
}: VerseProps) {
  return (
    <div id={`verse-${number}`} className={cn(font.className, className)} onClick={onClick} style={style}>
      {number && <span className="verse-num text-xs align-super opacity-70">{number}&nbsp;</span>}
      {formatting === "html" ? (
        <span
          className={cn("verse-txt text-lg leading-9 [&>s]:hidden", !comment && "[&>sup]:hidden", classNameVerse)}
          dangerouslySetInnerHTML={{ __html: text }}
        ></span>
      ) : (
        <span className={cn("verse-txt text-lg leading-9", classNameVerse)}>{text.replace(/<[^>]*>/g, "")}</span>
      )}
    </div>
  );
}
