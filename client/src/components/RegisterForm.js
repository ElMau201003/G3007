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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerWithEmail(form.correo, form.password);

    // Enviar al backend para guardar perfil
    await fetch("http://localhost:4000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    alert("Usuario registrado correctamente");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="nombre" placeholder="Nombre" onChange={handleChange} required />
      <input name="apellido" placeholder="Apellido" onChange={handleChange} required />
      <input name="correo" type="email" placeholder="Correo" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} required />
      <select name="rol" onChange={handleChange}>
        <option value="estudiante">Estudiante</option>
        <option value="docente">Docente</option>
      </select>
      <button type="submit">Registrar</button>
    </form>
  );
}
