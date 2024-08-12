import { BibleHistory } from "@/app/bible/[version]/[book]/[chapter]/page";
import { BIBLE_HISTORY, BIBLE_HISTORY_EVENT } from "@/constants/bible";
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

export const setBibleHistory = (data: BibleHistory): void => {
  localStorage.setItem(BIBLE_HISTORY, JSON.stringify(data));
  window.dispatchEvent(new Event(BIBLE_HISTORY_EVENT));
};
export const getBibleHistory = (): BibleHistory => {
  return JSON.parse(localStorage.getItem(BIBLE_HISTORY) ?? "{}");
};

export const repeat = (count: number, callbackfn: (index: number) => void) => {
  return "."
    .repeat(count - 1)
    .split(".")
    .map((v, i) => callbackfn(i));
};
