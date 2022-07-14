import {NextFunction, Request, Response} from "express";
import {BindController} from "../types/config/BindController";
import {CategoryService} from "../services/CategoryService";
import {GetCategoriesResponse} from "../types/responses/category";


class CategoryController implements BindController {

    private categoryService: CategoryService;

    constructor() {
        this.bind();
        this.categoryService = new CategoryService();
    }

    bind(): void {
        this.getCategories = this.getCategories.bind(this);
    }

    async getCategories(req: Request, res: Response, next: NextFunction): Promise<void> {
        const categories = await this.categoryService.getCategories();
        res.status(200).json({status: "success", categories: categories} as GetCategoriesResponse);
    }

}

export {CategoryController};