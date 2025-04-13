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
  formatting?: "html" | "text";
}

export default function Verse({
  number,
  text,
  comment = false,
  onClick,
  className,
  style,
  formatting = "html",
}: VerseProps) {
  return (
    <div
      id={`verse-${number}`}
      className={cn(
        font.className,
        "[&>.verse-txt]:text-lg [&>.verse-txt]:leading-9",
        "[&>.verse-num]:text-xs [&>.verse-num]:align-super [&>.verse-num]:opacity-70",
        className
      )}
      onClick={onClick}
      style={style}
    >
      {number && <span className="verse-num">{number}&nbsp;</span>}
      {formatting === "html" ? (
        <span
          className={cn("verse-txt [&>s]:hidden", !comment && "[&>sup]:hidden")}
          dangerouslySetInnerHTML={{ __html: text }}
        ></span>
      ) : (
        <span className="verse-txt">{text.replace(/<[^>]*>/g, "")}</span>
      )}
    </div>
  );
}
