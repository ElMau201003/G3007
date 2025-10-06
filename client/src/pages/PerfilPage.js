// src/pages/PerfilPage.js
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext.js";

function PerfilPage() {
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
    <div style={styles.container}>
      <h2>Completa tu perfil</h2>
      <form onSubmit={handleSave} style={styles.form}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          required
        />
        <select value={rol} onChange={(e) => setRol(e.target.value)} required>
          <option value="">Selecciona tu rol</option>
          <option value="estudiante">Estudiante</option>
          <option value="docente">Docente</option>
        </select>
        <button type="submit">Guardar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "20px",
  },
};

export default PerfilPage;
