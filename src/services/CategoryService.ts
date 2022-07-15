import {Category} from "../entities/Category";

class CategoryService
{
    async getCategories(): Promise<Category[]>
    {
        return await Category.find();
    }
}

export {CategoryService}