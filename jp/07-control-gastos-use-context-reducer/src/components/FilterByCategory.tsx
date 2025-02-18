import { ChangeEvent } from "react";
import { categories } from "../data/categories.service";
import { useBudget } from "../hooks/useBudget";

export default function FilterByCategory() {
  const { dispatch } = useBudget();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: "filter-expenses-by-category",
      payload: { id: e.target.value },
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-10">
      <form>
        <div className="flex flex-col md:flex-row md:items-center gap-5">
          <label htmlFor="category">Filtrar Gastos</label>
          <select
            name="category"
            id="category"
            className="bg-slate-100 flex-1 p-3 rounded"
            onChange={handleChange}
          >
            <option value="">--Todas las categorias--</option>
            {categories.map((cat) => (
              <option value={cat.id} key={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
}
