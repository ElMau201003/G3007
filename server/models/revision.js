import mongoose from "mongoose";

const RevisionSchema = new mongoose.Schema({
  documento_id: { type: mongoose.Schema.Types.ObjectId, ref: "Documento", required: true },
  fecha_inicio: { type: Date, default: Date.now },
  fecha_fin: { type: Date },
  precision_gramatica: { type: Number },
  similitud_plagio: { type: Number },
  estado: { type: String, enum: ["en_proceso", "completada", "fallida"], default: "en_proceso" },

  errores_gramaticales: [
    {
      tipo: String,
      descripcion: String,
      sugerencia: String,
    },
  ],

  plagio: [
    {
      fuente: String,
      porcentaje: Number,
      fragmento: String,
    },
  ],

  citas: [
    {
      cita_texto: String,
      formato_detectado: String,
      es_valido: Boolean,
      sugerencia: String,
    },
  ],
});

const Revision = mongoose.model("Revision", RevisionSchema);
export default Revision;
