import {BaseResponse} from "../BaseResponse";

export interface CreateExpenseResponse extends BaseResponse
{
    status:"success";
    "id": string;
}