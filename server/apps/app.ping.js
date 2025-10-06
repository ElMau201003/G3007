import express from 'express';

const app = express();

app.get('/ping', (req, res) => {
  console.log('✅ Ping recibido');
  res.json({ pong: true });
});

export default app;