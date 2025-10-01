# G3007 – Proyecto MERN: Revisor Académico

## 📌 Descripción del Proyecto

Revisor Académico es un proyecto web desarrollado con el stack **MERN** (MongoDB, Express, React, Node.js) y autenticación con **Firebase**, orientado a estudiantes y docentes universitarios para mejorar la calidad de los escritos académicos mediante revisiones automáticas.

Esta versión corresponde a la **Iteración / Sprint 1**, incluyendo funcionalidades de autenticación, gestión de documentos y listado de archivos del usuario.

---

## 🎯 Objetivos del Sprint 1

* Integrar autenticación de usuarios mediante **Firebase Authentication** (Google Sign-In).
* Permitir la **subida de documentos** desde el frontend al backend (Express + MongoDB) usando **Multer**.
* Guardar los documentos en **MongoDB** con la relación `usuario_id` → `Documento`.
* Mostrar en el frontend el **listado de documentos** del usuario logueado, con enlace para ver cada archivo.
* Mantener la arquitectura del Walking Skeleton funcional y probado localmente.

---

## 🗂️ Contenido del Repositorio

```
G3007/
├─ server/         # Backend Express + MongoDB + rutas de documentos y auth
├─ client/         # Frontend React + Firebase Auth + componentes de documentos
├─ uploads/        # Carpeta local para archivos subidos (backend)
└─ README.md       # Documentación general del proyecto
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

<<<<<<< HEAD
## 📄 Funcionalidades implementadas

### 🔹 Backend

* Express + Node.js
* MongoDB con Mongoose (colecciones: `usuarios`, `documentos`)
* Rutas:

  * `POST /api/auth/google-login` → Login con Firebase
  * `POST /api/documentos/` → Subir documento
  * `GET /api/documentos/usuario/:usuarioId` → Listar documentos por usuario
* Servir archivos estáticos desde `uploads/` (`app.use("/uploads", express.static("uploads"))`)
* Validación de `ObjectId` para relaciones entre usuarios y documentos

### 🔹 Frontend

* React con Context API (`AuthContext`) para manejar autenticación
* Login con **Google** usando Firebase
* Formulario de subida de documentos (`titulo + archivo`)
* Listado dinámico de documentos del usuario, con enlace para abrir cada archivo
=======
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
>>>>>>> develop

---

## 🚀 Instalación y ejecución local

### 1️⃣ Clonar repositorio

```bash
<<<<<<< HEAD
git clone https://github.com/ElMau201003/G3007.git
cd G3007
=======
git clone <URL_DEL_REPOSITORIO>
cd revisador-academico
>>>>>>> develop
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

<<<<<<< HEAD
Abre `http://localhost:3000` en el navegador.

---

## 🌐 Despliegue en la nube

* **Backend:** Railway → `https://g3007.up.railway.app`
* **Frontend:** Vercel → `https://g3007.vercel.app`

> Nota: el frontend consume el backend desplegado mediante variables de entorno.
=======
Abre `http://localhost:3000` en tu navegador.
>>>>>>> develop

---

## 🛠️ Tecnologías utilizadas

<<<<<<< HEAD
* **Node.js & Express**
* **MongoDB / Mongoose**
* **React**
* **Firebase Authentication** (Google Sign-In)
* **Multer** (subida de archivos local)
* **Axios / fetch** (peticiones HTTP)
* **Railway** (despliegue backend)
* **Vercel** (despliegue frontend)
=======
* Node.js & Express
* MongoDB / Mongoose
* React
* Firebase Authentication (Google Sign-In)
* Multer (subida de archivos local)
* Fetch / Axios (peticiones HTTP)
>>>>>>> develop

---

## 📝 Autores

* Mauricio Gabriel Rivera Velazco
* Yerson Medina Vertiz

---

## 📌 Licencia

Este proyecto es para fines académicos y de evaluación en el Taller de Proyectos 2 – Ingeniería de Sistemas e Informática.

---
