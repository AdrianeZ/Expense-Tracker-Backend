import {CreateExpenseDto, RemoveExpenseDto} from "../types/dto/expenses";
import {CreateExpenseResponse, GetExpenseResponse} from "../types/responses/expense";
import {Expense} from "../entities/Expense";
import {User} from "../entities/User";
import {handleValidation} from "../helpers/handleValidation";
import {validate} from "class-validator";
import {validationConfig} from "../config/validation/validationConfig";



class ExpenseService {
    async getExpenses(currentUser: User): Promise<GetExpenseResponse> {
        const repository = Expense.getRepository();
        const expenses = await repository.createQueryBuilder()
            .relation(User, "expenses")
            .of(currentUser)
            .loadMany() as Expense[];

        return {status:"success", expenses};

    }

    async addExpense(expense: CreateExpenseDto, currentUser: User): Promise<CreateExpenseResponse> {
        const newExpenseData =
            {
                ...expense,
                catId: expense.categoryId,
                value: Number(expense.value),
                user: currentUser
            }

        const newExpense = Expense.create(newExpenseData);

        handleValidation(await validate(newExpense, validationConfig));

        await newExpense.save();

        return {
            status: "success",
            id: newExpense.id
        }
    }

    async removeExpense(expense: RemoveExpenseDto): Promise<void> {
        await Expense.delete({id: expense.id});
    }
}

export {ExpenseService};