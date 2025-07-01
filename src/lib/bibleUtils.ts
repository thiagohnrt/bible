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

const formatHistoryDate = (dateStr?: string) => {
  if (!dateStr) return "Data desconhecida";
  const date = new Date(dateStr);
  const now = new Date();

  // Zera horas para comparar apenas datas
  const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const nowOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const diffDays = Math.floor((nowOnly.getTime() - dateOnly.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Hoje";
  if (diffDays === 1) return "Ontem";

  const weekDays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

  if (diffDays < 7) {
    return weekDays[date.getDay()];
  }

  // Ex: 23 de jun.
  return `${date.getDate()} de ${date.toLocaleString("pt-BR", { month: "short" })}`;
};

export const bibleUtils = {
  versesToString,
  splitVerse,
  formatVerseNumbers,
  formatVerseAddress,
  formatHistoryDate,
};
