import { CopyVerseOptions } from "@/interfaces/CopyVerseOptions";
import { Book, Translation, Verse } from "@/services/api";

const versesToString = (
  verses: Verse[],
  options: CopyVerseOptions = { wrapText: true, withNumb: true, bookName: true }
) => {
  const els = verses.map((verse) => {
    const el = document.createElement("DIV");
    el.innerHTML = `${options.withNumb ? verse.verse + " " : ""}${verse.text}`;
    el.querySelectorAll("sup").forEach((sup) => el.removeChild(sup)); // NAA
    el.querySelectorAll("s").forEach((sup) => el.removeChild(sup)); // KJV
    return el;
  });

  return els
    .map((el) => ((el.innerText || el.textContent) ?? "").replace(/ {2}/g, " ").trim())
    .join(options.wrapText ? "\n" : " ");
};

const splitVerse = (verse: string): { bookId: number; chapter: number; verses: number[] } => {
  const bookId = +verse.split(":")[0];
  const chapter = +verse.split(":")[1];
  const verses = verse
    .split(":")[2]
    .split(",")
    .map((v) => +v);

  return { bookId, chapter, verses };
};

const formatVerseNumbers = (data: Verse[]): string => {
  const verses = data.map(({ verse }) => verse);
  if (verses.length === 0) return "";

  let result: string[] = [];
  let start = verses[0];

  for (let i = 1; i <= verses.length; i++) {
    if (verses[i] !== verses[i - 1] + 1) {
      if (start === verses[i - 1]) {
        result.push(`${start}`);
      } else {
        result.push(`${start}-${verses[i - 1]}`);
      }
      start = verses[i];
    }
  }

  return result.join(", ");
};

const formatVerseAddress = (book: Book, chapter: number, verses: Verse[], translation?: Translation | null) => {
  return `${book.name} ${chapter}:${formatVerseNumbers(verses ?? [])} ${translation?.short_name ?? ""}`;
};

export const bibleUtils = {
  versesToString,
  splitVerse,
  formatVerseNumbers,
  formatVerseAddress,
};
