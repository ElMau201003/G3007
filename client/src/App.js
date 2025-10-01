// client/src/App.js
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "./context/AuthContext.js";

function App() {
  const { user, loginWithGoogle, logout } = useContext(AuthContext);
  const [archivo, setArchivo] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [documentos, setDocumentos] = useState([]);
  const [mensaje, setMensaje] = useState("");

  // 📌 Subir documento
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!archivo) {
      setMensaje("Por favor selecciona un archivo.");
      return;
    }

    const formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("titulo", titulo);
    formData.append("usuario_id", user._id); // ✅ ahora es ObjectId válido

    try {
      const res = await fetch("http://localhost:4000/api/documentos", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setMensaje("✅ Documento subido con éxito");
        setTitulo("");
        setArchivo(null);
        fetchDocumentos(); // recargar lista
      } else {
        setMensaje("❌ Error: " + data.error);
      }
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error al conectar con el servidor");
    }
  };

  // 📌 Obtener documentos del usuario
  const fetchDocumentos = async () => {
    try {
      const res = await fetch(
        
        `http://localhost:4000/api/documentos/usuario/${user._id}`
      );
      const data = await res.json();
      if (res.ok || res.status === 200) setDocumentos(data);
    } catch (error) {
      console.error(error);
    }
  };

  // 📌 Cargar documentos al entrar
  useEffect(() => {
    if (user) fetchDocumentos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div>
      {!user ? (
        <button onClick={loginWithGoogle}>Login con Google</button>
      ) : (
        <div>
          <p>Hola, {user.displayName || user.nombre}</p>
          <button onClick={logout}>Cerrar sesión</button>

          <hr />
          <h2>Subir Documento</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Título del documento"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
            <input
              type="file"
              onChange={(e) => setArchivo(e.target.files[0])}
              required
            />
            <button type="submit">Subir</button>
          </form>
          {mensaje && <p>{mensaje}</p>}

          <hr />
          <h2>Mis Documentos</h2>
          <ul>
            {documentos.map((doc) => (
              <li key={doc._id}>
                <strong>{doc.titulo}</strong> -{" "}
                <a
                  href={`http://localhost:4000${doc.archivo_url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver archivo
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
