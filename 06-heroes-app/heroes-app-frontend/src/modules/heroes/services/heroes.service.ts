import { Publisher } from "../enums";
import { Hero } from "../interfaces/heroes.interface";

// npm i query-string

export const getHeroesByPublisher = async (publisher: Publisher): Promise<Hero[]> => {
  try {
    const publisherParams: {[key: string]: any} = { publisher: publisher };
    const url = new URL('http://localhost:3500/api/heroes');
    Object.keys(publisherParams).forEach((key: string) => {
      url.searchParams.append(key, publisherParams[key])
    });
    const response = await fetch(url, {method: 'GET'});
    if (!response.ok) {
      throw new Error({
        status: response.status,
        message: response.statusText
      }.toString());
    }
    return await response.json() as Hero[];
  } catch (error) {
    throw error;
  }
}

export const getHeroById = async (heroId: string): Promise<Hero> => {
  try {
    const response = await fetch(`http://localhost:3500/api/heroes/${heroId}`);
    if (!response.ok) throw new Error(response.statusText);
    return await response.json() as Hero;
  } catch (error) {
    throw error;
  }
}

export const getHeroByTerm = async (term: string): Promise<Hero[]> => {
  // console.log({term});
  try {
    const response = await fetch(`http://localhost:3500/api/heroes/by/superhero?term=${term}`);
    if (!response.ok) throw new Error(response.statusText);
    return await response.json() as Hero[];
  } catch (error) {
    throw error;
  }
}