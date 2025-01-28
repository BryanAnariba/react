import { fireEvent, getByText, render, screen } from "@testing-library/react";
import { CounterApp } from "../../src/CounterApp";

describe('Testing in ./src/CounterApp.jsx file', () => {
  const value = 100;
  test('Should to be match with the snapshot', () => {
    const {container} = render(<CounterApp value={value} />);
    expect(container).toMatchSnapshot();
  });

  test(`Should to show the initial value with ${value}`, () => {
    render(<CounterApp value={value} />);
    expect(screen.getByText(value)).toBeTruthy();
  });

  // Simulando click en botones
  test('Should to be increment clicking in the button +1', () => {
    render(<CounterApp value={value} />);
    fireEvent.click(screen.getByText('+1'));
    expect(screen.getByText('101')).toBeTruthy();
  });

  test('Should to be decrement clicking in the button -1', () => {
    render(<CounterApp value={value} />);
    fireEvent.click(screen.getByText('-1'));
    expect(screen.getByText('99')).toBeTruthy();
  });

  test('Should to be reset the value in the counter', () => {
    render(<CounterApp value={value} />);
    fireEvent.click(screen.getByRole('button', {name: 'btn-reset'}));
    expect(screen.getByText(value)).toBeTruthy();
  });
});