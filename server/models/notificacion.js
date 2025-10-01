import mongoose from "mongoose";

const NotificacionSchema = new mongoose.Schema({
  usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  revision_id: { type: mongoose.Schema.Types.ObjectId, ref: "Revision" },
  mensaje: { type: String, required: true },
  tipo: { type: String, enum: ["correo", "sistema"], default: "sistema" },
  fecha_envio: { type: Date, default: Date.now },
});

const Notificacion = mongoose.model("Notificacion", NotificacionSchema);
export default Notificacion;
