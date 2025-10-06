import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RevisionPage from "../src/pages/RevisionPage";

test("muestra mensaje de carga inicialmente", () => {
  render(
    <MemoryRouter>
      <RevisionPage />
    </MemoryRouter>
  );
  expect(screen.getByText(/Analizando documento/i)).toBeInTheDocument();
});