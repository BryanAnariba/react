import { useMemo } from "react";
import { useCocktailsAppStore } from "../store/useCocktailsAppStore";
import CocktailDrinkCard from "../components/CocktailDrinkCard";

export default function HomePage() {
  const cocktailRecipes = useCocktailsAppStore(
    (state) => state.cocktailRecipes
  );

  const hasCocktailRecipes = useMemo(
    () => cocktailRecipes.drinks.length > 0,
    [cocktailRecipes]
  );

  return (
    <>
      <h1 className="text-6xl font-extrabold">Cocktail Recipes</h1>
      {hasCocktailRecipes ? (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-10 my-10">
          {cocktailRecipes.drinks.map((cocktailRecipe) => (
            <CocktailDrinkCard
              key={cocktailRecipe.idDrink}
              cocktailRecipe={cocktailRecipe}
            />
          ))}
        </div>
      ) : (
        <p className="my-10 text-center text-2xl">
          Not results yet, use the form for search recipes!
        </p>
      )}
    </>
  );
}
