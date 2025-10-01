import { useState } from "react";

function SubirDocumento() {
  const [archivo, setArchivo] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!archivo) {
      setMensaje("Por favor selecciona un archivo.");
      return;
    }

    const formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("titulo", titulo);
    formData.append("usuario_id", "id_usuario_prueba"); // 👈 aquí luego pondremos el uid de Firebase

    try {
      const res = await fetch("http://localhost:5000/api/documentos", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setMensaje("✅ Documento subido con éxito");
        console.log("Documento:", data);
      } else {
        setMensaje("❌ Error: " + data.error);
      }
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error al conectar con el servidor");
    }
  };

  return (
    <div>
      <h2>Subir Documento</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título del documento"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <br />
        <input
          type="file"
          onChange={(e) => setArchivo(e.target.files[0])}
          required
        />
        <br />
        <button type="submit">Subir</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default SubirDocumento;
