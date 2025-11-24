// src/pages/PerfilEditarPage.jsx
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext.js";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import {
  UserIcon,
  IdentificationIcon,
  AcademicCapIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";

export default function PerfilEditarPage() {
  const { user, setProfileCompleted } = useContext(AuthContext);
  const [nombre, setNombre] = useState(user?.nombre || "");
  const [apellido, setApellido] = useState(user?.apellido || "");
  const [rol, setRol] = useState(user?.rol || "");
  const [mensaje, setMensaje] = useState("");

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:4000/api/usuarios/${user.uid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          apellido,
          rol,
          correo: user.email,
          perfilCompleto: true,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje("✅ Perfil actualizado correctamente");
        setProfileCompleted(true);
      } else {
        setMensaje("❌ Error: " + (data.error || "No se pudo guardar"));
      }
    } catch (error) {
      setMensaje("❌ Error al conectar con el servidor");
    }
  };

  return (
    <DashboardLayout user={user}>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2">
          <IdentificationIcon className="h-6 w-6 text-blue-600" />
          Editar Perfil
        </h2>

        <form onSubmit={handleSave} className="flex flex-col gap-4">
          {/* Nombre */}
          <label className="flex items-center gap-2 border rounded px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
            <UserIcon className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="flex-1 outline-none"
            />
          </label>

          {/* Apellido */}
          <label className="flex items-center gap-2 border rounded px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
            <UserIcon className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
              className="flex-1 outline-none"
            />
          </label>

          {/* Rol */}
          <label className="flex items-center gap-2 border rounded px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
            <AcademicCapIcon className="h-5 w-5 text-gray-400" />
            <select
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              required
              className="flex-1 outline-none bg-transparent"
            >
              <option value="">Selecciona tu rol</option>
              <option value="estudiante">Estudiante</option>
              <option value="docente">Docente</option>
            </select>
          </label>

          {/* Botón Guardar */}
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            <CheckCircleIcon className="h-5 w-5" />
            Guardar cambios
          </button>
        </form>

        {/* Mensajes */}
        {mensaje && (
          <p
            className={`mt-4 text-center text-sm flex items-center justify-center gap-2 ${
              mensaje.includes("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {mensaje.includes("✅") ? (
              <CheckCircleIcon className="h-5 w-5" />
            ) : (
              <ExclamationCircleIcon className="h-5 w-5" />
            )}
            {mensaje}
          </p>
        )}
      </div>
    </DashboardLayout>
  );
}