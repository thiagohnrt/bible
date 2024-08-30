import { BibleHistory } from "@/app/bible/[version]/[book]/[chapter]/page";
import {
  KEY_BIBLE_HISTORY,
  EVENT_BIBLE_HISTORY,
  KEY_TRANSLATION_CURRENT,
  TRANSLATION_DEFAULT,
} from "@/constants/bible";
import { Translation } from "@/services/api";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTranslationPathname(pathname: string): Translation {
  if (pathname.startsWith("/bible")) {
    const translation = pathname.substring(1).split("/")[1];
    if (translation) {
      return {
        full_name: "",
        short_name: translation,
      };
    }
  }
  return {
    full_name: "",
    short_name: TRANSLATION_DEFAULT,
  };
}

export const setBibleHistory = (data: BibleHistory): void => {
  localStorage.setItem(KEY_BIBLE_HISTORY, JSON.stringify(data));
  window.dispatchEvent(new Event(EVENT_BIBLE_HISTORY));
};
export const getBibleHistory = (): BibleHistory => {
  return JSON.parse(localStorage.getItem(KEY_BIBLE_HISTORY) ?? "{}");
};

export const setTranslationStorage = (translation: Translation) => {
  localStorage.setItem(KEY_TRANSLATION_CURRENT, JSON.stringify(translation));
};
export const getTranslationStorage = (): Translation => {
  const translation = localStorage.getItem(KEY_TRANSLATION_CURRENT);
  if (translation) {
    return JSON.parse(translation);
  }
  return {
    full_name: "",
    short_name: TRANSLATION_DEFAULT,
  };
};

export const repeat = (count: number, callbackfn: (index: number) => void) => {
  return "."
    .repeat(count - 1)
    .split(".")
    .map((v, i) => callbackfn(i));
};
