import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.js";
import Loader from "../components/Loader.jsx";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { loginWithGoogle, loginWithEmail, registerWithEmail } = useContext(AuthContext);
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // 👈 para redirigir

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
    } catch (error) {
      setMensaje("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // ⏳ Mostrar Loader mientras se procesa login/registro
  if (loading) return <Loader message={isRegister ? "Registrando..." : "Iniciando sesión..."} />;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">
          {isRegister ? "Crear cuenta" : "Iniciar sesión"}
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {isRegister ? "Registrarse" : "Iniciar sesión"}
          </button>
        </form>

        {/* 👇 Botón Olvidé mi contraseña */}
        {!isRegister && (
          <p className="mt-2 text-center text-sm">
            <button
              onClick={() => navigate("/forgot-password")}
              className="text-blue-600 font-semibold hover:underline"
            >
              Olvidé mi contraseña
            </button>
          </p>
        )}

        {mensaje && <p className="mt-4 text-center text-sm text-gray-700">{mensaje}</p>}

        <div className="mt-6 text-center">
          <button
            onClick={handleGoogleLogin}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
          >
            Continuar con Google
          </button>
        </div>

        <p className="mt-4 text-center text-sm">
          {isRegister ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}{" "}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-blue-600 font-semibold hover:underline"
          >
            {isRegister ? "Inicia sesión" : "Regístrate"}
          </button>
        </p>
      </div>
    </div>
  );
}