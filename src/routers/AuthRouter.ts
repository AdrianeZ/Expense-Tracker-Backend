import express from "express";
import {AuthController} from "../controllers/AuthController";


const authRouter = express.Router();
const authController = new AuthController();

authRouter.route("/register").post(authController.register);


export {authRouter};