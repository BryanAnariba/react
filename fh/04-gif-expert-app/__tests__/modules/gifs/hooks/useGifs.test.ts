import { renderHook, waitFor } from "@testing-library/react";
import { useGifs } from "../../../../src/modules/gifs/hooks";

const category: string = 'Konosuba';

describe('Testing in ./src/modules/gifs/hooks/useGifs.ts', () => {
  test('Should to return the initial state: an empty array and is loading in true', () => {
    // para usar un hook debe ser dentro de un funtional component, pero con render hook funciona
    const { result } = renderHook(() => useGifs(category));
    const { gifs, isLoading } = result.current;

    // Estado inicial apenas se renderiza el componente debe ser 0 y false
    expect(gifs.length).toBe(0);
    expect(isLoading).toBeTruthy();
  });

  test('Should to return and gifs array and is loading in false', async () => {
    // para usar un hook debe ser dentro de un funtional component, pero con render hook funciona
    const { result } = renderHook(() => useGifs(category));
    await waitFor(
      () => expect(result.current.gifs.length).toBeGreaterThan(0),
      {
        timeout: 5000, // si en 5 segundos no ejecuta la peticion, esto lanza un error
      }
    );
    const { gifs, isLoading } = result.current;
    expect(gifs.length).toBeGreaterThan(0);
    expect(isLoading).toBeFalsy();
  });
});