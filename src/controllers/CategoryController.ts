import {BindController} from "../types/config/BindController";
import {CategoryService} from "../services/CategoryService";
import {Category} from "../entities/Category";


class CategoryController implements BindController {

    private categoryService: CategoryService;

    constructor() {
        this.bind();
        this.categoryService = new CategoryService();
    }

    bind(): void {
        this.getCategories = this.getCategories.bind(this);
    }

    async getCategories(): Promise<Category[]>
    {
        return await Category.find();
    }

}

export {CategoryController};