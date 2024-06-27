import { Chapters } from "./Chapters";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export default function Books() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {bibleBooks.map((book, index) => {
        return (
          <AccordionItem
            value={"item-" + index}
            key={index}
            className="border-none"
          >
            <AccordionTrigger>{book.name}</AccordionTrigger>
            <AccordionContent>
              <Chapters total={book.chapters} />
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

interface Book {
  number: number;
  name: string;
  abbreviation: string;
  testament: string;
  chapters: number;
}

const bibleBooks: Book[] = [
  {
    number: 1,
    name: "Gênesis",
    abbreviation: "Gn",
    testament: "Old",
    chapters: 50,
  },
  {
    number: 2,
    name: "Êxodo",
    abbreviation: "Êx",
    testament: "Old",
    chapters: 40,
  },
  {
    number: 3,
    name: "Levítico",
    abbreviation: "Lv",
    testament: "Old",
    chapters: 27,
  },
  {
    number: 4,
    name: "Números",
    abbreviation: "Nm",
    testament: "Old",
    chapters: 36,
  },
  {
    number: 5,
    name: "Deuteronômio",
    abbreviation: "Dt",
    testament: "Old",
    chapters: 34,
  },
  {
    number: 6,
    name: "Josué",
    abbreviation: "Js",
    testament: "Old",
    chapters: 24,
  },
  {
    number: 7,
    name: "Juízes",
    abbreviation: "Jz",
    testament: "Old",
    chapters: 21,
  },
  {
    number: 8,
    name: "Rute",
    abbreviation: "Rt",
    testament: "Old",
    chapters: 4,
  },
  {
    number: 9,
    name: "1 Samuel",
    abbreviation: "1Sm",
    testament: "Old",
    chapters: 31,
  },
  {
    number: 10,
    name: "2 Samuel",
    abbreviation: "2Sm",
    testament: "Old",
    chapters: 24,
  },
  {
    number: 11,
    name: "1 Reis",
    abbreviation: "1Rs",
    testament: "Old",
    chapters: 22,
  },
  {
    number: 12,
    name: "2 Reis",
    abbreviation: "2Rs",
    testament: "Old",
    chapters: 25,
  },
  {
    number: 13,
    name: "1 Crônicas",
    abbreviation: "1Cr",
    testament: "Old",
    chapters: 29,
  },
  {
    number: 14,
    name: "2 Crônicas",
    abbreviation: "2Cr",
    testament: "Old",
    chapters: 36,
  },
  {
    number: 15,
    name: "Esdras",
    abbreviation: "Ed",
    testament: "Old",
    chapters: 10,
  },
  {
    number: 16,
    name: "Neemias",
    abbreviation: "Ne",
    testament: "Old",
    chapters: 13,
  },
  {
    number: 17,
    name: "Ester",
    abbreviation: "Et",
    testament: "Old",
    chapters: 10,
  },
  {
    number: 18,
    name: "Jó",
    abbreviation: "Jó",
    testament: "Old",
    chapters: 42,
  },
  {
    number: 19,
    name: "Salmos",
    abbreviation: "Sl",
    testament: "Old",
    chapters: 150,
  },
  {
    number: 20,
    name: "Provérbios",
    abbreviation: "Pv",
    testament: "Old",
    chapters: 31,
  },
  {
    number: 21,
    name: "Eclesiastes",
    abbreviation: "Ec",
    testament: "Old",
    chapters: 12,
  },
  {
    number: 22,
    name: "Cânticos",
    abbreviation: "Ct",
    testament: "Old",
    chapters: 8,
  },
  {
    number: 23,
    name: "Isaías",
    abbreviation: "Is",
    testament: "Old",
    chapters: 66,
  },
  {
    number: 24,
    name: "Jeremias",
    abbreviation: "Jr",
    testament: "Old",
    chapters: 52,
  },
  {
    number: 25,
    name: "Lamentações",
    abbreviation: "Lm",
    testament: "Old",
    chapters: 5,
  },
  {
    number: 26,
    name: "Ezequiel",
    abbreviation: "Ez",
    testament: "Old",
    chapters: 48,
  },
  {
    number: 27,
    name: "Daniel",
    abbreviation: "Dn",
    testament: "Old",
    chapters: 12,
  },
  {
    number: 28,
    name: "Oséias",
    abbreviation: "Os",
    testament: "Old",
    chapters: 14,
  },
  {
    number: 29,
    name: "Joel",
    abbreviation: "Jl",
    testament: "Old",
    chapters: 3,
  },
  {
    number: 30,
    name: "Amós",
    abbreviation: "Am",
    testament: "Old",
    chapters: 9,
  },
  {
    number: 31,
    name: "Obadias",
    abbreviation: "Ob",
    testament: "Old",
    chapters: 1,
  },
  {
    number: 32,
    name: "Jonas",
    abbreviation: "Jn",
    testament: "Old",
    chapters: 4,
  },
  {
    number: 33,
    name: "Miquéias",
    abbreviation: "Mq",
    testament: "Old",
    chapters: 7,
  },
  {
    number: 34,
    name: "Naum",
    abbreviation: "Na",
    testament: "Old",
    chapters: 3,
  },
  {
    number: 35,
    name: "Habacuque",
    abbreviation: "Hc",
    testament: "Old",
    chapters: 3,
  },
  {
    number: 36,
    name: "Sofonias",
    abbreviation: "Sf",
    testament: "Old",
    chapters: 3,
  },
  {
    number: 37,
    name: "Ageu",
    abbreviation: "Ag",
    testament: "Old",
    chapters: 2,
  },
  {
    number: 38,
    name: "Zacarias",
    abbreviation: "Zc",
    testament: "Old",
    chapters: 14,
  },
  {
    number: 39,
    name: "Malaquias",
    abbreviation: "Ml",
    testament: "Old",
    chapters: 4,
  },
  {
    number: 40,
    name: "Mateus",
    abbreviation: "Mt",
    testament: "New",
    chapters: 28,
  },
  {
    number: 41,
    name: "Marcos",
    abbreviation: "Mc",
    testament: "New",
    chapters: 16,
  },
  {
    number: 42,
    name: "Lucas",
    abbreviation: "Lc",
    testament: "New",
    chapters: 24,
  },
  {
    number: 43,
    name: "João",
    abbreviation: "Jo",
    testament: "New",
    chapters: 21,
  },
  {
    number: 44,
    name: "Atos",
    abbreviation: "At",
    testament: "New",
    chapters: 28,
  },
  {
    number: 45,
    name: "Romanos",
    abbreviation: "Rm",
    testament: "New",
    chapters: 16,
  },
  {
    number: 46,
    name: "1 Coríntios",
    abbreviation: "1Co",
    testament: "New",
    chapters: 16,
  },
  {
    number: 47,
    name: "2 Coríntios",
    abbreviation: "2Co",
    testament: "New",
    chapters: 13,
  },
  {
    number: 48,
    name: "Gálatas",
    abbreviation: "Gl",
    testament: "New",
    chapters: 6,
  },
  {
    number: 49,
    name: "Efésios",
    abbreviation: "Ef",
    testament: "New",
    chapters: 6,
  },
  {
    number: 50,
    name: "Filipenses",
    abbreviation: "Fp",
    testament: "New",
    chapters: 4,
  },
  {
    number: 51,
    name: "Colossenses",
    abbreviation: "Cl",
    testament: "New",
    chapters: 4,
  },
  {
    number: 52,
    name: "1 Tessalonicenses",
    abbreviation: "1Ts",
    testament: "New",
    chapters: 5,
  },
  {
    number: 53,
    name: "2 Tessalonicenses",
    abbreviation: "2Ts",
    testament: "New",
    chapters: 3,
  },
  {
    number: 54,
    name: "1 Timóteo",
    abbreviation: "1Tm",
    testament: "New",
    chapters: 6,
  },
  {
    number: 55,
    name: "2 Timóteo",
    abbreviation: "2Tm",
    testament: "New",
    chapters: 4,
  },
  {
    number: 56,
    name: "Tito",
    abbreviation: "Tt",
    testament: "New",
    chapters: 3,
  },
  {
    number: 57,
    name: "Filemom",
    abbreviation: "Fm",
    testament: "New",
    chapters: 1,
  },
  {
    number: 58,
    name: "Hebreus",
    abbreviation: "Hb",
    testament: "New",
    chapters: 13,
  },
  {
    number: 59,
    name: "Tiago",
    abbreviation: "Tg",
    testament: "New",
    chapters: 5,
  },
  {
    number: 60,
    name: "1 Pedro",
    abbreviation: "1Pe",
    testament: "New",
    chapters: 5,
  },
  {
    number: 61,
    name: "2 Pedro",
    abbreviation: "2Pe",
    testament: "New",
    chapters: 3,
  },
  {
    number: 62,
    name: "1 João",
    abbreviation: "1Jo",
    testament: "New",
    chapters: 5,
  },
  {
    number: 63,
    name: "2 João",
    abbreviation: "2Jo",
    testament: "New",
    chapters: 1,
  },
  {
    number: 64,
    name: "3 João",
    abbreviation: "3Jo",
    testament: "New",
    chapters: 1,
  },
  {
    number: 65,
    name: "Judas",
    abbreviation: "Jd",
    testament: "New",
    chapters: 1,
  },
  {
    number: 66,
    name: "Apocalipse",
    abbreviation: "Ap",
    testament: "New",
    chapters: 22,
  },
];
