import express from "express";
import Usuario from "../models/usuario.js";

const router = express.Router();

// Login con Firebase UID
router.post("/login", async (req, res) => {
  try {
    const { firebase_uid, nombre, apellido, correo } = req.body;

    let usuario = await Usuario.findOne({ firebase_uid });

    if (!usuario) {
      usuario = new Usuario({
        firebase_uid,
        nombre,
        apellido,
        correo,
        rol: "estudiante", // Por defecto
      });
      await usuario.save();
    }

    res.json(usuario);
  } catch (error) {
    console.error("Error en login:", error.message);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

export default router;
