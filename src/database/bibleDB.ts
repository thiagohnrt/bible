import {
  KEY_LANGUAGES_SAVED,
  KEY_NEW_TRANSLATIONS_AVAILABLE,
  KEY_TRANSLATION_COMPARE,
  KEY_TRANSLATION_SAVED,
  KEY_TRANSLATIONS_AVAILABLE_VERIFIED,
  TRANSLATION_DEFAULT,
} from "@/constants/bible";
import { api, Book, Language, Story, Verse } from "@/services/api";
import { IDB } from "./indexedDB";
import { Available } from "@/interfaces/available";
import Cookies from "js-cookie";

export interface TranslationsOffline {
  [translation: string]: "downloading" | "downloaded" | "downloadFailed" | "deleting" | "deleteFailed";
}

export const idb = new IDB({
  name: "bible",
  version: 3,
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
    {
      name: "stories",
      keyPath: "id",
      autoIncrement: true,
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
      const [verses, books, stories] = await Promise.all([
        // translation data
        api.getTranslationData(translationId),
        // books
        api.getBooks(translationId),
        // Stories
        api.getStories(translationId),
      ]);

      await Promise.all([
        // translation data
        idb.addAll("verses", verses),
        // books
        idb.addAll("books", books),
        // stories
        idb.addAll("stories", stories),
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
        // stories
        idb.delete("stories", "translationIndex", translationId),
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
const updateLanguages = async (): Promise<boolean> => {
  if (Cookies.get(KEY_TRANSLATIONS_AVAILABLE_VERIFIED) === "true") {
    return false;
  }

  if (hasLanguagesSaved()) {
    const [oldData, newData] = await Promise.all([api.getLanguages("no"), api.getLanguages("yes")]);
    if (hasNewTranslationsAvailable(oldData, newData)) {
      await idb.deleteAll("languages");
      await idb.addAll("languages", newData);
    } else {
      return false;
    }
  } else {
    await saveLanguages();
  }

  Cookies.set(KEY_TRANSLATIONS_AVAILABLE_VERIFIED, "true", { expires: 1 });
  return true;
};

const hasNewTranslationsAvailable = (oldData: Language[], newData: Language[]): boolean => {
  const oldLanguagesIds = oldData.map(({ language }) => language);
  const newLanguagesAvailable = newData.filter(({ language }) => !oldLanguagesIds.includes(language));

  const allNewTranslations = newData
    .map((language) => language.translations.map((translation) => ({ ...translation, language: language.language })))
    .flat();
  const allOldTranslations = oldData
    .map((language) => language.translations.map((translation) => ({ ...translation, language: language.language })))
    .flat();

  const oldTranslationsIds = allOldTranslations.map(({ identifier }) => identifier);
  const newTranslationsAvailable = allNewTranslations.filter(
    ({ identifier }) => !oldTranslationsIds.includes(identifier)
  );

  const newAvailable: Available = {
    languages: newLanguagesAvailable.map(({ language }) => language),
    translations: newTranslationsAvailable.map(({ identifier, language }) => ({ identifier, language })),
  };

  if (newAvailable.languages.length || newAvailable.translations.length) {
    const oldAvailable: Available = JSON.parse(
      localStorage.getItem(KEY_NEW_TRANSLATIONS_AVAILABLE) ??
        JSON.stringify({ languages: [], translations: [] } as Available)
    );

    const oldLanguages = oldAvailable.languages || [];
    const oldTranslations = oldAvailable.translations || [];

    const storageAvailable: Available = {
      languages: [...oldLanguages, ...newAvailable.languages],
      translations: [...oldTranslations, ...newAvailable.translations],
    };

    localStorage.setItem(KEY_NEW_TRANSLATIONS_AVAILABLE, JSON.stringify(storageAvailable));
    return true;
  } else {
    return false;
  }
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

const getStories = async (translation: string) => {
  return idb.getAll<Story>("stories", "translationIndex", [translation]);
};
const getStoriesByChapter = async (translation: string, book: number, chapter: number) => {
  return idb.getAll<Story>("stories", "chapterIndex", [translation, book, chapter]);
};

const getTranslationsOffline = (): TranslationsOffline =>
  JSON.parse(localStorage.getItem(KEY_TRANSLATION_SAVED) ?? "{}");
const setTranslationsOffline = (item: TranslationsOffline) =>
  localStorage.setItem(KEY_TRANSLATION_SAVED, JSON.stringify(item));
const hasTranslationSaved = (translation: string): boolean => {
  return getTranslationsOffline()[translation] === "downloaded";
};
const hasLanguagesSaved = (): boolean => localStorage.getItem(KEY_LANGUAGES_SAVED) === "true";
const getTranslationsToCompare = (): string[] => {
  let translations: string[] = JSON.parse(localStorage.getItem(KEY_TRANSLATION_COMPARE) ?? "[]");
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
  updateLanguages,
  getVerses,
  getVerse,
  getBooks,
  getLanguages,
  getStories,
  getStoriesByChapter,
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
