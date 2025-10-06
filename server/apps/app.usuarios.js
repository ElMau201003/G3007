import express from 'express';
import usuarioRoutes from '../routes/usuarios.js';

const app = express();
app.use(express.json());
app.use('/api/usuarios', usuarioRoutes);

export default app;