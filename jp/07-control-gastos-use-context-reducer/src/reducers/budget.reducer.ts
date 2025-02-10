export type BudgetActions = { type: "add-budget"; payload: { budget: number } };

export interface BudgetState {
  budget: number;
}

export const initialState: BudgetState = {
  budget: 0,
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
  return state;
};
