import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/hello`)
      .then((res) => {
        setMessage(res.data.message);
      })
      .catch((err) => setMessage("Error al conectar con backend ❌"));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>👩‍💻 Revisor Académico</h1>
      <p>Conexión con backend:</p>
      <strong>{message}</strong>
    </div>
  );
}

export default App;
