import express from "express";
import Reporte from "../models/reporte.js";

const router = express.Router();

// Crear reporte
router.post("/", async (req, res) => {
  try {
    const { revision_id, ruta_pdf } = req.body;
    const reporte = new Reporte({
      revision_id,
      ruta_pdf,
      fecha_generacion: new Date(),
    });
    await reporte.save();
    res.json(reporte);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener reportes por revisión
router.get("/revision/:revisionId", async (req, res) => {
  try {
    const reportes = await Reporte.find({ revision_id: req.params.revisionId });
    res.json(reportes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
