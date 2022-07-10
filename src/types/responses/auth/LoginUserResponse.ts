import {BaseResponse} from "../BaseResponse";

export interface LoginUserResponse extends BaseResponse {
    status: "success",
    user: { id: string, token: string }
}

