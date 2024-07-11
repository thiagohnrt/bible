import { cn } from "@/lib/utils";
import { Merriweather } from "next/font/google";

const font = Merriweather({ subsets: ["latin"], weight: "300" });

interface VerseProps {
  text: string;
  number?: number;
  className?: string;
}

export default function Verse({ number, text, className }: VerseProps) {
  return (
    <div className={cn(font.className, "text-lg leading-9", className)}>
      <small className={cn("pr-1 align-top opacity-70", number ?? "hidden")}>
        {number}
      </small>
      {text}
    </div>
  );
}
