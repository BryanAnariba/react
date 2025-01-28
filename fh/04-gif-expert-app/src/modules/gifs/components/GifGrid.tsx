import { useGifs } from "../hooks";
import { GifGridItem } from "./GifGridItem";

interface Props {
  category: string;
}

export const GifGrid = ({ category }: Props): JSX.Element => {

  const { gifs, isLoading } = useGifs(category);

  return (
    <>
      <h3>{category}</h3>
      <hr />
      {
        isLoading
          ?
          (
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
              <section style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', verticalAlign: 'middle', gap: '20px' }}>
                <div className="spinner"></div>
                <span style={{margin: 'auto'}}>Loading gifs please wait...</span>
              </section>
            </div>
          )
          :
          (
            <ol className="card-grid">
              {
                gifs.map(gif => <GifGridItem {...gif} key={gif.id} />)
              }
            </ol>
          )
      }
    </>
  )
}
