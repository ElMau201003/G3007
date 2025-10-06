// app.js
import express from 'express';
import statusRoutes from '../routes/status.js';

const app = express();
app.use('/api/status', statusRoutes);

export default app;