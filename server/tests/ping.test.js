import request from 'supertest';
import app from '../apps/app.ping.js';

test('GET /ping responde correctamente', async () => {
  const res = await request(app).get('/ping');
  expect(res.statusCode).toBe(200);
  expect(res.body.pong).toBe(true);
}, 10000);