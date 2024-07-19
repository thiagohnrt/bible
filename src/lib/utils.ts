import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTranslation(pathname: string): string {
  if (pathname.startsWith("/bible")) {
    const translation = pathname.substring(1).split("/")[1];
    return translation ?? "";
  }
  return "";
}
