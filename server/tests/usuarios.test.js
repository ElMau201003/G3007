import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../apps/app.usuarios.js'; // registra solo /api/usuarios
import Usuario from '../models/usuario.js';

let mongo;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri);
});

afterEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

test('PUT /api/usuarios/:uid crea usuario válido', async () => {
  const res = await request(app).put('/api/usuarios/test-uid').send({
    nombre: 'Mauricio',
    apellido: 'Copilot',
    rol: 'estudiante',
    correo: 'test@example.com',
  });

  expect(res.statusCode).toBe(200);
  expect(res.body.nombre).toBe('Mauricio');
  expect(res.body.perfilCompleto).toBe(true);

  const usuarioEnDB = await Usuario.findOne({ firebase_uid: 'test-uid' });
  expect(usuarioEnDB).not.toBeNull();
  expect(usuarioEnDB.correo).toBe('test@example.com');
});