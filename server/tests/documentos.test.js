import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../apps/app.documentos.js';
import path from 'path';

let mongo;
let usuarioId = new mongoose.Types.ObjectId().toString(); // ID simulado

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

test('GET /api/documentos/:id devuelve documento inexistente', async () => {
  const res = await request(app).get('/api/documentos/123');
  expect(res.statusCode).toBe(404);
});

test('POST /api/documentos sube documento correctamente', async () => {
  const res = await request(app)
    .post('/api/documentos')
    .field('titulo', 'Documento prueba')
    .field('usuario_id', usuarioId)
    .attach('archivo', path.join(__dirname, 'archivos', 'prueba.txt')); // 👈 asegúrate que exista

  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveProperty('titulo', 'Documento prueba');
  expect(res.body).toHaveProperty('usuario_id', usuarioId);
});


test('GET /api/documentos/usuario/:id devuelve lista vacía inicialmente', async () => {
  const res = await request(app).get(`/api/documentos/usuario/${usuarioId}`);
  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});

test('DELETE /api/documentos/:id elimina documento existente', async () => {
  const doc = await request(app)
    .post('/api/documentos')
    .field('titulo', 'Documento a eliminar')
    .field('usuario_id', usuarioId)
    .attach('archivo', path.join(__dirname, 'archivos', 'prueba.txt'));

  const res = await request(app).delete(`/api/documentos/${doc.body._id}`);
  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveProperty('message', 'Documento eliminado correctamente'); // 👈 ajustado
});