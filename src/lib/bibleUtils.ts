import { Book, Translation, Verse } from "@/services/api";

const versesToString = (verses: Verse[]) => {
  const el = document.createElement("DIV");
  el.innerHTML = verses.map((verse) => verse.text).join(" ");
  el.querySelectorAll("sup").forEach((sup) => el.removeChild(sup)); // NAA
  el.querySelectorAll("s").forEach((sup) => el.removeChild(sup)); // KJV
  return ((el.innerText || el.textContent) ?? "").replace(/\n/g, " ").replace(/ {2}/g, " ").trim();
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
  formatVerseNumbers,
  formatVerseAddress,
};
