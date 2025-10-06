import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import { AuthContext } from "./context/AuthContext.js";
import LoginPage from "./pages/LoginPage.js";
import HomePage from "./pages/HomePage.js";
import PerfilPage from "./pages/PerfilPage.js";
import RevisionPage from "./pages/RevisionPage.js";

function AppRoutes() {
  const { user, profileCompleted, checkingProfile } = useContext(AuthContext);
  const location = useLocation();

  // ⏳ Esperar a que se verifique el perfil
  if (checkingProfile) return <div>Cargando perfil...</div>;

  // 🔁 Redirección segura desde raíz o login
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
      <Route
        path="/perfil"
        element={user ? <PerfilPage /> : <Navigate to="/" replace />}
      />
      <Route
        path="/home"
        element={
          user && profileCompleted ? (
            <HomePage />
          ) : (
            <Navigate to="/" replace />
          )
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