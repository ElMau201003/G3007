import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext.js";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader.jsx";

export default function HomePage() {
  const { user, logout } = useContext(AuthContext);
  const [archivo, setArchivo] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [documentos, setDocumentos] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [loadingRevision, setLoadingRevision] = useState(false);
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

  // Obtener documentos
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

  // Revisar con IA
  const handleRevisarIA = async (documentoId) => {
    setLoadingRevision(true);
    try {
      const res = await fetch(
        `http://localhost:4000/api/revisiones/${documentoId}`,
        { method: "POST" }
      );
      const data = await res.json();
      if (res.ok) {
        navigate(`/revision/${data.documento_id}`);
      } else {
        alert("❌ Error al generar revisión IA: " + (data.error || "Desconocido"));
      }
    } catch (error) {
      alert("❌ Error al conectar con el servidor");
    } finally {
      setLoadingRevision(false);
    }
  };

  // Eliminar documento
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

  if (loadingRevision) {
    return <Loader message="Generando revisión IA..." />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Bienvenido, {user.displayName || user.nombre}
          </h2>
          
        </header>

        {/* Subir Documento */}
        <div className="bg-white shadow rounded-lg p-6 mb-10">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Subir Documento
          </h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="text-sm font-medium text-gray-600">
              Título
              <input
                type="text"
                placeholder="Título del documento"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="mt-1 border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </label>
            <label className="text-sm font-medium text-gray-600">
              Archivo
              <input
                type="file"
                onChange={(e) => setArchivo(e.target.files[0])}
                className="mt-1 border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </label>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition flex items-center justify-center"
            >
              📤 Subir
            </button>
          </form>
          {mensaje && (
            <p
              className={`mt-3 ${
                mensaje.includes("✅")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {mensaje}
            </p>
          )}
        </div>

        {/* Lista de Documentos */}
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Mis Documentos
        </h3>
        {documentos.length === 0 ? (
          <p className="text-gray-500">No tienes documentos aún.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {documentos.map((doc) => (
              <div
                key={doc._id}
                className="bg-white shadow rounded-lg p-5 hover:shadow-lg transition flex flex-col justify-between"
              >
                <div>
                  <h4 className="font-bold text-lg text-gray-800">
                    {doc.titulo}
                  </h4>
                  <a
                    href={`http://localhost:4000${doc.archivo_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    📄 Ver archivo
                  </a>
                </div>

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => handleRevisarIA(doc._id)}
                    className="bg-green-600 text-white py-2 px-3 rounded hover:bg-green-700 transition flex-1"
                  >
                    🤖 Revisión IA
                  </button>
                  <button
                    onClick={() => handleEliminar(doc._id)}
                    className="bg-red-600 text-white py-2 px-3 rounded hover:bg-red-700 transition flex-1"
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}