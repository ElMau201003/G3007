// src/App.js
import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import { AuthContext } from "./context/AuthContext.js";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import PerfilPage from "./pages/PerfilPage.jsx";
import RevisionPage from "./pages/RevisionPage.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";


// ---------------- Layout general ----------------
function Layout({ children }) {
  const { user, logout } = useContext(AuthContext);
  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Revisador Académico</h1>
        {user && (
          <div className="flex items-center">
            <span className="mr-4">{user.displayName || user.nombre}</span>
            <button
              onClick={logout}
              className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200 transition"
            >
              Logout
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

// ---------------- Loader profesional ----------------
function Loader({ message }) {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mb-4"></div>
      <p className="text-gray-700 text-lg">{message}</p>
    </div>
  );
}

// ---------------- Rutas con lógica actual ----------------
function AppRoutes() {
  const { user, profileCompleted, checkingProfile } = useContext(AuthContext);
  const location = useLocation();

  if (checkingProfile) return <Loader message="Cargando perfil..." />;

  const isRootOrLogin = ["/", "/login"].includes(location.pathname);

  if (user && !profileCompleted && isRootOrLogin) {
    return <Navigate to="/perfil" replace />;
  }

  if (user && profileCompleted && isRootOrLogin) {
    return <Navigate to="/home" replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/perfil"
        element={
          user ? (
            <Layout>
              <PerfilPage />
            </Layout>
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route
        path="/home"
        element={
          user && profileCompleted ? (
            <Layout>
              <HomePage />
            </Layout>
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route
        path="/revision/:id"
        element={
          <Layout>
            <RevisionPage />
          </Layout>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

// ---------------- Export principal ----------------
export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
