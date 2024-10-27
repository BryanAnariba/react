import { getHeroeById, getHeroesByOwner } from "../../../src/base-pruebas/08-imp-exp";

describe('Testing in ./src/base-pruebas/08-imo-exp.js', () => {

  test('getHeroeById() should return an hero', () => {
    const spiderman = {
      id: 2,
      name: 'Spiderman',
      owner: 'Marvel'
    };
    expect(getHeroeById(2)).toEqual(spiderman);
  });

  test('getHeroeById() should not return an hero', () => {
    expect(getHeroeById(22222222)).toBeFalsy();
  });

  test('getHeroesByOwner() should return an hero', () => {
    const dcHeroes = [
      {
        id: 1,
        name: 'Batman',
        owner: 'DC'
      }, {
        id: 3,
        name: 'Superman',
        owner: 'DC'
      },
      {
        id: 4,
        name: 'Flash',
        owner: 'DC'
      }];
    const heroes = getHeroesByOwner('DC');
    expect(heroes).toEqual(dcHeroes);
    expect(heroes).toHaveLength(3);
  });
});