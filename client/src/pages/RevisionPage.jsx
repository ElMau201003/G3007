// src/pages/RevisionPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader.jsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  ArrowDownTrayIcon,
  ArrowUturnLeftIcon,
  BookOpenIcon,
  ExclamationTriangleIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/solid";

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
    doc.setFontSize(18);
    doc.text("Reporte de Revisión IA", 14, 20);

    doc.setFontSize(12);
    doc.text(`Gramática: ${revision.precision_gramatica}%`, 14, 30);
    doc.text(`Similitud de plagio: ${revision.similitud_plagio}%`, 14, 36);

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
  if (error)
    return (
      <p className="text-red-500 dark:text-red-400 text-center mt-6 flex items-center justify-center gap-2">
        <ExclamationTriangleIcon className="h-5 w-5" />
        {error}
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-800 dark:text-gray-100">
            <BookOpenIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            Revisión IA
          </h2>
          <div className="flex gap-2">
            <button
              onClick={generarPDF}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded 
                         hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 transition"
            >
              <ArrowDownTrayIcon className="h-5 w-5" />
              Descargar PDF
            </button>
            <button
              onClick={() => navigate("/home")}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded 
                         hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
            >
              <ArrowUturnLeftIcon className="h-5 w-5" />
              Volver
            </button>
          </div>
        </header>

        {revision && (
          <div className="space-y-6">
            <div>
              <p className="text-gray-700 dark:text-gray-200">
                <strong>Gramática:</strong> {revision.precision_gramatica}%
              </p>
              <p className="text-gray-700 dark:text-gray-200">
                <strong>Similitud de plagio:</strong> {revision.similitud_plagio}%
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2 flex items-center gap-2 text-gray-800 dark:text-gray-100">
                <BookOpenIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Errores gramaticales
              </h4>
              {revision.errores_gramaticales?.length > 0 ? (
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-200">
                  {revision.errores_gramaticales.map((e, i) => (
                    <li key={i}>{e}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  No se encontraron errores gramaticales.
                </p>
              )}
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2 flex items-center gap-2 text-gray-800 dark:text-gray-100">
                <ExclamationTriangleIcon className="h-5 w-5 text-red-600 dark:text-red-400" />
                Posibles plagios
              </h4>
              {revision.plagio?.length > 0 ? (
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-200">
                  {revision.plagio.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  No se detectó plagio.
                </p>
              )}
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2 flex items-center gap-2 text-gray-800 dark:text-gray-100">
                <ChatBubbleLeftRightIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                Citas detectadas
              </h4>
              {revision.citas?.length > 0 ? (
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-200">
                  {revision.citas.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  No se detectaron citas.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}