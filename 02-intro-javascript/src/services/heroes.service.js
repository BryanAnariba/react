import { heroes } from "../data/heroes";

export const getHeroById = (heroId) => {
  const hero = heroes.find(hero => hero.id === heroId);
  return hero ? hero : null;
}

export const getHeroesByOwner = (owner) => {
  const DCHeroes = heroes.filter(heroe => heroe.owner === owner);
  return DCHeroes;
}