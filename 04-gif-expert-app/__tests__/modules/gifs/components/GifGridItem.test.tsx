import React from 'react';
import { render } from '@testing-library/react';
import { GifGridItem } from '../../../../src/modules/gifs/components/GifGridItem';

describe('Testing in ./src/modules/gifs/components/GifGridItem.tsx', () => {
  test('Should to be match with the snapshot', () => {
    const { container } = render(<GifGridItem id={'123'} title={'Test title'} url={'Test url'} />);
    expect(container).toMatchSnapshot();
  });
});