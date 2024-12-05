import { KEY_LANGUAGES_SAVED, KEY_TRANSLATION_SAVED } from "@/constants/bible";
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
  util: {
    hasTranslationSaved,
    hasLanguagesSaved,
  },
  getDBInfo,
};
