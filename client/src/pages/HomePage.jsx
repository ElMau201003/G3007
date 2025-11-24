// src/pages/HomePage.jsx
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext.js";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader.jsx";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import {
  ArrowUpTrayIcon,
  DocumentMagnifyingGlassIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

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

  // Revisar con IA y actualizar estado del documento
  const handleRevisarIA = async (documentoId) => {
    setLoadingRevision(true);
    try {
      // 1️⃣ Crear revisión IA
      const res = await fetch(
        `http://localhost:4000/api/revisiones/${documentoId}`,
        { method: "POST" }
      );
      const data = await res.json();

      if (res.ok) {
        // 2️⃣ Actualizar estado del documento a "finalizado"
        await fetch(`http://localhost:4000/api/documentos/${documentoId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ estado: "finalizado" }),
        });

        // 3️⃣ Refrescar lista
        fetchDocumentos();

        // 4️⃣ Navegar a la revisión
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
    <DashboardLayout onLogout={logout}>
      {/* Subir Documento */}
      <div className="bg-white shadow rounded-lg p-6 mb-10">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Subir Documento
        </h3>
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
            className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            <ArrowUpTrayIcon className="h-5 w-5" />
            Subir
          </button>
        </form>
        {mensaje && (
          <p
            className={`mt-3 ${
              mensaje.includes("✅") ? "text-green-600" : "text-red-600"
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
                  className="text-blue-600 hover:underline text-sm flex items-center gap-1"
                >
                  <DocumentMagnifyingGlassIcon className="h-5 w-5" />
                  Ver archivo
                </a>
                <p className="text-sm text-gray-600 mt-1">
                  Estado: {doc.estado}
                </p>
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => handleRevisarIA(doc._id)}
                  className="flex items-center gap-2 bg-green-600 text-white py-2 px-3 rounded hover:bg-green-700 transition flex-1"
                >
                  <DocumentMagnifyingGlassIcon className="h-5 w-5" />
                  Revisión IA
                </button>
                <button
                  onClick={() => handleEliminar(doc._id)}
                  className="flex items-center gap-2 bg-red-600 text-white py-2 px-3 rounded hover:bg-red-700 transition flex-1"
                >
                  <TrashIcon className="h-5 w-5" />
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}