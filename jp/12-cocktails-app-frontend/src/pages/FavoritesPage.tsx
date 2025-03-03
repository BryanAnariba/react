import { useMemo } from "react";
import { useCocktailsAppStore } from "../store/useCocktailsAppStore";
import CocktailDrinkCard from "../components/CocktailDrinkCard";

export default function FavoritesPage() {
  const favorites = useCocktailsAppStore((state) => state.favorites);
  const hasFavorites = useMemo(() => favorites.length > 0, [favorites]);

  return (
    <>
      <h1 className="text-6xl font-extrabold">Cocktail Favorites</h1>
      {hasFavorites ? (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10">
          {favorites.map((favoriteCocktail) => (
            <CocktailDrinkCard
              key={favoriteCocktail.idDrink}
              cocktailRecipe={favoriteCocktail}
            />
          ))}
        </div>
      ) : (
        <p className="text-2xl text-center p-10">
          View your favorite cocktails here!
        </p>
      )}
    </>
  );
}
