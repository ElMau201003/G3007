import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../apps/app.notificaciones.js';
import Usuario from '../models/usuario.js';

let mongo;
let usuario;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());

  // Crear usuario de prueba
  usuario = await Usuario.create({
    firebase_uid: 'test-uid',
    nombre: 'Mauricio',
    apellido: 'Copilot',
    correo: 'test@example.com',
    rol: 'estudiante',
    perfilCompleto: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

describe('Notificaciones API', () => {
  test('POST /api/notificaciones crea notificación válida', async () => {
    const res = await request(app).post('/api/notificaciones').send({
      usuario_id: usuario._id.toString(),
      mensaje: 'Tu revisión está lista',
      tipo: 'sistema',
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('mensaje', 'Tu revisión está lista');
    expect(res.body).toHaveProperty('usuario_id', usuario._id.toString());
  });

  test('POST /api/notificaciones falla si falta mensaje', async () => {
    const res = await request(app).post('/api/notificaciones').send({
      usuario_id: usuario._id.toString(),
      tipo: 'sistema',
    });

    expect(res.statusCode).toBe(500); // tu ruta devuelve 500 en error
    expect(res.body).toHaveProperty('error');
  });

  test('GET /api/notificaciones/usuario/:usuarioId devuelve lista de notificaciones', async () => {
    // Crear una notificación primero
    await request(app).post('/api/notificaciones').send({
      usuario_id: usuario._id.toString(),
      mensaje: 'Otra notificación',
      tipo: 'sistema',
    });

    const res = await request(app).get(`/api/notificaciones/usuario/${usuario._id.toString()}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('mensaje');
  });
});