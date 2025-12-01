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
import { useTheme } from "../context/ThemeContext"; // 👈 usa el contexto como respaldo

export default function DashboardLayout({ children, user, onLogout, onToggleTheme }) {
  const { toggleTheme, theme } = useTheme(); // 👈 disponible siempre

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md">
        <div className="p-6 font-bold text-xl text-blue-600 dark:text-blue-400">
          📚 Revisador Académico
        </div>
        <nav className="flex flex-col gap-2 p-4 text-gray-700 dark:text-gray-200">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-100 dark:hover:bg-blue-900 ${
                isActive ? "bg-blue-50 dark:bg-blue-700 font-semibold text-blue-600 dark:text-blue-300" : ""
              }`
            }
          >
            <HomeIcon className="h-5 w-5" />
            Inicio
          </NavLink>

          <NavLink
            to="/perfil"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-100 dark:hover:bg-blue-900 ${
                isActive ? "bg-blue-50 dark:bg-blue-700 font-semibold text-blue-600 dark:text-blue-300" : ""
              }`
            }
          >
            <UserIcon className="h-5 w-5" />
            Perfil
          </NavLink>

          <NavLink
            to="/documentos"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-100 dark:hover:bg-blue-900 ${
                isActive ? "bg-blue-50 dark:bg-blue-700 font-semibold text-blue-600 dark:text-blue-300" : ""
              }`
            }
          >
            <DocumentTextIcon className="h-5 w-5" />
            Documentos
          </NavLink>

          <NavLink
            to="/revisiones"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-100 dark:hover:bg-blue-900 ${
                isActive ? "bg-blue-50 dark:bg-blue-700 font-semibold text-blue-600 dark:text-blue-300" : ""
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
        <header className="flex justify-between items-center bg-white dark:bg-gray-800 shadow px-6 py-3">
          <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">Panel</h1>
          <div className="flex items-center gap-4">
            {/* Notificaciones */}
            <button className="relative text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              <BellIcon className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                3
              </span>
            </button>

            {/* Toggle dark mode */}
            <button
              onClick={onToggleTheme ?? toggleTheme} // 👈 usa prop si viene, si no usa el contexto
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              aria-label={`Cambiar a modo ${theme === "light" ? "oscuro" : "claro"}`}
            >
              <MoonIcon className="h-6 w-6" />
            </button>

            {/* Usuario */}
            {user && (
              <span className="font-medium text-gray-700 dark:text-gray-200">
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
        <div className="flex-1 p-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          {children}
        </div>
      </main>
    </div>
  );
}