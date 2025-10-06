import mongoose from "mongoose";

const DocumentoSchema = new mongoose.Schema({
  usuario_id: { type: String, required: true },
  titulo: { type: String, required: true },
  archivo_url: { type: String, required: true },
  estado: { type: String, enum: ["pendiente", "en_revision", "finalizado"], default: "pendiente" },
  fecha_subida: { type: Date, default: Date.now },
});

const Documento = mongoose.model("Documento", DocumentoSchema);
export default Documento;
