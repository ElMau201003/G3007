import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext.js";

export default function Layout({ children }) {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow">
        <h1 className="text-xl font-bold">Revisador Académico</h1>
        {user && (
          <div className="flex items-center">
            <span className="mr-4">{user.displayName || user.nombre}</span>
            <button
              onClick={logout}
              className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200 transition"
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </header>

      <main className="flex-1 container mx-auto p-6">{children}</main>

      <footer className="bg-gray-200 text-center p-3 text-sm">
        © 2025 Revisador Académico
      </footer>
    </div>
  );
}