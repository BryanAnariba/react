import axios from "axios";
import {
  CategoryApiResponseSchema,
  CocktailDrinksApiResponse,
  CocktailRecipeAPIResponseSchema,
} from "../schemas/cocktails.schema";
import {
  CocktailDrink,
  SearchCocktailRecipeFilter,
} from "../types/cocktails.type";

const apiUrl: string = "https://www.thecocktaildb.com/api/json/v1";

export const getCategories = async () => {
  const { data } = await axios.get(`${apiUrl}/1/list.php?c=list`);
  const result = CategoryApiResponseSchema.safeParse(data);
  if (result.success) {
    return result.data;
  }
  throw new Error(
    `Sometime went wrong getting the categories: ${result.error}`
  );
};

export const getCocktailRecipe = async (
  searchCockailRecipeFilter: SearchCocktailRecipeFilter
) => {
  const { data } = await axios.get(
    `${apiUrl}/1/filter.php?c=${searchCockailRecipeFilter.category}&i=${searchCockailRecipeFilter.ingredient}`
  );
  const result = CocktailDrinksApiResponse.safeParse(data);
  if (result.success) {
    return result.data;
  }
  throw new Error(
    `Sometime went wrong getting the cocktail recipes: ${result.error}`
  );
};

export const getRecipeById = async (idDrink: CocktailDrink["idDrink"]) => {
  const { data } = await axios.get(`${apiUrl}/1/lookup.php?i=${idDrink}`);
  const result = CocktailRecipeAPIResponseSchema.safeParse(data.drinks[0]);
  if (result.success) {
    return result.data;
  }
  throw new Error(
    `Sometime went wrong getting the cocktail recipe: ${result.error}`
  );
};
