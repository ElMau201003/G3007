import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import Documento from "../models/documento.js";
import { analizarDocumento } from "../controllers/revisionController.js";

const router = express.Router();

// Configuración de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Carpeta donde se guardan
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Nombre único
  },
});

const upload = multer({ storage });

/* 📌 SUBIR DOCUMENTO */
router.post("/", upload.single("archivo"), async (req, res) => {
  try {
    const { usuario_id, titulo } = req.body;

    const documento = new Documento({
      usuario_id,
      titulo,
      archivo_url: `/uploads/${req.file.filename}`, // ruta accesible
      estado: "pendiente", // 👈 siempre inicia como pendiente
      fecha_subida: new Date(),
    });

    await documento.save();
    res.json(documento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* 📌 LISTAR DOCUMENTOS POR USUARIO */
router.get("/usuario/:usuarioId", async (req, res) => {
  try {
    const documentos = await Documento.find({
      usuario_id: req.params.usuarioId,
    });
    res.json(documentos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 REVISIÓN IA
router.post("/revision/:id", async (req, res) => {
  try {
    const documentoId = req.params.id;

    // 1️⃣ Marcar como "en_revision"
    const enRevision = await Documento.findByIdAndUpdate(
      documentoId,
      { estado: "en_revision" },
      { new: true }
    );
    console.log("Documento en revisión:", enRevision);

    // 2️⃣ Ejecutar análisis IA
    const resultado = await analizarDocumento(documentoId);

    // 3️⃣ Marcar como "finalizado"
    const documentoActualizado = await Documento.findByIdAndUpdate(
      documentoId,
      { estado: "finalizado" },
      { new: true }
    );
    console.log("Documento finalizado:", documentoActualizado);

    res.json({
      documento: documentoActualizado,
      revision: resultado,
    });
  } catch (error) {
    console.error("Error en revisión IA:", error);
    res.status(500).json({ error: error.message });
  }
});

/* 📌 ELIMINAR DOCUMENTO */
router.delete("/:documentoId", async (req, res) => {
  try {
    const documento = await Documento.findById(req.params.documentoId);
    if (!documento) return res.status(404).json({ error: "Documento no encontrado" });

    // Borrar archivo físico
    const filePath = path.join("uploads", path.basename(documento.archivo_url));
    fs.unlink(filePath, (err) => {
      if (err) console.error("Error al borrar archivo:", err);
    });

    // Borrar registro en BD
    await documento.deleteOne();

    res.json({ message: "Documento eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// server/routes/documentos.js
router.get("/usuario/:usuarioId/finalizados", async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const documentosFinalizados = await Documento.find({
      usuario_id: usuarioId,
      estado: "finalizado",
    });
    res.json(documentosFinalizados);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener documentos finalizados" });
  }
});

export default router;