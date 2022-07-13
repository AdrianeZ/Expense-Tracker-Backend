import {NextFunction, Request, Response} from "express";
import {ErrorResponse} from "../types";
import {QueryFailedError, TypeORMError} from "typeorm";


class ValidationError extends Error {
}

class AuthError extends Error {
}

const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction): void => {
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

    else if (error instanceof QueryFailedError)
    {
    }



    if (process.env.NODE_ENV === "production") {
        res.status(500).json({errorMessage: error.message, status:"error"} as ErrorResponse) ;
    } else {
        res.status(500).json({errorMessage: "something went wrong, try again later", status:"error"} as ErrorResponse);
    }

}

export {errorMiddleware, ValidationError, AuthError};