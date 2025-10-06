import { render, screen } from "@testing-library/react";
import RevisionPage from "./RevisionPage";

test("muestra mensaje de carga", () => {
  render(<RevisionPage />);
  expect(screen.getByText(/Analizando documento/)).toBeInTheDocument();
});