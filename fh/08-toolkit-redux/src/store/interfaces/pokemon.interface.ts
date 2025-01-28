export interface PokemonResponse {
  count: number;
  next: string;
  previous: null;
  results: Pokemon[];
}

export interface PokemonState {
  page: number;
  pokemons: Pokemon[];
  isLoading: boolean;
}

export interface Pokemon {
  name: string;
  url:  string;
}