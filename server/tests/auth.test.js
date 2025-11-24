import request from 'supertest';
import app from '../apps/app.auth.js';

describe('Auth API', () => {
  test('GET /api/auth/status responde con estado de autenticación', async () => {
    const res = await request(app).get('/api/auth/status');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('authenticated', true);
  });
});