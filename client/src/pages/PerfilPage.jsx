// src/pages/PerfilPage.jsx
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext.js";

export default function PerfilPage() {
  const { user, setProfileCompleted } = useContext(AuthContext);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [rol, setRol] = useState("");
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
        setMensaje("✅ Perfil completado correctamente");
        setProfileCompleted(true);
      } else {
        setMensaje("❌ Error: " + (data.error || "No se pudo guardar"));
      }
    } catch (error) {
      setMensaje("❌ Error al conectar con el servidor");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Completa tu perfil</h2>

        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            required
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecciona tu rol</option>
            <option value="estudiante">Estudiante</option>
            <option value="docente">Docente</option>
          </select>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Guardar
          </button>
        </form>

        {mensaje && (
          <p className="mt-4 text-center text-sm text-gray-700">{mensaje}</p>
        )}
      </div>
    </div>
  );
}
