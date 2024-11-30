import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PokemonState } from "../interfaces";
import { RootState } from "../store";

const initialState: PokemonState = {
  page: 0,
  pokemons: [],
  isLoading: false,
};

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    getAllPokemons: (state) => {
      state.isLoading = true;
      state.pokemons = [];
      state.page = 0;
    },
    setPokemon: (state, action: PayloadAction<PokemonState>) => {
      state.isLoading = false;
      state.page = action.payload.page;
      state.pokemons = action.payload.pokemons;
    },
  },
});

export const { getAllPokemons, setPokemon } = pokemonSlice.actions;
export const selectPokemon = (state: RootState) => state.pokemon;
