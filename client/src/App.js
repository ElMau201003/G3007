// src/App.js
import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext.js";
import LoginPage from "./pages/LoginPage.js";
import HomePage from "./pages/HomePage.js";
import PerfilPage from "./pages/PerfilPage.js";
import RevisionPage from "./pages/RevisionPage.js";

function AppRoutes() {
  const { user, profileCompleted } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const path = window.location.pathname;

    // ✅ Solo redirigir desde el login
    if (path === "/" || path === "/login") {
      if (user) {
        if (!profileCompleted) navigate("/perfil");
        else navigate("/home");
      }
    }
  }, [user, profileCompleted, navigate]);

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/perfil"
        element={user ? <PerfilPage /> : <Navigate to="/" replace />}
      />
      <Route
        path="/home"
        element={
          user && profileCompleted ? <HomePage /> : <Navigate to="/" replace />
        }
      />
      <Route path="/revision/:id" element={<RevisionPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
