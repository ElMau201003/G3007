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
import DocumentosPage from "./pages/DocumentosPage.jsx";   // 👈 nuevo
import RevisionesPage from "./pages/RevisionesPage.jsx";   // 👈 nuevo

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
      {/* Login y recuperación */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Perfil */}
      <Route
        path="/perfil"
        element={user ? <PerfilPage /> : <Navigate to="/" replace />}
      />

      {/* Dashboard principal */}
      <Route
        path="/home"
        element={
          user && profileCompleted ? <HomePage /> : <Navigate to="/" replace />
        }
      />

      {/* Documentos */}
      <Route
        path="/documentos"
        element={user ? <DocumentosPage /> : <Navigate to="/" replace />}
      />

      {/* Revisiones */}
      <Route
        path="/revisiones"
        element={user ? <RevisionesPage /> : <Navigate to="/" replace />}
      />

      {/* Revisión IA individual */}
      <Route
        path="/revision/:id"
        element={user ? <RevisionPage /> : <Navigate to="/" replace />}
      />

      {/* Fallback */}
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