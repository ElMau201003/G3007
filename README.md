# G3007 – Proyecto MERN: Revisor Académico

## 📌 Descripción del Proyecto
Revisor Académico es un proyecto web desarrollado con el stack MERN (MongoDB, Express, React, Node.js), orientado a estudiantes y docentes universitarios para mejorar la calidad de los escritos académicos.  

Este repositorio contiene la **Iteración 0**, incluyendo documentación del proyecto, backlog inicial, acuerdos de equipo y el Walking Skeleton funcional (frontend + backend + conexión a base de datos).

---

## 🎯 Objetivos de la Iteración 0
- Diseñar y documentar la Iteración 0 de un proyecto web con MERN bajo un enfoque ágil.
- Elaborar el Project Charter como documento base del proyecto.
- Configurar la estructura inicial del proyecto, incluyendo repositorio, ramas y dependencias mínimas.
- Implementar un **Walking Skeleton** funcional: backend con Express + MongoDB y frontend con React.

---

## 🗂️ Contenido del Repositorio
```bash
G3007/
├─ server/         # Backend Express + MongoDB
├─ client/         # Frontend React
└─ README.md       # Documentación general del proyecto
 

```

---

## 📄 Documentación incluida
1. **Project Charter**  
   - Propósito y justificación del proyecto  
   - Objetivos generales  
   - Alcance inicial  
   - Supuestos y restricciones  
   - Identificación de stakeholders  
   - Roles y responsabilidades del equipo  

2. **Backlog inicial**  
   - Epic central desglosado  
   - Historias de usuario (6–8) priorizadas con INVEST  

3. **Acuerdos de equipo**  
   - Canales de comunicación  
   - Horarios de reunión  
   - Definition of Done  
   - Roles iniciales  

4. **Arquitectura mínima (Walking Skeleton)**  
   - Backend: Express + MongoDB  
   - Frontend: React consumiendo el backend  
   - Evidencia de despliegue en la nube (Railway + Vercel)  

---

## 🚀 Instalación y ejecución local

### 1. Clonar el repositorio
```bash
git clone https://github.com/ElMau201003/G3007.git
cd G3007
```

### 2. Backend

```bash
cd server
npm install
# Crear archivo .env con:
# MONGO_URI=<tu_mongodb_uri>
npm run dev
```

* El backend estará disponible en `http://localhost:5000/api/hello`.

### 3. Frontend

```bash
cd ../client
npm install
# Crear archivo .env con:
# REACT_APP_API_URL=http://localhost:5000
npm start
```

* Abre `http://localhost:3000` en el navegador.

---

## 🌐 Despliegue en la nube

* **Backend:** Railway → [https://g3007.up.railway.app](https://g3007-production.up.railway.app/api/hello)
* **Frontend:** Vercel → [https://g3007.vercel.app](https://g3007-159xuindu-elmau201003s-projects.vercel.app/)

> Nota: el frontend consume el backend desplegado en Railway mediante variables de entorno.

---

## 🛠️ Tecnologías utilizadas

* Node.js & Express
* MongoDB / Mongoose
* React + Vite
* Axios
* Railway (backend deployment)
* Vercel (frontend deployment)

---

## 📝 Autor

Mauricio Gabriel Rivera Velazco – [GitHub](https://github.com/ElMau201003)

Yerson Medina Vertiz

---

## 📌 Licencia

Este proyecto es para fines académicos y de evaluación en el Taller de Proyectos 2 – Ingeniería de Sistemas e Informática.


