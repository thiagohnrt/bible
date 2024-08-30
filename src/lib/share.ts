export const share = async (data: ShareData) => {
  if (navigator.share) {
    try {
      await navigator.share(data);
    } catch (error) {
      console.error("Erro ao compartilhar:", error);
    }
  } else {
    alert("Este navegador não suporta a API de Web Share.");
  }
};
