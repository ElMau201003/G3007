import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/hello").then((res) => {
      setMessage(res.data.message);
    });
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
