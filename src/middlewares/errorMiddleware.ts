import {NextFunction, Request, Response} from "express";
import {ErrorResponse} from "../types/responses/ErrorResponse";


class ValidationError extends Error {
}

class AuthError extends Error {
}

const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction): void => {

    console.log(error);

    if (error instanceof ValidationError) {
        res.status(400).json({status: "fail", errorMessage: error.message} as ErrorResponse);
        return;
    } else if (error instanceof AuthError) {
        res.status(401).json({status: "fail", errorMessage: error.message} as ErrorResponse);
        return;
    }
    else if(error.name === "JsonWebTokenError")
    {
        res.status(401).json({status: "fail", errorMessage:"Your access token is invalid, try login again"} as ErrorResponse);
        return;
    }
    else if(error.name === "TokenExpiredError")
    {
        res.status(401).json({status: "fail", errorMessage:"Your token has expired, try login again"} as ErrorResponse);
        return;
    }



    if (process.env.NODE_ENV === "development") {
        res.status(500).json({message: error.message}) ;
    } else {
        res.status(500).json({message: "something went wrong, try again later"});
    }

}

export {errorMiddleware, ValidationError, AuthError};