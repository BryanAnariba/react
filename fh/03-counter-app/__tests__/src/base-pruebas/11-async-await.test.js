import { getImagen } from "../../../src/base-pruebas/11-async-await";

describe('Testing in ./src/base=pruebas/11-async-await.js', () => {
  test('getImagen() should return and image url', async () => {
    const url = await getImagen();
    expect(typeof url).toBe('string');
  });

  test('getImagen() should return an error', async () => {
    const url = await getImagen();
    expect(url).toBe('Image not found');
  });
});