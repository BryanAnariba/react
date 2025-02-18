export interface Expense {
  id: string;
  expenseName: string;
  amount: number;
  category: string;
  date: Value;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export type DraftExpense = Omit<Expense, "id">;
export type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];
