import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.js";
import Loader from "../components/Loader.jsx";
import { useNavigate } from "react-router-dom";
import {
  EnvelopeIcon,
  LockClosedIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  KeyIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/solid";

export default function LoginPage() {
  const { loginWithGoogle, loginWithEmail, registerWithEmail } = useContext(AuthContext);
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isRegister) {
        await registerWithEmail(email, password);
        setMensaje("✅ Cuenta creada correctamente");
      } else {
        await loginWithEmail(email, password);
        setMensaje("✅ Inicio de sesión exitoso");
      }
    } catch (error) {
      setMensaje("❌ Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
    } catch (error) {
      setMensaje("❌ Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader message={isRegister ? "Registrando..." : "Iniciando sesión..."} />;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
        {/* Título con ícono */}
        <h1 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2 text-gray-800 dark:text-gray-100">
          {isRegister ? (
            <UserPlusIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          ) : (
            <ArrowRightOnRectangleIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          )}
          {isRegister ? "Crear cuenta" : "Iniciar sesión"}
        </h1>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex items-center gap-2 border rounded px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 
                            bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
            <EnvelopeIcon className="h-5 w-5 text-gray-400 dark:text-gray-300" />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 outline-none bg-transparent"
            />
          </label>
          <label className="flex items-center gap-2 border rounded px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 
                            bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
            <LockClosedIcon className="h-5 w-5 text-gray-400 dark:text-gray-300" />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="flex-1 outline-none bg-transparent"
            />
          </label>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded 
                       hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
          >
            {isRegister ? <UserPlusIcon className="h-5 w-5" /> : <ArrowRightOnRectangleIcon className="h-5 w-5" />}
            {isRegister ? "Registrarse" : "Iniciar sesión"}
          </button>
        </form>

        {/* Olvidé mi contraseña */}
        {!isRegister && (
          <p className="mt-2 text-center text-sm">
            <button
              onClick={() => navigate("/forgot-password")}
              className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              <KeyIcon className="h-4 w-4" />
              Olvidé mi contraseña
            </button>
          </p>
        )}

        {/* Mensajes */}
        {mensaje && (
          <p
            className={`mt-4 text-center text-sm ${
              mensaje.includes("✅")
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {mensaje}
          </p>
        )}

        {/* Google Login */}
        <div className="mt-6 text-center">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 bg-red-500 text-white py-2 px-4 rounded 
                       hover:bg-red-600 dark:bg-red-400 dark:hover:bg-red-500 transition"
          >
            <ArrowPathIcon className="h-5 w-5" />
            Continuar con Google
          </button>
        </div>

        {/* Toggle login/registro */}
        <p className="mt-4 text-center text-sm text-gray-700 dark:text-gray-300">
          {isRegister ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}{" "}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            {isRegister ? "Inicia sesión" : "Regístrate"}
          </button>
        </p>
      </div>
    </div>
  );
}