// src/pages/RevisionPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader.jsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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

  const generarPDF = () => {
    if (!revision) return;

    const doc = new jsPDF();

    // Título principal
    doc.setFontSize(18);
    doc.text("Reporte de Revisión IA", 14, 20);

    // Subtítulo con métricas
    doc.setFontSize(12);
    doc.text(`Gramática: ${revision.precision_gramatica}%`, 14, 30);
    doc.text(`Similitud de plagio: ${revision.similitud_plagio}%`, 14, 36);

    // ---- Errores gramaticales ----
    let y = 46;
    doc.setFontSize(14);
    doc.text("Errores gramaticales", 14, y);

    if (revision.errores_gramaticales?.length > 0) {
      autoTable(doc, {
        startY: y + 4,
        head: [["#", "Error"]],
        body: revision.errores_gramaticales.map((e, i) => [i + 1, e]),
        theme: "striped",
        headStyles: { fillColor: [52, 152, 219] },
        styles: { fontSize: 10 },
      });
    } else {
      doc.setFontSize(12);
      doc.text("No se encontraron errores gramaticales.", 14, y + 10);
    }

    y = doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : y + 20;

    // ---- Posibles plagios ----
    doc.setFontSize(14);
    doc.text("Posibles plagios", 14, y);

    if (revision.plagio?.length > 0) {
      autoTable(doc, {
        startY: y + 6,
        head: [["#", "Texto sospechoso"]],
        body: revision.plagio.map((p, i) => [i + 1, p]),
        theme: "striped",
        headStyles: { fillColor: [231, 76, 60] },
        styles: { fontSize: 10 },
      });
    } else {
      doc.setFontSize(12);
      doc.text("No se detectó plagio.", 14, y + 12);
    }

    y = doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : y + 20;

    // ---- Citas detectadas ----
    doc.setFontSize(14);
    doc.text("Citas detectadas", 14, y);

    if (revision.citas?.length > 0) {
      autoTable(doc, {
        startY: y + 6,
        head: [["#", "Cita"]],
        body: revision.citas.map((c, i) => [i + 1, c]),
        theme: "striped",
        headStyles: { fillColor: [46, 204, 113] },
        styles: { fontSize: 10 },
      });
    } else {
      doc.setFontSize(12);
      doc.text("No se detectaron citas.", 14, y + 12);
    }

    doc.save(`reporte_revision_${id}.pdf`);
  };

  if (loading) return <Loader message="Cargando revisión IA..." />;
  if (error) return <p className="text-red-500 text-center mt-6">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Revisión IA</h2>
          <div className="flex gap-2">
            <button
              onClick={generarPDF}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Descargar PDF
            </button>
            <button
              onClick={() => navigate("/home")}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Volver
            </button>
          </div>
        </header>

        {revision && (
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
        )}
      </div>
    </div>
  );
}
