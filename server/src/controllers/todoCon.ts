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

export const FetchAllTodos: express.RequestHandler =
async (req, res, next) => {
    try {
        await Todos.find()
            .then((todos) => res.json(todos));
    } catch (error) {
        res.status(500).json(error);
        next(error);
    }
};

export const DeleteTodo: express.RequestHandler =
async (req, res, next) => {
    try {
        const todo: Todos = await Todos.findOneOrFail(req.params.id);
        await todo.remove();
        return res.status(201).json("The Todo was deleted!");
    } catch (error) {
        res.status(500).json(error);
        next(error);
    }
};





