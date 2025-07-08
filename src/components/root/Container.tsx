import { cn } from "@/lib/shad";

interface Props {
  className?: string;
  children: React.ReactNode;
}

export function Container({ className, children }: Props) {
  return <div className={cn("px-4 sm:px-6 w-full lg:w-[1024px] lg:mx-auto", className)}>{children}</div>;
}
