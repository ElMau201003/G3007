import express from "express";
import Notificacion from "../models/notificacion.js";

const router = express.Router();

// Crear notificación
router.post("/", async (req, res) => {
  try {
    const { usuario_id, revision_id, mensaje, tipo } = req.body;
    const notificacion = new Notificacion({
      usuario_id,
      revision_id,
      mensaje,
      tipo,
      fecha_envio: new Date(),
    });
    await notificacion.save();
    res.status(201).json(notificacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar notificaciones por usuario
router.get("/usuario/:usuarioId", async (req, res) => {
  try {
    const notificaciones = await Notificacion.find({ usuario_id: req.params.usuarioId });
    res.json(notificaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
