import {BaseResponse} from "../BaseResponse";
import {Category} from "../../../entities/Category";

export interface GetCategoriesResponse extends BaseResponse
{
    status: "success";
    categories: Category[];
}