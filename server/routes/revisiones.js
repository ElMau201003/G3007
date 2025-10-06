import express from "express";
import fs from "fs";
import path from "path";
import Revision from "../models/revision.js";
import ai from "../config/gemini.js";
import mammoth from "mammoth";
import { createRequire } from "module";
import mongoose from "mongoose";


const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");
const router = express.Router();

async function extraerTexto(filePath) {
  const ext = path.extname(filePath).toLowerCase();

  if (ext === ".pdf") {
    const buffer = fs.readFileSync(filePath);
    const data = await pdfParse(buffer);
    return data.text;
  }

  if (ext === ".docx") {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  }

  if (ext === ".txt") {
    return fs.readFileSync(filePath, "utf8");
  }

  return "";
}

// 🔹 Crear o devolver revisión IA
router.post("/:documentoId", async (req, res) => {
  try {
    const { documentoId } = req.params;

    // Si ya existe una revisión, la devolvemos
    let revision = await Revision.findOne({ documento_id: documentoId });
    if (revision) return res.json(revision);

    // 🔸 Buscar el documento
    const documento = await import("../models/documento.js").then(m => m.default.findById(documentoId));
    if (!documento) return res.status(404).json({ error: "Documento no encontrado" });

    const filePath = path.join("uploads", path.basename(documento.archivo_url));
    const texto = await extraerTexto(filePath);

    if (!texto || texto.trim().length === 0) {
      return res.status(400).json({ error: "No se pudo extraer texto del archivo" });
    }

    // 🔸 Pedir análisis a Gemini
    const prompt = `
Eres un asistente académico que revisa textos en español.
Analiza el siguiente texto y devuelve los siguientes campos en JSON:
{
  "precision_gramatica": "número del 0 al 100",
  "similitud_plagio": "número del 0 al 100",
  "errores_gramaticales": ["lista de errores encontrados"],
  "plagio": ["frases o coincidencias sospechosas"],
  "citas": ["citas o referencias identificadas (APA, IEEE, etc.)"]
}

Texto a analizar:
"""${texto.slice(0, 10000)}"""
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const output = response.text;

    // Intentamos parsear el JSON
    let analisis;
    try {
      // Buscar la primera { y la última } para extraer solo JSON
      const jsonStart = output.indexOf("{");
      const jsonEnd = output.lastIndexOf("}") + 1;
      const jsonString = output.slice(jsonStart, jsonEnd);

      analisis = JSON.parse(jsonString);
    } catch (e) {
      console.error("Error al parsear respuesta:", output, e);
        // Fallback por si falla
        analisis = {
        precision_gramatica: 85,
        similitud_plagio: 10,
        errores_gramaticales: ["Error al procesar IA"],
        plagio: [],
        citas: [],
      };
    }


    // 🔹 Crear la revisión real
    revision = new Revision({
      documento_id: new mongoose.Types.ObjectId(documentoId),
      fecha_inicio: new Date(),
      fecha_fin: new Date(),
      precision_gramatica: analisis.precision_gramatica,
      similitud_plagio: analisis.similitud_plagio,
      errores_gramaticales: analisis.errores_gramaticales,
      plagio: analisis.plagio,
      citas: analisis.citas,
      estado: "completada",
    });
    console.log("Creando revisión para documento:", documentoId);

    await revision.save();
    res.json(revision);
  } catch (error) {
    console.error("Error en revisión IA:", error);
    res.status(500).json({ error: "Error al procesar revisión IA" });
  }
});

router.get("/:documentoId", async (req, res) => {
  try {
    const { documentoId } = req.params;

    // Validar si el ID es un ObjectId válido
    const condiciones = mongoose.Types.ObjectId.isValid(documentoId)
      ? [
          { documento_id: new mongoose.Types.ObjectId(documentoId) },
          { documento_id: documentoId }, // por si hay registros antiguos como string
        ]
      : [{ documento_id: documentoId }];

    const revision = await Revision.findOne({ $or: condiciones });

    console.log("Consultando revisión para documento:", documentoId);

    if (!revision) return res.status(404).json({ message: "Revisión no encontrada" });
    res.json(revision);
  } catch (error) {
    console.error("Error al obtener revisión:", error);
    res.status(500).json({ message: "Error al consultar revisión" });
  }
  console.log("Revisión encontrada:", revision);
});

export default router;