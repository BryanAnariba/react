import { StateCreator } from "zustand";
import { CocktailRecipe } from "../types/cocktails.type";
import { createNotificationSlice, NotificationSliceType } from "./notificationSlice";

export type FavoritesSliceType = {
  favorites: CocktailRecipe[];
  existCocktailRecipeInFavorites: (
    idDrink: CocktailRecipe["idDrink"]
  ) => boolean;
  addCocktailRecipeToFavorites: (cocktailRecipe: CocktailRecipe) => void;
  loadFavoritesFromLocalStorage: () => void;
};

// Asi se comunican dos slice o stores es engorroso pero por si acaso aunque en medida de lo posible para mi voy a evitarlo, ver el notificatiosSlice.ts tambien 
export const createFavoritesSlice: StateCreator<FavoritesSliceType & NotificationSliceType, [], [], FavoritesSliceType> = (
  set,
  get,
  api,
) => ({
  favorites: [],
  existCocktailRecipeInFavorites: (idDrink) => {
    return get().favorites.some(
      (cocktailFromFavorites) => cocktailFromFavorites.idDrink === idDrink
    );
  },
  addCocktailRecipeToFavorites: (cocktailRecipe) => {
    if (!get().existCocktailRecipeInFavorites(cocktailRecipe.idDrink)) {
      set((state) => ({
        favorites: [cocktailRecipe, ...state.favorites],
      }));
      createNotificationSlice(set, get, api).showNotification({text: 'Added to favorites successfully', error: false})
    } else {
      set((state) => ({
        favorites: state.favorites.filter(
          (cocktailFromFavorites) =>
            cocktailFromFavorites.idDrink !== cocktailRecipe.idDrink
        ),
      }));
      createNotificationSlice(set, get, api).showNotification({text: 'Remove from favorites successfully', error: false})
    }
    localStorage.setItem('favorites', JSON.stringify(get().favorites));
  },
  loadFavoritesFromLocalStorage: () => {
    const storedFavorites = localStorage.getItem("favorites")
      ? JSON.parse(localStorage.getItem("favorites")!)
      : [];
    if (storedFavorites) {
      set(() => ({
        favorites: storedFavorites,
      }));
    }
  },
});
