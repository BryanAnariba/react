import { render, screen } from "@testing-library/react";
import { GifGrid } from "../../../../src/modules/gifs/components";
import { useGifs } from "../../../../src/modules/gifs/hooks";
import { GiphyReponse } from "../../../../src/modules/gifs/interfaces";

// Simulando el hook
jest.mock('../../../../src/modules/gifs/hooks');

const category: string = 'KONOSUBA'

describe('Testing in ./src/modules/gifs/components/GifGrid.tsx', () => {
  test('Should to be show loading', () => {
    (useGifs as jest.Mock).mockReturnValue({
      isLoading: true,
      gifs: [],
    });
    render(<GifGrid category={category} />);
    expect(screen.getByText('Loading gifs please wait...'));
    expect(screen.getByText(category));
  });

  test('Should to be the items when the data is loaded', () => {
    const gifs: GiphyReponse[] = [
      { 
        id: 'acb', 
        title: 'Saitama', 
        url: 'https://localhost:3500/saitama.jpg' 
      }, 
      { 
        id: 'acbc', 
        title: 'Goku', 
        url: 'https://localhost:3500/goku.jpg' 
      }
    ];
    (useGifs as jest.Mock).mockReturnValue({
      isLoading: false,
      gifs: gifs,
    });
    render(<GifGrid category={category} />);
    // screen.debug();
    expect(screen.getAllByRole('img').length).toBe(2);
  });
});