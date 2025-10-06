import request from "supertest";
import app from "../server.js"; // tu Express app

test("POST /api/revisiones/:id crea revisión IA", async () => {
  const documentoId = "68e35c8fdbefe0b06331c8da"; 
  const res = await request(app).post(`/api/revisiones/${documentoId}`);
  expect(res.statusCode).toBe(200);
  expect(res.body.estado).toBe("completada");
});
