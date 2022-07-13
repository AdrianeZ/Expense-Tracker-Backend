import express from "express";
import {CategoryController} from "../controllers/CategoryController";

const categoryRouter = express.Router();
const categoryController = new CategoryController();

categoryRouter.route("/categories").get(categoryController.getCategories);

export {categoryRouter};