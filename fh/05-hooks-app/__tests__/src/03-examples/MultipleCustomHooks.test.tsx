import React from "react";
import { render, screen } from "@testing-library/react";
import { MultipleCustomHooks } from "../../../src/03-examples/MultipleCustomHooks";
import { useFetch } from "../../../src/hooks/useFetch";

// Mock completo, llamar en nest para las variables de entorno
// jest.mock("../../../src/hooks/useFetch");

describe("Testing in MultipleCustomHooks.tsx", () => {
  test("Should to show the default component", () => {
    render(<MultipleCustomHooks />);
    // screen.debug();
    expect(screen.getByText("Loading..."));
    expect(screen.getByText("Pokemons App"));
    expect(screen.getByRole("button", { name: "Previus" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Next" })).toBeTruthy();
  });

  test("Should to show a quote.", () => {
    // Mock completo del useFetch
    render(<MultipleCustomHooks />);
  });
});
