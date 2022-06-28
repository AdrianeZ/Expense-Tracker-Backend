import {NextFunction, Request, Response} from "express";

class ValidationError extends Error {
}

class AuthError extends Error {
}

const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction): void => {
    if (error instanceof ValidationError) {
        res.status(400).json({message: error.message});
        return;
    }
    else if(error instanceof AuthError)
    {
        res.status(401).json({message: error.message});
        return;
    }


    if (process.env.NODE_ENV === "development") {
        res.status(500).json({message: error.message});
    } else {
        res.status(500).json({message: "something went wrong, try again later"});
    }

}

export {errorMiddleware, ValidationError, AuthError};