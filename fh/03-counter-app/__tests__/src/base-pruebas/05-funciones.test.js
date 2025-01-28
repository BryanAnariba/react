import { getUser, getUsuarioActivo } from "../../../src/base-pruebas/05-funciones";

describe("Test in src/base-pruebas/05-functions.js", () => {
  test("getUser() should to be and object", () => {
    const testUser = {
      uid: "ABC123",
      username: "El_Papi1502",
    };
    const user = getUser();
    expect(user).toEqual(testUser);
  });

  test("getActiveUser() should to be an object", () => {
    const name = 'VEGETA';
    const testActiveUser = {
      uid: "ABC567",
      username: name,
    };
    const activeUser = getUsuarioActivo(name);
    expect(activeUser).toEqual(testActiveUser);
  });
});
