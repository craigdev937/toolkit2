import express from "express";

export const indexHome: express.RequestHandler =
(req, res) => {
    res.json({ api: "TPERN and Redux-Toolkit" });
};





