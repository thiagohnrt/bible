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
    switch (book.book) {
      case 1:
        book.name = "Gênesis";
        break;
      case 2:
        book.name = "Êxodo";
        break;
      case 3:
        book.name = "Levítico";
        break;
      case 4:
        book.name = "Números";
        break;
      case 5:
        book.name = "Deuteronômio";
        break;
      case 6:
        book.name = "Josué";
        break;
      case 7:
        book.name = "Juízes";
        break;
      case 8:
        book.name = "Rute";
        break;
      case 9:
        book.name = "1 Samuel";
        break;
      case 10:
        book.name = "2 Samuel";
        break;
      case 11:
        book.name = "1 Reis";
        break;
      case 12:
        book.name = "2 Reis";
        break;
      case 13:
        book.name = "1 Crônicas";
        break;
      case 14:
        book.name = "2 Crônicas";
        break;
      case 15:
        book.name = "Esdras";
        break;
      case 16:
        book.name = "Neemias";
        break;
      case 17:
        book.name = "Ester";
        break;
      case 18:
        book.name = "Jó";
        break;
      case 19:
        book.name = "Salmos";
        break;
      case 20:
        book.name = "Provérbios";
        break;
      case 21:
        book.name = "Eclesiastes";
        break;
      case 22:
        book.name = "Cânticos";
        break;
      case 23:
        book.name = "Isaías";
        break;
      case 24:
        book.name = "Jeremias";
        break;
      case 25:
        book.name = "Lamentações";
        break;
      case 26:
        book.name = "Ezequiel";
        break;
      case 27:
        book.name = "Daniel";
        break;
      case 28:
        book.name = "Oséias";
        break;
      case 29:
        book.name = "Joel";
        break;
      case 30:
        book.name = "Amós";
        break;
      case 31:
        book.name = "Obadias";
        break;
      case 32:
        book.name = "Jonas";
        break;
      case 33:
        book.name = "Miqueias";
        break;
      case 34:
        book.name = "Naum";
        break;
      case 35:
        book.name = "Habacuque";
        break;
      case 36:
        book.name = "Sofonias";
        break;
      case 37:
        book.name = "Ageu";
        break;
      case 38:
        book.name = "Zacarias";
        break;
      case 39:
        book.name = "Malaquias";
        break;
      case 40:
        book.name = "Mateus";
        break;
      case 41:
        book.name = "Marcos";
        break;
      case 42:
        book.name = "Lucas";
        break;
      case 43:
        book.name = "João";
        break;
      case 44:
        book.name = "Atos";
        break;
      case 45:
        book.name = "Romanos";
        break;
      case 46:
        book.name = "1 Coríntios";
        break;
      case 47:
        book.name = "2 Coríntios";
        break;
      case 48:
        book.name = "Gálatas";
        break;
      case 49:
        book.name = "Efésios";
        break;
      case 50:
        book.name = "Filipenses";
        break;
      case 51:
        book.name = "Colossenses";
        break;
      case 52:
        book.name = "1 Tessalonicenses";
        break;
      case 53:
        book.name = "2 Tessalonicenses";
        break;
      case 54:
        book.name = "1 Timóteo";
        break;
      case 55:
        book.name = "2 Timóteo";
        break;
      case 56:
        book.name = "Tito";
        break;
      case 57:
        book.name = "Filemom";
        break;
      case 58:
        book.name = "Hebreus";
        break;
      case 59:
        book.name = "Tiago";
        break;
      case 60:
        book.name = "1 Pedro";
        break;
      case 61:
        book.name = "2 Pedro";
        break;
      case 62:
        book.name = "1 João";
        break;
      case 63:
        book.name = "2 João";
        break;
      case 64:
        book.name = "3 João";
        break;
      case 65:
        book.name = "Judas";
        break;
      case 66:
        book.name = "Apocalipse";
        break;
      default:
        book.name = "Desconhecido";
    }
  }
  return book;
};
