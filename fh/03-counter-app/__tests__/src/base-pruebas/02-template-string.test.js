import { getSaludo } from "../../../src/base-pruebas/02-template-string";

describe("Test in src/base-pruebas/02-template-string.test.js", () => {
  test('getSaludo() should returns "Hello Goku Perez"', () => {
    const name = "Goku Perez";
    const message = getSaludo(name);
    expect(message).toBe("Hello Goku Perez");
  });
});
