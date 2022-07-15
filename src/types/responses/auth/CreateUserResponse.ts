import {BaseResponse} from "../BaseResponse";

export interface CreateUserResponse extends BaseResponse {
    status:"success",
    user: { id: string, token: string, name: string, email: string, expires:number}
}


