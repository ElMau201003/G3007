import React from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";

function Login() {
  const loginGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const token = await result.user.getIdToken();

    // Enviar token al backend
    const res = await axios.post("http://localhost:4000/api/auth/login", {}, {
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log("Usuario registrado:", res.data);
  };

  return (
    <div>
      <h1>Revisador Académico</h1>
      <button onClick={loginGoogle}>Iniciar sesión con Google</button>
    </div>
  );
}

export default Login;
