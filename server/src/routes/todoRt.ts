import express from "express";
import { CreateTodo, DeleteTodo, 
    FetchAllTodos } from "../controllers/todoCon";
import { Auth } from "../middleware/Auth";

export const todoRt: express.Router = express.Router();
    todoRt.post("/create", Auth, CreateTodo);
    todoRt.get("/fetchall", Auth, FetchAllTodos);
    todoRt.delete("/:id", Auth, DeleteTodo);




