import { BOOKS } from "@/constants/bible";
import { Book, Translation } from "@/services/api";

export const translation = (trns: Translation): Translation => {
  const translation = structuredClone(trns);
  translation.identifier = `${translation.short_name}`;
  if (translation.short_name === "NVIPT") {
    translation.short_name = "NVI";
  } else if (translation.short_name === "ARA") {
    translation.full_name = "Almeida Revista e Atualizada";
  } else if (translation.short_name === "NVT") {
    translation.full_name = "Nova Versão Transformadora";
  } else if (translation.short_name === "NTLH") {
    translation.full_name = "Nova Tradução na Linguagem de Hoje";
  } else if (translation.short_name === "NAA") {
    translation.full_name = "Nova Almeida Atualizada";
  } else if (translation.short_name === "KJA") {
    translation.full_name = "King James Atualizada";
  } else if (translation.short_name === "NBV07") {
    translation.short_name = "NBV-P";
    translation.full_name = "Nova Bíblia Viva";
  } else if (translation.short_name === "TB10") {
    translation.short_name = "TB";
    translation.full_name = "Tradução Brasileira";
  }
  return translation;
};

export const book = (bk: Book): Book => {
  const book = structuredClone(bk);
  if (book.language === "Portuguese") {
    book.name = BOOKS[book.book - 1] ?? "Desconhecido";
  }
  return book;
};
