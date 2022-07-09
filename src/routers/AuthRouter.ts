import express, {NextFunction, Request, Response} from "express";
import {AuthController} from "../controllers/AuthController";
import {authenticationMiddleware} from "../middlewares/authenticationMiddleware";


const authRouter = express.Router();
const authController = new AuthController();

authRouter.route("/register").post(authController.register);

authRouter.route("/login").post(authController.login);

authRouter.route("/test").get(authenticationMiddleware, (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({message: "ok"});
});


export {authRouter};