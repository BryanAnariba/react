import { render, screen } from "@testing-library/react";
import { FirstApp } from "../../src/FirstApp";

describe('Testing in ./src/FirstApp.jsx', () => {
  const title = 'Hello i am Goku Gomez';
  const subtitle = 'A caso con el pelo se estudia!';

  test('Should to be match with the snapshot', () => {
    const { container } = render(<FirstApp title={title} subtitle={subtitle} />);
    expect(container).toMatchSnapshot();
  });

  test('Should to show the message "Hello i am Goku Gomez"', () => {
    render(<FirstApp title={title} subtitle={subtitle} />);
    expect(screen.getByText(title)).toBeTruthy();
  });

  test('Should to be show the title in h1 tag', () => {
    render(<FirstApp title={title} subtitle={subtitle} />);
    expect(screen.getByRole('heading', { level: 1 }).innerHTML).toContain(title);
  });

  test('Should to be show the subtitle sent by props', () => {
    render(<FirstApp title={title} subtitle={subtitle} />);
    expect(screen.getAllByText(subtitle).length).toBe(2);
  });
});