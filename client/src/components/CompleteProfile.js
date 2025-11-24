import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext.js";

function CompleteProfile() {
  const { user, setProfileCompleted } = useContext(AuthContext);
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    correo: user?.email || "",
    rol: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.uid) {
        alert("No hay usuario autenticado");
        return;
    }

    const payload = {
        nombre: form.nombre,
        apellido: form.apellido,
        correo: user.email || form.correo,
        rol: form.rol,
    };

    const res = await fetch(`http://localhost:4000/api/usuarios/${user.uid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (res.ok) {
        const data = await res.json();
        setProfileCompleted(data.perfilCompleto);
        alert("Perfil completado correctamente");
    } else {
        const error = await res.json();
        alert("Error al guardar perfil: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Completa tu perfil
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={form.apellido}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="correo"
            placeholder="Correo"
            value={form.correo}
            readOnly
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
          />
          <select
            name="rol"
            value={form.rol}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecciona tu rol</option>
            <option value="estudiante">Estudiante</option>
            <option value="docente">Docente</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
        >
          Guardar perfil
        </button>
      </form>
    </div>
  );
}

export default CompleteProfile;
