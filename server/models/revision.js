import mongoose from "mongoose";

const revisionSchema = new mongoose.Schema({
  documento_id: { type: mongoose.Schema.Types.ObjectId, ref: "Documento", required: true },
  fecha_inicio: { type: Date, default: Date.now },
  fecha_fin: { type: Date },
  precision_gramatica: Number,
  similitud_plagio: Number,
  estado: { type: String, default: "completada" },
  errores_gramaticales: [String],
  plagio: [String],
  citas: [String],
});

export default mongoose.model("Revision", revisionSchema);
