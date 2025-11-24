// src/pages/RevisionesPage.jsx
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext.js";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/solid";

export default function RevisionesPage() {
  const { user } = useContext(AuthContext);
  const [documentosFinalizados, setDocumentosFinalizados] = useState([]);

  // Obtener documentos finalizados del usuario
  const fetchDocumentosFinalizados = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/documentos/usuario/${user._id}/finalizados`);
      const data = await res.json();
      if (res.ok) setDocumentosFinalizados(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) fetchDocumentosFinalizados();
  }, [user]);

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6 text-blue-600">📋 Revisiones IA</h2>
      {documentosFinalizados.length === 0 ? (
        <p className="text-gray-500">No tienes documentos finalizados aún.</p>
      ) : (
        <div className="space-y-4">
          {documentosFinalizados.map((doc) => (
            <div key={doc._id} className="bg-white shadow rounded-lg p-5">
              <h4 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                <ClipboardDocumentCheckIcon className="h-6 w-6 text-green-600" />
                {doc.titulo}
              </h4>
              <p className="text-sm text-gray-600">Estado: {doc.estado}</p>
              {/* Aquí puedes enlazar a la revisión */}
              <a
                href={`/revision/${doc._id}`}
                className="text-blue-600 hover:underline text-sm"
              >
                Ver revisión
              </a>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}