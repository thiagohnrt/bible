export interface Version {
  short: string;
  name: string;
}

export interface Book {
  abbrev: {
    pt: string;
    en: string;
  };
  author: string;
  chapters: number;
  group: string;
  name: string;
  testament: string;
}

export interface Chapter {
  book: {
    abbrev: {
      pt: string;
      en: string;
    };
    name: string;
    author: string;
    group: string;
    version: string;
  };
  chapter: {
    number: number;
    verses: number;
  };
  verses: [
    {
      number: number;
      text: string;
    }
  ];
}

export interface Verse {
  book: {
    abbrev: {
      pt: string;
      en: string;
    };
    name: string;
    author: string;
    group: string;
    version: string;
  };
  chapter: number;
  number: number;
  text: string;
}

const baseUrl = "https://www.abibliadigital.com.br/api";

async function request<T = any>(url: string): Promise<T> {
  const response = await fetch(`${baseUrl}/${url}`, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHIiOiJXZWQgSnVuIDA1IDIwMjQgMjA6NTg6MjQgR01UKzAwMDAudGhpYWdvaGJob25vcmF0b0BnbWFpbC5jb20iLCJpYXQiOjE3MTc2MjExMDR9.VQmOzeIEbSRGOivhzw3yKyv5YlMrLkjv4lQanXxHeFc",
    },
  });
  if (response.status === 200) {
    return await response.json();
  }
  throw new Error(response.statusText);
}

async function getVersions(): Promise<Version[]> {
  return [
    { short: "nvi", name: "Nova Versão Internacional" },
    { short: "acf", name: "Almeida Corrigida Fiel" },
  ];
}

async function getBooks() {
  return await request<Book[]>("books");
}

async function getBook(abbrev: string) {
  return await request<Book>(`books/${abbrev}`);
}

async function getChapter(version: string, abbrev: string, chapter: number) {
  return await request<Chapter>(`verses/${version}/${abbrev}/${chapter}`);
}
async function getVerse(
  version: string,
  abbrev: string,
  chapter: number,
  verse: number
) {
  return await request<Verse>(
    `verses/${version}/${abbrev}/${chapter}/${verse}`
  );
}

export const api = {
  getVersions,
  getBooks,
  getBook,
  getChapter,
  getVerse,
};
