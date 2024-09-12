import { db } from "@/database/bibleDB";

export interface Translation {
  short_name: string;
  full_name: string;
  dir?: "rlt";
}

export interface Language {
  language: string;
  translations: Translation[];
}

export interface VersionBook {
  [version: string]: Book[];
}

export interface Book {
  language: string;
  translation: string;
  book: number;
  name: string;
  chronorder: number;
  chapters: number;
  bookPrev?: Book;
  bookNext?: Book;
}

export interface Verse {
  pk: number;
  verse: number;
  text: string;
  comment?: string;
}

async function apiBible<T = any>(path: string): Promise<T> {
  const response = await fetch(`/api/bible?path=${path}`);
  if (response.status === 200) {
    return await response.json();
  }
  throw new Error(response.statusText);
}

async function getLanguages() {
  if (db.util.hasLanguagesSaved()) {
    return await db.getLanguages();
  } else {
    return await apiBible<Language[]>("/static/bolls/app/views/languages.json");
  }
}

async function getTranslation(version: string): Promise<Translation> {
  const languages = await getLanguages();
  let translation: Translation;
  languages.some((language) => {
    return language.translations.some((trltn) => {
      translation = trltn;
      return trltn.short_name === version;
    });
  });
  return translation!;
}

async function getTranslationData(version: string): Promise<Verse[]> {
  return await apiBible<Verse[]>(`/static/translations/${version}.json`);
}

async function getBooks(translation: string): Promise<Book[]> {
  if (db.util.hasTranslationSaved(translation)) {
    return await db.getBooks(translation);
  } else {
    const [versionBook, languages] = await Promise.all([
      apiBible<VersionBook>(`/static/bolls/app/views/translations_books.json`),
      getLanguages(),
    ]);
    const language = languages.find((language) =>
      language.translations.some((trns) => trns.short_name === translation)
    )!;
    return versionBook[translation].map<Book>((bookData: any) => ({
      ...bookData,
      book: bookData.bookid,
      translation,
      language: language.language,
    }));
  }
}

async function getBook(version: string, book: number): Promise<Book> {
  const books = await getBooks(version);

  const getById = (id: number) => {
    return books.find((b) => b.book == id);
  };

  const bookData = getById(book)!;

  return {
    ...bookData,
    bookPrev: getById(+book - 1),
    bookNext: getById(+book + 1),
  };
}

async function getVerses(translation: string, book: number, chapter: number) {
  if (db.util.hasTranslationSaved(translation)) {
    return await db.getVerses(translation, +book, +chapter);
  } else {
    return await apiBible<Verse[]>(`/get-chapter/${translation}/${book}/${chapter}`);
  }
}
async function getVerse(translation: string, book: number, chapter: number, verse: number) {
  if (db.util.hasTranslationSaved(translation)) {
    return await db.getVerse(translation, +book, +chapter, +verse);
  } else {
    return await apiBible<Verse>(`/get-verse/${translation}/${book}/${chapter}/${verse}`);
  }
}

export const api = {
  getLanguages,
  getTranslation,
  getTranslationData,
  getBooks,
  getBook,
  getVerses,
  getVerse,
};
