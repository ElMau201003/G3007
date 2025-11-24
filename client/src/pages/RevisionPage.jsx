// src/pages/RevisionPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader.jsx";

export default function RevisionPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [revision, setRevision] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRevision = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/revisiones/${id}`);
        const data = await res.json();

        if (res.ok) {
          setRevision(data);
        } else {
          setError(data.message || "No se encontró la revisión");
        }
      } catch (err) {
        setError("Error al conectar con el servidor");
      } finally {
        setLoading(false);
      }
    };

    fetchRevision();
  }, [id]);

  if (loading) return <Loader message="Cargando revisión IA..." />;
  if (error) return <p className="text-red-500 text-center mt-6">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Revisión IA</h2>
          <button
            onClick={() => navigate("/home")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Volver
          </button>
        </header>

        {revision ? (
          <div className="space-y-6">
            <div>
              <p><strong>Gramática:</strong> {revision.precision_gramatica}%</p>
              <p><strong>Similitud de plagio:</strong> {revision.similitud_plagio}%</p>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2">Errores gramaticales</h4>
              {revision.errores_gramaticales?.length > 0 ? (
                <ul className="list-disc list-inside text-gray-700">
                  {revision.errores_gramaticales.map((e, i) => (
                    <li key={i}>{e}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No se encontraron errores gramaticales.</p>
              )}
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2">Posibles plagios</h4>
              {revision.plagio?.length > 0 ? (
                <ul className="list-disc list-inside text-gray-700">
                  {revision.plagio.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No se detectó plagio.</p>
              )}
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2">Citas detectadas</h4>
              {revision.citas?.length > 0 ? (
                <ul className="list-disc list-inside text-gray-700">
                  {revision.citas.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No se detectaron citas.</p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-gray-700">No se encontró la revisión.</p>
        )}
      </div>
    </div>
  );
}
