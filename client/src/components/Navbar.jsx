// src/components/Navbar.jsx
import React from "react";
import { MoonIcon, BellIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";

export default function Navbar({ user, onLogout, onToggleTheme }) {
  return (
    <header className="flex justify-between items-center bg-white shadow px-6 py-3">
      {/* Logo / título */}
      <h1 className="text-xl font-bold text-blue-600">Revisador Académico</h1>

      {/* Acciones globales */}
      <div className="flex items-center gap-4">
        {/* Notificaciones */}
        <button className="relative text-gray-600 hover:text-blue-600">
          <BellIcon className="h-6 w-6" />
          {/* Badge */}
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
            3
          </span>
        </button>

        {/* Toggle dark mode */}
        <button onClick={onToggleTheme} className="text-gray-600 hover:text-blue-600">
          <MoonIcon className="h-6 w-6" />
        </button>

        {/* Usuario */}
        <span className="font-medium text-gray-700">{user.displayName || user.nombre}</span>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5" />
          Salir
        </button>
      </div>
    </header>
  );
}