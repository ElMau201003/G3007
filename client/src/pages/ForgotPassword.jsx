// src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleReset = async () => {
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);
      setMensaje("📧 Se envió un correo para recuperar tu contraseña");
    } catch (error) {
      setMensaje("❌ Error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white shadow rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Recuperar contraseña</h2>
        <input
          type="email"
          placeholder="Tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded px-3 py-2 w-full mb-4"
        />
        <button
          onClick={handleReset}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition w-full"
        >
          Enviar enlace
        </button>
        {mensaje && <p className="mt-4 text-gray-700">{mensaje}</p>}
      </div>
    </div>
  );
}