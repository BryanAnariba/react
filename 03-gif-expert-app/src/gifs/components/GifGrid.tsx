import { getGifs } from "../services/gifs.service";

interface Props {
  category: string;
}

export const GifGrid = ({ category }: Props): JSX.Element => {

  const getAllGifs = () => {
    getGifs(category)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  getAllGifs();

  return (
    <>
      <h3>{category}</h3>
    </>
  );
};
