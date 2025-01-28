import { GiphyReponse } from '../../../../src/modules/gifs/interfaces/giphy.interfaces';
import { getGifs } from '../../../../src/modules/gifs/services/gifs.service';

describe('Testing in ./src/modules/gifs/services/gifs.service.ts', () => {
  test('Should to be return a gifs array', async () => {
    const gifs: GiphyReponse[] = await getGifs('konosuba');
    // console.log(gifs);
    expect(gifs.length).toBeGreaterThan(0);
    expect(gifs[0]).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      url: expect.any(String)
    });
  });
});