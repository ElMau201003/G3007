// server/index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// RUTA DE PRUEBA
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hola desde el backend 🚀" });
});

// Conexión a MongoDB (puedes usar Atlas o local)
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ Conectado a MongoDB");
    app.listen(5000, () => console.log("Servidor corriendo en http://localhost:5000"));
  })
  .catch((err) => console.error("❌ Error en conexión MongoDB:", err));
