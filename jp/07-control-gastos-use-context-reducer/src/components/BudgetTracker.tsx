import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";

export default function BudgetTracker() {
  const { state, totalExpenses, totalAvaliable, dispatch } = useBudget();

  const handleResetApp = () => {
    dispatch({ type: "reset-expense-and-budget" });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <img src="/grafico.jpg" alt="Grafica de gastos" />
      </div>
      <div className="flex flex-col justify-center items-center gap-5">
        <button
          type="button"
          className="bg-pink-600 w-full text-white uppercase font-bold rounded-lg cursor-pointer"
          onClick={handleResetApp}
        >
          Resetear App
        </button>
        <AmountDisplay label="Presupuesto" amount={state.budget} />
        <AmountDisplay label="Disponible" amount={totalAvaliable} />
        <AmountDisplay label="Gastado" amount={totalExpenses} />
      </div>
    </div>
  );
}
