console.log("📄 Usando mock de mammoth");

export default {
  extractRawText: async () => {
    console.log("📄 mammoth mock: devolviendo texto simulado");
    return { value: "Texto simulado de DOCX" };
  }
};