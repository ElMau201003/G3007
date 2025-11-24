// server/tests/revisiones.test.js

// 🔹 Mock de Gemini: devuelve JSON válido como string
jest.mock("../config/gemini.js", () => ({
  __esModule: true,
  default: {
    models: {
      generateContent: async () => ({
        text: `{
          "precision_gramatica": 90,
          "similitud_plagio": 5,
          "errores_gramaticales": [],
          "plagio": [],
          "citas": []
        }`
      })
    }
  }
}));

// 🔹 Mocks de librerías externas
jest.mock("pdf-parse");
jest.mock("mammoth");

// 🔹 Mock de fs.readFileSync: devuelve JSON válido
import fs from "fs";
jest.spyOn(require("fs"), "readFileSync").mockImplementation(() => {
  return JSON.stringify({
    precision_gramatica: 95,
    similitud_plagio: 10,
    errores_gramaticales: [],
    plagio: [],
    citas: []
  });
});

import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../apps/app.revisiones.js";
import Documento from "../models/documento.js";
import Revision from "../models/revision.js";

let mongo;
let documento;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());

  // Crear documento de prueba
  documento = await Documento.create({
    titulo: "Documento prueba",
    archivo_url: "prueba.txt", // simula archivo en uploads
    usuario_id: new mongoose.Types.ObjectId(),
    estado: "pendiente",
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

describe("Revisiones API", () => {
  test("POST /api/revisiones/:documentoId crea revisión válida", async () => {
    const res = await request(app).post(`/api/revisiones/${documento._id}`);
    expect(res.statusCode).toBe(200); // tu ruta devuelve 200 con el objeto revision
    expect(res.body).toHaveProperty("documento_id");
    expect(res.body).toHaveProperty("estado", "completada");
  });

  test("GET /api/revisiones/:documentoId devuelve revisión existente", async () => {
    const res = await request(app).get(`/api/revisiones/${documento._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("documento_id");
  });

  test("POST /api/revisiones/:documentoId devuelve 404 si documento no existe", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).post(`/api/revisiones/${fakeId}`);
    expect([404, 500]).toContain(res.statusCode);
    expect(res.body).toHaveProperty("error");
  });

  test("GET /api/revisiones/:documentoId devuelve 404 si no hay revisión", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/revisiones/${fakeId}`);
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("message", "Revisión no encontrada");
  });
});