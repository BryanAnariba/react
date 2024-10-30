import { fireEvent, render, screen } from "@testing-library/react";
import { AddCategory } from "../../../../src/modules/gifs/components";

const name: string = 'category';
const id: string = 'category';
const placeholder: string = 'Write a category';
const inputValue: string = 'KONOSUBA';
const emptyInputValue: string = '';

describe('Testing in ./src/modules/gifs/components/AddCategiry.tsx', () => {

  // Simulando el tecleo de la category Konosuba
  test('Should to be change the value in the text box', () => {
    render(<AddCategory name={name} id={id} placeholder={placeholder} onReceiveCategory={() => { }} />)
    const input = screen.getByRole('textbox') as HTMLInputElement;
    // screen.debug();
    fireEvent.input(input, { target: { value: inputValue } });
    expect(input.value).toBe(inputValue);
  });

  // Disparar el submit del formulario y emitir al padre la funcion onReceiveCategory
  test('Should to be call onReceiveCategory if the input has a value', () => {
    const onReceiveCategory = jest.fn(); // ESTO ES UNA SIMULACION DE UNA FUNCION OJO COOL
    render(<AddCategory name={name} id={id} placeholder={placeholder} onReceiveCategory={onReceiveCategory} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    const form = screen.getByRole('form');

    fireEvent.input(input, { target: { value: inputValue } });
    fireEvent.submit(form);

    // El formulario se resetea despues de hacer el submit asi que testeamos eso
    expect(input.value).toBe("");

    // Verificamos que si el formulario hace submit en el fireEvent.submit() se ejecute esta funcion
    expect(onReceiveCategory).toHaveBeenCalled();
    expect(onReceiveCategory).toHaveBeenCalledTimes(1);
    expect(onReceiveCategory).toHaveBeenCalledWith(inputValue);
  });

  // Disparar el submit del formulario pero no emitir al padre la funcion onReceiveCategory
  test('Should not called onReceiveCategory if the input is empty', () => {
    const onReceiveCategory = jest.fn(); // ESTO ES UNA SIMULACION DE UNA FUNCION OJO COOL
    render(<AddCategory name={name} id={id} placeholder={placeholder} onReceiveCategory={onReceiveCategory} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    const form = screen.getByRole('form');
    fireEvent.input(input, { target: { value: emptyInputValue } });
    fireEvent.submit(form);
    expect(onReceiveCategory).not.toHaveBeenCalled();
  });
});