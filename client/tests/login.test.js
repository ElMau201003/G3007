import React from 'react'; // ✅ necesario para JSX
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../src/components/Login.jsx';
import { signInWithPopup } from 'firebase/auth';
import axios from 'axios';  

// ✅ Mocks primero
jest.mock('firebase/auth', () => ({
  signInWithPopup: jest.fn(),
  getAuth: jest.fn(),
  GoogleAuthProvider: jest.fn(),
}));

jest.mock('../src/firebase', () => ({
  auth: {},
  googleProvider: {},
}));

jest.mock('axios');


test('renderiza botón de login y realiza flujo de autenticación', async () => {
  // Mock de usuario y token
  const mockUser = {
    getIdToken: jest.fn().mockResolvedValue('fake-token'),
  };
  signInWithPopup.mockResolvedValue({ user: mockUser });
  axios.post.mockResolvedValue({ data: { nombre: 'Mauricio' } });

  render(<Login />);
  const boton = screen.getByText(/iniciar sesión con google/i);
  fireEvent.click(boton);

  // Espera a que se complete el flujo
  await screen.findByText(/revisador académico/i);

  expect(signInWithPopup).toHaveBeenCalled();
  expect(mockUser.getIdToken).toHaveBeenCalled();
  expect(axios.post).toHaveBeenCalledWith(
    'http://localhost:4000/api/auth/login',
    {},
    { headers: { Authorization: 'Bearer fake-token' } }
  );
});