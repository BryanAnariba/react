import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router";
import { useCocktailsAppStore } from "../store/useCocktailsAppStore";

export default function Header() {
  const { pathname } = useLocation();

  const isHomePath = useMemo(() => pathname === "/", [pathname]);
  const [searchCocktailForm, setSearchCocktailForm] = useState({
    ingredient: "",
    category: "",
  });

  const getCategories = useCocktailsAppStore((state) => state.getCategories);
  const categories = useCocktailsAppStore((state) => state.categories);
  const getCocktailsRecipe = useCocktailsAppStore(
    (state) => state.getCocktailsRecipe
  );
  const showNotification = useCocktailsAppStore((state) => state.showNotification);

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSearchCocktailForm({
      ...searchCocktailForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearchCocktail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log('Search cocktail ', searchCocktailForm);
    if (!Object.values(searchCocktailForm).includes("")) {
      getCocktailsRecipe(searchCocktailForm);
    } else {
      showNotification({text: "All fields are required", error: true});
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <header className={isHomePath ? "header-bg bg-center" : "bg-slate-800"}>
      <div className="mx-auto container px-5 py-16">
        <div className="flex justify-between items-center">
          <div>
            <img src="./logo.svg" alt="Cocktail Logo Image" className="w-32" />
          </div>
          <nav className="flex gap-4">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive
                  ? "uppercase font-bold text-orange-500"
                  : "text-white uppercase font-bold"
              }
            >
              Home
            </NavLink>
            <NavLink
              to={"/favorites"}
              className={({ isActive }) =>
                isActive
                  ? "uppercase font-bold text-orange-500"
                  : "text-white font-bold"
              }
            >
              Favorites
            </NavLink>
          </nav>
        </div>
        {isHomePath && (
          <form
            className="md:w-1/2 2xl:w-1/3 bg-orange-400 p-10 rounded-lg shadow space-y-6 mt-5"
            onSubmit={handleSearchCocktail}
          >
            <div className="space-y-4">
              <label
                htmlFor="ingredient"
                className="block text-white uppercase font-extrabold text-lg"
              >
                Ingrediente Name:
              </label>
              <input
                type="text"
                name="ingredient"
                id="ingredient"
                className="p-3 w-full rounded-lg focus:outline bg-white"
                placeholder="Ingredient name: Vodka, Tequila, Coffee etc"
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-4">
              <label
                htmlFor="ingredient"
                className="block text-white uppercase font-extrabold text-lg"
              >
                Category:
              </label>
              <select
                name="category"
                id="category"
                className="p-3 w-full rounded-lg focus:outline-none bg-white"
                onChange={handleInputChange}
              >
                <option value="">-- Select category --</option>
                {categories.drinks.map((category) => (
                  <option
                    value={category.strCategory}
                    key={category.strCategory}
                  >
                    {category.strCategory}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="submit"
              value="Search Recipes"
              className="cursor-pointer bg-orange-800 text-white hover:bg-orange-900 w-full rounded-lg p-2 uppercase"
            />
          </form>
        )}
      </div>
    </header>
  );
}
