import { GifGridItem } from "./GifGridItem";
import { useFetchGifs } from "../hooks";

export const GifGrid = ({ category }) => {
  const { gifs, isLoading } = useFetchGifs(category);
  return (
    <>
      {isLoading && (<h4>Loading Gifs!!!</h4>)}
      <>
          <h4>{category}</h4>
          <ol>
            <div className="card-grid">
              {gifs.map((gif) => (
                <GifGridItem gif={gif} key={gif.id} />
              ))}
            </div>
          </ol>
        </>
    </>
  );
};
