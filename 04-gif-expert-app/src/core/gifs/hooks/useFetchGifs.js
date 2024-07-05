import { useState, useEffect } from "react";
import { getGifs } from "../services/gifs.service";

export const useFetchGifs = (category) => {
  const [gifs, setGifs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getGifs(category)
      .then((allGifs) => {
        setGifs(allGifs);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [category]); // cual de los dos es valido segun es la segunda, para mi lo que esta  }, [category]); que }, []);

  return {
    isLoading,
    gifs,
  };
};
