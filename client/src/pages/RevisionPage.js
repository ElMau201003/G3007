  // src/pages/RevisionPage.js
  import React, { useEffect, useState } from "react";
  import { useParams } from "react-router-dom";

  function RevisionPage() {
    const { id } = useParams();
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

    if (loading) return <p>Analizando documento con IA...</p>;
    if (error) return <p>❌ {error}</p>;

    return (
      <div style={{ padding: "2rem" }}>
        <h2>Revisión IA</h2>
        {revision ? (
          <>
            <p><strong>Gramática:</strong> {revision.precision_gramatica}%</p>
            <p><strong>Similitud de plagio:</strong> {revision.similitud_plagio}%</p>

            <h4>Errores gramaticales</h4>
            <ul>
              {revision.errores_gramaticales?.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>

            <h4>Posibles plagios</h4>
            <ul>
              {revision.plagio?.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>

            <h4>Citas detectadas</h4>
            <ul>
              {revision.citas?.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </>
        ) : (
          <p>No se encontró la revisión</p>
        )}
      </div>
    );
  }

  export default RevisionPage;
