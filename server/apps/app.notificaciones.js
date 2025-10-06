import express from 'express';
import notificacionRoutes from '../routes/notificaciones.js';

const app = express();
app.use(express.json());
app.use('/api/notificaciones', notificacionRoutes);

export default app;