import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "./store/thunks";
import { AppDispatch, RootState } from "./store";
import { Pokemon } from "./store/interfaces";

const PokemonApp = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { pokemons, isLoading, page } = useSelector(
    (state: RootState) => state.pokemon
  );
  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  return (
    <>
      <h1>PokeApp</h1>
      <hr />
      {isLoading ? (
        <small>Loading pokemons...</small>
      ) : (
        <ul>
          {pokemons.map((pokemon: Pokemon) => (
            <li key={pokemon.name}>{pokemon.name}</li>
          ))}
        </ul>
      )}

      <button onClick={() => dispatch(getPokemons(page))}>Next Page</button>
    </>
  );
};

export default PokemonApp;
