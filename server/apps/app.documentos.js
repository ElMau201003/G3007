import express from 'express';
import documentoRoutes from '../routes/documentos.js';

const app = express();
app.use(express.json());
app.use('/api/documentos', documentoRoutes);

export default app;