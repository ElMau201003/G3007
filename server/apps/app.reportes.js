import express from 'express';
import reporteRoutes from '../routes/reportes.js';

const app = express();
app.use(express.json());
app.use('/api/reportes', reporteRoutes);

export default app;