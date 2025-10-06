import express from "express";
import Usuario from "../models/usuario.js";

const router = express.Router();

// Registro manual
router.post("/register", async (req, res) => {
  try {
    const { nombre, apellido, correo, rol } = req.body;
    const usuario = new Usuario({
      nombre,
      apellido,
      correo,
      rol,
      auth_provider: "email",
      fecha_registro: new Date(),
    });
    await usuario.save();
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Registro tras login con Google
router.post("/google-register", async (req, res) => {
  try {
    const { nombre, apellido, correo, rol, firebase_uid } = req.body;
    let usuario = await Usuario.findOne({ firebase_uid });

    if (!usuario) {
      usuario = new Usuario({
        nombre,
        apellido,
        correo,
        rol,
        firebase_uid,
        auth_provider: "google",
        fecha_registro: new Date(),
      });
      await usuario.save();
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener usuario por uid
router.get("/usuarios/:uid", async (req, res) => {
  const usuario = await Usuario.findOne({ firebase_uid: req.params.uid });
  if (!usuario)
    return res.json({ perfilCompleto: false });
  res.json({ perfilCompleto: true });
});

router.get("/:uid", async (req, res) => {
  try {
    const usuario = await Usuario.findOne({ firebase_uid: req.params.uid });
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
