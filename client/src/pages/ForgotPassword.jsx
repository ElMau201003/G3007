import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import {
  EnvelopeIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleReset = async () => {
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);
      setMensaje("✅ Se envió un correo para recuperar tu contraseña");
    } catch (error) {
      setMensaje("❌ Error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white shadow rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2 justify-center">
          <EnvelopeIcon className="h-6 w-6 text-blue-600" />
          Recuperar contraseña
        </h2>

        {/* Input con ícono */}
        <label className="flex items-center gap-2 border rounded px-3 py-2 mb-4 focus-within:ring-2 focus-within:ring-blue-500">
          <EnvelopeIcon className="h-5 w-5 text-gray-400" />
          <input
            type="email"
            placeholder="Tu correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 outline-none"
            required
          />
        </label>

        {/* Botón con ícono */}
        <button
          onClick={handleReset}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition w-full"
        >
          <PaperAirplaneIcon className="h-5 w-5" />
          Enviar enlace
        </button>

        {/* Mensajes con íconos */}
        {mensaje && (
          <p
            className={`mt-4 text-center text-sm flex items-center justify-center gap-2 ${
              mensaje.includes("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {mensaje.includes("✅") ? (
              <CheckCircleIcon className="h-5 w-5" />
            ) : (
              <ExclamationCircleIcon className="h-5 w-5" />
            )}
            {mensaje}
          </p>
        )}
      </div>
    </div>
  );
}