import { api, Book, Language, Verse } from "@/services/api";
import { IDB } from "./indexedDB";

const TRANSLATION_SAVED = "translations_saved";
const LANGUAGES_SAVED = "languages_saved";
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
  localStorage.setItem(LANGUAGES_SAVED, "true");
};

const getVerses = async (translation: string, book: number, chapter: number) => {
  return idb.getAll<Verse>("verses", "chapterIndex", [translation, book, chapter]);
};

const getBooks = async (translation: string) => {
  return idb.getAll<Book>("books", "translationIndex", translation);
};

const getLanguages = async () => {
  return idb.getAll<Language>("languages");
};

const getTranslations = (): TranslationsSaved => JSON.parse(localStorage.getItem(TRANSLATION_SAVED) || "{}");
const setTranslations = (item: TranslationsSaved) => localStorage.setItem(TRANSLATION_SAVED, JSON.stringify(item));
const hasTranslationSaved = (translation: string): boolean => {
  return getTranslations()[translation] === "done";
};
const hasLanguagesSaved = (): boolean => localStorage.getItem(LANGUAGES_SAVED) === "true";

export const db = {
  saveTranslation,
  saveLanguages,
  getVerses,
  getBooks,
  getLanguages,
  getTranslationsSaved: getTranslations,
  util: {
    hasTranslationSaved,
    hasLanguagesSaved,
  },
};
