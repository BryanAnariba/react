import { Giphy, GiphyReponse } from "../interfaces";

const apiKey: string = 'your key here';

export const getGifs = async (category: string): Promise<GiphyReponse[]> => {
  try {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${category}&limit=10`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    const jsonResponse: Giphy = await response.json();
    const gifs: GiphyReponse[] = returnGifImages(jsonResponse);
    return gifs;
  } catch (error) {
    throw new Error(`Sometime went wrong getting the images: ${error}`);
  }
};

export const returnGifImages = (gifs: Giphy): GiphyReponse[] => {
  return gifs.data.map(image => ({
    id: image.id,
    title: image.title,
    url: image.images.downsized_medium.url,
  }));
}
