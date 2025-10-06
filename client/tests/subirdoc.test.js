import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import SubirDocumento from '../src/components/SubirDocumento.js';

// Mock global fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ id: 'doc123', titulo: 'Mi documento' }),
  })
);

test('sube un documento y muestra mensaje de éxito', async () => {
  render(<SubirDocumento />);

  // Input de texto por placeholder
  const inputTitulo = screen.getByPlaceholderText(/título del documento/i);
  fireEvent.change(inputTitulo, { target: { value: 'Mi documento' } });

  // Buscar el input de archivo por tipo directamente
  // eslint-disable-next-line testing-library/no-node-access
  const fileInput = screen.getByRole('button', { name: /subir/i }).form.querySelector('input[type="file"]');
  expect(fileInput).not.toBeNull();

  // Simular selección de archivo
  const archivoSimulado = new File(['contenido'], 'archivo.txt', { type: 'text/plain' });
  fireEvent.change(fileInput, { target: { files: [archivoSimulado] } });

  // Enviar formulario
  fireEvent.click(screen.getByRole('button', { name: /subir/i }));

  // Esperar mensaje de éxito
  await waitFor(() => {
    expect(screen.getByText(/documento subido con éxito/i)).toBeInTheDocument();
  });

  // Verificar llamada a fetch
  expect(global.fetch).toHaveBeenCalledWith(
    'http://localhost:5000/api/documentos',
    expect.objectContaining({
      method: 'POST',
      body: expect.any(FormData),
    })
  );
});