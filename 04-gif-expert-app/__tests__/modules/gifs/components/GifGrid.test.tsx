import { render, screen } from "@testing-library/react";
import { GifGrid } from "../../../../src/modules/gifs/components";

const category: string = 'KONOSUBA'

describe('Testing in ./src/modules/gifs/components/GifGrid.tsx', () => {
  test('Should to be show loading', () => {
    render(<GifGrid category={category} />);
    // screen.debug();
    expect(screen.getByText('Loading gifs please wait...'));
    expect(screen.getByText(category));
  });

  test('Should to be the items when the data is loaded', () => {

  });
});