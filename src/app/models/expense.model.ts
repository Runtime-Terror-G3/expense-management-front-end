import { ExpenseCategory } from './expense-category.enum';
export interface IExpense {
    userId: number,
    amount: number,
    category: ExpenseCategory,
    date: Date
}