import request from 'supertest';
import app from '../apps/app.auth.js';

test('GET /api/auth/status responde con estado de autenticación', async () => {
  const res = await request(app).get('/api/auth/status');
  expect(res.statusCode).toBe(200);
  expect(res.body.authenticated).toBe(true);
}, 10000); // ⏱️ aumenta a 10 segundos