# G3007
# Revisor Académico – Sprint 1

## 📌 Descripción

Revisor Académico es una aplicación web desarrollada con **MERN** (MongoDB, Express, React, Node.js) y **Firebase Authentication**.
Está orientada a estudiantes y docentes para gestionar y revisar documentos académicos, permitiendo:

* Login con Google (Firebase Auth)
* Subida de documentos desde el frontend
* Almacenamiento de documentos en MongoDB
* Listado de documentos del usuario con enlace para visualizar cada archivo

> Esta versión corresponde al **Sprint 1**, incluyendo autenticación y gestión básica de documentos.

---

## 🗂️ Estructura del proyecto

```
revisador-academico/
├─ server/         # Backend Express + MongoDB
│  ├─ models/      # Modelos Mongoose (Usuario, Documento)
│  ├─ routes/      # Rutas de auth y documentos
│  └─ uploads/     # Archivos subidos localmente
├─ client/         # Frontend React + Firebase Auth
├─ README.md       # Este archivo
└─ package.json
```

---

## 🔹 Funcionalidades implementadas en Sprint 1

### Backend

* Express + Node.js
* MongoDB con Mongoose (`usuarios`, `documentos`)
* Autenticación con Firebase
* Rutas principales:

  * `POST /api/auth/google-login` → Login con Google
  * `POST /api/documentos` → Subida de documento
  * `GET /api/documentos/usuario/:usuarioId` → Listado de documentos por usuario
* Servir archivos estáticos desde `uploads/`
* Validación de ObjectId para relaciones usuario-documento

### Frontend

* React con Context API (`AuthContext`)
* Login con Google
* Formulario para subir documentos (`titulo + archivo`)
* Listado dinámico de documentos del usuario con enlace para abrir cada archivo

---

## 🚀 Instalación y ejecución local

### 1️⃣ Clonar repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd revisador-academico
```

### 2️⃣ Backend

```bash
cd server
npm install
# Crear archivo .env con:
# MONGO_URI=<tu_mongodb_uri>
npm run dev
```

El backend estará disponible en `http://localhost:4000`.

### 3️⃣ Frontend

```bash
cd ../client
npm install
# Crear archivo .env con:
# REACT_APP_API_URL=http://localhost:4000
npm start
```

Abre `http://localhost:3000` en tu navegador.

---

## 🛠️ Tecnologías utilizadas

* Node.js & Express
* MongoDB / Mongoose
* React
* Firebase Authentication (Google Sign-In)
* Multer (subida de archivos local)
* Fetch / Axios (peticiones HTTP)

---

## 📝 Autores

* Mauricio Gabriel Rivera Velazco
* Yerson Medina Vertiz

---

## 📌 Licencia

Este proyecto es para fines académicos y de evaluación en el Taller de Proyectos 2 – Ingeniería de Sistemas e Informática.

---
