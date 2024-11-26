import { Publisher } from "../enums";

export interface Hero {
  _id?: string;
  hero_id: string;
  superhero: string;
  publisher: Publisher;
  alter_ego: string;
  first_appearance: string;
  characters: string
}