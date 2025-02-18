import { Category, DraftExpense, Expense } from "../interfaces/expense.interfaces";
import { v4 as uuidv4 } from "uuid";

export type BudgetActions =
  | { type: "add-budget", payload: { budget: number } }
  | { type: "add-expense", payload: { expense: DraftExpense } }
  | { type: "remove-expense", payload: { id: Expense['id'] } }
  | { type: "get-expense-by-id", payload: { id: Expense['id'] } }
  | { type: "update-expense", payload: { expense: Expense } }
  | { type: 'filter-expenses-by-category', payload: { id: Category['id'] } }
  | { type: 'reset-expense-and-budget' }
  | { type: "show-modal" }
  | { type: "close-modal" };

export interface BudgetState {
  budget: number;
  modal: boolean;
  expenses: Expense[];
  editingId: string;
  currentCategory: Category['id'];
}

const createExpense = (draftExpense: DraftExpense): Expense => {
  return {
    ...draftExpense,
    id: uuidv4(),
  };
};

const initialBudget = (): number => {
  const localStorageBudget =localStorage.getItem('budget');
  return localStorageBudget ? +localStorageBudget : 0;
}

const localStorageExpenses = (): Expense[] => {
  const localStorageExpenses = localStorage.getItem('expenses');
  return localStorageExpenses ? JSON.parse(localStorageExpenses) : [];
}

export const initialState: BudgetState = {
  budget: initialBudget(),  
  modal: false,
  expenses: localStorageExpenses(),
  editingId: '',
  currentCategory: '',
};

export const budgetReducer = (
  state: BudgetState = initialState,
  action: BudgetActions
) => {
  if (action.type === "add-budget") {
    return {
      ...state,
      budget: action.payload.budget,
    };
  }

  if (action.type === "show-modal") {
    return {
      ...state,
      modal: true,
    };
  }

  if (action.type === "close-modal") {
    return {
      ...state,
      modal: false,
      editingId: '',
    };
  }

  if (action.type === "add-expense") {
    const expense = createExpense(action.payload.expense);
    return {
      ...state,
      expenses: [...state.expenses, expense],
      modal: false,
      editingId: '',
    };
  }

  if (action.type === 'remove-expense') {
    return {
      ...state,
      expenses: state.expenses.filter(expense => expense.id !== action.payload.id),
      editingId: '',
    };
  }

  if (action.type === 'get-expense-by-id') {
    return {
      ...state,
      editingId: action.payload.id,
      modal: true,
    }
  }

  if (action.type === 'update-expense') {
    return {
      ...state,
      expenses: state.expenses.map(expense => {
        if (expense.id === action.payload.expense.id) {
          return action.payload.expense
        }
        return expense;
      }),
      editingId: '',
      modal: false,
    }
  }

  if (action.type === 'reset-expense-and-budget') {
    return {
      ...state,
      expenses: [],
      editingId: '',
      modal: false,
      budget: 0,
    }
  }

  if (action.type === 'filter-expenses-by-category') {
    return {
      ...state,
      currentCategory: action.payload.id,
    }
  }

  return state;
};
