import { createContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase.js";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [checkingProfile, setCheckingProfile] = useState(true);

  // 🔹 Login con Google
  const loginWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    setUser(result.user);
  };

  // 🔹 Registro con correo y contraseña
  const registerWithEmail = async (email, password) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    setUser(result.user);
  };

  // 🔹 Login con correo y contraseña
  const loginWithEmail = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    setUser(result.user);
  };

  // 🔹 Logout
  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  // 🔹 Escuchar cambios de sesión
  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
    setCheckingProfile(true); // ⏳ empieza la verificación

    if (firebaseUser) {
      try {
        const res = await fetch(`http://localhost:4000/api/usuarios/${firebaseUser.uid}`);
        if (res.ok) {
          const data = await res.json();
          setUser(data);
          setProfileCompleted(data.perfilCompleto === true);
        } else {
          setUser(firebaseUser);
          setProfileCompleted(false);
        }
      } catch (error) {
        console.error("Error al verificar perfil:", error);
        setProfileCompleted(false);
      }
    } else {
      setUser(null);
      setProfileCompleted(false);
    }

    setCheckingProfile(false); // ✅ termina la verificación
  });

  return () => unsubscribe();
}, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loginWithGoogle,
        registerWithEmail,
        loginWithEmail,
        logout,
        profileCompleted,
        setProfileCompleted,
        checkingProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
