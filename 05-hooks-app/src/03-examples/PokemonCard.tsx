export interface PokemonProps {
  id: number;
  name: string;
  sprites: string[];
}

export const PokemonCard = ({id, name, sprites}: PokemonProps): JSX.Element => {
  return (
    <section style={{height: 200}}>
      <h2 className="text-capitalize">#{id} - {name}</h2>
      <div>
        {
          sprites.map(sprite => (<img key={sprite} src={sprite} alt={name +' Iamge'} />))
        }
      </div>
    </section>
  )
}
