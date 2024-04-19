/*api.giphy.com/v1/gifs/search?api_key=gt17K6ICHUlyZAgcgP255FHoqmm9Ffp5&q=valorant*/

import { Data } from "../interfaces";

const giftUrl: string = "https://api.giphy.com/v1/gifs/search";
const apiKey: string = "gt17K6ICHUlyZAgcgP255FHoqmm9Ffp5";

export const getGifs = async (category: string) => {
  const url: string = `${giftUrl}?api_key=${apiKey}&q=${category}&limit=20`;
  try {
    const res = await fetch(url, { method: "GET" });
    const { data } = await res.json();
    const gifs = data.map((gif: Data) => ({id: gif.id, title: gif.title, url: gif.images.downsized_medium.url}));
    return gifs;
  } catch (error) {
    throw new Error(`Sometime went wrong: ${error}`);
  }
};
