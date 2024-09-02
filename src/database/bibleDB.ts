import { api, Book, Language, Verse } from "@/services/api";
import { IDB } from "./indexedDB";
import { KEY_LANGUAGES_SAVED, KEY_TRANSLATION_SAVED } from "@/constants/bible";

interface TranslationsSaved {
  [translation: string]: "pending" | "done";
}

export const idb = new IDB({
  name: "bible",
  version: 1,
  stores: [
    {
      name: "verses",
      keyPath: ["translation", "book", "chapter", "verse"],
      indexs: [
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

const saveTranslation = async (translation: string) => {
  const translationsInitial = getTranslations();
  if (!translationsInitial[translation]) {
    translationsInitial[translation] = "pending";
    setTranslations(translationsInitial);

    const [verses, books] = await Promise.all([
      // translation data
      api.getTranslationData(translation),
      // books
      api.getBooks(translation),
    ]);

    await Promise.all([
      // translation data
      idb.addAll("verses", verses),
      // books
      idb.addAll("books", books),
    ]);

    const translationsUpdated = getTranslations();
    translationsUpdated[translation] = "done";
    setTranslations(translationsUpdated);
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

const getTranslations = (): TranslationsSaved => JSON.parse(localStorage.getItem(KEY_TRANSLATION_SAVED) || "{}");
const setTranslations = (item: TranslationsSaved) => localStorage.setItem(KEY_TRANSLATION_SAVED, JSON.stringify(item));
const hasTranslationSaved = (translation: string): boolean => {
  return getTranslations()[translation] === "done";
};
const hasLanguagesSaved = (): boolean => localStorage.getItem(KEY_LANGUAGES_SAVED) === "true";

export const db = {
  saveTranslation,
  saveLanguages,
  getVerses,
  getVerse,
  getBooks,
  getLanguages,
  getTranslationsSaved: getTranslations,
  util: {
    hasTranslationSaved,
    hasLanguagesSaved,
  },
};
