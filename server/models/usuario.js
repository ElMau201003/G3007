import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  rol: { type: String, enum: ["estudiante", "docente", "admin"], default: "estudiante" },
  fecha_registro: { type: Date, default: Date.now },
  auth_provider: { type: String, default: "firebase" },
  firebase_uid: { type: String, required: false, unique: true },
  perfilCompleto: { type: Boolean, default: false },
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;
