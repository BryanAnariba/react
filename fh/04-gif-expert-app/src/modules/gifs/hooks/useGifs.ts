import { useEffect, useState } from "react";
import { GiphyReponse } from "../interfaces";
import { getGifs } from "../services";

export const useGifs = (category: string) => {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [gifs, setGifs] = useState<GiphyReponse[]>([]);

  const getImages = async (): Promise<void> => {
    const gifs = await getGifs(category);
    setIsLoading(false);
    setGifs(gifs);
  }

  useEffect(() => {
    getImages();
  }, []);

  return {
    gifs,
    isLoading,
  };
}