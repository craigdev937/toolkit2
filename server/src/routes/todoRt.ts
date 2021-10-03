import express from "express";
import { CreateTodo } from "../controllers/todoCon";
import { Auth } from "../middleware/Auth";

export const todoRt: express.Router = express.Router();
    todoRt.post("/", Auth, CreateTodo);




