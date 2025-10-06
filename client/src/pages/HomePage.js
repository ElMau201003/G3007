// src/pages/HomePage.js
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext.js";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function HomePage() {
  const { user, logout } = useContext(AuthContext);
  const [archivo, setArchivo] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [documentos, setDocumentos] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

const handleRevisarIA = async (documentoId) => {
  try {
    const res = await fetch(`http://localhost:4000/api/revisiones/${documentoId}`, {
      method: "POST", // crea o devuelve la revisión
    });

    const data = await res.json(); // ✅ data es la revisión

    if (res.ok) {
      // ✅ Redirige a RevisionPage con el _id de la revisión
      navigate(`/revision/${data.documento_id}`); // ✅ correcto
    } else {
      console.log("Status:", res.status);
      alert("❌ Error al generar revisión IA: " + (data.error || "Error desconocido"));
    }
  } catch (error) {
    console.error(error);
    alert("❌ Error al conectar con el servidor");
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!archivo) return setMensaje("Selecciona un archivo primero.");

    const formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("titulo", titulo);
    formData.append("usuario_id", user._id);

    try {
      const res = await fetch("http://localhost:4000/api/documentos", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setDocumentos((prev) => [...prev, data]);
        setTitulo("");
        setArchivo(null);
        setMensaje("✅ Documento subido con éxito");
      } else {
        setMensaje("❌ Error: " + data.error);
      }
    } catch (error) {
      setMensaje("❌ Error al conectar con el servidor");
    }
  };

  const fetchDocumentos = async () => {
    try {
      const res = await fetch(
        `http://localhost:4000/api/documentos/usuario/${user._id}`
      );
      const data = await res.json();
      if (res.ok) setDocumentos(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) fetchDocumentos();
  }, [user]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Bienvenido, {user.displayName || user.nombre}</h2>
      <button onClick={logout}>Cerrar sesión</button>
      <hr />
      <h3>Subir Documento</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
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
      <h3>Mis Documentos</h3>
      <ul>
        {documentos.map((doc) => (
            <li key={doc._id}>
            <strong>{doc.titulo}</strong> –{" "}
            <a
                href={`http://localhost:4000${doc.archivo_url}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                Ver archivo
            </a>{" "}
            |{" "}
            <button onClick={() => handleRevisarIA(doc._id)}>
                Ver revisión IA
            </button>
            </li>
        ))}
      </ul>


    </div>
  );
}

export default HomePage;
