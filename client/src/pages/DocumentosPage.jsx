// src/pages/DocumentosPage.jsx
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext.js";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import {
  DocumentMagnifyingGlassIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

export default function DocumentosPage() {
  const { user } = useContext(AuthContext);
  const [documentos, setDocumentos] = useState([]);

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

  // Eliminar documento
  const handleEliminar = async (id) => {
    const confirm = window.confirm("¿Seguro que deseas eliminar este documento?");
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:4000/api/documentos/${id}`, { method: "DELETE" });
      if (res.ok) {
        setDocumentos((prev) => prev.filter((doc) => doc._id !== id));
        alert("Documento eliminado ✅");
      }
    } catch (error) {
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6 text-blue-600 dark:text-blue-400">
        📂 Mis Documentos
      </h2>
      {documentos.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No tienes documentos aún.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {documentos.map((doc) => (
            <div
              key={doc._id}
              className="bg-white dark:bg-gray-800 shadow rounded-lg p-5 flex flex-col justify-between"
            >
              <div>
                <h4 className="font-bold text-lg text-gray-800 dark:text-gray-100">
                  {doc.titulo}
                </h4>
                <a
                  href={`http://localhost:4000${doc.archivo_url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm flex items-center gap-1"
                >
                  <DocumentMagnifyingGlassIcon className="h-5 w-5" />
                  Ver archivo
                </a>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Estado: {doc.estado}
                </p>
              </div>
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => handleEliminar(doc._id)}
                  className="flex items-center gap-2 bg-red-600 text-white py-2 px-3 rounded 
                             hover:bg-red-700 dark:hover:bg-red-500 transition flex-1"
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