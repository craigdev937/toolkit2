import express from "express";
import { indexHome } from "../controllers/userCon";

export const userRt: express.Router = express.Router();
    userRt.get("/", indexHome);




