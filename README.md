# G3007
# Revisor Académico - Walking Skeleton MERN

Proyecto de ejemplo para la Iteración 0 de Taller de Proyectos 2.  
Stack: **MongoDB + Express + React + Node.js** (MERN).

Este proyecto incluye:

- Backend con Express y conexión a MongoDB.
- Frontend con React consumiendo la API del backend.
- Endpoint de prueba `/api/hello` que devuelve un "Hello World".
- Despliegue inicial en Railway (backend) y Vercel (frontend) opcional.

---

## 🛠️ Requisitos

- Node.js v18+  
- npm v9+  
- MongoDB local o Atlas  
- Git

---

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/ElMau201003/G3007.git
cd G3007
```

### 2. Configurar backend

```bash
cd server
npm install
```

Crear archivo .env dentro de server con la URI de MongoDB:

```bash
MONGO_URI=mongodb://localhost:27017/revisor
PORT=5000
```

### 3. Configurar frontend

```bash
cd ../client
npm install
```

### ⚡ Ejecución
Backend (Express + MongoDB)
```bash
cd server
npm run dev
```


Deberías ver algo como:

```bash
✅ Conectado a MongoDB
Servidor corriendo en http://localhost:5000
```

Frontend (React)
```bash
cd ../client
npm start
```


Abre tu navegador en http://localhost:3000

Deberías ver:

```bash
👩‍💻 Revisor Académico
Conexión con backend:
Hola desde el backend 🚀
```

🔗 Despliegue en la nube

Backend: https://g3007-production.up.railway.app/api/hello

Frontend: https://g3007-159xuindu-elmau201003s-projects.vercel.app/

Sustituye las URLs reales cuando despliegues.


👥 Equipo

Mauricio Rivera Velazco
Yerson Medina Vertiz

📄 Licencia

Proyecto educativo para Taller de Proyectos 2.
