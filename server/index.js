import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.js";
import usuarioRoutes from "./routes/usuarios.js";
import documentoRoutes from "./routes/documentos.js";
import revisionRoutes from "./routes/revisiones.js";
import reporteRoutes from "./routes/reportes.js";
import notificacionRoutes from "./routes/notificaciones.js";

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar DB
connectDB();

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/documentos", documentoRoutes);
app.use("/api/revisiones", revisionRoutes);
app.use("/api/reportes", reporteRoutes);
app.use("/api/notificaciones", notificacionRoutes);
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));
