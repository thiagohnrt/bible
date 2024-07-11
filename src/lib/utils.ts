import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getVersion(pathname: string): string {
  if (pathname.startsWith("/bible")) {
    const version = pathname.substring(1).split("/")[1];
    return version ?? "";
  }
  return "";
}
