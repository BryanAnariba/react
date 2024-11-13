import { PokemonData } from "./pokemon.interfaces";

export interface InitialState {
  data?: PokemonData;
  isLoading: boolean;
  hasError: boolean;
  errorMessage: ErrorMessage;
}

export interface ErrorMessage {
  code: number;
  message: string;
}