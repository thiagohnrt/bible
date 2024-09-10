const writeText = async (text: string) => {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error("Erro ao copiar o texto: ", error);
    }
  } else {
    alert("Este navegador não suporta a Clipboard API.");
  }
};

export const clipboard = {
  writeText,
};
