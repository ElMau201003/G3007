import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../apps/app.reportes.js';

let mongo;
beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
});
afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

test('GET /api/reportes/:id devuelve reporte inexistente', async () => {
  const res = await request(app).get('/api/reportes/123');
  expect(res.statusCode).toBe(404);
});