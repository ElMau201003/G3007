import { createContext, useState, useEffect } from "react";
import { auth, loginWithGoogle, logout } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Aquí puedes llamar al backend para registrar/obtener usuario
        const res = await fetch("http://localhost:4000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firebase_uid: firebaseUser.uid,
            nombre: firebaseUser.displayName?.split(" ")[0] || "",
            apellido: firebaseUser.displayName?.split(" ")[1] || "",
            correo: firebaseUser.email,
          }),
        });
        const data = await res.json();
        setUser(data);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
