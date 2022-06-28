import express from "express";
import {AuthController} from "../controllers/AuthController";


const authRouter = express.Router();
const authController = new AuthController();

authRouter.route("/register").post(authController.register);

authRouter.route("/login").post(authController.login);


export {authRouter};