import {BindController} from "../types/config/BindController";
import {ExpenseService} from "../services/ExpenseService";


class ExpenseController implements BindController {

    private expenseService: ExpenseService;

    constructor() {
        this.bind();
        this.expenseService = new ExpenseService();
    }

    bind(): void {
      this.getExpenses = this.getExpenses.bind(this);
    }

    getExpenses()
    {

    }

}

export {ExpenseController};