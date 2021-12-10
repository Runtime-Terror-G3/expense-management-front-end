import { ExpenseCategory } from './expense-category.enum';
export interface IExpense {
    expenseId: number,
    amount: number,
    category: ExpenseCategory,
    date: Date
}
