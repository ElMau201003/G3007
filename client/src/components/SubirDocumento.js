import React, { useState } from "react";

function SubirDocumento() {
  const [archivo, setArchivo] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!archivo) {
      setMensaje("Por favor selecciona un archivo.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("titulo", titulo);
    formData.append("usuario_id", "id_usuario_prueba"); // luego usar uid de Firebase

    try {
      const res = await fetch("http://localhost:5000/api/documentos", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setMensaje("✅ Documento subido con éxito");
        console.log("Documento:", data);
        setTitulo("");
        setArchivo(null);
      } else {
        setMensaje("❌ Error: " + data.error);
      }
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Subir Documento
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Título del documento"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="file"
            onChange={(e) => setArchivo(e.target.files[0])}
            required
            className="w-full"
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition duration-200
              ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {loading ? "Subiendo..." : "Subir Documento"}
          </button>
        </form>
        {mensaje && (
          <p className={`mt-4 text-center font-medium ${mensaje.includes("✅") ? "text-green-600" : "text-red-600"}`}>
            {mensaje}
          </p>
        )}
      </div>
    </div>
  );
}

export default SubirDocumento;
