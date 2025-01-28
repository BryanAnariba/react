import { useCounter } from "../hooks";
import { useFetch } from "../hooks/useFetch";
import { LoadingMessage } from "./LoadingMessage";
import { PokemonCard } from "./PokemonCard";

export const MultipleCustomHooks = (): JSX.Element => {
  const { counter, handleCounter } = useCounter(1);
  const { data, isLoading, hasError } = useFetch(
    `https://pokeapi.co/api/v2/pokemon/${counter}`
  );
  return (
    <>
      <h1>Pokemons App</h1>
      <hr />

      {isLoading ? (
        <LoadingMessage />
      ) : (
        <>
          <h2>Pokeon {data?.name} info.</h2>
          <PokemonCard
            id={data!.id}
            name={data!.name}
            sprites={[
              data!.sprites.front_default,
              data!.sprites.front_shiny,
              data!.sprites.back_default,
              data!.sprites.back_shiny,
            ]}
          />
        </>
      )}
      <button
        className="btn btn-outline-primary mt-2"
        onClick={() => counter > 1 && handleCounter("@decrement", 1)}
      >
        Previus
      </button>
      <button
        className="btn btn-outline-primary mt-2"
        onClick={() => handleCounter("@increment", 1)}
      >
        Next
      </button>
    </>
  );
};
