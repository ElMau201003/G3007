import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.js";

export default function RegisterForm() {
  const { registerWithEmail } = useContext(AuthContext);
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    password: "",
    rol: "estudiante",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerWithEmail(form.correo, form.password);

      // Enviar al backend para guardar perfil
      await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      alert("Usuario registrado correctamente");
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("No se pudo registrar. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
          Registro de Usuario
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="nombre"
            placeholder="Nombre"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
          <input
            name="apellido"
            placeholder="Apellido"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
          <input
            name="correo"
            type="email"
            placeholder="Correo"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
          <select
            name="rol"
            onChange={handleChange}
            value={form.rol}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="estudiante">Estudiante</option>
            <option value="docente">Docente</option>
          </select>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition duration-200
              ${loading 
                ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"}`}
          >
            {loading ? "Registrando..." : "Registrar"}
          </button>
        </form>
      </div>
    </div>
  );
}