import { render, screen } from '@testing-library/react';
import { GifGridItem } from '../../../../src/modules/gifs/components/GifGridItem';

const url: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYnOe5Vwys8zJ6Jd7w3i4hqC9voox36N68nw&s';
const title: string = 'One Punch Saitama GIF by Crunchyroll';
const id: string = 'lrDAgsYq0eomhwoESZ';

describe('Testing in ./src/modules/gifs/components/GifGridItem.tsx', () => {
  test('Should to be match with the snapshot', () => {
    const { container } = render(<GifGridItem id={id} title={title} url={url} />);
    expect(container).toMatchSnapshot();
  });

  test('Should to be show the URL image and the ATL content', () => {
    render(<GifGridItem id={id} title={title} url={url} />);
    const { src, alt } = screen.getByRole('img') as HTMLInputElement;
    expect(src).toBe(url);
    expect(alt).toBe("Image " + id);
  });

  test('Show to be show the title in the Component', () => {
    render(<GifGridItem id={id} title={title} url={url} />);
    expect(screen.getByText(title)).toBeTruthy();
  });
});