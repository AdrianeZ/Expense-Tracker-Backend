type BaseResponse<QueryKey extends string, T extends Object> =
    { [key in QueryKey]: T } & {status: "success"}


export {BaseResponse};