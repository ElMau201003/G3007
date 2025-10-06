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
        correo: user.email || form.correo, // ✅ Asegura que nunca sea null
        rol: form.rol,
    };

    const res = await fetch(`http://localhost:4000/api/usuarios/${user.uid}`, {
        method: "PUT", // ✅ usa PUT y no POST
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (res.ok) {
        const data = await res.json();
        setProfileCompleted(data.perfilCompleto); // ✅ actualiza el contexto correctamente
        alert("Perfil completado correctamente");
    } else {
        const error = await res.json();
        alert("Error al guardar perfil: " + error.message);
    }
    };


  return (
    <form onSubmit={handleSubmit}>
      <h2>Completa tu perfil</h2>

      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={form.nombre}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="apellido"
        placeholder="Apellido"
        value={form.apellido}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="correo"
        placeholder="Correo"
        value={form.correo}
        readOnly
      />
      <select name="rol" value={form.rol} onChange={handleChange} required>
        <option value="">Selecciona tu rol</option>
        <option value="estudiante">Estudiante</option>
        <option value="docente">Docente</option>
      </select>

      <button type="submit">Guardar perfil</button>
    </form>
  );
}

export default CompleteProfile;
