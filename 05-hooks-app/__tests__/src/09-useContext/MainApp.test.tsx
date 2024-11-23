import React from "react";
import { render, screen } from "@testing-library/react";
import { MainApp } from "../../../src/09-useContext/MainApp";
import { MemoryRouter } from "react-router-dom";

describe("Testing in MainApp.tsx", () => {
  test("Show to be show the Home Page", () => {
    render(
      <MemoryRouter>
        <MainApp />
      </MemoryRouter>
    );
    // screen.debug();
    expect(screen.getByText('Home Page')).toBeTruthy();
  });

  // Navego a la ruta de Login con router
  test("Show to be show the Login Page", () => {
    render(
      <MemoryRouter initialEntries={['/auth/login']}>
        <MainApp />
      </MemoryRouter>
    );
    // screen.debug();
    expect(screen.getByText('Login Page')).toBeTruthy();
  });
});
