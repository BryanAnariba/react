import { useCocktailsAppStore } from "../store/useCocktailsAppStore";
import { CocktailDrink } from "../types/cocktails.type";

type CocktailDrinkCardProps = {
  cocktailRecipe: CocktailDrink;
};

export default function CocktailDrinkCard({
  cocktailRecipe,
}: CocktailDrinkCardProps) {
  const getRecipe = useCocktailsAppStore((state) => state.getRecipe);
  return (
    <div className="border-none shadow-lg">
      <div className="overflow-hidden">
        <img
          src={cocktailRecipe.strDrinkThumb}
          alt={cocktailRecipe.strDrink + " Image"}
          className="hover:scale-125 transition-transform hover:rotate-2"
        />
      </div>
      <div className="-p5">
        <h2 className="text-2xl truncate font-black">
          {cocktailRecipe.strDrink}
        </h2>
        <button 
          type="button" 
          className="bg-orange-400 hover:bg-orange-500 mt-5 w-full font-bold p-3 text-white text-lg cursor-pointer"
          onClick={() => getRecipe(cocktailRecipe.idDrink)}
        >
          View recipe
        </button>
      </div>
    </div>
  );
}
