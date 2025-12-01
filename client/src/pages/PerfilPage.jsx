// src/pages/PerfilPage.jsx
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext.js";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import {
  UserIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  ClipboardDocumentCheckIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";

export default function PerfilPage() {
  const { user } = useContext(AuthContext);
  const [documentos, setDocumentos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener documentos del usuario
  const fetchDocumentos = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/documentos/usuario/${user._id}`);
      const data = await res.json();
      if (res.ok) setDocumentos(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchDocumentos();
  }, [user]);

  // Calcular estadísticas
  const totalDocs = documentos.length;
  const pendientesRevision = documentos.filter((doc) => doc.estado === "pendiente").length;
  const finalizados = documentos.filter((doc) => doc.estado === "finalizado").length;

  return (
    <DashboardLayout user={user}>
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-blue-600 dark:text-blue-400">
          <UserIcon className="h-6 w-6" />
          Perfil de Usuario
        </h2>

        {/* Información básica */}
        <div className="space-y-4 text-gray-700 dark:text-gray-200">
          <p className="flex items-center gap-2">
            <UserIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <span>
              <strong>Nombre:</strong> {user.nombre} {user.apellido}
            </span>
          </p>
          <p className="flex items-center gap-2">
            <AcademicCapIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <span>
              <strong>Rol:</strong> {user.rol}
            </span>
          </p>
        </div>

        {/* Estadísticas */}
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg flex items-center gap-3">
            <DocumentTextIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{totalDocs}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Documentos subidos</p>
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg flex items-center gap-3">
            <ClipboardDocumentCheckIcon className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
            <div>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{pendientesRevision}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Pendientes de revisión IA</p>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg flex items-center gap-3">
            <CheckCircleIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
            <div>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{finalizados}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Finalizados</p>
            </div>
          </div>
        </div>

        {/* Botón para editar perfil */}
        <div className="mt-6">
          <button
            onClick={() => (window.location.href = "/perfil/editar")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
          >
            Editar perfil
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}