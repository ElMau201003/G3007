// src/pages/LoginPage.js
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.js";

function LoginPage() {
  const { loginWithGoogle, loginWithEmail, registerWithEmail } = useContext(AuthContext);
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await registerWithEmail(email, password);
        setMensaje("Cuenta creada correctamente ✅");
      } else {
        await loginWithEmail(email, password);
        setMensaje("Inicio de sesión exitoso ✅");
      }
    } catch (error) {
      setMensaje("Error: " + error.message);
    }
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>{isRegister ? "Crear cuenta" : "Iniciar sesión"}</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">
          {isRegister ? "Registrarse" : "Iniciar sesión"}
        </button>
      </form>

      <p>{mensaje}</p>

      <hr />
      <button onClick={loginWithGoogle}>Continuar con Google</button>
      <p>
        {isRegister ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}{" "}
        <button onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "Inicia sesión" : "Regístrate"}
        </button>
      </p>
    </div>
  );
}

export default LoginPage;
