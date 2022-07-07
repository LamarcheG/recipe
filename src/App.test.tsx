import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(
    /Le texte ne sera plus rouge la on se calme/i
  );
  expect(linkElement).toBeInTheDocument();
});
