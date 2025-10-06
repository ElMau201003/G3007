// server/controllers/revisionController.js
import axios from "axios";
import stringSimilarity from "string-similarity";
import Documento from "../models/documento.js";
import Revision from "../models/revision.js";

export const analizarDocumento = async (documentoId) => {
  try {
    const documento = await Documento.findById(documentoId);
    if (!documento || !documento.contenido) return;

    const contenido = documento.contenido;
    const fechaInicio = new Date();

    // 🔹 1. Analizar gramática con LanguageTool (gratuito)
    const ltResponse = await axios.post(
      "https://api.languagetool.org/v2/check",
      new URLSearchParams({
        text: contenido,
        language: "es",
      })
    );

    const errores = ltResponse.data.matches.map(
      (m) => `${m.message} (sugerencia: ${m.replacements[0]?.value || "ninguna"})`
    );

    const precisionGramatica =
      100 - Math.min((errores.length / (contenido.split(" ").length / 100)) * 10, 100);

    // 🔹 2. Revisar similitud con otros documentos (plagio básico)
    const documentos = await Documento.find({ _id: { $ne: documentoId } }, "contenido");
    const similitudes = documentos.map((d) =>
      stringSimilarity.compareTwoStrings(contenido, d.contenido || "")
    );

    const similitudPlagio = Math.max(...similitudes) * 100 || 0;
    const posiblesPlagios = documentos
      .filter((d, i) => similitudes[i] > 0.6)
      .map((d) => d.titulo);

    // 🔹 3. Detección simple de citas
    const citas = [...contenido.matchAll(/“[^”]+”|\"[^\"]+\"/g)].map((m) => m[0]);

    // 🔹 4. Crear registro de revisión
    const revision = new Revision({
      documento_id: documento._id,
      fecha_inicio: fechaInicio,
      fecha_fin: new Date(),
      precision_gramatica: precisionGramatica.toFixed(2),
      similitud_plagio: similitudPlagio.toFixed(2),
      estado: "completada",
      errores_gramaticales: errores,
      plagio: posiblesPlagios,
      citas,
    });

    await revision.save();
    console.log("✅ Revisión completada para:", documento.titulo);
  } catch (error) {
    console.error("❌ Error en análisis automático:", error.message);
  }
};
