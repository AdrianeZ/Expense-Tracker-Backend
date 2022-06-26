import {NextFunction, Request, Response} from "express";

class ValidationError extends Error {}

const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction): void =>
{
    if(error instanceof ValidationError)
    {
        res.status(400).json({message:error.message});
    }

    res.status(500).json({message: "something went wrong, try again later"});
}

export {errorMiddleware, ValidationError};