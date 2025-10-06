import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../apps/app.notificaciones.js';
import Usuario from '../models/usuario.js';

let mongo;
beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

test('POST /api/notificaciones crea notificación válida', async () => {
  // 1. Crear usuario
  const usuario = await Usuario.create({
    firebase_uid: 'test-uid',
    nombre: 'Mauricio',
    apellido: 'Copilot', // ✅ campo requerido
    correo: 'test@example.com',
    rol: 'estudiante',
    perfilCompleto: true,
    });

  // 2. Crear notificación
  const res = await request(app).post('/api/notificaciones').send({
    usuario_id: usuario._id.toString(),
    mensaje: 'Tu revisión está lista',
    tipo: 'sistema',
  });

  expect(res.statusCode).toBe(201);
  expect(res.body.mensaje).toBe('Tu revisión está lista');
  expect(res.body.usuario_id).toBe(usuario._id.toString());
});