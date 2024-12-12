import { BibleHistory } from "@/app/bible/[version]/[book]/[chapter]/page";
import {
  KEY_BIBLE_HISTORY,
  EVENT_BIBLE_HISTORY,
  KEY_TRANSLATION_CURRENT,
  TRANSLATION_DEFAULT,
  TRANSLATION_NAME_DEFAULT,
  LANGUAGE_DEFAULT,
  KEY_LANGUAGE_CURRENT,
} from "@/constants/bible";
import { Translation, Verse } from "@/services/api";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as bolls from "@/custom/bolls";
import { ReactNode } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTranslationPathname(pathname: string): Translation {
  if (pathname.startsWith("/bible")) {
    const translation = pathname.substring(1).split("/")[1];
    if (translation) {
      return bolls.translation({
        identifier: translation,
        short_name: translation,
        full_name: "",
      });
    }
  }
  return bolls.translation({
    identifier: TRANSLATION_DEFAULT,
    short_name: TRANSLATION_DEFAULT,
    full_name: TRANSLATION_NAME_DEFAULT,
  });
}

export const setBibleHistory = (data: BibleHistory): void => {
  localStorage.setItem(KEY_BIBLE_HISTORY, JSON.stringify(data));
  window.dispatchEvent(new Event(EVENT_BIBLE_HISTORY));
};
export const getBibleHistory = (): BibleHistory => {
  return JSON.parse(localStorage.getItem(KEY_BIBLE_HISTORY) ?? "{}");
};

export const setLanguageStorage = (language: string) => {
  localStorage.setItem(KEY_LANGUAGE_CURRENT, language);
};
export const getLanguageStorage = (): string => {
  const language = localStorage.getItem(KEY_LANGUAGE_CURRENT);
  return language || LANGUAGE_DEFAULT;
};

export const setTranslationStorage = (translation: Translation) => {
  localStorage.setItem(KEY_TRANSLATION_CURRENT, JSON.stringify(translation));
};
export const getTranslationStorage = (): Translation => {
  const translation = localStorage.getItem(KEY_TRANSLATION_CURRENT);
  if (translation) {
    return JSON.parse(translation);
  }
  return bolls.translation({
    identifier: TRANSLATION_DEFAULT,
    short_name: TRANSLATION_DEFAULT,
    full_name: TRANSLATION_NAME_DEFAULT,
  });
};

export const repeat = (count: number, callbackfn: (index: number) => ReactNode) => {
  return "."
    .repeat(count - 1)
    .split(".")
    .map((v, i) => callbackfn(i));
};

export const formatVerses = (data: Verse[]): string => {
  const verses = data.map(({ verse }) => verse);
  if (verses.length === 0) return "";

  let result: string[] = [];
  let start = verses[0];

  for (let i = 1; i <= verses.length; i++) {
    if (verses[i] !== verses[i - 1] + 1) {
      if (start === verses[i - 1]) {
        result.push(`${start}`);
      } else {
        result.push(`${start}-${verses[i - 1]}`);
      }
      start = verses[i];
    }
  }

  return result.join(", ");
};

export const sortTranslations = (translations: Translation[]) =>
  translations.sort((a, b) => a.short_name.localeCompare(b.short_name));
