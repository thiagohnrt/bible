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
  const props: React.HTMLAttributes<HTMLDivElement> = {
    id: `verse-${number}`,
    className: cn(font.className, "text-lg leading-9 [&>s]:hidden", !comment ? "[&>sup]:hidden" : "", className),
    onClick,
    style,
  };
  if (formatting === "html") {
    return <div {...props} data-verse={number} dangerouslySetInnerHTML={{ __html: text }}></div>;
  } else {
    text = text.replace(/<[^>]*>/g, "");
    return (
      <div {...props} data-verse={number}>
        {text}
      </div>
    );
  }
}
