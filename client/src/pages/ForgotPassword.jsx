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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2 justify-center text-gray-800 dark:text-gray-100">
          <EnvelopeIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          Recuperar contraseña
        </h2>

        {/* Input con ícono */}
        <label className="flex items-center gap-2 border rounded px-3 py-2 mb-4 focus-within:ring-2 focus-within:ring-blue-500 
                          bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
          <EnvelopeIcon className="h-5 w-5 text-gray-400 dark:text-gray-300" />
          <input
            type="email"
            placeholder="Tu correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 outline-none bg-transparent"
            required
          />
        </label>

        {/* Botón con ícono */}
        <button
          onClick={handleReset}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded 
                     hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition w-full"
        >
          <PaperAirplaneIcon className="h-5 w-5" />
          Enviar enlace
        </button>

        {/* Mensajes con íconos */}
        {mensaje && (
          <p
            className={`mt-4 text-center text-sm flex items-center justify-center gap-2 ${
              mensaje.includes("✅")
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
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