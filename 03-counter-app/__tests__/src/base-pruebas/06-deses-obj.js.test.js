import { usContext } from "../../../src/base-pruebas/06-deses-obj";

describe('Testing for ./src/base-pruebas/06-deses-obj.js file', () => {
  test('usContext() should returns and person object.', () => {
    const person = {
      clave: 'Ironman',
      nombre: 'Tony',
      edad: 45,
      rango: 'Capitán',
    };
    const testPerson = usContext(person);
    expect(testPerson).toEqual({
      nombreClave: person.clave,
      anios: person.edad,
      latlng: {
        lat: 14.1232,
        lng: -12.3232
      }
    });
    ;
  });
});