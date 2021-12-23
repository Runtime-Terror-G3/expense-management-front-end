import { ExpenseCategory } from './expense-category.enum';
export interface IExpense {
    id: number,
    amount: number,
    category: ExpenseCategory,
    date: Date
}
