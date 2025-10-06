import express from "express";
import mongoose from "mongoose";
import revisionesRouter from "./routes/revisiones.js";
// importa otras rutas si las tienes

const app = express();

app.use(express.json());
app.use("/api/revisiones", revisionesRouter);
// otras rutas si las tienes

export default app;