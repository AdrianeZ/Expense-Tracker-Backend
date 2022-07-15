import {BaseResponse} from "./BaseResponse";


export interface ErrorResponse extends BaseResponse {
    errorMessage: string;
    status: "fail" | "error";
}

