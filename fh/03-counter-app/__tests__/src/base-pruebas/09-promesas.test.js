import { getHeroeByIdAsync } from "../../../src/base-pruebas/09-promesas";

describe('Test in ./src/base-pruebas/09-promesas.js', () => {
  // para pruebas asincronas
  test('getHeroeByIdAsync() should return an hero', (done) => {
    const id = 1;
    getHeroeByIdAsync(id).then(hero => {
      expect(hero).toEqual({
        id: 1,
        name: 'Batman',
        owner: 'DC'
      });
      done();
    });
  });

  test('getHeroeByIdAsync() should return an error if the hero was not found', (done) => {
    const id = 100000000000;
    getHeroeByIdAsync(id)
    .catch(error => {
      expect(error).toBe('No se pudo encontrar el héroe');
      done();
    });
  });
});