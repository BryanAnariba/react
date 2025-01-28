import { getAllPokemons, setPokemon } from "../slices";
import { PokemonResponse } from "../interfaces/pokemon.interface";
import { Dispatch } from '@reduxjs/toolkit';
import { pokemonApi } from "../../api/pokemon.api";
// import { RootState } from "../store";

export const getPokemons = (page: number = 0) => {
  return async (dispatch: Dispatch/*, getState: () => RootState*/) => {
    // console.log(getState);
    dispatch(getAllPokemons());
    try {
      const res = await pokemonApi.get<PokemonResponse>(
        "/pokemon?limit=10&offset=" + page
      );
      // console.log(res.data);

      dispatch(
        setPokemon({
          isLoading: false,
          pokemons: res.data.results,
          page: page + 1,
        })
      );
    } catch (error) {
      dispatch(setPokemon({ isLoading: false, pokemons: [], page }));
      throw new Error(`Sometime went wrong getting the pokemons: ${error}`)
    }
  };
};
