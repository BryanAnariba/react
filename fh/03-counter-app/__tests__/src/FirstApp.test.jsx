import { render } from "@testing-library/react";
import { FirstApp } from "../../src/FirstApp";

describe('Testing in ./src/FirstApp.jsx', () => {
  // test('Should to be match with the snapshot.', () => {
  //   const title = "Hello i am Goku Gomez";
  //   const { container } = render(<FirstApp title={title} />);
  //   expect(container).toMatchSnapshot();
  // });

  test('Should to set the title in h1 tag', () => {
    const title = "Hello i am Goku Gomez";
    const {container, getByText, getByTestId} = render(<FirstApp title={title} />);
    expect(getByText(title)).toBeTruthy(); // Debe existir algun elemento del dom con texto title
    // const h1 = container.querySelector('h1');
    // expect(h1.innerHTML).toContain(title);
    expect(getByTestId('test-title').innerHTML).toBe(title);
  });

  test('Should to be show the subtitle in the h1 tag', () => {
    const title = 'Hello i am Goku Gomez';
    const subtitle = 'A caso con el pelo se estudia!';
    const {getByText, getByTestId, getAllByText} = render(<FirstApp title={title} subtitle={subtitle} />);
    expect(getByText(title)).toBeTruthy();
    expect(getAllByText(subtitle).length).toBe(2);

  });
});