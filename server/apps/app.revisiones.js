import express from "express";
import revisionesRoutes from "../routes/revisiones.testable.js";

const app = express();
app.use(express.json());
app.use("/api/revisiones", revisionesRoutes);

export default app;