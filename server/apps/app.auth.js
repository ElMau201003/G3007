import express from 'express';

const app = express();

app.get('/api/auth/status', (req, res) => {
  console.log('✅ Ruta /api/auth/status alcanzada');
  res.json({ authenticated: true });
});

export default app;