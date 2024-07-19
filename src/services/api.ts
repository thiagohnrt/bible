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
  bookid: number;
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

async function apiBollsLife<T = any>(url: string): Promise<T> {
  const response = await fetch(`https://bolls.life${url}`);
  if (response.status === 200) {
    return await response.json();
  }
  throw new Error(response.statusText);
}

async function getLanguages() {
  return await apiBollsLife<Language[]>(
    "/static/bolls/app/views/languages.json"
  );
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

async function getBooks(version: string) {
  const versionBook = await apiBollsLife<VersionBook>(
    `/static/bolls/app/views/translations_books.json`
  );
  return versionBook[version];
}

async function getBook(version: string, bookid: number): Promise<Book> {
  const books = await getBooks(version);

  const getById = (id: number) => {
    return books.find((b) => b.bookid == id);
  };

  const book = getById(bookid)!;

  return {
    ...book,
    bookPrev: getById(+bookid - 1),
    bookNext: getById(+bookid + 1),
  };
}

async function getVerses(version: string, bookid: number, chapter: number) {
  return await apiBollsLife<Verse[]>(
    `/get-chapter/${version}/${bookid}/${chapter}`
  );
}
async function getVerse(
  version: string,
  bookid: number,
  chapter: number,
  verse: number
) {
  return await apiBollsLife<Verse>(
    `/get-verse/${version}/${bookid}/${chapter}/${verse}`
  );
}

export const api = {
  getLanguages,
  getTranslation,
  getBooks,
  getBook,
  getVerses,
  getVerse,
};
