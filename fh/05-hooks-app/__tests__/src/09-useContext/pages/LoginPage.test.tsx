import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { UserContext } from "../../../../src/09-useContext/context/UserContext";
import { LoginPage } from "../../../../src/09-useContext/pages/LoginPage";

describe("Testing in LoginPage.tsx", () => {
  test("Should to show the component without the user.", () => {
    render(
      <UserContext.Provider value={{ user: null, setUser: () => {} }}>
        <LoginPage />
      </UserContext.Provider>
    );
    const preTag = screen.getByLabelText("pretag");
    expect(preTag.innerHTML).toBe("null");
  });

  test("Should to call the setUser when you make click on the button.", () => {
    const setUserMock = jest.fn();
    render(
      <UserContext.Provider value={{ user: null, setUser: setUserMock }}>
        <LoginPage />
      </UserContext.Provider>
    );
    const btn = screen.getByLabelText("btnLogin");
    fireEvent.click(btn);
    expect(setUserMock).toHaveBeenCalledWith({
      email: "gohan@gmail.com",
      id: 1,
      name: "Gohan",
      role: "SAIYAN",
    });
  });
});
