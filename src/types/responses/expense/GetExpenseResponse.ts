import {Expense} from "../../../entities/Expense";

export interface GetExpenseResponse
{
    status:"success";
    expenses: Expense[];
}