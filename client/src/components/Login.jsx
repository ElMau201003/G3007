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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-8">
        Revisador Académico
      </h1>
      <button
        onClick={loginGoogle}
        className="px-6 py-3 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 
                   dark:bg-blue-500 dark:hover:bg-blue-600 transition duration-200"
      >
        Iniciar sesión con Google
      </button>
    </div>
  );
}

export default Login;