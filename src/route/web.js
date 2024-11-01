import express from "express";
import userController from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/hello', (req, res) => {
        res.send("G7: Hello");
    });

    router.get('/welcome', userController.getWelcome);    

    return app.use("/", router);
}
module.exports = initWebRoutes;