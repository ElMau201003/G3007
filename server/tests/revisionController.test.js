const request = require("supertest");
const app = require("../server.js");

// Simula Gemini
jest.mock("../config/gemini.js", () => ({
  models: {
    generateContent: jest.fn().mockResolvedValue({
      text: `{
        "precision_gramatica": 90,
        "similitud_plagio": 10,
        "errores_gramaticales": [],
        "plagio": [],
        "citas": []
      }`,
    }),
  },
}));

test("POST /api/revisiones/:id crea revisión IA", async () => {
  const documentoId = "68e35c8fdbefe0b06331c8da"; // usa uno válido en tu BD
  const res = await request(app).post(`/api/revisiones/${documentoId}`);
  expect(res.statusCode).toBe(200);
  expect(res.body.estado).toBe("completada");
});