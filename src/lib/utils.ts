import { ChapterRead } from "@/app/bible/[version]/[book]/[chapter]/page";
import {
  EVENT_BIBLE_HISTORY,
  KEY_BIBLE_HISTORY,
  KEY_LANGUAGE_CURRENT,
  KEY_LAST_CHAPTER_READ,
  KEY_TRANSLATION_CURRENT,
  LANGUAGE_DEFAULT,
  TRANSLATION_DEFAULT,
  TRANSLATION_NAME_DEFAULT,
} from "@/constants/bible";
import * as bolls from "@/custom/bolls";
import { Translation } from "@/services/api";
import { ReactNode } from "react";
import packageJson from "../../package.json";

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

export const setBibleHistory = (data: ChapterRead): void => {
  // Last chapter read
  localStorage.setItem(KEY_LAST_CHAPTER_READ, JSON.stringify(data));
  window.dispatchEvent(new Event(EVENT_BIBLE_HISTORY));
  // Bible history
  const history = JSON.parse(localStorage.getItem(KEY_BIBLE_HISTORY) ?? "[]");
  if (history.length >= 50) {
    history.shift();
  }
  history.push(data);
  localStorage.setItem(KEY_BIBLE_HISTORY, JSON.stringify(history));
};
export const getBibleHistory = (): ChapterRead[] => {
  const history = localStorage.getItem(KEY_BIBLE_HISTORY);
  if (history) {
    return JSON.parse(history);
  }
  return [];
};
export const getLastChapterRead = (): ChapterRead => {
  return JSON.parse(localStorage.getItem(KEY_LAST_CHAPTER_READ) ?? "{}");
};

export const setLanguageStorage = (language: string) => {
  localStorage.setItem(KEY_LANGUAGE_CURRENT, language);
};
export const getLanguageStorage = (): string => {
  const language = localStorage.getItem(KEY_LANGUAGE_CURRENT);
  return language ?? LANGUAGE_DEFAULT;
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
  if (count <= 0) {
    return [];
  }
  return "."
    .repeat(count - 1)
    .split(".")
    .map((v, i) => callbackfn(i));
};

export const sortTranslations = (translations: Translation[]) =>
  translations.toSorted((a, b) => a.full_name.localeCompare(b.full_name));

export const isVerseInInterval = (verse: number, interval?: string): boolean => {
  if (!interval) {
    return false;
  }

  const ranges = decodeURIComponent(interval)
    .split(",")
    .map((range) => range.trim());

  for (const range of ranges) {
    if (range.includes("-")) {
      const [start, end] = range.split("-").map(Number);
      if (verse >= start && verse <= end) {
        return true;
      }
    } else {
      const singleNum = Number(range);
      if (verse == singleNum) {
        return true;
      }
    }
  }

  return false;
};

interface ScrollToElementOptions extends ScrollIntoViewOptions {
  offset?: number;
}

export const scrollToElement = (
  element: Element | null,
  options: ScrollToElementOptions = { behavior: "smooth", block: "center", offset: 0 }
) => {
  if (!element) {
    return Promise.resolve();
  }
  return new Promise<void>((resolve) => {
    const getTargetPosition = () => {
      const rect = element.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

      let top = rect.top + scrollTop;
      let left = rect.left + scrollLeft;

      switch (options.block) {
        case "start":
          top = rect.top + scrollTop - (options.offset ?? 0);
          break;
        case "center":
          top = rect.top + scrollTop - (window.innerHeight / 2 - rect.height / 2) + (options.offset ?? 0);
          break;
        case "end":
          top = rect.top + scrollTop - (window.innerHeight - rect.height) + (options.offset ?? 0);
          break;
        case "nearest":
          // Implement nearest logic if needed
          break;
        default:
          top = rect.top + scrollTop + (options.offset ?? 0);
      }

      return { top, left };
    };

    const isElementInView = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const windowWidth = window.innerWidth || document.documentElement.clientWidth;

      switch (options.block) {
        case "start":
          return rect.top >= 0 && rect.top <= windowHeight;
        case "center":
          return rect.top + rect.height / 2 >= 0 && rect.top + rect.height / 2 <= windowHeight;
        case "end":
          return rect.bottom >= 0 && rect.bottom <= windowHeight;
        case "nearest":
        // Implement nearest logic if needed
        default:
          return rect.top >= 0 && rect.left >= 0 && rect.bottom <= windowHeight && rect.right <= windowWidth;
      }
    };

    const isScrollingDone = () => isElementInView();

    const checkScroll = () => {
      const { top, left } = getTargetPosition();
      window.scrollTo({ top, left, behavior: options.behavior });
      if (isScrollingDone()) {
        setTimeout(() => resolve(), 300);
      } else {
        requestAnimationFrame(checkScroll);
      }
    };

    checkScroll();
  });
};

export const stringToNumber = (str: string): number => {
  return str.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
};

export const getVersion = () => {
  const now = new Date(packageJson.datetime);
  const year = String(now.getFullYear()).substring(2);
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Janeiro é 0!
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${packageJson.version}`;
};
