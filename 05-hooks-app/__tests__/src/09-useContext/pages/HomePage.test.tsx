import React from "react";
import { render, screen } from "@testing-library/react";
import { HomePage } from "../../../../src/09-useContext/pages/HomePage";
import {
  User,
  UserContext,
} from "../../../../src/09-useContext/context/UserContext";

describe("Testing in HomePage.tsx", () => {
  const user: User = {
    id: 1,
    name: "Gohan",
    email: "gohan@gmail.com",
    role: "SAIYAN",
  };

  test("Should to show the component without the snapshop.", () => {
    render(
      <UserContext.Provider value={{ user: null, setUser: () => {} }}>
        <HomePage />
      </UserContext.Provider>
    );
    // screen.debug();
    const preTag = screen.getByLabelText("pretag");
    expect(preTag.innerHTML).toBe("null");
  });

  test("Should to be show the component with the logged user.", () => {
    render(
      <UserContext.Provider value={{ user: user, setUser: () => {} }}>
        <HomePage />
      </UserContext.Provider>
    );
    const preTag = screen.getByLabelText("pretag");
    expect(preTag.innerHTML).toContain(user.id.toString());
    expect(preTag.innerHTML).toContain(user.name);
    expect(preTag.innerHTML).toContain(user.email);
    expect(preTag.innerHTML).toContain(user.role);
  });

});
