import { fireEvent, render, screen } from "@testing-library/react";
import { GifExpertApp } from "../src/GifExpertApp";

describe('Testing in ./src/GifExpertApp.ts', () => {
  test('Should to be match with the snapshot', () => {
    const {container} = render(<GifExpertApp />);
    expect( container ).toMatchSnapshot();
  });

  test('Should to add a new category konosuba in uppercase', () => {
    render(<GifExpertApp />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    const form = screen.getByRole('form');
    fireEvent.input(input, {target: {value: 'konosuba'}});
    fireEvent.submit(form);

    // Que se limpie despues de la peticion
    expect(input.value).toBe("");

    // Que el valor que se pinte en la pantalla sea konosuba en mayusculas
    expect(screen.getByRole('heading', {level: 3}).innerHTML).toBe('KONOSUBA');
    expect(screen.getByText('KONOSUBA')).toBeTruthy();
  });

  test('Should not agree the category KONOSUBA to times', () => {
    render(<GifExpertApp />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    const form = screen.getByRole('form');
    fireEvent.input(input, {target: {value: 'konosuba'}});
    fireEvent.submit(form);

    fireEvent.input(input, {target: {value: 'konosuba'}});
    fireEvent.submit(form);

    expect(input.value).toBe("");

    // Que a pesar de escribir konosuba dos veses en la pantalla solo haya una vez
    expect(screen.getAllByRole('heading', {level: 3}).length).toBe(1);
  });
});