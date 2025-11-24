import express from "express";
import { co2 } from "@tgwf/co2";

const app = express();
const estimator = new co2();

app.get("/metrics", (req, res) => {
  // Simulamos transferencia de 1 MB
  const bytes = 1024 * 1024;
  const emissions = estimator.perByte(bytes);

  res.json({
    datos_transferidos: `${bytes} bytes`,
    emisiones_estimadas: `${emissions} gCO2e`,
  });
});

app.listen(5000, () => {
  console.log("Servidor ecológico en http://localhost:5000/metrics");
});