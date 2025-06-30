import * as bolls from "@/custom/bolls";
import { db } from "@/database/bibleDB";

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
  book: number;
  chapter: number;
  verse: number;
  text: string;
  comment?: string;
}

export interface Story {
  translation: string;
  book: number;
  chapter: number;
  verse: number;
  order_if_several: number;
  title: string;
}

async function apiBible<T = any>(path: string): Promise<T> {
  const response = await fetch(`/api/bible?path=${path}`);
  if (response.status === 200) {
    return await response.json();
  }
  throw new Error(response.statusText);
}

async function getLanguages(force: "yes" | "no" = "no"): Promise<Language[]> {
  if (db.util.hasLanguagesSaved() && force === "no") {
    return await db.getLanguages();
  } else {
    const languages = await apiBible<Language[]>("/static/bolls/app/views/languages.json");
    return languages.map((language) => {
      return {
        ...language,
        translations: language.translations.map((translation) => bolls.translation(translation)),
      };
    });
  }
}

async function getTranslationData(translationId: string): Promise<Verse[]> {
  return await apiBible<Verse[]>(`/static/translations/${translationId}.json`);
}

async function getBooks(translationId: string): Promise<Book[]> {
  return getBooks2([translationId]);
}

async function getBooks2(translationsId: string[]): Promise<Book[]> {
  let booksOnline: TranslationBook | null = null;
  const booksReturned: Book[] = [];

  const fetchBooks = async () => {
    if (!booksOnline) {
      booksOnline = await apiBible<TranslationBook>(`/static/bolls/app/views/translations_books.json`);
    }
    return booksOnline;
  };

  for (const translationId of translationsId) {
    if (db.util.hasTranslationSaved(translationId)) {
      booksReturned.push(...(await db.getBooks(translationId)));
    } else {
      const [translationBook, languages] = await Promise.all([fetchBooks(), getLanguages()]);

      const language = languages.find((language) =>
        language.translations.some((trns) => trns.identifier === translationId)
      )!;

      const books = translationBook[translationId].map<Book>((bookData: any) => ({
        ...bookData,
        book: bookData.bookid,
        translation: translationId,
        language: language.language,
      }));

      booksReturned.push(...books.map((book) => bolls.book(book)));
    }
  }
  return booksReturned;
}

async function getVerses(translationId: string, book: number, chapter: number) {
  let verses: Verse[] = [];
  if (db.util.hasTranslationSaved(translationId)) {
    verses = await db.getVerses(translationId, +book, +chapter);
  } else {
    verses = await apiBible<Verse[]>(`/get-chapter/${translationId}/${book}/${chapter}`);
  }
  return verses.map((v) => ({ ...v, book, chapter }));
}
async function getVerse(translationId: string, book: number, chapter: number, verse: number) {
  if (db.util.hasTranslationSaved(translationId)) {
    return await db.getVerse(translationId, +book, +chapter, +verse);
  } else {
    return await apiBible<Verse>(`/get-verse/${translationId}/${book}/${chapter}/${verse}`);
  }
}

async function getStories(translationId: string) {
  if (db.util.hasTranslationSaved(translationId)) {
    return await db.getStories(translationId);
  }
  const response = await fetch(`/api/stories/${translationId}`);
  if (response.status === 200) {
    return (await response.json()) as Story[];
  }
  throw new Error(response.statusText);
}

async function getStoriesByChapter(translationId: string, book: number, chapter: number) {
  if (db.util.hasTranslationSaved(translationId)) {
    return await db.getStoriesByChapter(translationId, +book, +chapter);
  }
  const response = await fetch(`/api/stories/${translationId}/${book}/${chapter}`);
  if (response.status === 200) {
    return (await response.json()) as Story[];
  }
  throw new Error(response.statusText);
}

export const api = {
  getLanguages,
  getTranslationData,
  getBooks,
  getBooks2,
  getVerses,
  getVerse,
  getStories,
  getStoriesByChapter,
};
