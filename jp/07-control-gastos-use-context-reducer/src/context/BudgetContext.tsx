import { createContext, Dispatch, ReactNode, useMemo, useReducer } from "react";
import {
  BudgetActions,
  budgetReducer,
  BudgetState,
  initialState,
} from "../reducers/budget.reducer";

interface BudgetContextProps {
  state: BudgetState;
  dispatch: Dispatch<BudgetActions>;
  totalExpenses: number;
  totalAvaliable: number;
}

interface BudgetProviderProps {
  children: ReactNode;
}

const BudgetContext = createContext<BudgetContextProps>(null!);

const BudgetProvider = ({ children }: BudgetProviderProps) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);
  const totalExpenses = useMemo(
    () =>
      state.expenses.reduce(
        (totalAcum, currentExpense) => totalAcum + currentExpense.amount,
        0
      ),
    [state.expenses]
  );
  const totalAvaliable = useMemo(
    () => state.budget - totalExpenses,
    [state.expenses, totalExpenses]
  );

  return (
    <BudgetContext.Provider
      value={{ state, dispatch, totalExpenses, totalAvaliable }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

export { BudgetContext, BudgetProvider };
