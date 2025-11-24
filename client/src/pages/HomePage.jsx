// src/pages/HomePage.jsx
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext.js";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const { user, logout } = useContext(AuthContext);
  const [archivo, setArchivo] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [documentos, setDocumentos] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  // Subir documento
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

  // Obtener documentos del usuario
  const fetchDocumentos = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/documentos/usuario/${user._id}`);
      const data = await res.json();
      if (res.ok) setDocumentos(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) fetchDocumentos();
  }, [user]);

  // Revisar con IA
  const handleRevisarIA = async (documentoId) => {
    try {
      const res = await fetch(`http://localhost:4000/api/revisiones/${documentoId}`, {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok) {
        navigate(`/revision/${data.documento_id}`);
      } else {
        alert("❌ Error al generar revisión IA: " + (data.error || "Desconocido"));
      }
    } catch (error) {
      alert("❌ Error al conectar con el servidor");
    }
  };

  // Eliminar documento con confirmación
  const handleEliminar = async (id) => {
    const confirm = window.confirm(
      "Este documento se eliminará permanentemente. ¿Deseas continuar?"
    );
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:4000/api/documentos/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setDocumentos((prev) => prev.filter((doc) => doc._id !== id));
        alert("Documento eliminado ✅");
      } else {
        const data = await res.json();
        alert("Error al eliminar: " + (data.error || "Desconocido"));
      }
    } catch (error) {
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Bienvenido, {user.displayName || user.nombre}</h2>
          
        </header>

        {/* Subir Documento */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">Subir Documento</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Título del documento"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="file"
              onChange={(e) => setArchivo(e.target.files[0])}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Subir
            </button>
          </form>
          {mensaje && <p className="mt-2 text-gray-700">{mensaje}</p>}
        </div>

        {/* Lista de Documentos */}
        <h3 className="text-xl font-semibold mb-4">Mis Documentos</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {documentos.map((doc) => (
            <div
              key={doc._id}
              className="bg-white shadow rounded-lg p-4 flex flex-col justify-between"
            >
              <div>
                <h4 className="font-bold text-lg">{doc.titulo}</h4>
                <a
                  href={`http://localhost:4000${doc.archivo_url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Ver archivo
                </a>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleRevisarIA(doc._id)}
                  className="bg-green-600 text-white py-2 px-3 rounded hover:bg-green-700 transition"
                >
                  Ver Revisión IA
                </button>

                <button
                  onClick={() => handleEliminar(doc._id)}
                  className="bg-red-600 text-white py-2 px-3 rounded hover:bg-red-700 transition"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
