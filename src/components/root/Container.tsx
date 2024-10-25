import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  children: React.ReactNode;
}

export function Container({ className, children }: Props) {
  return <div className={cn("px-6 w-full lg:w-[1024px] lg:mx-auto", className)}>{children}</div>;
}
