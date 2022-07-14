import {BindController} from "../types/config/BindController";
import {ExpenseService} from "../services/ExpenseService";
import {NextFunction, Request, Response} from "express";
import {CreateExpenseDto} from "../types/dto/expenses";


class ExpenseController implements BindController {

    private expenseService: ExpenseService;

    constructor() {
        this.bind();
        this.expenseService = new ExpenseService();
    }

    bind(): void {
        this.getExpenses = this.getExpenses.bind(this);
        this.createExpense = this.createExpense.bind(this);
    }

    async getExpenses(req: Request, res: Response, next: NextFunction): Promise<void> {
        const response = await this.expenseService.getExpenses(req.currentUser);
        res.status(200).json(response);
    }

    async createExpense(req: Request, res: Response, next: NextFunction): Promise<void> {
        const response = await this.expenseService.addExpense(req.body as CreateExpenseDto, req.currentUser);
        res.status(201).json(response);
    }

}

export {ExpenseController};