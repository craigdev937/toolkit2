import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookie from "cookie";
import { Users } from "../models/Users";
import { config } from "../config/keys";
import { isEmpty, validate } from "class-validator";

export const Register: express.RequestHandler =
async (req, res, next) => {
    try {
        // validate the Credentials.
        const { email } = req.body;
        let errors: any = {};
        const emailUser = await Users.findOne({ email });
        if (emailUser) errors.email = "Emails is already taken.";
        if (Object.keys(errors).length > 0) {
            return res.status(400).json(errors);
        };
        // Create the User.
        const user: Users = new Users();
        user.email = req.body.email;
        user.password = req.body.password;
        errors = await validate(user);
        if (errors.length > 0) return res.status(400)
            .json({ errors });
        await user.save();
        return res.status(201).json(user);
    } catch (error) {
        res.status(500).json(error);
        next(error);
    }
};

export const Login: express.RequestHandler =
async (req, res, next) => {
    try {
        // Validate the Credentails.
        const { email, password } = req.body;
        let errors: any = {};
        if (isEmpty(email)) errors.email = "Please enter your E-mail";
        if (isEmpty(password)) errors.password = "Please enter your Password";
        if (Object.keys(errors).length > 0) {
            return res.status(400).json(errors);
        };

        const user: Users | undefined = await Users.findOne({ email });
        if (!user) return res.status(404)
            .json({ error: "That User wasn't found!" });

        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches) {
            return res.status(401)
                .json({ password: "The Password is incorrect!" });
        };
        const token: string = jwt.sign({ email }, config.JWT_SECRET);
        res.set("Set-Cookie", 
        cookie.serialize("token", token, {
            httpOnly: true,
            secure: config.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 3600, // Age in sec = 1-Hour.
            path: "/",
        }));
        return res.json({ user, token });
    } catch (error) {
        res.status(500).json(error);
        next(error);
    }
};

export const Me: express.RequestHandler =
(req, res, next) => {
    try {
        return res.json(res.locals.user);
    } catch (error) {
        res.status(500).json(error);
        next(error);
    }
};





