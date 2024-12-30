import {
  KEY_LANGUAGES_SAVED,
  KEY_TRANSLATION_COMPARE,
  KEY_TRANSLATION_SAVED,
  TRANSLATION_DEFAULT,
} from "@/constants/bible";
import { api, Book, Language, Verse } from "@/services/api";
import { IDB } from "./indexedDB";

export interface TranslationsOffline {
  [translation: string]: "downloading" | "downloaded" | "downloadFailed" | "deleting" | "deleteFailed";
}

export const idb = new IDB({
  name: "bible",
  version: 2,
  stores: [
    {
      name: "verses",
      keyPath: ["translation", "book", "chapter", "verse"],
      indexs: [
        {
          name: "translationIndex",
          keyPath: "translation",
        },
        {
          name: "chapterIndex",
          keyPath: ["translation", "book", "chapter"],
        },
      ],
    },
    {
      name: "books",
      keyPath: ["translation", "book"],
      indexs: [
        {
          name: "translationIndex",
          keyPath: "translation",
        },
      ],
    },
    {
      name: "languages",
      keyPath: "id",
      autoIncrement: true,
    },
  ],
});

const saveTranslation = async (
  translationId: string,
  setTranslationsStatus: (translations: TranslationsOffline) => void
) => {
  const translationsInitial = getTranslationsOffline();
  if (!["downloaded", "downloading"].includes(translationsInitial[translationId])) {
    translationsInitial[translationId] = "downloading";
    setTranslationsStatus(translationsInitial);

    const translationsToCompare = getTranslationsToCompare();
    translationsToCompare.push(translationId);
    setTranslationsToCompare(translationsToCompare);

    try {
      const [verses, books] = await Promise.all([
        // translation data
        api.getTranslationData(translationId),
        // books
        api.getBooks(translationId),
      ]);

      await Promise.all([
        // translation data
        idb.addAll("verses", verses),
        // books
        idb.addAll("books", books),
      ]);

      const translationsUpdated = getTranslationsOffline();
      translationsUpdated[translationId] = "downloaded";
      setTranslationsStatus(translationsUpdated);
    } catch (error) {
      const translationsUpdated = getTranslationsOffline();
      translationsUpdated[translationId] = "downloadFailed";
      setTranslationsStatus(translationsUpdated);

      translationsToCompare.splice(translationsToCompare.indexOf(translationId), 1);
      setTranslationsToCompare(translationsToCompare);
    }
  }
};

const deleteTranslation = async (
  translationId: string,
  setTranslationsStatus: (translations: TranslationsOffline) => void
) => {
  const translationsInitial = getTranslationsOffline();
  if (["downloaded", "downloadFailed", "deleteFailed"].includes(translationsInitial[translationId])) {
    translationsInitial[translationId] = "deleting";
    setTranslationsStatus(translationsInitial);

    const translationsToCompare = getTranslationsToCompare();
    translationsToCompare.splice(translationsToCompare.indexOf(translationId), 1);
    setTranslationsToCompare(translationsToCompare);

    try {
      await Promise.all([
        // translation data
        idb.delete("verses", "translationIndex", translationId),
        // books
        idb.delete("books", "translationIndex", translationId),
      ]);

      const translationsUpdated = getTranslationsOffline();
      delete translationsUpdated[translationId];
      setTranslationsStatus(translationsUpdated);
    } catch (error) {
      console.error(error);
      const translationsUpdated = getTranslationsOffline();
      translationsUpdated[translationId] = "deleteFailed";
      setTranslationsStatus(translationsUpdated);
    }
  }
};

const saveLanguages = async () => {
  const languages = await api.getLanguages();
  await idb.addAll("languages", languages);
  localStorage.setItem(KEY_LANGUAGES_SAVED, "true");
};

const getVerses = async (translation: string, book: number, chapter: number) => {
  return idb.getAll<Verse>("verses", "chapterIndex", [translation, book, chapter]);
};

const getVerse = async (translation: string, book: number, chapter: number, verse: number) => {
  return idb.get<Verse>("verses", [translation, book, chapter, verse]);
};

const getBooks = async (translation: string) => {
  return idb.getAll<Book>("books", "translationIndex", translation);
};

const getLanguages = async () => {
  return idb.getAll<Language>("languages");
};

const getTranslationsOffline = (): TranslationsOffline =>
  JSON.parse(localStorage.getItem(KEY_TRANSLATION_SAVED) || "{}");
const setTranslationsOffline = (item: TranslationsOffline) =>
  localStorage.setItem(KEY_TRANSLATION_SAVED, JSON.stringify(item));
const hasTranslationSaved = (translation: string): boolean => {
  return getTranslationsOffline()[translation] === "downloaded";
};
const hasLanguagesSaved = (): boolean => localStorage.getItem(KEY_LANGUAGES_SAVED) === "true";
const getTranslationsToCompare = (): string[] => {
  let translations: string[] = JSON.parse(localStorage.getItem(KEY_TRANSLATION_COMPARE) || "[]");
  if (translations.length === 0) {
    const offline = getTranslationsOffline();
    translations = Object.keys(offline).filter((key) => offline[key] === "downloaded");
    if (translations.length === 0) {
      translations.push(TRANSLATION_DEFAULT);
    }
    setTranslationsToCompare(translations);
  }
  return translations;
};
const setTranslationsToCompare = (translations: string[]) => {
  localStorage.setItem(KEY_TRANSLATION_COMPARE, JSON.stringify(translations));
};

const getDBInfo = () => {
  return idb.getIndexedDBInfo();
};

export const db = {
  saveTranslation,
  deleteTranslation,
  saveLanguages,
  getVerses,
  getVerse,
  getBooks,
  getLanguages,
  getTranslationsOffline,
  setTranslationsOffline,
  getTranslationsToCompare,
  setTranslationsToCompare,
  util: {
    hasTranslationSaved,
    hasLanguagesSaved,
  },
  getDBInfo,
};
