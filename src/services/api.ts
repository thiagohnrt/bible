import { db } from "@/database/bibleDB";
import * as bolls from "@/custom/bolls";

export interface Translation {
  identifier: string;
  short_name: string;
  full_name: string;
  dir?: "rlt";
}

export interface Language {
  language: string;
  translations: Translation[];
}

export interface TranslationBook {
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

async function getLanguages(): Promise<Language[]> {
  const languages = await (async () => {
    if (db.util.hasLanguagesSaved()) {
      return await db.getLanguages();
    } else {
      return await apiBible<Language[]>("/static/bolls/app/views/languages.json");
    }
  })();

  return languages.map((language) => {
    return {
      ...language,
      translations: language.translations.map((translation) => bolls.translation(translation)),
    };
  });
}

async function getTranslations(): Promise<Translation[]> {
  return (await getLanguages()).map((l) => l.translations).flat();
}

async function getTranslation(translationId: string): Promise<Translation> {
  const languages = await getLanguages();
  let translation: Translation;
  languages.some((language) => {
    return language.translations.some((trltn) => {
      translation = trltn;
      return trltn.identifier === translationId;
    });
  });
  return translation!;
}

async function getTranslationData(translationId: string): Promise<Verse[]> {
  return await apiBible<Verse[]>(`/static/translations/${translationId}.json`);
}

async function getBooks(translationId: string): Promise<Book[]> {
  const books = await (async () => {
    if (db.util.hasTranslationSaved(translationId)) {
      return await db.getBooks(translationId);
    } else {
      const [translationBook, languages] = await Promise.all([
        apiBible<TranslationBook>(`/static/bolls/app/views/translations_books.json`),
        getLanguages(),
      ]);
      const language = languages.find((language) =>
        language.translations.some((trns) => trns.identifier === translationId)
      )!;
      return translationBook[translationId].map<Book>((bookData: any) => ({
        ...bookData,
        book: bookData.bookid,
        translation: translationId,
        language: language.language,
      }));
    }
  })();

  return books.map((book) => bolls.book(book));
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

async function getVerses(translationId: string, book: number, chapter: number) {
  if (db.util.hasTranslationSaved(translationId)) {
    return await db.getVerses(translationId, +book, +chapter);
  } else {
    return await apiBible<Verse[]>(`/get-chapter/${translationId}/${book}/${chapter}`);
  }
}
async function getVerse(translationId: string, book: number, chapter: number, verse: number) {
  if (db.util.hasTranslationSaved(translationId)) {
    return await db.getVerse(translationId, +book, +chapter, +verse);
  } else {
    return await apiBible<Verse>(`/get-verse/${translationId}/${book}/${chapter}/${verse}`);
  }
}

export const api = {
  getLanguages,
  getTranslations,
  getTranslation,
  getTranslationData,
  getBooks,
  getBook,
  getVerses,
  getVerse,
};
