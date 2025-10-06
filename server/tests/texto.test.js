const path = require("path");
const { extraerTexto } = require("../utils/text.js");

test("extrae texto de archivo .txt", async () => {
  const filePath = path.join(__dirname, "archivos", "prueba.txt");
  const texto = await extraerTexto(filePath);
  expect(texto).toMatch(/Lorem ipsum/); // ajusta según el contenido real
});