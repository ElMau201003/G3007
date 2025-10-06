
# G3007 – Proyecto MERN: Revisor Académico

![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)
![CI](https://github.com/ElMau201003/G3007/actions/workflows/ci.yml/badge.svg)

## 📌 Descripción del Proyecto

Revisor Académico es una aplicación web desarrollada con el stack **MERN** (MongoDB, Express, React, Node.js) y autenticación con **Firebase**, orientada a estudiantes y docentes universitarios para mejorar la calidad de los escritos académicos mediante revisiones automáticas.

Esta versión corresponde al **Sprint 1**, incluyendo autenticación, subida de documentos y listado de archivos por usuario.

---

## 🎯 Objetivos del Sprint 1

- Autenticación de usuarios con **Firebase Authentication** (Google Sign-In)
- Subida de documentos desde el frontend al backend usando **Multer**
- Almacenamiento de documentos en **MongoDB** con relación `usuario_id → documento`
- Listado de documentos del usuario logueado con enlaces para visualizarlos
- Arquitectura funcional tipo Walking Skeleton con pruebas locales

---

## 🗂️ Estructura del Proyecto

```bash
G3007/
├─ server/         # Backend Express + MongoDB + rutas de documentos y auth
│  ├─ models/      # Modelos Mongoose (Usuario, Documento)
│  ├─ routes/      # Rutas de autenticación y documentos
│  └─ uploads/     # Archivos subidos localmente
├─ client/         # Frontend React + Firebase Auth
├─ tests/          # Pruebas unitarias e integración (Jest + Testing Library)
├─ README.md       # Este archivo
└─ package.json
```

---

## 📄 Funcionalidades Implementadas

### 🔹 Backend

- Express + Node.js
- MongoDB con Mongoose (`usuarios`, `documentos`)
- Rutas principales:
  - `POST /api/auth/google-login` → Login con Firebase
  - `POST /api/documentos` → Subida de documento
  - `GET /api/documentos/usuario/:usuarioId` → Listado por usuario
- Servir archivos estáticos desde `uploads/`
- Validación de `ObjectId` para relaciones usuario-documento

### 🔹 Frontend

- React con Context API (`AuthContext`)
- Login con Google (Firebase)
- Formulario para subir documentos (`título + archivo`)
- Listado dinámico de documentos del usuario con enlaces

---

## 🧪 Ejecución de Pruebas

### 🔹 Frontend

```bash
cd client
npm test
```

Para ver cobertura:

```bash
npm test -- --coverage
```

### 🔹 Backend

```bash
cd server
npm test
```

> Las pruebas incluyen validación de subida de documentos, respuesta del servidor y simulación de autenticación.

---

## 🚀 Instalación y Ejecución Local

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/ElMau201003/G3007.git
cd G3007
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

## 🌐 Despliegue en la Nube

- **Backend:** Railway → `https://g3007.up.railway.app`
- **Frontend:** Vercel → `https://g3007.vercel.app`

> El frontend consume el backend desplegado mediante variables de entorno.

---

## 🛠️ Tecnologías Utilizadas

- Node.js & Express
- MongoDB / Mongoose
- React
- Firebase Authentication (Google Sign-In)
- Multer (subida de archivos)
- Fetch / Axios
- Jest + React Testing Library
- Railway (backend)
- Vercel (frontend)
- GitHub Actions (CI/CD)

---

## 📝 Autores

- Mauricio Gabriel Rivera Velazco  
- Yerson Medina Vertiz

---

## 📌 Licencia

Este proyecto es para fines académicos y de evaluación en el Taller de Proyectos 2 – Ingeniería de Sistemas e Informática.

---

