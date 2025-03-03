import { StateCreator } from "zustand";
import {
  Categories,
  CocktailDrink,
  CocktailDrinks,
  CocktailRecipe,
  SearchCocktailRecipeFilter,
} from "../types/cocktails.type";
import {
  getCategories,
  getCocktailRecipe,
  getRecipeById,
} from "../services/cocktails.service";

export type RecipeSliceType = {
  categories: Categories;
  cocktailRecipes: CocktailDrinks;
  selectedCocktailRecipe: CocktailRecipe;
  modal: boolean;
  getCategories: () => Promise<void>;
  getCocktailsRecipe: (
    searchCockailRecipeFilter: SearchCocktailRecipeFilter
  ) => Promise<void>;
  getRecipe: (idDrink: CocktailDrink['idDrink']) => Promise<void>;
  closeModal: () => void;
};

export const createRecipeSlice: StateCreator<RecipeSliceType> = (set) => ({
  categories: {
    drinks: [],
  },
  cocktailRecipes: {
    drinks: [],
  },
  selectedCocktailRecipe: {} as CocktailRecipe,
  modal: false,
  getCategories: async () => {
    const categories = await getCategories();
    set(() => ({
      categories: categories,
    }));
  },
  getCocktailsRecipe: async (searchCockailRecipeFilter) => {
    const cocktailRecipes = await getCocktailRecipe(searchCockailRecipeFilter);
    set(() => ({
      cocktailRecipes: cocktailRecipes,
    }));
  },
  getRecipe: async (idDrink) => {
    const selectedCocktailRecipe = await getRecipeById(idDrink);
    set(() => ({
      selectedCocktailRecipe: selectedCocktailRecipe,
      modal: true,
    }));
  },
  closeModal: () => {
    set(() => ({
      modal: false,
    }));
    setTimeout(() => {
      set(() => ({
        selectedCocktailRecipe: {} as CocktailRecipe,
      }));
    }, 200);
  },
});
