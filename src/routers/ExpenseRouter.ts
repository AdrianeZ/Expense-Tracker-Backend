import express from "express";
import {ExpenseController} from "../controllers/ExpenseController";


const expenseRouter = express.Router();
const expenseController = new ExpenseController();

expenseRouter.route("/expenses")
    .get(expenseController.getExpenses)
    .post(expenseController.createExpense)


expenseRouter.route("/expenses/:id").delete(expenseController.removeExpense);

export {expenseRouter};