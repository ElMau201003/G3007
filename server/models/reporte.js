import mongoose from "mongoose";

const ReporteSchema = new mongoose.Schema({
  revision_id: { type: mongoose.Schema.Types.ObjectId, ref: "Revision", required: true },
  ruta_pdf: { type: String, required: true },
  fecha_generacion: { type: Date, default: Date.now },
});

const Reporte = mongoose.model("Reporte", ReporteSchema);
export default Reporte;
