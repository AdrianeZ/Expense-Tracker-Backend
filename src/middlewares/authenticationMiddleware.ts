import {NextFunction, Request, Response} from "express";
import {AuthError} from "./errorMiddleware";
import {verify} from "jsonwebtoken";
import {User} from "../entities/User";

interface Payload {
    sub: string;
    iat: number;
    exp: number;
}

const authenticationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.header("authorization");

    if (!authorizationHeader) {
        throw new AuthError("Expected token is invalid, make sure you're sending your jwt in authorization header");
    }

    const [tokenType, token] = authorizationHeader.split(" ");
    if (tokenType !== "Bearer" && !token.match("/\S+\.\S+\.\S+/").length) {
        throw new AuthError("Expected token is invalid, make sure you're sending your jwt in proper format");
    }

    const {sub} = await verify(token, process.env.JWT_SECRET) as Payload
    const user = await User.findOne({where: {id: sub}});
    if (!user) {
        throw new AuthError("token is invalid due to user not exists");
    }

    req.currentUser = user;

    next();
}

export {authenticationMiddleware}