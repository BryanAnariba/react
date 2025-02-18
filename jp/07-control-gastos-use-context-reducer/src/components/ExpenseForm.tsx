import { useEffect, useState } from "react";

import { DraftExpense, Value } from "../interfaces/expense.interfaces";
import { categories } from "../data/categories.service";
import { useBudget } from "../hooks/useBudget";
import ErrorMsg from "./ErrorMsg";

import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

const initExpenseState: DraftExpense = {
  amount: 0,
  expenseName: "",
  category: "",
  date: new Date(),
};

export default function ExpenseForm() {
  const [error, setError] = useState<string>("");
  const { state, dispatch, totalAvaliable } = useBudget();
  const [previusAmount, setPreviusAmount] = useState(0);
  const [expense, setExpense] = useState<DraftExpense>(initExpenseState);

  const handleChangeDate = (value: Value): void => {
    setExpense({ ...expense, date: value });
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const isAmountField = ["amount"].includes(e.target.name);
    setExpense({
      ...expense,
      [e.target.name]: isAmountField ? +e.target.value : e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (Object.values(expense).includes("")) {
      // console.log('Error!');
      setError("Los campos del formulario son obligatorios.");
      return;
    }

    console.log({totalAvaliable, amount: expense.amount, previusAmount})
    if ((expense.amount - previusAmount)> totalAvaliable) {
      // console.log('Error!');
      setError("Con este gaso sobre pasa el presupuesto.");
      return;
    }

    setError("");
    if (state.editingId.trim() !== "") {
      dispatch({
        type: "update-expense",
        payload: {
          expense: {
            id: state.editingId,
            ...expense,
          },
        },
      });
    } else {
      dispatch({ type: "add-expense", payload: { expense: expense } });
    }
    setExpense(initExpenseState);
    setPreviusAmount(0);
  };

  useEffect(() => {
    if (state.editingId.trim() !== "") {
      const editingExpense = state.expenses.filter(
        (expense) => expense.id === state.editingId
      )[0];
      setExpense(editingExpense);
      setPreviusAmount(editingExpense.amount);
    }
  }, [state.editingId]);

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500">
        {state.editingId.trim() === "" ? "Nuevo Gasto" : "Guardar Cambios"}
      </legend>
      {error.trim() !== "" && <ErrorMsg>{error}</ErrorMsg>}
      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">
          Nombre Gasto:{" "}
        </label>
        <input
          type="text"
          name="expenseName"
          id="expenseName"
          placeholder="Agrega nombre del gasto"
          className="bg-slate-200 p-2"
          value={expense.expenseName}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Cantidad:{" "}
        </label>
        <input
          type="number"
          name="amount"
          id="amount"
          placeholder="Agrega cantidad gasto"
          className="bg-slate-200 p-2"
          value={expense.amount}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-xl">
          Categoria:{" "}
        </label>
        <select
          name="category"
          id="category"
          className="bg-slate-100 p-2"
          value={expense.category}
          onChange={handleChange}
        >
          <option value="">--Seleccione--</option>
          {categories.map((cat) => (
            <option value={cat.id} key={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Fecha Gasto:{" "}
        </label>
        <DatePicker
          className={"bg-slate-100 p-2 border-0"}
          value={expense.date}
          onChange={handleChangeDate}
        />
      </div>
      <input
        type="submit"
        className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
        value={
          state.editingId.trim() === "" ? "Registar Gasto" : "Editar Gasto"
        }
      />
    </form>
  );
}
