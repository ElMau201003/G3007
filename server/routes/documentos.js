import express from "express";
import multer from "multer";
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

// 📌 Subir documento
router.post("/", upload.single("archivo"), async (req, res) => {
  try {
    const { usuario_id, titulo } = req.body;

    const documento = new Documento({
      usuario_id,
      titulo,
      archivo_url: `/uploads/${req.file.filename}`, // ruta accesible
      estado: "pendiente",
      fecha_subida: new Date(),
    });

    await documento.save();
    res.json(documento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 Listar documentos por usuario
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

// revision
router.post("/", upload.single("archivo"), async (req, res) => {
  try {
    const nuevoDoc = new Documento({
      titulo: req.body.titulo,
      usuario_id: req.body.usuario_id,
      archivo_url: `/uploads/${req.file.filename}`,
      contenido: req.body.contenido || "", // asegúrate de enviar el texto del doc si lo extraes
    });

    const documentoGuardado = await nuevoDoc.save();

    // 🔹 Llamar a la IA después de guardar
    analizarDocumento(documentoGuardado._id);

    res.status(201).json(documentoGuardado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
