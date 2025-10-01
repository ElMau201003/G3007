import express from "express";
import Revision from "../models/revision.js";

const router = express.Router();

// Crear nueva revisión
router.post("/", async (req, res) => {
  try {
    const { documento_id } = req.body;
    const revision = new Revision({
      documento_id,
      fecha_inicio: new Date(),
      estado: "en_proceso",
    });
    await revision.save();
    res.json(revision);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar revisión con resultados (ej: IA)
router.put("/:id", async (req, res) => {
  try {
    const revision = await Revision.findByIdAndUpdate(
      req.params.id,
      { ...req.body, fecha_fin: new Date() },
      { new: true }
    );
    res.json(revision);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener revisión por documento
router.get("/documento/:documentoId", async (req, res) => {
  try {
    const revisiones = await Revision.find({ documento_id: req.params.documentoId });
    res.json(revisiones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
