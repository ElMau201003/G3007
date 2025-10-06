import request from 'supertest';
import app from '../app.status.js';

test('GET /api/status responde con ok:true', async () => {
  const res = await request(app).get('/api/status');
  expect(res.statusCode).toBe(200);
  expect(res.body.ok).toBe(true);
});