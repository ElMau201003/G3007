// src/components/layouts/DashboardLayout.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  UserIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightOnRectangleIcon,
  BellIcon,
  MoonIcon,
} from "@heroicons/react/24/solid";

export default function DashboardLayout({ children, user, onLogout, onToggleTheme }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6 font-bold text-xl text-blue-600">📚 Revisador Académico</div>
        <nav className="flex flex-col gap-2 p-4 text-gray-700">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-100 ${
                isActive ? "bg-blue-50 font-semibold text-blue-600" : ""
              }`
            }
          >
            <HomeIcon className="h-5 w-5" />
            Inicio
          </NavLink>

          <NavLink
            to="/perfil"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-100 ${
                isActive ? "bg-blue-50 font-semibold text-blue-600" : ""
              }`
            }
          >
            <UserIcon className="h-5 w-5" />
            Perfil
          </NavLink>

          <NavLink
            to="/documentos"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-100 ${
                isActive ? "bg-blue-50 font-semibold text-blue-600" : ""
              }`
            }
          >
            <DocumentTextIcon className="h-5 w-5" />
            Documentos
          </NavLink>

          <NavLink
            to="/revisiones"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-100 ${
                isActive ? "bg-blue-50 font-semibold text-blue-600" : ""
              }`
            }
          >
            <ChatBubbleLeftRightIcon className="h-5 w-5" />
            Revisiones
          </NavLink>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="flex justify-between items-center bg-white shadow px-6 py-3">
          <h1 className="text-xl font-bold text-blue-600">Panel</h1>
          <div className="flex items-center gap-4">
            {/* Notificaciones */}
            <button className="relative text-gray-600 hover:text-blue-600">
              <BellIcon className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                3
              </span>
            </button>

            {/* Toggle dark mode */}
            <button onClick={onToggleTheme} className="text-gray-600 hover:text-blue-600">
              <MoonIcon className="h-6 w-6" />
            </button>

            {/* Usuario */}
            {user && (
              <span className="font-medium text-gray-700">
                {user.displayName || user.nombre}
              </span>
            )}

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

        {/* Contenido dinámico */}
        <div className="flex-1 p-8">{children}</div>
      </main>
    </div>
  );
}