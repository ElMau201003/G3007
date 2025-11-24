---

# G3007 – Proyecto MERN: Revisor Académico

![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)  
![CI](https://github.com/ElMau201003/G3007/actions/workflows/ci.yml/badge.svg)

---

## 📌 Descripción del Proyecto

**Revisor Académico** es una aplicación web desarrollada con el stack **MERN** (MongoDB, Express, React, Node.js) y autenticación con **Firebase**, orientada a estudiantes y docentes universitarios para mejorar la calidad de los escritos académicos mediante **revisiones automáticas de IA**.

El proyecto evolucionó desde un **Walking Skeleton** inicial hasta un sistema completo con:

- Autenticación de usuarios  
- Subida y gestión de documentos  
- Historial de revisiones IA con métricas (gramática, plagio, citas)  
- Navegación clara mediante **Dashboard + Sidebar**  
- Pruebas end-to-end con **Cypress** para validar el flujo completo del usuario  

---

## 🎯 Objetivos alcanzados

- Autenticación de usuarios con **Firebase Authentication** (Google Sign-In y login manual)  
- Subida de documentos desde el frontend al backend usando **Multer**  
- Almacenamiento de documentos en **MongoDB** con relación `usuario_id → documento`  
- Listado de documentos del usuario logueado con acciones (ver, eliminar, estado)  
- Historial de revisiones IA solo para documentos **finalizados**  
- Arquitectura modular y mantenible (backend + frontend separados)  
- Pruebas Cypress cubriendo login, subida, revisión, eliminación y logout  

---

## 🗂️ Estructura del Proyecto

```bash
G3007/
├─ server/         # Backend Express + MongoDB + rutas de documentos y revisiones
│  ├─ models/      # Modelos Mongoose (Usuario, Documento, Revision)
│  ├─ routes/      # Rutas de autenticación, documentos y revisiones
│  └─ uploads/     # Archivos subidos localmente
├─ client/         # Frontend React + Firebase Auth + TailwindCSS
│  ├─ src/pages/   # HomePage, PerfilPage, DocumentosPage, RevisionesPage
│  ├─ src/layouts/ # DashboardLayout con sidebar y navbar
│  └─ src/context/ # AuthContext para sesión
├─ tests/          # Pruebas unitarias e integración (Jest + Testing Library)
├─ cypress/        # Pruebas end-to-end (login, subida, revisión, eliminación)
├─ README.md       # Este archivo
└─ package.json
```

---

## 📄 Funcionalidades Implementadas

### 🔹 Backend
- Express + Node.js  
- MongoDB con Mongoose (`usuarios`, `documentos`, `revisiones`)  
- Rutas principales:  
  - `POST /api/auth/google-login` → Login con Firebase  
  - `POST /api/documentos` → Subida de documento  
  - `GET /api/documentos/usuario/:usuarioId` → Listado por usuario  
  - `GET /api/documentos/usuario/:usuarioId/finalizados` → Documentos finalizados para RevisionesPage  
  - `POST /api/revisiones/:documentoId` → Generar revisión IA  
  - `GET /api/revisiones/:documentoId` → Obtener revisión de un documento  
- Servir archivos estáticos desde `uploads/`  
- Validación de `ObjectId` para relaciones usuario-documento  

### 🔹 Frontend
- React con Context API (`AuthContext`)  
- Login con Google y login manual (Firebase)  
- **Dashboard** con subida de documentos y métricas generales  
- **Sidebar** con navegación clara: Dashboard, Perfil, Documentos, Revisiones  
- **DocumentosPage** → listado, ver archivo, eliminar  
- **RevisionesPage** → historial de revisiones IA solo de documentos finalizados  
- **RevisionPage** → detalle de métricas de cada revisión  
- UI con **TailwindCSS + Heroicons**  

---

## 🧪 Ejecución de Pruebas

### 🔹 Unitarias (Frontend + Backend)

```bash
cd client
npm test
npm test -- --coverage

cd ../server
npm test
```

### 🔹 End-to-End (Cypress)

```bash
cd client
npx cypress open
```

Pruebas incluidas:
- Login y logout  
- Subida de documento  
- Generación de revisión IA  
- Eliminación de documento  
- Flujo completo de usuario  

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
- Firebase Authentication (Google Sign-In + login manual)  
- Multer (subida de archivos)  
- TailwindCSS + Heroicons (UI)  
- Jest + React Testing Library  
- Cypress (E2E)  
- Railway (backend)  
- Vercel (frontend)  
- GitHub Actions (CI/CD)  

---

## 📝 Autores

- Mauricio Gabriel Rivera Velazco  
- Yerson Medina Vertiz  

---

## 📌 Licencia

Este proyecto es para fines académicos y de evaluación en el **Taller de Proyectos 2 – Ingeniería de Sistemas e Informática**.

---

