import express from "express";
import { Users } from "../models/Users";
import { Todos } from "../models/Todos";

export const CreateTodo: express.RequestHandler =
async (req, res, next) => {
    try {
        const user: Users = res.locals.user;
        const todo: Todos = new Todos();
        todo.todo = req.body.todo;
        todo.user = user;
        await todo.save();
        return res.status(200).json(todo);
    } catch (error) {
        res.status(500).json(error);
        next(error);
    }
};






