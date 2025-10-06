import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App.js';

// Mock del contexto de autenticación
jest.mock('./context/AuthContext.js', () => ({
  AuthContext: {
    Provider: function Provider(props) {
      return props.children;
    },
  },
}));

// Mock de las páginas (usando require dentro del factory)
jest.mock('./pages/LoginPage.js', () => {
  const React = require('react');
  return function LoginPage() {
    return React.createElement('div', null, 'LoginPage');
  };
});
jest.mock('./pages/HomePage.js', () => {
  const React = require('react');
  return function HomePage() {
    return React.createElement('div', null, 'HomePage');
  };
});
jest.mock('./pages/PerfilPage.js', () => {
  const React = require('react');
  return function PerfilPage() {
    return React.createElement('div', null, 'PerfilPage');
  };
});
jest.mock('./pages/RevisionPage.js', () => {
  const React = require('react');
  return function RevisionPage() {
    return React.createElement('div', null, 'RevisionPage');
  };
});

test('renderiza LoginPage en la ruta raíz', () => {
  render(
    React.createElement(
      MemoryRouter,
      { initialEntries: ['/'] },
      React.createElement(App)
    )
  );

  expect(screen.getByText(/LoginPage/i)).toBeInTheDocument();
});