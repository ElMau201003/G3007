// server/routes/usuarios.js
import express from "express";
import Usuario from "../models/usuario.js";

const router = express.Router();

// ✅ Obtener usuario por UID
router.get("/:uid", async (req, res) => {
  try {
    const usuario = await Usuario.findOne({ firebase_uid: req.params.uid });
    if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Crear o actualizar usuario y marcar perfil completo
router.put("/:uid", async (req, res) => {
  try {
    const { nombre, apellido, rol, correo } = req.body;

    if (!correo) {
      return res.status(400).json({ message: "El correo es obligatorio" });
    }

    const usuario = await Usuario.findOneAndUpdate(
      { firebase_uid: req.params.uid },
      {
        nombre,
        apellido,
        rol,
        correo,
        perfilCompleto: true,
        fecha_registro: Date.now(),
        auth_provider: "firebase",
      },
      { new: true, upsert: true, runValidators: true }
    );

    res.json(usuario);
  } catch (error) {
    console.error("❌ Error al crear/actualizar usuario:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
