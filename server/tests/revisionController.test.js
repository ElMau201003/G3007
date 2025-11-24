// server/tests/revisionController.test.js
import { analizarDocumento } from "../controllers/revisionController.js";
import Documento from "../models/documento.js";
import Revision from "../models/revision.js";
import axios from "axios";
import stringSimilarity from "string-similarity";

// Mocks
jest.mock("axios");
jest.mock("string-similarity");

jest.mock("../models/documento.js", () => ({
  __esModule: true,
  default: {
    findById: jest.fn(),
    find: jest.fn()
  }
}));

jest.mock("../models/revision.js", () => ({
  __esModule: true,
  default: jest.fn()
}));

describe("analizarDocumento", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("devuelve sin hacer nada si documento no existe", async () => {
    Documento.findById.mockResolvedValue(null);

    await analizarDocumento("fakeId");

    expect(Documento.findById).toHaveBeenCalled();
    expect(Revision).not.toHaveBeenCalled();
  });

  test("analiza documento con contenido y guarda revisión", async () => {
    Documento.findById.mockResolvedValue({
      _id: "doc1",
      titulo: "Doc prueba",
      contenido: "Texto con cita \"ejemplo\""
    });

    Documento.find.mockResolvedValue([
      { contenido: "otro texto", titulo: "Otro doc" }
    ]);

    axios.post.mockResolvedValue({
      data: { matches: [{ message: "Error gramatical", replacements: [{ value: "fix" }] }] }
    });

    stringSimilarity.compareTwoStrings.mockReturnValue(0.7);

    const saveMock = jest.fn();
    Revision.mockImplementation(() => ({ save: saveMock }));

    await analizarDocumento("doc1");

    expect(axios.post).toHaveBeenCalled();
    expect(stringSimilarity.compareTwoStrings).toHaveBeenCalled();
    expect(saveMock).toHaveBeenCalled();
  });

  test("maneja error y no revienta", async () => {
    Documento.findById.mockRejectedValue(new Error("DB error"));

    await analizarDocumento("doc1");

    // No lanza excepción, solo loguea
  });
});