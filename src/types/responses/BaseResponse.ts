type BaseResponse<QueryKey extends string, T extends Object> =
    { [key in QueryKey]: T } & {status: "success" | "fail"}


export {BaseResponse};