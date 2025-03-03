import { z } from 'zod';
import { CategoryApiResponseSchema, CocktailDrinkApiResponse, CocktailDrinksApiResponse, CocktailRecipeAPIResponseSchema, SerachCocktailRecipeFilter } from '../schemas/cocktails.schema';

export type Categories = z.infer<typeof CategoryApiResponseSchema>;

export type SearchCocktailRecipeFilter = z.infer<typeof SerachCocktailRecipeFilter>;

export type CocktailDrink = z.infer<typeof CocktailDrinkApiResponse>;

export type CocktailDrinks = z.infer<typeof CocktailDrinksApiResponse>;

export type CocktailRecipe = z.infer<typeof CocktailRecipeAPIResponseSchema>;